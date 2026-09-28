#!/usr/bin/env node
// Instala o actualiza el framework SDD en un proyecto.
//
// Uso:
//   node herramientas/instalar.mjs <ruta-del-proyecto> [--actualizar] [--con-manual] [--activar-hook] [--simular]
//
//   --actualizar    reemplaza los archivos del framework (agentes, comandos, skills, scripts, plantillas) por la
//                   version nueva, guardando antes una copia en .sdd/respaldo/<fecha>/
//   --con-manual    copia tambien docs/manual/
//   --activar-hook  ejecuta `git config core.hooksPath .sdd/hooks` en el proyecto
//   --simular       muestra lo que haria sin escribir nada
//
// Nunca sobrescribe los archivos del usuario (AGENTS.md, opencode.json, docs/constitucion.md, .sdd/config.json):
// si ya existen y son distintos, deja la version nueva al lado como <archivo>.sdd-nuevo para fusionarla a mano.
// Nunca copia .git, herramientas/, ejemplo/ ni el README del framework.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const origen = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opcion = n => args.includes(n);
const destinoArg = args.find(a => !a.startsWith('--'));

if (!destinoArg) {
  console.error('Uso: node herramientas/instalar.mjs <ruta-del-proyecto> [--actualizar] [--con-manual] [--activar-hook] [--simular]');
  process.exit(1);
}
const destino = resolve(destinoArg);
if (!existsSync(destino) || !statSync(destino).isDirectory()) {
  console.error(`No existe la carpeta del proyecto: ${destino}`);
  process.exit(1);
}
if (destino === origen) {
  console.error('El destino es el propio repositorio del framework.');
  process.exit(1);
}

const simular = opcion('--simular');
const actualizar = opcion('--actualizar');
const version = readFileSync(join(origen, 'VERSION'), 'utf8').trim();

// Archivos que el usuario personaliza: nunca se sobrescriben.
const DEL_USUARIO = new Set(['AGENTS.md', 'opencode.json', 'docs/constitucion.md', '.sdd/config.json']);

// Carpetas y archivos que forman el framework instalable.
const RAICES = ['AGENTS.md', 'opencode.json', 'docs/constitucion.md', '.opencode/agents', '.opencode/commands', '.agents/skills', '.sdd', 'plantillas'];
if (opcion('--con-manual')) RAICES.push('docs/manual');

const IGNORAR = new Set(['.sdd/version', '.sdd/respaldo']);

function listar(rel) {
  const p = join(origen, rel);
  if (!existsSync(p)) return [];
  if (statSync(p).isFile()) return [rel];
  return readdirSync(p).flatMap(n => {
    const hijo = `${rel}/${n}`;
    return IGNORAR.has(hijo) ? [] : listar(hijo);
  });
}

const iguales = (a, b) => readFileSync(a).equals(readFileSync(b));
const sello = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
const acciones = { nuevo: [], igual: [], actualizado: [], fusionar: [] };

function escribir(desde, hacia) {
  if (simular) return;
  mkdirSync(dirname(hacia), { recursive: true });
  copyFileSync(desde, hacia);
}

for (const rel of RAICES.flatMap(listar)) {
  const src = join(origen, rel);
  const dst = join(destino, rel);

  if (!existsSync(dst)) {
    escribir(src, dst);
    acciones.nuevo.push(rel);
  } else if (iguales(src, dst)) {
    acciones.igual.push(rel);
  } else if (DEL_USUARIO.has(rel) || !actualizar) {
    escribir(src, `${dst}.sdd-nuevo`);
    acciones.fusionar.push(rel);
  } else {
    escribir(dst, join(destino, '.sdd', 'respaldo', sello, rel));
    escribir(src, dst);
    acciones.actualizado.push(rel);
  }
}

// specs/ debe existir para que los agentes sepan donde escribir.
if (!existsSync(join(destino, 'specs'))) {
  if (!simular) {
    mkdirSync(join(destino, 'specs'), { recursive: true });
    writeFileSync(join(destino, 'specs', '.gitkeep'), '');
  }
  acciones.nuevo.push('specs/.gitkeep');
}

const anterior = existsSync(join(destino, '.sdd', 'version'))
  ? readFileSync(join(destino, '.sdd', 'version'), 'utf8').trim()
  : null;
if (!simular) writeFileSync(join(destino, '.sdd', 'version'), `${version}\n`);

const esGit = existsSync(join(destino, '.git'));
if (opcion('--activar-hook')) {
  if (!esGit) console.log('AVISO: el proyecto no es un repositorio git; no se activó el hook.');
  else if (!simular) execFileSync('git', ['-C', destino, 'config', 'core.hooksPath', '.sdd/hooks']);
}

// Resumen
console.log(`${simular ? '[SIMULACIÓN] ' : ''}Framework SDD ${anterior ? `${anterior} -> ` : ''}${version} en ${destino}\n`);
const bloque = (titulo, lista) => {
  if (!lista.length) return;
  console.log(`${titulo} (${lista.length}):`);
  for (const r of lista) console.log(`  ${r}`);
  console.log('');
};
bloque('Copiados', acciones.nuevo);
bloque(`Actualizados (copia previa en .sdd/respaldo/${sello}/)`, acciones.actualizado);
bloque('Ya existían y son distintos: revisa y fusiona <archivo>.sdd-nuevo a mano', acciones.fusionar);
console.log(`Sin cambios: ${acciones.igual.length} archivo(s).\n`);

const pasos = [];
if (acciones.fusionar.length) pasos.push('Fusiona los archivos .sdd-nuevo con los tuyos y bórralos cuando termines.');
if (!anterior) {
  pasos.push('Ajusta docs/constitucion.md a tu proyecto.');
  pasos.push('Pon tus comandos en .sdd/config.json y comprueba con: node .sdd/verificar.mjs');
  if (!opcion('--activar-hook')) pasos.push('Activa el hook: git config core.hooksPath .sdd/hooks');
  pasos.push('(Recomendado) Copia plantillas/ci/github-actions-sdd.yml a .github/workflows/sdd.yml');
  pasos.push('Si el proyecto ya tiene código: abre opencode y ejecuta /mapear');
} else {
  pasos.push('Revisa el CHANGELOG del framework para ver qué cambió entre versiones.');
}
console.log('Siguientes pasos:');
pasos.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
if (!esGit) console.log('\nAVISO: el proyecto no es un repositorio git. El hook y la verificación de cambios necesitan git.');

#!/usr/bin/env node
// Comprueba la trazabilidad de cada funcionalidad en specs/:
//   - requisitos (RF/RNF) cubiertos por alguna tarea en plan-tareas.md
//   - criterios (CA) cubiertos por algun caso en plan-pruebas.md
//   - criterios (CA) con al menos una prueba en tests/aceptacion/<nombre>/ o tests/verificacion/<nombre>/
//   - documentos "Aprobado" (y cambios "Aplicado") con registro de aprobacion completo
//   - los requisitos tachados (~~...~~, eliminados por un /cambio) no se exigen
// Solo exige lo que corresponde a las fases ya alcanzadas. Con --estricto exige todo.
// Uso: node .sdd/trazabilidad.mjs [nombre-funcionalidad ...] [--estricto]
// Sin dependencias. Sale con codigo 1 si hay faltantes.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const raiz = process.cwd();
const args = process.argv.slice(2);
const estricto = args.includes('--estricto');
const pedidas = args.filter(a => !a.startsWith('--'));

const leer = p => (existsSync(p) ? readFileSync(p, 'utf8') : null);

function archivos(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap(n => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : [p];
  });
}

// "RF-01" y "RF-1" son el mismo requisito.
const ids = (texto, re) => new Set([...texto.matchAll(re)].map(m => `${m[1].toUpperCase()}-${String(Number(m[2])).padStart(2, '0')}`));

// Definiciones: "**RF-01:**", "**CA-02 (RF-01):**". Las lineas tachadas (~~...~~) son requisitos
// eliminados por un /cambio: ya no exigen tarea ni prueba.
const definidos = texto => ids(
  texto.split('\n').filter(l => !l.includes('~~')).join('\n'),
  /\*\*(RF|RNF|CA)-(\d+)/gi,
);
// Referencias en cualquier parte del texto
const referidos = texto => ids(texto, /(?<![A-Za-z])(RF|RNF|CA)-0*(\d+)(?!\d)/gi);
// En codigo de pruebas: CA-01, CA_01, test_ca_01 ...
const enPruebas = texto => ids(texto, /(?<![A-Za-z])(CA)[-_]?0*(\d+)(?!\d)/gi);

function estado(texto) {
  const m = texto.match(/\*\*Estado:\*\*[ \t]*(.*)/);
  const valor = (m?.[1] ?? '').trim();
  if (!valor || valor.includes('|')) return 'sin definir';
  return valor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function registroAprobacion(texto) {
  const por = texto.match(/\*\*Aprobado por:\*\*[ \t]*(.*)/)?.[1]?.trim();
  const fecha = texto.match(/\*\*Fecha de aprobaci[oó]n:\*\*[ \t]*(.*)/)?.[1]?.trim();
  return Boolean(por) && Boolean(fecha);
}

const specsDir = join(raiz, 'specs');
const funcionalidades = existsSync(specsDir)
  ? readdirSync(specsDir).filter(n => statSync(join(specsDir, n)).isDirectory())
  : [];
const revisar = pedidas.length ? pedidas : funcionalidades;

let faltas = 0;
const falta = msg => { faltas++; console.log(`  FALTA      ${msg}`); };
const ok = msg => console.log(`  OK         ${msg}`);
const pendiente = msg => console.log(`  PENDIENTE  ${msg}`);
const aviso = msg => console.log(`  AVISO      ${msg}`);
const lista = set => [...set].sort().join(', ');

if (!revisar.length) console.log('No hay funcionalidades en specs/. Nada que comprobar.');

for (const nombre of revisar) {
  const dir = join(specsDir, nombre);
  console.log(`\n${nombre}`);
  if (!existsSync(dir)) { falta(`no existe specs/${nombre}/`); continue; }

  const req = leer(join(dir, 'requerimientos.md'));
  if (!req) { falta('requerimientos.md no existe'); continue; }

  const def = definidos(req);
  const requisitos = new Set([...def].filter(i => !i.startsWith('CA')));
  const criterios = new Set([...def].filter(i => i.startsWith('CA')));
  if (!requisitos.size) falta('requerimientos.md no define requisitos (**RF-xx** / **RNF-xx**)');
  if (!criterios.size) falta('requerimientos.md no define criterios de aceptacion (**CA-xx**)');

  // Registro de aprobacion en cada documento que diga "Aprobado" (o "Aplicado", en los cambios)
  const dirCambios = join(dir, 'cambios');
  const cambios = existsSync(dirCambios)
    ? readdirSync(dirCambios).filter(n => n.endsWith('.md')).map(n => `cambios/${n}`)
    : [];
  for (const doc of ['requerimientos.md', 'arquitectura.md', 'plan-tareas.md', 'plan-pruebas.md', ...cambios]) {
    const t = leer(join(dir, doc));
    if (t && ['aprobado', 'aplicado'].includes(estado(t)) && !registroAprobacion(t)) {
      falta(`${doc} dice Aprobado pero le falta "Aprobado por" o "Fecha de aprobacion"`);
    }
  }
  const sinAplicar = cambios.filter(doc => estado(leer(join(dir, doc))) === 'aprobado');
  if (sinAplicar.length) aviso(`cambios aprobados pero aun no aplicados a requerimientos.md: ${sinAplicar.join(', ')}`);

  // Requisitos -> tareas
  const tareas = leer(join(dir, 'plan-tareas.md'));
  if (tareas) {
    const sin = [...requisitos].filter(r => !referidos(tareas).has(r));
    sin.length ? falta(`requisitos sin tarea en plan-tareas.md: ${lista(sin)}`) : ok('todos los requisitos tienen tarea');
  } else (estricto ? falta : pendiente)('plan-tareas.md aun no existe');

  // Criterios -> casos del plan de pruebas
  const planPruebas = leer(join(dir, 'plan-pruebas.md'));
  if (planPruebas) {
    const sin = [...criterios].filter(c => !referidos(planPruebas).has(c));
    sin.length ? falta(`criterios sin caso en plan-pruebas.md: ${lista(sin)}`) : ok('todos los criterios tienen caso de prueba');
  } else (estricto ? falta : pendiente)('plan-pruebas.md aun no existe');

  // Criterios -> pruebas automatizadas
  const dirAceptacion = join(raiz, 'tests', 'aceptacion', nombre);
  const dirVerificacion = join(raiz, 'tests', 'verificacion', nombre);
  const codigo = [...archivos(dirAceptacion), ...archivos(dirVerificacion)].map(p => readFileSync(p, 'utf8')).join('\n');
  if (existsSync(dirAceptacion)) {
    const cubiertos = enPruebas(codigo);
    const sin = [...criterios].filter(c => !cubiertos.has(c));
    sin.length ? falta(`criterios sin prueba en tests/: ${lista(sin)}`) : ok('todos los criterios tienen prueba');
    const huerfanos = [...cubiertos].filter(c => !criterios.has(c));
    if (huerfanos.length) aviso(`pruebas que citan criterios inexistentes o eliminados: ${lista(huerfanos)}`);
  } else (estricto ? falta : pendiente)(`tests/aceptacion/${nombre}/ aun no existe (fase /pruebas)`);
}

console.log(faltas ? `\nTrazabilidad: ${faltas} faltante(s).` : '\nTrazabilidad: completa.');
process.exit(faltas ? 1 : 0);

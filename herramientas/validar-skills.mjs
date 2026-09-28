#!/usr/bin/env node
// Valida las skills de .agents/skills contra el estandar Agent Skills (https://agentskills.io/specification)
// y comprueba que cada comando de opencode apunte a una skill existente.
// Uso: node herramientas/validar-skills.mjs

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dirSkills = join(raiz, '.agents', 'skills');
const version = readFileSync(join(raiz, 'VERSION'), 'utf8').trim();
const errores = [];

const skills = readdirSync(dirSkills);
for (const carpeta of skills) {
  const ruta = join(dirSkills, carpeta, 'SKILL.md');
  if (!existsSync(ruta)) { errores.push(`${carpeta}: falta SKILL.md`); continue; }
  const texto = readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n');
  const frontmatter = texto.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  if (!frontmatter) { errores.push(`${carpeta}: sin frontmatter`); continue; }

  const nombre = frontmatter.match(/^name: (.*)$/m)?.[1]?.trim();
  const descripcion = frontmatter.match(/^description: (.*)$/m)?.[1]?.trim();
  const versionSkill = frontmatter.match(/^\s+version: "(.*)"$/m)?.[1];

  if (nombre !== carpeta) errores.push(`${carpeta}: name "${nombre}" no coincide con la carpeta`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nombre ?? '') || nombre.length > 64) errores.push(`${carpeta}: name inválido`);
  if (!descripcion) errores.push(`${carpeta}: falta description`);
  else {
    // Sin comillas, ": " dentro del texto rompe el YAML.
    if (descripcion.includes(': ') && !/^".*"$/.test(descripcion)) errores.push(`${carpeta}: description con ": " debe ir entre comillas`);
    if (descripcion.replace(/^"|"$/g, '').length > 1024) errores.push(`${carpeta}: description supera 1024 caracteres`);
  }
  if (versionSkill !== version) errores.push(`${carpeta}: metadata.version "${versionSkill}" distinta de VERSION (${version})`);
  if (texto.split('\n').length > 500) errores.push(`${carpeta}: supera 500 líneas`);
  if (texto.includes('$ARGUMENTS')) errores.push(`${carpeta}: contiene $ARGUMENTS (propio de los comandos de opencode)`);
}

// Cada comando de opencode debe cargar una skill existente.
const dirComandos = join(raiz, '.opencode', 'commands');
for (const archivo of readdirSync(dirComandos)) {
  const texto = readFileSync(join(dirComandos, archivo), 'utf8');
  const skill = texto.match(/skill `([a-z0-9-]+)`/)?.[1];
  if (!skill) errores.push(`comando ${archivo}: no carga ninguna skill`);
  else if (!skills.includes(skill)) errores.push(`comando ${archivo}: la skill ${skill} no existe`);
}

if (errores.length) {
  console.log(errores.map(e => `  FALTA  ${e}`).join('\n'));
  console.log(`\nSkills: ${errores.length} problema(s).`);
  process.exit(1);
}
console.log(`Skills: ${skills.length} válidas; todos los comandos apuntan a una skill existente.`);

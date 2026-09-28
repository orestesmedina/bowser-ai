#!/usr/bin/env node
// Harness del framework: ejecuta los pasos definidos en .sdd/config.json del proyecto (cwd)
// y despues la comprobacion de trazabilidad. Es lo que corren los agentes, el hook pre-commit y el CI.
// Uso: node .sdd/verificar.mjs [--solo <paso>] [--omitir <paso>[,<paso>...]]
//   pasos: los de config.json (pruebas, lint, build, dependencias, secretos...) y trazabilidad
// Sin dependencias. Sale con codigo 1 si algo falla o no esta configurado.

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
// La configuracion es la del proyecto donde se ejecuta (cwd); si no hay, la que acompana al script.
const rutaConfig = [join(process.cwd(), '.sdd', 'config.json'), join(aqui, 'config.json')].find(existsSync);
const config = JSON.parse(readFileSync(rutaConfig, 'utf8'));

const valor = flag => {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : null;
};
const solo = valor('--solo');
const omitir = (valor('--omitir') ?? '').split(',').filter(Boolean);

const pasos = Object.entries(config.verificacion ?? {});
if (config.trazabilidad !== false) pasos.push(['trazabilidad', `node "${join(aqui, 'trazabilidad.mjs')}"`]);

const resultados = [];
for (const [nombre, comando] of pasos) {
  if (solo && solo !== nombre) continue;
  if (omitir.includes(nombre)) { resultados.push([nombre, 'OMITIDO', 'omitido con --omitir']); continue; }
  if (comando === null) { resultados.push([nombre, 'OMITIDO', 'no aplica (null en config.json)']); continue; }
  if (!comando?.trim()) {
    resultados.push([nombre, 'FALLA', 'sin configurar: define el comando en .sdd/config.json']);
    continue;
  }
  console.log(`\n=== ${nombre}: ${comando}`);
  const r = spawnSync(comando, { shell: true, stdio: 'inherit' });
  resultados.push([nombre, r.status === 0 ? 'OK' : 'FALLA', r.error ? r.error.message : `codigo de salida ${r.status}`]);
}

if (!resultados.length) {
  console.error(`No hay ningun paso llamado "${solo}".`);
  process.exit(1);
}

console.log('\n=== Resumen del harness');
for (const [nombre, res, detalle] of resultados) console.log(`  ${res.padEnd(8)} ${nombre.padEnd(13)} ${detalle}`);
const fallo = resultados.some(([, res]) => res === 'FALLA');
console.log(fallo ? '\nVerificacion: FALLA. No des la tarea por terminada.' : '\nVerificacion: OK.');
process.exit(fallo ? 1 : 0);

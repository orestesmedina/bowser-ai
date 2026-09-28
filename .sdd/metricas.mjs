#!/usr/bin/env node
// Metricas del proyecto a partir de specs/: sirven para saber si el framework esta ayudando.
// Uso: node .sdd/metricas.mjs [--json]
//
// Por funcionalidad: version de requerimientos, requisitos y criterios vigentes, criterios eliminados,
// tareas hechas/total, cambios, defectos corregidos, defectos por criterio y ultimo veredicto.
// Comparalas entre funcionalidades y proyectos: muchos defectos por criterio suelen indicar requisitos
// o criterios poco precisos; muchos cambios poco despues de aprobar, una entrevista insuficiente.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const specsDir = join(process.cwd(), 'specs');
const leer = p => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const unicos = (texto, re) => new Set([...texto.matchAll(re)].map(m => `${m[1].toUpperCase()}-${Number(m[2])}`)).size;
const campo = (texto, nombre) => texto.match(new RegExp(`\\*\\*${nombre}:\\*\\*[ \\t]*(.*)`))?.[1]?.trim() || '-';

const funcionalidades = existsSync(specsDir)
  ? readdirSync(specsDir).filter(n => statSync(join(specsDir, n)).isDirectory())
  : [];

const filas = funcionalidades.map(nombre => {
  const dir = join(specsDir, nombre);
  const req = leer(join(dir, 'requerimientos.md'));
  const vigentes = req.split('\n').filter(l => !l.includes('~~')).join('\n');
  const tachados = req.split('\n').filter(l => l.includes('~~')).join('\n');
  const tareas = leer(join(dir, 'plan-tareas.md'));
  const dirCambios = join(dir, 'cambios');
  const criterios = unicos(vigentes, /\*\*(CA)-(\d+)/gi);
  const defectos = (leer(join(dir, 'defectos.md')).match(/^\|\s*D-\d+/gm) || []).length;
  return {
    funcionalidad: nombre,
    version: campo(req, 'Versi[oó]n'),
    requisitos: unicos(vigentes, /\*\*(RF|RNF)-(\d+)/gi),
    criterios,
    eliminados: unicos(tachados, /\*\*(RF|RNF|CA)-(\d+)/gi),
    tareas: `${(tareas.match(/^\s*- \[x\]/gim) || []).length}/${(tareas.match(/^\s*- \[[ x]\]/gim) || []).length}`,
    cambios: existsSync(dirCambios) ? readdirSync(dirCambios).filter(n => n.endsWith('.md')).length : 0,
    defectos,
    defectosPorCriterio: criterios ? Number((defectos / criterios).toFixed(2)) : 0,
    veredicto: campo(leer(join(dir, 'reporte-pruebas.md')), 'Veredicto'),
  };
});

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(filas, null, 2));
  process.exit(0);
}

if (!filas.length) {
  console.log('No hay funcionalidades en specs/.');
  process.exit(0);
}

const columnas = ['funcionalidad', 'version', 'requisitos', 'criterios', 'eliminados', 'tareas', 'cambios', 'defectos', 'defectosPorCriterio', 'veredicto'];
const titulos = ['Funcionalidad', 'Ver.', 'Req.', 'CA', 'Elim.', 'Tareas', 'Cambios', 'Defectos', 'Def/CA', 'Veredicto'];
const ancho = columnas.map((c, i) => Math.max(titulos[i].length, ...filas.map(f => String(f[c]).length)));
const linea = valores => valores.map((v, i) => String(v).padEnd(ancho[i])).join('  ');
console.log(linea(titulos));
console.log(ancho.map(a => '-'.repeat(a)).join('  '));
for (const f of filas) console.log(linea(columnas.map(c => f[c])));

const suma = c => filas.reduce((s, f) => s + f[c], 0);
const totalCA = suma('criterios');
console.log(`\nTotal: ${filas.length} funcionalidad(es), ${totalCA} criterios, ${suma('cambios')} cambios, ` +
  `${suma('defectos')} defectos (${totalCA ? (suma('defectos') / totalCA).toFixed(2) : 0} por criterio).`);

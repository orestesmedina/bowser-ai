// Prueba de regresión del defecto D-01 (creada con /arreglar).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registrarGasto, resumenMensual } from '../../../src/gastos.mjs';

test('D-01: una categoría con espacios al final se resume junto a la misma categoría (CA-04)', () => {
  let gastos = [];
  gastos = registrarGasto(gastos, { fecha: '2026-09-01', monto: 100, categoria: 'Insumos' });
  gastos = registrarGasto(gastos, { fecha: '2026-09-02', monto: 200, categoria: 'Insumos ' });
  assert.deepEqual(resumenMensual(gastos, '2026-09'), { Insumos: 300 });
});

// Pruebas de aceptación derivadas de specs/registro-gastos/requerimientos.md (las escribe disenador-pruebas).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registrarGasto, resumenMensual } from '../../../src/gastos.mjs';

const valido = { fecha: '2026-09-10', monto: 125050, categoria: 'Insumos', proveedor: 'Distribuidora Central' };

test('CA-01: registra un gasto con fecha, monto y categoría', () => {
  const gastos = registrarGasto([], valido);
  assert.equal(gastos.length, 1);
  assert.deepEqual(gastos[0], { ...valido, nota: '' });
});

test('CA-02: rechaza montos cero, negativos o con decimales', () => {
  for (const monto of [0, -500, 10.5]) {
    assert.throws(() => registrarGasto([], { ...valido, monto }), /monto/);
  }
});

test('CA-04: el resumen mensual suma por categoría solo los gastos del mes', () => {
  let gastos = [];
  gastos = registrarGasto(gastos, { ...valido, monto: 1000 });
  gastos = registrarGasto(gastos, { ...valido, monto: 2500 });
  gastos = registrarGasto(gastos, { ...valido, categoria: 'Servicios', monto: 700 });
  gastos = registrarGasto(gastos, { ...valido, fecha: '2026-10-01', monto: 9999 });
  assert.deepEqual(resumenMensual(gastos, '2026-09'), { Insumos: 3500, Servicios: 700 });
});

test('CA-05: registra un gasto sin proveedor (C-01)', () => {
  const { proveedor, ...sinProveedor } = valido;
  const gastos = registrarGasto([], sinProveedor);
  assert.equal(gastos[0].proveedor, '');
});

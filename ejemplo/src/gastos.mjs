// Registro de gastos (ejemplo del framework SDD). Montos en centavos (RNF-01).

export function registrarGasto(gastos, { fecha, monto, categoria, proveedor = '', nota = '' }) {
  if (!Number.isInteger(monto) || monto <= 0) {
    throw new Error('El monto debe ser un número entero de centavos mayor que cero.');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha ?? '')) {
    throw new Error('La fecha debe tener el formato AAAA-MM-DD.');
  }
  // D-01: sin normalizar, "Insumos " e "Insumos" se resumían como categorías distintas.
  const categoriaNormalizada = (categoria ?? '').trim();
  if (!categoriaNormalizada) {
    throw new Error('La categoría es obligatoria.');
  }
  return [...gastos, { fecha, monto, categoria: categoriaNormalizada, proveedor: proveedor.trim(), nota }];
}

export function resumenMensual(gastos, mes) {
  const resumen = {};
  for (const gasto of gastos) {
    if (!gasto.fecha.startsWith(`${mes}-`)) continue;
    resumen[gasto.categoria] = (resumen[gasto.categoria] ?? 0) + gasto.monto;
  }
  return resumen;
}

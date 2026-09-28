# Plan de tareas: Registro de gastos

- **Estado:** Aprobado
- **Versión:** 2
- **Aprobado por:** Dueño del restaurante (ejemplo)
- **Fecha de aprobación:** 2026-09-20
- **Basado en:** `requerimientos.md` (versión 2) y `arquitectura.md` (versión 1)
- **Estimación total:** 3 h

## Fase 1: Registro y resumen
- [x] **T-01** Implementar `registrarGasto` con validación de monto, fecha y categoría.
  - Cubre: RF-01, RNF-01, CA-01, CA-02
  - Archivos: `src/gastos.mjs`
  - Verificación: `node .sdd/verificar.mjs`
  - Estimación: 1 h
- [x] **T-02** Implementar `resumenMensual`.
  - Cubre: RF-02, RNF-01, CA-04
  - Archivos: `src/gastos.mjs`
  - Verificación: `node .sdd/verificar.mjs`
  - Estimación: 1 h

## Fase Cambio C-01: Proveedor opcional
- [x] **T-03** Permitir registrar gastos sin proveedor.
  - Cubre: RF-01, CA-05
  - Archivos: `src/gastos.mjs`
  - Verificación: `node .sdd/verificar.mjs`
  - Estimación: 0,5 h

## Matriz de trazabilidad
| Requisito | Tareas | Pruebas |
|-----------|--------|---------|
| RF-01 | T-01, T-03 | PR-01, PR-02, PR-05 |
| RF-02 | T-02 | PR-04 |
| RNF-01 | T-01, T-02 | PR-02, PR-04 |

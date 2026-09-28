---
name: sdd-pruebas
description: "Fase 4a del flujo SDD: escribe las pruebas de aceptación en tests/aceptacion/<nombre>/ a partir de la especificación (no del código), nombradas con el ID del criterio, antes de implementar. Úsala después de aprobar el plan de pruebas."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-pruebas

- **Rol recomendado:** diseñador de pruebas (solo escribe en `tests/aceptacion/`)
- **Entrada:** el nombre de la funcionalidad
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Verifica que `plan-pruebas.md` en `specs/<nombre>/` esté **Aprobado**. Si no, detente y avisa.
   Lee `specs/<nombre>/requerimientos.md`, `arquitectura.md`, `plan-pruebas.md` y `docs/constitucion.md`.
2. Para cada criterio de aceptación (CA-xx) del plan de pruebas, escribe una prueba automatizada
   en `tests/aceptacion/<nombre>/`, usando el framework indicado en la constitución.
   El nombre de cada prueba incluye el ID del criterio (ej. `test_CA_01_...`).
3. Agrega casos límite y de error del plan de pruebas.
   **Si vienes de un `/cambio`:** actualiza las pruebas de los criterios modificados y elimina las de los
   criterios tachados como eliminados. Eres el único agente autorizado a cambiar `tests/aceptacion/`;
   cada prueba que cambies o borres debe corresponder a un criterio listado en el cambio.
4. Ejecuta `node .sdd/verificar.mjs --solo pruebas` y muestra la salida real.
   - Si el código aún no existe, las pruebas deben fallar (rojo). Reporta que están listas.
   - No modifiques código de producción para hacerlas pasar.
5. Ejecuta `node .sdd/trazabilidad.mjs <nombre>`: ningún criterio puede quedar sin prueba.
6. Al terminar, sugiere `/implementar <nombre>`.

---
name: sdd-probar
description: "Fase 5 del flujo SDD: verificación independiente de una funcionalidad contra sus criterios de aceptación y la constitución, con evidencia real, en specs/<nombre>/reporte-pruebas.md. Úsala cuando todas las tareas estén implementadas."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-probar

- **Rol recomendado:** verificador independiente (no corrige código; escribe su reporte y pruebas en `tests/verificacion/`)
- **Entrada:** el nombre de la funcionalidad
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Verifica sin el contexto de quien implementó. Trabaja contra los criterios de aceptación
y la constitución, no contra el plan de tareas.

Pasos:
1. Lee `specs/<nombre>/requerimientos.md`, `plan-pruebas.md` y `docs/constitucion.md`.
2. Comprueba con `git status` y `git log -- tests/aceptacion .sdd` que ni las pruebas de aceptación
   ni el harness se alteraron después de la fase de pruebas. Si se alteraron, repórtalo como defecto.
3. Ejecuta `node .sdd/verificar.mjs` y verifica cada criterio de aceptación con la salida real.
   Si falta una prueba, escríbela en `tests/verificacion/<nombre>/` y ejecútala.
4. Prueba casos límite y de error no cubiertos (también en `tests/verificacion/<nombre>/`).
   Incluye en el reporte la salida de `node .sdd/trazabilidad.mjs <nombre> --estricto`.
5. Revisa el código contra la constitución (estilo, seguridad, secretos, datos personales).
6. Escribe `specs/<nombre>/reporte-pruebas.md` según `plantillas/reporte-pruebas.md`, con evidencia real.
7. Muestra el veredicto, los defectos y las recomendaciones.
   Si hay defectos, agrega nuevas tareas en `plan-tareas.md` para corregirlos, cambia su estado
   a **En revisión** y pide al usuario que las apruebe antes de sugerir `/implementar`.

No modifiques código de producción ni `tests/aceptacion/`.

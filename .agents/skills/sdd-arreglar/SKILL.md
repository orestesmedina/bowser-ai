---
name: sdd-arreglar
description: "Vía rápida para defectos: cuando el código no cumple un criterio de aceptación ya especificado. Confirma que es un defecto, escribe una prueba de regresión que falla, corrige con el cambio mínimo y lo registra en specs/<nombre>/defectos.md. Si el comportamiento esperado no está especificado, deriva a sdd-cambio."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-arreglar

- **Rol recomendado:** desarrollador (no toca pruebas de aceptación ni `.sdd/`)
- **Entrada:** la descripción del defecto
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Esta vía es solo para **defectos**: casos en que el código no hace lo que la especificación ya dice.
No sirve para añadir ni cambiar comportamiento.

Pasos:
1. Lee `docs/constitucion.md` y, si existe, `docs/sistema.md`. Identifica la funcionalidad afectada en `specs/`
   y el criterio de aceptación (CA-xx) que se incumple.
2. **Clasifica y confirma con el usuario antes de tocar código:**
   - Si hay un CA que describe el comportamiento esperado -> es un defecto. Continúa.
   - Si el comportamiento esperado no está especificado, o la corrección cambiaría un CA -> no es un defecto.
     Detente y sugiere `/cambio <nombre> <descripción>`.
   - Si no hay spec para esa parte del sistema (proyecto existente) -> pide al usuario que confirme por
     escrito cuál es el comportamiento correcto y anótalo en el registro de defectos como "sin CA".
3. **Reproduce:** escribe una prueba de regresión en `tests/regresion/<nombre>/` que falle por el defecto
   (nombre con el ID, ej. `test_D_03_...`). Ejecútala y muestra que falla (rojo).
4. **Corrige** el código con el cambio mínimo. Ejecuta `node .sdd/verificar.mjs` y muestra la salida:
   la prueba de regresión y todo lo demás deben pasar.
5. Añade una fila en `specs/<nombre>/defectos.md` (si no existe, créalo con `plantillas/defectos.md`):
   criterio incumplido, descripción, causa raíz y prueba de regresión.
6. Propón un mensaje de commit (`fix: ...`) según la constitución.

Detente y sugiere el flujo completo (`/cambio` o `/requerimientos`) si la corrección necesita:
una dependencia nueva, cambiar el modelo de datos o una API pública, o tocar más de ~5 archivos.

Nunca modifiques `tests/aceptacion/` ni `.sdd/`. Si una prueba de aceptación está mal, es un `/cambio`.

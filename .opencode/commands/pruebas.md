---
description: Fase 4a - Escribe las pruebas de aceptacion derivadas de la especificacion
agent: disenador-pruebas
---

Funcionalidad: $ARGUMENTS

Pasos:
1. Lee `specs/$ARGUMENTS/requerimientos.md`, `arquitectura.md`, `plan-pruebas.md` y `docs/constitucion.md`.
2. Para cada criterio de aceptacion (CA-xx) del plan de pruebas, escribe una prueba automatizada
   en el proyecto, usando el framework indicado en la constitucion.
3. Agrega casos limite y de error del plan de pruebas.
4. Ejecuta las pruebas y muestra la salida real.
   - Si el codigo aun no existe, las pruebas deben fallar (rojo). Reporta que estan listas.
   - No modifiques codigo de produccion para hacerlas pasar.
5. Al terminar, sugiere `/implementar $ARGUMENTS`.

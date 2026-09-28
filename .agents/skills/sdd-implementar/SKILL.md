---
name: sdd-implementar
description: "Fase 4b del flujo SDD: implementa las tareas de plan-tareas.md una por una, ejecutando node .sdd/verificar.mjs después de cada una y sin modificar las pruebas de aceptación. Úsala cuando las pruebas de aceptación ya estén escritas."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-implementar

- **Rol recomendado:** desarrollador (no toca specs salvo marcar tareas, ni pruebas de aceptación, ni `.sdd/`)
- **Entrada:** el nombre de la funcionalidad y, opcionalmente, una tarea T-xx
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Lee `docs/constitucion.md` y todos los documentos en `specs/<nombre>/`.
   Verifica que `plan-tareas.md` exista; si no, detente y sugiere `/planificar`.
2. Elige la tarea: la indicada en los argumentos o, si no hay, la primera sin marcar
   cuyas dependencias estén completas.
3. Para cada tarea:
   a. Anuncia que tarea harás y que requisitos cubre.
   b. Escribe primero las pruebas unitarias relacionadas (cuando aplique) y luego el código.
   c. Ejecuta `node .sdd/verificar.mjs`. Corrige el código hasta que pase y muestra la salida real.
      Mientras queden tareas pendientes, es normal que fallen las pruebas de aceptación de esas tareas;
      las de la tarea actual y todo lo demás (lint, build, pruebas unitarias) deben pasar.
      Nunca modifiques las pruebas de `tests/aceptacion/` ni `.sdd/` para hacerlas pasar.
   d. Marca la tarea como `[x]` en `plan-tareas.md`.
   e. Propón un mensaje de commit según la constitución.
4. Después de cada tarea, pregunta si continuar con la siguiente, salvo que el usuario haya pedido hacerlas todas.
5. Si descubres que la especificación está incompleta o equivocada, **detente** y explica el problema.
   No cambies el comportamiento por tu cuenta; propón la actualización del documento.

Al terminar todas las tareas, `node .sdd/verificar.mjs` debe pasar completo. Entonces sugiere `/probar <nombre>`.

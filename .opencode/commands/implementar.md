---
description: Fase 4b - Implementa las tareas del plan, una por una
agent: desarrollador
---

Argumentos: $ARGUMENTS

Pasos:
1. Lee `docs/constitucion.md` y todos los documentos en `specs/<nombre>/`.
   Verifica que `plan-tareas.md` exista; si no, detente y sugiere `/planificar`.
2. Elige la tarea: la indicada en los argumentos o, si no hay, la primera sin marcar
   cuyas dependencias esten completas.
3. Para cada tarea:
   a. Anuncia que tarea haras y que requisitos cubre.
   b. Escribe primero las pruebas relacionadas (cuando aplique) y luego el codigo.
   c. Ejecuta pruebas y linter. Corrige hasta que pasen y muestra la salida real.
   d. Marca la tarea como `[x]` en `plan-tareas.md`.
   e. Propon un mensaje de commit segun la constitucion.
4. Despues de cada tarea, pregunta si continuar con la siguiente, salvo que el usuario haya pedido hacerlas todas.
5. Si descubres que la especificacion esta incompleta o equivocada, **detente** y explica el problema.
   No cambies el comportamiento por tu cuenta; propon la actualizacion del documento.

Al terminar todas las tareas, sugiere `/probar <nombre>`.

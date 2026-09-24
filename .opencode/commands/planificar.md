---
description: Fase 3 - Divide el trabajo en tareas verificables y define el plan de pruebas
agent: arquitecto
---

Funcionalidad: $ARGUMENTS

Pasos:
1. Verifica que `requerimientos.md` y `arquitectura.md` en `specs/$ARGUMENTS/` esten **Aprobados**.
   Si no, detente y avisa.
2. Lee `plantillas/plan-tareas.md` y `plantillas/plan-pruebas.md`.
3. Crea `specs/$ARGUMENTS/plan-tareas.md`:
   - Tareas pequenas (< 2 h), en orden de dependencia, cada una con requisitos cubiertos,
     archivos afectados, forma de verificacion y estimacion.
   - Completa la matriz de trazabilidad. Ningun requisito puede quedar sin tarea.
4. Crea `specs/$ARGUMENTS/plan-pruebas.md`:
   - Al menos un caso de prueba por criterio de aceptacion, mas casos limite y de error.
5. Muestra un resumen (numero de tareas, estimacion total, riesgos) y pide aprobacion.
   Al aprobar, sugiere `/pruebas $ARGUMENTS`.

---
name: sdd-planificar
description: "Fase 3 del flujo SDD: divide el trabajo en tareas pequeñas (plan-tareas.md con matriz de trazabilidad) y define los casos de prueba por criterio de aceptación (plan-pruebas.md). Úsala después de aprobar la arquitectura o tras aplicar un cambio."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-planificar

- **Rol recomendado:** arquitecto (solo escribe en `specs/`)
- **Entrada:** el nombre de la funcionalidad
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Verifica que `requerimientos.md` y `arquitectura.md` en `specs/<nombre>/` estén **Aprobados**.
   Si no, detente y avisa.
2. Lee `plantillas/plan-tareas.md` y `plantillas/plan-pruebas.md`.
   **Si los planes ya existen** (vienes de un `/cambio`): no los reescribas. Añade una fase nueva
   "Cambio C-XX" con las tareas del cambio (numeración de tareas y casos a continuación de la existente),
   actualiza la matriz de trazabilidad y los casos de prueba de los criterios modificados o eliminados,
   e incrementa la "Versión" de ambos documentos.
3. Crea `specs/<nombre>/plan-tareas.md`:
   - Tareas pequeñas (< 2 h), en orden de dependencia, cada una con requisitos cubiertos,
     archivos afectados, forma de verificación y estimación.
   - Completa la matriz de trazabilidad. Ningún requisito puede quedar sin tarea.
4. Crea `specs/<nombre>/plan-pruebas.md`:
   - Al menos un caso de prueba por criterio de aceptación, más casos límite y de error.
5. Muestra un resumen (número de tareas, estimación total, riesgos) y pide aprobación.
   Cuando el usuario apruebe explícitamente, marca ambos documentos como **Aprobado**,
   completa el registro de aprobación según `AGENTS.md` y sugiere `/pruebas <nombre>`.

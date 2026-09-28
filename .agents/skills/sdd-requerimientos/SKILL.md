---
name: sdd-requerimientos
description: "Fase 1 del flujo SDD: entrevista al usuario y redacta specs/<nombre>/requerimientos.md con requisitos RF/RNF y criterios de aceptación verificables (formato CUANDO... EL SISTEMA DEBE...). Úsala al empezar una funcionalidad nueva o para documentar una funcionalidad existente antes de cambiarla."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-requerimientos

- **Rol recomendado:** analista (entrevista; solo escribe en `specs/`)
- **Entrada:** la idea inicial del usuario
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Lee `AGENTS.md`, `docs/constitucion.md` y `plantillas/requerimientos.md`.
2. Propón un nombre corto en kebab-case para la funcionalidad (ej. `registro-facturas`).
3. **Entrevista antes de escribir.** Haz entre 5 y 10 preguntas claras, agrupadas por tema
   (problema, usuarios, reglas de negocio, datos, integraciones, casos de error, fuera de alcance).
   Espera las respuestas. Si algo sigue sin estar claro, pregunta de nuevo; no inventes.
4. Crea `specs/<nombre>/requerimientos.md` siguiendo la plantilla. Cada requisito tiene ID (RF-xx, RNF-xx)
   y cada criterio de aceptación (CA-xx) es verificable y referencia su requisito.
5. Lista al final los supuestos y preguntas abiertas.
6. Pide al usuario que revise y apruebe. Cuando lo apruebe explícitamente, cambia el estado a **Aprobado**
   y completa el registro de aprobación según `AGENTS.md`. Sugiere el siguiente paso: `/arquitectura <nombre>`.

No escribas código ni diseño técnico en esta fase.

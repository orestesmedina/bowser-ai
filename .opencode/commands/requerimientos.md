---
description: Fase 1 - Entrevista y redacta los requerimientos de una funcionalidad
agent: analista
---

Idea inicial del usuario: $ARGUMENTS

Pasos:
1. Lee `AGENTS.md`, `docs/constitucion.md` y `plantillas/requerimientos.md`.
2. Propon un nombre corto en kebab-case para la funcionalidad (ej. `registro-facturas`).
3. **Entrevista antes de escribir.** Haz entre 5 y 10 preguntas claras, agrupadas por tema
   (problema, usuarios, reglas de negocio, datos, integraciones, casos de error, fuera de alcance).
   Espera las respuestas. Si algo sigue sin estar claro, pregunta de nuevo; no inventes.
4. Crea `specs/<nombre>/requerimientos.md` siguiendo la plantilla. Cada requisito tiene ID (RF-xx, RNF-xx)
   y cada criterio de aceptacion (CA-xx) es verificable y referencia su requisito.
5. Lista al final los supuestos y preguntas abiertas.
6. Pide al usuario que revise y apruebe. Cuando apruebe, cambia el estado a **Aprobado**
   y sugiere el siguiente paso: `/arquitectura <nombre>`.

No escribas codigo ni diseno tecnico en esta fase.

---
name: sdd-cambio
description: "Cambia el comportamiento de una funcionalidad ya especificada: entrevista, propuesta con delta de requisitos en specs/<nombre>/cambios/C-XX-*.md y, al aprobarse, actualización versionada de requerimientos.md. Úsala cuando el usuario quiere que algo existente funcione distinto (no para defectos)."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-cambio

- **Rol recomendado:** analista (entrevista; solo escribe en `specs/`)
- **Entrada:** el nombre de la funcionalidad y la descripción del cambio
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Lee `AGENTS.md`, `docs/constitucion.md`, `plantillas/cambio.md`, `docs/sistema.md` (si existe) y todos
   los documentos de `specs/<nombre>/`, incluidos los cambios anteriores en `specs/<nombre>/cambios/`.
   - Si `specs/<nombre>/` no existe: si es un proyecto existente sin specs, propón primero
     `/requerimientos` para documentar la funcionalidad actual; si es una funcionalidad nueva, usa `/requerimientos`.
   - Si `requerimientos.md` no está **Aprobado**, detente: primero hay que cerrar esa versión.
2. **Entrevista antes de escribir.** Pregunta lo necesario para entender el motivo, qué cambia exactamente,
   qué pasa con los datos existentes y qué debe seguir igual. No inventes.
3. Crea `specs/<nombre>/cambios/C-XX-<slug>.md` con `plantillas/cambio.md` (XX = siguiente número libre).
   - Los requisitos y criterios nuevos continúan la numeración existente. Los IDs nunca se reutilizan.
   - Lista explícitamente las pruebas de aceptación que quedarán obsoletas o deberán cambiar.
4. Pide revisión y aprobación del cambio. Cuando el usuario lo apruebe explícitamente:
   a. Marca el cambio **Aprobado** con su registro de aprobación.
   b. Aplica el delta en `requerimientos.md`:
      - Añadidos: agrégalos con la anotación `(C-XX)`.
      - Modificados: reemplaza el texto y añade `(modificado en C-XX)`.
      - Eliminados: no los borres; táchalos: `- ~~**CA-03 (RF-01):** ...~~ (eliminado en C-XX)`.
   c. Incrementa la "Versión" de `requerimientos.md`, márcalo **Aprobado** con el mismo registro
      y cambia el estado del cambio a **Aplicado**.
5. Indica los siguientes pasos según el impacto:
   - Si afecta a la arquitectura: `/arquitectura <nombre>` (actualiza el documento existente).
   - Siempre: `/planificar <nombre>` (añade las tareas del cambio), `/pruebas <nombre>` (actualiza las
     pruebas de aceptación), `/implementar <nombre>` y `/probar <nombre>`.

No escribas código ni diseño técnico en esta fase.

---
name: sdd-mapear
description: "Documenta un proyecto que ya tenía código antes de adoptar el framework SDD: genera docs/sistema.md (stack, estructura, datos, integraciones, cómo se prueba, riesgos) y propone valores para la constitución y .sdd/config.json. Úsala al adoptar el framework en un proyecto existente."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-mapear

- **Rol recomendado:** arquitecto (solo escribe `docs/sistema.md`)
- **Entrada:** opcionalmente, el alcance a mapear
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Úsalo una vez al adoptar el framework en un proyecto que ya tiene código, y cuando el sistema cambie mucho.

Pasos:
1. Lee `docs/constitucion.md` y `plantillas/sistema.md`. Si ya existe `docs/sistema.md`, vas a actualizarlo.
2. Explora el código sin modificarlo: manifiestos (`package.json`, `pyproject.toml`, `*.csproj`...), estructura
   de carpetas, puntos de entrada, modelos de datos, rutas/API, integraciones, pruebas existentes, CI y README.
   No leas archivos `.env` ni de credenciales.
3. Escribe `docs/sistema.md` siguiendo la plantilla. Describe lo que **hay**, no lo que debería haber.
   Marca como **(sin confirmar)** todo lo que dedujiste sin verlo en el código.
4. En la sección "Propuestas de configuración" sugiere valores para `docs/constitucion.md` y
   `.sdd/config.json` basados en lo detectado (comandos de pruebas, lint, build, auditoría). No edites esos archivos.
5. Muestra un resumen: stack, funcionalidades detectadas, cómo se prueba, riesgos principales y
   las preguntas que no pudiste responder leyendo el código.
6. Pide revisión y aprobación. Cuando el usuario lo apruebe explícitamente, márcalo **Aprobado** con su registro.

Siguientes pasos que debes sugerir:
- Que el usuario copie las propuestas a `docs/constitucion.md` y `.sdd/config.json` y ejecute `node .sdd/verificar.mjs`.
- Para modificar una funcionalidad existente: `/requerimientos` para documentar su comportamiento actual
  y después `/cambio`. Para corregir un defecto: `/arreglar`.

No escribas código ni cambies archivos fuera de `docs/sistema.md`.

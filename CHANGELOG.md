# Cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Versionado [SemVer](https://semver.org/lang/es/):
mientras la versión sea 0.x, cualquier versión menor puede romper compatibilidad.

Para actualizar un proyecto: `node herramientas/instalar.mjs <ruta-del-proyecto> --actualizar`.

## [0.3.0] - 2026-09-23

Auditoría del framework: los controles pasan de depender de instrucciones al modelo a hacerse cumplir
con permisos, scripts, hook y CI.

### Añadido
- **Harness en `.sdd/`**: `config.json` (único lugar para los comandos de pruebas, lint, build,
  dependencias y secretos), `verificar.mjs`, `trazabilidad.mjs`, `metricas.mjs` y `hooks/pre-commit`.
- Plantilla de CI para GitHub Actions (`plantillas/ci/github-actions-sdd.yml`).
- Comandos `/cambio` (cambiar una funcionalidad ya especificada, con delta y versionado),
  `/arreglar` (vía rápida para defectos, con prueba de regresión) y `/mapear` (proyectos existentes).
- Plantillas `cambio.md`, `defectos.md` y `sistema.md`.
- Registro de aprobación (quién, cuándo, versión) en las plantillas y reglas de aprobación en `AGENTS.md`.
- Constitución: secciones de dependencias (cadena de suministro) y secretos.
- Instalador `herramientas/instalar.mjs`: no sobrescribe archivos del usuario, no copia `.git`, permite actualizar.
- Proyecto de ejemplo en `ejemplo/` que el CI del framework verifica en cada cambio.
- **Skills** en `.agents/skills/sdd-<fase>/SKILL.md` (estándar Agent Skills): el procedimiento de cada fase
  se puede usar fuera de opencode. Validador `herramientas/validar-skills.mjs`.

### Cambiado
- Los comandos interactivos (`/requerimientos`, `/arquitectura`, `/planificar`, `/implementar`, `/cambio`,
  `/arreglar`, `/mapear`) se ejecutan en la conversación principal (`subtask: false`) y sus agentes pasan
  a `mode: all`. Antes corrían como subagentes y las respuestas del usuario le llegaban al agente `build`.
- Los modelos de todos los agentes se definen en un solo lugar: el bloque `agent` de `opencode.json`.
- Los comandos de `.opencode/commands/` son una capa fina: eligen el agente y cargan la skill de su fase.
- Las pruebas se organizan por funcionalidad: `tests/aceptacion/<nombre>/`, `tests/verificacion/<nombre>/`
  y `tests/regresion/<nombre>/`.
- Documentación con tildes y signos de apertura; los nombres de archivos y carpetas siguen sin tilde.

### Seguridad
- `desarrollador`: no puede editar specs (salvo marcar tareas y registrar defectos), pruebas de aceptación
  ni verificación, `docs/`, `.sdd/` ni la configuración.
- `bash` con lista de comandos permitidos en cada agente; `git commit`, `git push` y borrados prohibidos.
- `webfetch` y `websearch` piden permiso; regla de que el contenido externo son datos, no instrucciones.
- Lectura prohibida de `.env` y archivos de llaves para todos los agentes (opencode los tenía en `ask`).
- El agente `build` pide permiso antes de tocar specs, pruebas de aceptación, `.sdd/` y configuración.

### Corregido
- `/probar` pedía al verificador escribir pruebas que sus permisos no le dejaban escribir.
- La instalación con `Copy-Item -Recurse -Force` copiaba el `.git` del framework y sobrescribía archivos del proyecto.

### Eliminado
- La variante para Claude Code (ya no se mantiene).

## [0.2.0]

Versión inicial para opencode: 6 agentes, 7 comandos, 5 plantillas, constitución y manual.

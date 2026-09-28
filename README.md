# Mi Framework SDD para opencode

Versión 0.3.0 ([cambios](CHANGELOG.md)).

Framework de desarrollo guiado por especificaciones (SDD) para usar con **opencode**.
Cubre el ciclo completo: requerimientos -> arquitectura -> planificación -> pruebas -> implementación -> verificación,
además de cambios a funcionalidades existentes, corrección de defectos y adopción en proyectos con código previo.

- **Subagentes con modelo propio** (routing de modelos).
- **Permisos como guardarrailes** (cada agente escribe solo donde debe).
- **Verificación independiente** (quien implementa no es quien verifica).
- **Harness que se hace cumplir** (scripts, hook pre-commit y CI), no solo instrucciones al modelo.
- **Un orquestador** que recorre las fases delegando.

## Documentación

Manual completo para quien empieza desde cero: [`docs/manual/`](docs/manual/README.md).

- [Inicio rápido](docs/manual/INICIO-RAPIDO.md) - los pasos mínimos para empezar hoy.
- [Tutorial paso a paso](docs/manual/06-tutorial.md) - un ejemplo completo de principio a fin.
- [Preguntas frecuentes](docs/manual/09-problemas.md) - errores comunes con solución.

## Instalación

Requisitos: opencode, git y Node.js 18 o superior.

```powershell
node herramientas/instalar.mjs C:\ruta\a\tu-proyecto --activar-hook
```

El instalador copia agentes, comandos, harness y plantillas. No sobrescribe tus archivos: si ya tienes
`AGENTS.md`, `opencode.json`, `docs/constitucion.md` o `.sdd/config.json`, deja la versión del framework al lado
como `.sdd-nuevo` para que la fusiones. No copia `.git`, `herramientas/`, `ejemplo/` ni este README.
Usa `--simular` para ver qué haría sin escribir nada.

Después:

1. Ajusta `docs/constitucion.md` a tus estándares (lenguaje, linter, framework de pruebas).
2. Pon tus comandos en `.sdd/config.json` y comprueba con `node .sdd/verificar.mjs`.
3. (Recomendado) Copia `plantillas/ci/github-actions-sdd.yml` a `.github/workflows/sdd.yml`.
4. Abre opencode en la carpeta del proyecto. Si ya tenía código, empieza por `/mapear`.

### Actualizar un proyecto

```powershell
node herramientas/instalar.mjs C:\ruta\a\tu-proyecto --actualizar
```

Reemplaza agentes, comandos, scripts y plantillas por la versión nueva (con copia previa en `.sdd/respaldo/`)
y nunca toca tus archivos. La versión instalada queda en `.sdd/version`. Lee el [CHANGELOG](CHANGELOG.md) antes.

> Los comandos del harness son lo que hace que el agente pueda autocorregirse.
> Si no están, el framework no tiene frenos: `node .sdd/verificar.mjs` falla hasta que los configures.

## Flujo de trabajo

Cada funcionalidad vive en `specs/<nombre-funcionalidad>/`.

| Paso | Comando | Agente | Produce |
|------|---------|--------|---------|
| 1 | `/requerimientos <idea>` | analista | `requerimientos.md` |
| 2 | `/arquitectura <nombre>` | arquitecto | `arquitectura.md` |
| 3 | `/planificar <nombre>` | arquitecto | `plan-tareas.md` y `plan-pruebas.md` |
| 4a | `/pruebas <nombre>` | disenador-pruebas | Pruebas de aceptación (rojo) |
| 4b | `/implementar <nombre> [T-xx]` | desarrollador | Código + tareas `[x]` |
| 5 | `/probar <nombre>` | verificador | `reporte-pruebas.md` |
| - | `/cambio <nombre> <descripción>` | analista | Cambio a una funcionalidad existente (`cambios/C-XX-*.md`) |
| - | `/arreglar <descripción>` | desarrollador | Corrección de un defecto + prueba de regresión |
| - | `/mapear` | arquitecto | `docs/sistema.md` para proyectos existentes |
| - | `/estado` | (actual) | Resumen y siguiente paso |

**Regla de oro:** no avances de fase sin revisar y aprobar el documento anterior.
El documento es la fuente de verdad; el código es el resultado.

## Agentes y modelos

Todos usan el catálogo `opencode-go/`. Están juntos en el bloque `agent` de `opencode.json` (no en los archivos de los agentes).

| Agente | Modo | Modelo | Permisos clave |
|--------|------|--------|----------------|
| `orquestador` | primary | `opencode-go/deepseek-v4-pro` | `edit: deny`, `bash: deny`, `task` controlado |
| `analista` | all | `opencode-go/kimi-k3` | escribe solo en `specs/**`, sin bash |
| `arquitecto` | all | `opencode-go/glm-5.3` | escribe solo en `specs/**`, sin bash |
| `disenador-pruebas` | subagent | `opencode-go/deepseek-v4-pro` | escribe solo en `tests/aceptacion/**`; bash: solo pruebas y `git status/diff` sin preguntar |
| `desarrollador` | all | `opencode-go/kimi-k2.7-code` | edita todo menos specs (salvo marcar tareas), `tests/aceptacion/`, `tests/verificacion/`, `docs/` y config; bash: pruebas/lint/build sin preguntar, lo demás pregunta |
| `verificador` | subagent | `opencode-go/grok-4.7` | escribe solo en `reporte-pruebas.md`, `plan-tareas.md` y `tests/verificacion/**`; bash como el desarrollador |

Ningún agente puede hacer `git commit` ni `git push`. `webfetch` y `websearch` piden permiso en todos.

Por qué estos modelos:
- **Independencia**: el verificador usa un modelo de otra familia (`grok`) que el desarrollador (`kimi`),
  para no heredar los mismos sesgos.
- El diseñador de pruebas usa un modelo distinto al desarrollador para escribir desde la spec, no desde el código.

## Skills y otras herramientas

El procedimiento de cada fase vive en `.agents/skills/sdd-<fase>/SKILL.md`, en el formato abierto
[Agent Skills](https://agentskills.io). Los comandos de opencode solo eligen el agente (y con él, los permisos)
y cargan la skill. Así el método no queda atado a opencode:

- **opencode** lee `.agents/skills/` directamente (compruébalo con `opencode debug skill`).
- **Otras herramientas compatibles con Agent Skills:** copia o enlaza `.agents/skills/` a la carpeta de skills
  que use esa herramienta (por ejemplo `.claude/skills/` en Claude Code) y usa `AGENTS.md` como instrucciones
  del proyecto. El harness de `.sdd/` funciona igual en cualquier herramienta.
- Lo que **no** se lleva a otras herramientas son los permisos por agente de `.opencode/agents/`: allí tendrás
  que configurar límites equivalentes con lo que ofrezca esa herramienta.

Valida las skills con `node herramientas/validar-skills.mjs` (también lo hace el CI del framework).

## Dos formas de trabajar

1. **Paso a paso (recomendado al empezar):** ejecuta los comandos `/requerimientos`, `/arquitectura`, etc.
   Tú controlas cada aprobación.
2. **Orquestado:** cambia al agente `orquestador` (Tab) y pídele recorrer el ciclo completo.
   El delega en los subagentes y se detiene en cada aprobación.

## Guardarrailes (permisos)

- `analista` y `arquitecto` **solo pueden escribir dentro de `specs/`**: no tocan código de producción.
- Las pruebas de `tests/aceptacion/` solo las escribe `disenador-pruebas`. El `desarrollador` no puede
  modificarlas: tiene que hacer pasar el código, no cambiar la prueba.
- `verificador` no corrige: reporta. Solo escribe su reporte, pruebas extra en `tests/verificacion/`
  y tareas nuevas en `plan-tareas.md`. La corrección vuelve a `desarrollador`.
- `orquestador` no edita ni ejecuta: solo delega.
- En `bash`, cada agente solo ejecuta sin preguntar los comandos de su lista (`node .sdd/verificar.mjs`,
  `node .sdd/trazabilidad.mjs`, comandos de prueba/lint/build habituales y `git status/diff/log`).
- Ningún agente puede modificar `.sdd/`: el harness no se debilita para que las pruebas pasen.
- El agente `build` de opencode pide permiso antes de tocar `specs/`, `tests/aceptacion/`, `.sdd/`, la constitución o la
  configuración (definido en `opencode.json`).
- Las aprobaciones quedan registradas en cada documento (quien, cuando, versión). Ver "Aprobaciones" en `AGENTS.md`.
- Los patrones de permiso se evalúan en orden y **gana la última regla que coincide**;
  por eso `"*": deny` va primero y los `allow` después.

## Estructura

```
AGENTS.md                 Reglas generales que opencode lee siempre
opencode.json             Config global (modelo por defecto, protecciones del agente build)
docs/constitucion.md      Tus estándares no negociables
plantillas/               Formatos de cada documento
plantillas/ci/            Plantilla de CI (GitHub Actions)
.opencode/agents/         Subagentes especializados
.opencode/commands/       Comandos de cada fase (capa fina: agente + skill)
.agents/skills/sdd-*/     Procedimiento de cada fase (estándar Agent Skills)
.sdd/config.json          Comandos del harness (pruebas, lint, build)
.sdd/verificar.mjs        Ejecuta el harness completo
.sdd/trazabilidad.mjs     Comprueba requisito -> tarea -> prueba y los registros de aprobación
.sdd/metricas.mjs         Resumen por funcionalidad: criterios, cambios, defectos, veredicto
.sdd/hooks/pre-commit     Bloquea commits si fallan lint, build, secretos o trazabilidad
docs/sistema.md           Mapa de un proyecto existente (lo crea /mapear)
specs/                    Especificaciones por funcionalidad
specs/<nombre>/cambios/   Propuestas de cambio aplicadas (las crea /cambio)
specs/<nombre>/defectos.md    Defectos corregidos (lo actualiza /arreglar)
tests/aceptacion/<nombre>/    Pruebas de aceptación (las crea /pruebas)
tests/verificacion/<nombre>/  Pruebas extra del verificador (las crea /probar)
tests/regresion/<nombre>/     Pruebas de regresión de defectos (las crea /arreglar)
```

Solo en el repositorio del framework (no se instalan en los proyectos):

```
herramientas/instalar.mjs Instalador y actualizador
herramientas/validar-skills.mjs  Valida las skills (estándar Agent Skills) y los comandos
ejemplo/                  Proyecto de referencia y prueba de humo del framework
.github/workflows/        CI del framework (verifica el ejemplo y el instalador)
CHANGELOG.md, VERSION     Historial y versión del framework
```

## Medir si el framework ayuda

```powershell
node .sdd/metricas.mjs
```

Muestra por funcionalidad los criterios, cambios, defectos por criterio y el veredicto del verificador.
Compáralo entre proyectos y versiones del framework: muchos defectos por criterio suelen indicar criterios
poco precisos; muchos cambios justo después de aprobar, una entrevista insuficiente. El procedimiento para
probar una versión nueva del framework con un modelo está en [`ejemplo/README.md`](ejemplo/README.md).

## Dónde se hace cumplir cada regla

| Regla | Dónde se hace cumplir |
|-------|-----------------------|
| Pruebas, lint y build pasan | `node .sdd/verificar.mjs` (agentes), hook pre-commit (lint/build), CI (todo) |
| Sin secretos en el repositorio | Paso `secretos` del harness (hook y CI) |
| Sin vulnerabilidades conocidas en dependencias | Paso `dependencias` del harness (CI) |
| Solo dependencias aprobadas | Tabla de `arquitectura.md` + revisión del `verificador`: depende del modelo |
| Los agentes no leen `.env` ni archivos de llaves | Permiso `read` en `opencode.json` |
| Cada requisito con tarea y cada criterio con prueba | `node .sdd/trazabilidad.mjs` (dentro de `verificar`) |
| Aprobaciones con registro | `trazabilidad.mjs` y `/estado` |
| El desarrollador no toca pruebas de aceptación ni el harness | Permisos `edit` en `.opencode/agents/desarrollador.md` |
| Sin `git commit`/`push` por agentes | Permisos `bash` de cada agente |
| Fases en orden, no inventar requisitos | Instrucciones (`AGENTS.md`, comandos): depende del modelo |

## Cómo mejorarlo

Cada vez que un agente cometa un error repetido, agrega una regla en `docs/constitucion.md`
o ajusta la plantilla, el comando o el permiso correspondiente. El framework mejora con cada proyecto.

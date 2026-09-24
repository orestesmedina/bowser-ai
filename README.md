# Mi Framework SDD para opencode (v0.2)

Framework de desarrollo guiado por especificaciones (SDD) para usar con **opencode**.
Cubre el ciclo completo: requerimientos -> arquitectura -> planificacion -> pruebas -> implementacion -> verificacion.

Es la version opencode del framework original de Claude Code, ampliada con:
- **Subagentes con modelo propio** (routing de modelos).
- **Permisos como guardarrailes** (cada agente escribe solo donde debe).
- **Verificacion independiente** (quien implementa no es quien verifica).
- **Un orquestador** que recorre las fases delegando.

## Documentacion

Manual completo para quien empieza desde cero: [`docs/manual/`](docs/manual/README.md).

- [Inicio rapido](docs/manual/INICIO-RAPIDO.md) - los pasos minimos para empezar hoy.
- [Tutorial paso a paso](docs/manual/06-tutorial.md) - un ejemplo completo de principio a fin.
- [Preguntas frecuentes](docs/manual/09-problemas.md) - errores comunes con solucion.

## Instalacion

1. Copia el contenido de esta carpeta en la raiz de tu proyecto (incluida la carpeta oculta `.opencode/`).
2. Abre `docs/constitucion.md` y ajustalo a tus estandares (lenguaje, linter, framework de pruebas).
3. Abre `AGENTS.md` y completa los comandos de verificacion (pruebas, lint, build).
4. Abre opencode en la carpeta del proyecto.

> Los comandos del harness son lo que hace que el agente pueda autocorregirse.
> Si no estan, el framework no tiene frenos.

## Flujo de trabajo

Cada funcionalidad vive en `specs/<nombre-funcionalidad>/`.

| Paso | Comando | Agente | Produce |
|------|---------|--------|---------|
| 1 | `/requerimientos <idea>` | analista | `requerimientos.md` |
| 2 | `/arquitectura <nombre>` | arquitecto | `arquitectura.md` |
| 3 | `/planificar <nombre>` | arquitecto | `plan-tareas.md` y `plan-pruebas.md` |
| 4a | `/pruebas <nombre>` | disenador-pruebas | Pruebas de aceptacion (rojo) |
| 4b | `/implementar <nombre> [T-xx]` | desarrollador | Codigo + tareas `[x]` |
| 5 | `/probar <nombre>` | verificador | `reporte-pruebas.md` |
| - | `/estado` | (actual) | Resumen y siguiente paso |

**Regla de oro:** no avances de fase sin revisar y aprobar el documento anterior.
El documento es la fuente de verdad; el codigo es el resultado.

## Agentes y modelos

Todos usan el catalogo `opencode-go/`. Cambialos en el frontmatter de cada `.opencode/agents/*.md`.

| Agente | Modo | Modelo | Permisos clave |
|--------|------|--------|----------------|
| `orquestador` | primary | `opencode-go/deepseek-v4-pro` | `edit: deny`, `bash: deny`, `task` controlado |
| `analista` | subagent | `opencode-go/kimi-k3` | escribe solo en `specs/**`, sin bash |
| `arquitecto` | subagent | `opencode-go/glm-5.3` | escribe solo en `specs/**`, sin bash |
| `disenador-pruebas` | subagent | `opencode-go/deepseek-v4-pro` | escribe en `specs/**` y rutas de test; bash `ask` |
| `desarrollador` | subagent | `opencode-go/kimi-k2.7-code` | `edit: allow`, `bash: allow` |
| `verificador` | subagent | `opencode-go/grok-4.7` | escribe solo en `specs/**`; bash `allow` |

Por que estos modelos:
- **Barato/rapido** no aplica aqui porque el usuario eligio solo `opencode-go/`; aun asi hay variedad.
- **Independencia**: el verificador usa un modelo de otra familia (`grok`) que el desarrollador (`kimi`),
  para no heredar los mismos sesgos.
- El disenador de pruebas usa un modelo distinto al desarrollador para escribir desde la spec, no desde el codigo.

## Dos formas de trabajar

1. **Paso a paso (recomendado al empezar):** ejecuta los comandos `/requerimientos`, `/arquitectura`, etc.
   Tu controlas cada aprobacion.
2. **Orquestado:** cambia al agente `orquestador` (Tab) y pidele recorrer el ciclo completo.
   El delega en los subagentes y se detiene en cada aprobacion.

## Guardarrailes (permisos)

- `analista`, `arquitecto` y `verificador` **solo pueden escribir dentro de `specs/`**: no tocan codigo de produccion.
- `verificador` no corrige: reporta. La correccion vuelve a `desarrollador`.
- `orquestador` no edita ni ejecuta: solo delega.
- Los patrones de permiso se evaluan en orden y **gana la ultima regla que coincide**;
  por eso `"*": deny` va primero y los `allow` despues.

## Estructura

```
AGENTS.md                 Reglas generales que opencode lee siempre
opencode.json             Config global (modelo por defecto)
docs/constitucion.md      Tus estandares no negociables
plantillas/               Formatos de cada documento
.opencode/agents/         Subagentes especializados
.opencode/commands/       Comandos de cada fase
specs/                    Especificaciones por funcionalidad
```

## Como mejorarlo

Cada vez que un agente cometa un error repetido, agrega una regla en `docs/constitucion.md`
o ajusta la plantilla, el comando o el permiso correspondiente. El framework mejora con cada proyecto.

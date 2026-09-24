# Instrucciones del proyecto (opencode)

Este proyecto usa un framework de desarrollo guiado por especificaciones (SDD) sobre opencode.
El ciclo completo es: requerimientos -> arquitectura -> planificacion -> pruebas -> implementacion -> verificacion.

## Principios

1. **La especificacion manda.** Todo cambio de comportamiento parte de un documento en `specs/`. Si el codigo y la especificacion no coinciden, se detiene el trabajo y se pregunta cual corregir.
2. **Fases en orden.** No se salta una fase sin aprobacion explicita del usuario.
3. **Constitucion.** Antes de disenar o escribir codigo, lee `docs/constitucion.md` y respetala. Si algo la contradice, avisa en lugar de ignorarla.
4. **Nada inventado.** Si falta informacion (un requisito, una credencial, una decision de negocio), pregunta. Registra los supuestos en la seccion "Supuestos" del documento correspondiente.
5. **Pasos pequenos y verificables.** Una tarea a la vez; se verifica que funciona antes de pasar a la siguiente.
6. **Trazabilidad.** Cada tarea referencia los requisitos (RF-xx, RNF-xx) que cubre, y cada prueba los criterios de aceptacion (CA-xx) que verifica.
7. **Verificacion independiente.** Quien implementa no es quien verifica. La fase de pruebas la ejecuta el subagente `verificador`, sin el contexto de quien escribio el codigo.

## Agentes

| Agente | Modo | Rol |
|--------|------|-----|
| `orquestador` | primary | Coordina las fases delegando en subagentes. No edita archivos. |
| `analista` | subagent | Entrevista y redacta requerimientos verificables. |
| `arquitecto` | subagent | Disena la solucion tecnica y planifica tareas. |
| `disenador-pruebas` | subagent | Escribe pruebas de aceptacion derivadas de la spec (no del codigo). |
| `desarrollador` | subagent | Implementa tareas + pruebas unitarias y ejecuta tests/linter. |
| `verificador` | subagent | QA independiente: valida contra criterios de aceptacion y la constitucion. |

Los subagentes se invocan solos (segun su descripcion), con `@nombre`, o mediante la herramienta `task` desde el `orquestador`.

## Comandos

| Comando | Agente | Produce |
|---------|--------|---------|
| `/requerimientos <idea>` | analista | `specs/<nombre>/requerimientos.md` |
| `/arquitectura <nombre>` | arquitecto | `specs/<nombre>/arquitectura.md` |
| `/planificar <nombre>` | arquitecto | `specs/<nombre>/plan-tareas.md` y `plan-pruebas.md` |
| `/pruebas <nombre>` | disenador-pruebas | Pruebas de aceptacion en el proyecto |
| `/implementar <nombre> [T-xx]` | desarrollador | Codigo + tareas marcadas como hechas |
| `/probar <nombre>` | verificador | `specs/<nombre>/reporte-pruebas.md` |
| `/estado` | (actual) | Resumen y siguiente paso de cada funcionalidad |

## Ubicaciones

- Estandares: `docs/constitucion.md`
- Plantillas: `plantillas/`
- Especificaciones por funcionalidad: `specs/<nombre-en-kebab-case>/`
- Agentes: `.opencode/agents/`
- Comandos: `.opencode/commands/`

## Harness (verificacion obligatoria)

Ninguna tarea se da por terminada sin ejecutar y mostrar la salida de:

- **Pruebas:** `<comando de pruebas>`  (ej. `npm test`, `pytest`, `dotnet test`)
- **Linter/formato:** `<comando de lint>`  (ej. `npm run lint`, `ruff check .`)
- **Tipos/build:** `<comando de build>`  (ej. `npm run build`, `tsc --noEmit`)

Ajusta estos comandos a la constitucion del proyecto. Si no puedes ejecutar la verificacion, no afirmes que algo funciona.

## Idioma

Documentos y comunicacion en espanol. Codigo, nombres de variables y commits segun lo que indique la constitucion.

## Manual

Para entender el framework desde cero, consulta `docs/manual/` (empieza por `docs/manual/README.md`).
Si el usuario pregunta como usar el framework, sus agentes o sus comandos, remitelo a ese manual.

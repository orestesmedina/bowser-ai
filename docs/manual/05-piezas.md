# 05. Las piezas del framework

Aquí tienes una ficha de **cada cosa** que trae el framework: qué es, para qué sirve y cuándo se usa.
Es el capítulo de consulta. No hace falta leerlo entero de una vez.

---

## Parte A. Carpetas y archivos

### `AGENTS.md`
- **Qué es:** las reglas generales del proyecto. opencode lo lee siempre, en cada conversación.
- **Para qué sirve:** recordar a todos los agentes los principios del método, quién es quién, las reglas
  de aprobación y cómo verificar (harness).
- **Cuándo se usa:** automáticamente, siempre.
- **Tú lo editas:** opcional; casi todo viene escrito.

### `.sdd/`
- **Qué es:** el harness: los scripts que comprueban el trabajo de los agentes.
- **Contiene:** `config.json` (tus comandos de pruebas, lint y build), `verificar.mjs` (lo ejecuta todo),
  `trazabilidad.mjs` (requisito -> tarea -> prueba y registros de aprobación) y `hooks/pre-commit`.
- **Cuándo se usa:** los agentes antes de dar algo por terminado, el hook en cada commit y el CI en cada push.
- **Tú lo editas:** sí, es obligatorio rellenar `config.json`. Los agentes no pueden modificar esta carpeta.

### `opencode.json`
- **Qué es:** la configuración general de opencode para este proyecto.
- **Para qué sirve:** definir el modelo por defecto y otras opciones globales.
- **Tú lo editas:** opcional.

### `docs/`
- **Qué es:** la documentación del proyecto.
- **Contiene:** `constitucion.md` (tus reglas) y esta carpeta `manual/` (lo que estás leyendo).
- **Tú lo editas:** sí, sobre todo `constitucion.md`.

### `plantillas/`
- **Qué es:** los formatos vacíos de cada documento de fase.
- **Para qué sirve:** que todos los documentos tengan la misma estructura.
- **Tú lo editas:** normalmente no; puedes ajustarlas si quieres campos distintos.

### `specs/`
- **Qué es:** donde viven las especificaciones, una carpeta por funcionalidad.
- **Para qué sirve:** guardar todo el rastro de cada funcionalidad: requisitos, arquitectura, plan, pruebas.
- **Tú lo editas:** no directamente; lo escriben los agentes. Tú lo **revisas y apruebas**.
- **Ejemplo:** `specs/registro-gastos/` contiene `requerimientos.md`, `arquitectura.md`,
  `plan-tareas.md`, `plan-pruebas.md` y `reporte-pruebas.md`.

### `.opencode/agents/`
- **Qué es:** las definiciones de los agentes (archivos `.md`).
- **Para qué sirve:** decir qué rol, modelo y permisos tiene cada agente.
- **Tú lo editas:** sí, si quieres cambiar modelos o permisos, o añadir agentes.

### `.opencode/commands/`
- **Qué es:** las definiciones de los comandos `/...`.
- **Para qué sirve:** cada archivo es un comando que lanza una fase: elige el agente y carga la skill de esa fase.
- **Tú lo editas:** sí, si quieres cambiar qué hace un comando o añadir uno nuevo.

### `.agents/skills/`
- **Qué es:** el procedimiento paso a paso de cada fase (`sdd-requerimientos`, `sdd-cambio`...), en el
  formato estándar [Agent Skills](https://agentskills.io).
- **Para qué sirve:** separar *qué hacer* (la skill) de *quién lo hace y con qué permisos* (el agente de opencode).
  Así el procedimiento se puede usar también en otras herramientas compatibles con Agent Skills.
- **Tú lo editas:** sí, si quieres cambiar cómo se hace una fase. Los agentes no pueden modificarlas.

---

## Parte B. Los 6 agentes

### `orquestador` (principal)
- **Qué es:** el coordinador. El único que hablas directamente además de los de serie.
- **Para qué sirve:** recorrer las fases delegando el trabajo en los demás.
- **Cuándo se usa:** cuando quieres el ciclo completo sin ir comando a comando.
- **Permisos:** no puede editar archivos ni ejecutar comandos; solo delegar.
- **Modelo:** `opencode-go/deepseek-v4-pro`.
- **Cómo se invoca:** cambia de agente con la tecla **Tab** hasta llegar a `orquestador`.

### `analista` (subagente)
- **Qué es:** el entrevistador.
- **Para qué sirve:** convertir una idea vaga en requisitos claros y verificables.
- **Cuándo se usa:** al inicio de cada funcionalidad, con `/requerimientos`.
- **Permisos:** solo puede escribir dentro de `specs/`; no ejecuta comandos.
- **Modelo:** `opencode-go/kimi-k3`.
- **Dato:** te hará entre 5 y 10 preguntas antes de escribir nada. Por eso trabaja en la conversación
  principal y no en una sesión hija.

### `arquitecto` (subagente)
- **Qué es:** el diseñador técnico y planificador.
- **Para qué sirve:** proponer la solución técnica (`/arquitectura`) y dividir el trabajo en tareas
  y pruebas (`/planificar`).
- **Cuándo se usa:** después de aprobar los requisitos.
- **Permisos:** solo escribe en `specs/`; no ejecuta comandos.
- **Modelo:** `opencode-go/glm-5.3`.

### `disenador-pruebas` (subagente)
- **Qué es:** el que escribe las pruebas de aceptación.
- **Para qué sirve:** convertir los criterios de aceptación de la spec en pruebas ejecutables,
  **antes** de que exista el código.
- **Cuándo se usa:** con `/pruebas`, después de planificar.
- **Permisos:** solo escribe en `tests/aceptacion/`; ejecuta las pruebas sin preguntar y pide permiso para otros comandos.
- **Modelo:** `opencode-go/deepseek-v4-pro`.
- **Por qué separado:** para que las pruebas se deriven de la spec, no del código del programador.

### `desarrollador` (subagente)
- **Qué es:** el programador.
- **Para qué sirve:** implementar las tareas del plan, una por una, escribiendo pruebas unitarias
  y ejecutando las pruebas y el linter hasta que pasen.
- **Cuándo se usa:** con `/implementar`.
- **Permisos:** puede editar el código y ejecutar pruebas, lint y build sin preguntar (necesita autocorregirse).
  No puede tocar las specs (salvo marcar tareas `[x]`), las pruebas de aceptación, la constitución ni la
  configuración. Otros comandos piden permiso; `git commit` y `git push` están prohibidos.
- **Dato:** trabaja en la conversación principal, porque te pregunta después de cada tarea.
- **Modelo:** `opencode-go/kimi-k2.7-code`.

### `verificador` (subagente)
- **Qué es:** el inspector de calidad, independiente.
- **Para qué sirve:** comprobar la funcionalidad terminada contra los criterios de aceptación y la
  constitución, y escribir un reporte con evidencia real.
- **Cuándo se usa:** con `/probar`, al final.
- **Permisos:** solo escribe su reporte, tareas nuevas en `plan-tareas.md` y pruebas extra en
  `tests/verificacion/`; no corrige código de producción ni las pruebas de aceptación.
- **Modelo:** `opencode-go/grok-4.7`.
- **Por qué otro modelo:** para no heredar los sesgos de quien programó.

---

## Parte C. Los 10 comandos

| Comando | Lo ejecuta | Qué produce | Cuándo usarlo |
|---------|-----------|-------------|---------------|
| `/requerimientos <idea>` | `analista` | `specs/<nombre>/requerimientos.md` | Al empezar una funcionalidad |
| `/arquitectura <nombre>` | `arquitecto` | `specs/<nombre>/arquitectura.md` | Tras aprobar requisitos |
| `/planificar <nombre>` | `arquitecto` | `plan-tareas.md` y `plan-pruebas.md` | Tras aprobar arquitectura |
| `/pruebas <nombre>` | `disenador-pruebas` | Pruebas de aceptación (en rojo) | Tras aprobar el plan |
| `/implementar <nombre> [T-xx]` | `desarrollador` | Código + tareas marcadas `[x]` | Tras escribir las pruebas |
| `/probar <nombre>` | `verificador` | `specs/<nombre>/reporte-pruebas.md` | Cuando todo esté implementado |
| `/cambio <nombre> <descripción>` | `analista` | Propuesta en `specs/<nombre>/cambios/` y requisitos actualizados | Para cambiar lo que hace una funcionalidad ya especificada |
| `/arreglar <descripción>` | `desarrollador` | Prueba de regresión + corrección + registro en `defectos.md` | Cuando el código no cumple un criterio que ya existe |
| `/mapear [alcance]` | `arquitecto` | `docs/sistema.md` | Al adoptar el framework en un proyecto que ya tiene código |
| `/estado` | (el agente actual) | Tabla resumen | En cualquier momento |

> **¿Defecto o cambio?** Si lo que esperas ya está escrito en un criterio de aceptación, es un defecto:
> `/arreglar`. Si no está escrito, o hay que cambiar un criterio, es un cambio: `/cambio`.

> `<nombre>` es el nombre de la funcionalidad en kebab-case, por ejemplo `registro-gastos`.
> `<idea>` es una frase libre, por ejemplo "quiero registrar los gastos de mi restaurante".

---

## Parte D. Las 8 plantillas

Viven en `plantillas/` y los agentes las usan como formato.

### `requerimientos.md`
El documento inicial. Define contexto, objetivos, usuarios, requisitos (RF/RNF), criterios de
aceptación (CA), fuera de alcance y supuestos.

### `arquitectura.md`
El diseño técnico. Componentes, modelo de datos, interfaces/API, decisiones (ADR), seguridad,
dependencias y riesgos.

### `plan-tareas.md`
La lista de tareas pequeñas y ordenadas, cada una con los requisitos que cubre y como verificarla.
Incluye una **matriz de trazabilidad** (requisito -> tareas -> pruebas).

### `plan-pruebas.md`
Los casos de prueba: uno por cada criterio de aceptación, más casos límite y de error.

### `reporte-pruebas.md`
El veredicto del verificador: qué pasó, qué falló, qué defectos hay y con qué evidencia.

### `cambio.md`
Una propuesta de cambio a una funcionalidad ya especificada: motivo, requisitos añadidos, modificados
y eliminados (el "delta"), e impacto en arquitectura, datos y pruebas. Vive en `specs/<nombre>/cambios/`.

### `defectos.md`
El registro de defectos corregidos con `/arreglar`: qué criterio se incumplía, la causa y la prueba de regresión.

### `sistema.md`
El mapa de un proyecto que ya existía antes del framework: stack, estructura, datos, integraciones,
cómo se prueba y riesgos. Lo genera `/mapear` en `docs/sistema.md`.

---

## Parte E. Cómo se conectan

```
Tu idea
   |
   v
/requerimientos  ->  analista      ->  requerimientos.md
   |
   v
/arquitectura    ->  arquitecto    ->  arquitectura.md
   |
   v
/planificar      ->  arquitecto    ->  plan-tareas.md + plan-pruebas.md
   |
   v
/pruebas         ->  disenador-pruebas  ->  pruebas (rojo)
   |
   v
/implementar     ->  desarrollador ->  código + tareas [x]
   |
   v
/probar          ->  verificador   ->  reporte-pruebas.md
   |
   v
   Si hay defectos -> vuelve a /implementar
   Si está aprobado -> commit
```

Todo esto también lo puede conducir el `orquestador` de una sola vez, deteniéndose en cada aprobación.

---

**En una frase:** seis agentes especializados, diez comandos, ocho plantillas y unas carpetas fijas; cada pieza tiene un único trabajo.

**Siguiente paso:** [06-tutorial.md](06-tutorial.md) para verlo funcionar con un ejemplo real.

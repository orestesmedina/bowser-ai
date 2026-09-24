# 05. Las piezas del framework

Aqui tienes una ficha de **cada cosa** que trae el framework: que es, para que sirve y cuando se usa.
Es el capitulo de consulta. No hace falta leerlo entero de una vez.

---

## Parte A. Carpetas y archivos

### `AGENTS.md`
- **Que es:** las reglas generales del proyecto. opencode lo lee siempre, en cada conversacion.
- **Para que sirve:** recordar a todos los agentes los principios del metodo, quien es quien, y
  los comandos de verificacion (harness).
- **Cuando se usa:** automaticamente, siempre.
- **Tu lo editas:** si. Es obligatorio rellenar la seccion **Harness**.

### `opencode.json`
- **Que es:** la configuracion general de opencode para este proyecto.
- **Para que sirve:** definir el modelo por defecto y otras opciones globales.
- **Tu lo editas:** opcional.

### `docs/`
- **Que es:** la documentacion del proyecto.
- **Contiene:** `constitucion.md` (tus reglas) y esta carpeta `manual/` (lo que estas leyendo).
- **Tu lo editas:** si, sobre todo `constitucion.md`.

### `plantillas/`
- **Que es:** los formatos vacios de cada documento de fase.
- **Para que sirve:** que todos los documentos tengan la misma estructura.
- **Tu lo editas:** normalmente no; puedes ajustarlas si quieres campos distintos.

### `specs/`
- **Que es:** donde viven las especificaciones, una carpeta por funcionalidad.
- **Para que sirve:** guardar todo el rastro de cada funcionalidad: requisitos, arquitectura, plan, pruebas.
- **Tu lo editas:** no directamente; lo escriben los agentes. Tu lo **revisas y apruebas**.
- **Ejemplo:** `specs/registro-gastos/` contiene `requerimientos.md`, `arquitectura.md`,
  `plan-tareas.md`, `plan-pruebas.md` y `reporte-pruebas.md`.

### `.opencode/agents/`
- **Que es:** las definiciones de los agentes (archivos `.md`).
- **Para que sirve:** decir que rol, modelo y permisos tiene cada agente.
- **Tu lo editas:** si quieres cambiar modelos o permisos, o anadir agentes.

### `.opencode/commands/`
- **Que es:** las definiciones de los comandos `/...`.
- **Para que sirve:** cada archivo es un comando que lanza una fase.
- **Tu lo editas:** si quieres cambiar que hace un comando o anadir uno nuevo.

---

## Parte B. Los 6 agentes

### `orquestador` (principal)
- **Que es:** el coordinador. El unico que hablas directamente ademas de los de serie.
- **Para que sirve:** recorrer las fases delegando el trabajo en los demas.
- **Cuando se usa:** cuando quieres el ciclo completo sin ir comando a comando.
- **Permisos:** no puede editar archivos ni ejecutar comandos; solo delegar.
- **Modelo:** `opencode-go/deepseek-v4-pro`.
- **Como se invoca:** cambia de agente con la tecla **Tab** hasta llegar a `orquestador`.

### `analista` (subagente)
- **Que es:** el entrevistador.
- **Para que sirve:** convertir una idea vaga en requisitos claros y verificables.
- **Cuando se usa:** al inicio de cada funcionalidad, con `/requerimientos`.
- **Permisos:** solo puede escribir dentro de `specs/`; no ejecuta comandos.
- **Modelo:** `opencode-go/kimi-k3`.
- **Dato:** te hara entre 5 y 10 preguntas antes de escribir nada.

### `arquitecto` (subagente)
- **Que es:** el disenador tecnico y planificador.
- **Para que sirve:** proponer la solucion tecnica (`/arquitectura`) y dividir el trabajo en tareas
  y pruebas (`/planificar`).
- **Cuando se usa:** despues de aprobar los requisitos.
- **Permisos:** solo escribe en `specs/`; no ejecuta comandos.
- **Modelo:** `opencode-go/glm-5.3`.

### `disenador-pruebas` (subagente)
- **Que es:** el que escribe las pruebas de aceptacion.
- **Para que sirve:** convertir los criterios de aceptacion de la spec en pruebas ejecutables,
  **antes** de que exista el codigo.
- **Cuando se usa:** con `/pruebas`, despues de planificar.
- **Permisos:** escribe en `specs/` y en las rutas de test; puede pedir ejecutar comandos.
- **Modelo:** `opencode-go/deepseek-v4-pro`.
- **Por que separado:** para que las pruebas se deriven de la spec, no del codigo del programador.

### `desarrollador` (subagente)
- **Que es:** el programador.
- **Para que sirve:** implementar las tareas del plan, una por una, escribiendo pruebas unitarias
  y ejecutando las pruebas y el linter hasta que pasen.
- **Cuando se usa:** con `/implementar`.
- **Permisos:** puede editar archivos y ejecutar comandos (necesita autocorregirse).
- **Modelo:** `opencode-go/kimi-k2.7-code`.

### `verificador` (subagente)
- **Que es:** el inspector de calidad, independiente.
- **Para que sirve:** comprobar la funcionalidad terminada contra los criterios de aceptacion y la
  constitucion, y escribir un reporte con evidencia real.
- **Cuando se usa:** con `/probar`, al final.
- **Permisos:** solo escribe en `specs/`; no corrige codigo de produccion.
- **Modelo:** `opencode-go/grok-4.7`.
- **Por que otro modelo:** para no heredar los sesgos de quien programo.

---

## Parte C. Los 7 comandos

| Comando | Lo ejecuta | Que produce | Cuando usarlo |
|---------|-----------|-------------|---------------|
| `/requerimientos <idea>` | `analista` | `specs/<nombre>/requerimientos.md` | Al empezar una funcionalidad |
| `/arquitectura <nombre>` | `arquitecto` | `specs/<nombre>/arquitectura.md` | Tras aprobar requisitos |
| `/planificar <nombre>` | `arquitecto` | `plan-tareas.md` y `plan-pruebas.md` | Tras aprobar arquitectura |
| `/pruebas <nombre>` | `disenador-pruebas` | Pruebas de aceptacion (en rojo) | Tras aprobar el plan |
| `/implementar <nombre> [T-xx]` | `desarrollador` | Codigo + tareas marcadas `[x]` | Tras escribir las pruebas |
| `/probar <nombre>` | `verificador` | `specs/<nombre>/reporte-pruebas.md` | Cuando todo este implementado |
| `/estado` | (el agente actual) | Tabla resumen | En cualquier momento |

> `<nombre>` es el nombre de la funcionalidad en kebab-case, por ejemplo `registro-gastos`.
> `<idea>` es una frase libre, por ejemplo "quiero registrar los gastos de mi restaurante".

---

## Parte D. Las 5 plantillas

Viven en `plantillas/` y los agentes las usan como formato.

### `requerimientos.md`
El documento inicial. Define contexto, objetivos, usuarios, requisitos (RF/RNF), criterios de
aceptacion (CA), fuera de alcance y supuestos.

### `arquitectura.md`
El diseno tecnico. Componentes, modelo de datos, interfaces/API, decisiones (ADR), seguridad,
dependencias y riesgos.

### `plan-tareas.md`
La lista de tareas pequenas y ordenadas, cada una con los requisitos que cubre y como verificarla.
Incluye una **matriz de trazabilidad** (requisito -> tareas -> pruebas).

### `plan-pruebas.md`
Los casos de prueba: uno por cada criterio de aceptacion, mas casos limite y de error.

### `reporte-pruebas.md`
El veredicto del verificador: que paso, que fallo, que defectos hay y con que evidencia.

---

## Parte E. Como se conectan

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
/implementar     ->  desarrollador ->  codigo + tareas [x]
   |
   v
/probar          ->  verificador   ->  reporte-pruebas.md
   |
   v
   Si hay defectos -> vuelve a /implementar
   Si esta aprobado -> commit
```

Todo esto tambien lo puede conducir el `orquestador` de una sola vez, deteniendose en cada aprobacion.

---

**En una frase:** seis agentes especializados, siete comandos de fase, cinco plantillas y unas carpetas fijas; cada pieza tiene un unico trabajo.

**Siguiente paso:** [06-tutorial.md](06-tutorial.md) para verlo funcionar con un ejemplo real.

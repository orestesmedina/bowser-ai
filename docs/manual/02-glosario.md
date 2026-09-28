# 02. Glosario

Vocabulario que aparece en el manual y en el framework. No hace falta memorizarlo:
vuelve aquí cuando te pierdas.

---

### Agente
Un asistente de IA con un rol concreto. Por ejemplo, el `analista` solo hace preguntas y escribe
requisitos; el `desarrollador` solo escribe código. Cada agente tiene su propio modelo y permisos.

### Subagente
Un agente que no hablas directamente, sino que lo lanza otro agente (o un comando). Trabaja en
paralelo y devuelve un resultado. La mayoría de los agentes de este framework son subagentes.

### Orquestador
El agente principal que coordina a los demás. No escribe código: reparte el trabajo entre los
subagentes y controla que se respeten las fases.

### Especificación (spec)
El documento que describe que se quiere construir, antes de construir nada. Vive en `specs/`.
Es "la fuente de verdad".

### Requerimiento (RF / RNF)
Un "que debe hacer el sistema". `RF` es funcional (una acción: "registrar un gasto").
`RNF` es no funcional (una cualidad: "debe ser rápido", "debe proteger los datos").

### Criterio de aceptación (CA)
Una frase verificable que dice como saber si un requerimiento se cumplió.
Formato: "CUANDO pasa X, EL SISTEMA DEBE hacer Y". Es lo que usan las pruebas.

### Spec-Driven Development (SDD)
Método de trabajo en el que la especificación manda y el código la sigue. Es la idea central del framework.

### Harness (arnés)
El conjunto de cosas que permiten a los agentes **comprobar** su trabajo: los comandos de pruebas,
linter y build, más los permisos. Sin harness, el agente dice "listo" sin poder demostrarlo.

### Comando
Una orden que escribes con `/` para lanzar una fase. Por ejemplo `/requerimientos`. Cada comando
está asociado a un agente.

### Modelo
El "cerebro" de IA que usa un agente (por ejemplo `opencode-go/kimi-k2.7-code`). Distintos agentes
pueden usar distintos modelos: uno barato para tareas simples, uno potente para razonar.

### Permiso
Una regla que dice que puede y que no puede hacer un agente. Valores:
- `allow` = puede hacerlo sin preguntar.
- `ask` = te pide permiso cada vez.
- `deny` = no puede hacerlo.

### Contexto
Todo lo que el agente "tiene en la cabeza" en una conversación: tus mensajes, los archivos que leyó,
los resultados de comandos. Si crece demasiado, se resume (se "compacta").

### Token
La unidad con la que se mide el texto que procesa un modelo. Más tokens = más coste. No necesitas
contarlos, solo saber que existen.

### Sesión
Una conversación con opencode. Los subagentes crean "sesiones hijas" que puedes visitar.

### kebab-case
Forma de nombrar usando minúsculas y guiones: `registro-gastos`. Se usa para las carpetas de funcionalidades.

### Fase
Cada etapa del flujo: requerimientos, arquitectura, planificación, pruebas, implementación, verificación.

### Trazabilidad
Poder seguir el rastro: que requisito cubre cada tarea, y que prueba verifica cada criterio.
Evita que algo se quede "en el aire".

### Plantilla
Un formato vacío que se copia para crear un documento. Viven en `plantillas/`.

### ADR
"Architecture Decision Record": una nota corta que explica una decisión de diseño importante
(qué se decidió, qué alternativas había y por qué).

---

**En una frase:** este glosario traduce el vocabulario técnico del framework a palabras simples.

**Siguiente paso:** [03-antes-de-empezar.md](03-antes-de-empezar.md) para preparar tu proyecto.

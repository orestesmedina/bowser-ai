# 02. Glosario

Vocabulario que aparece en el manual y en el framework. No hace falta memorizarlo:
vuelve aqui cuando te pierdas.

---

### Agente
Un asistente de IA con un rol concreto. Por ejemplo, el `analista` solo hace preguntas y escribe
requisitos; el `desarrollador` solo escribe codigo. Cada agente tiene su propio modelo y permisos.

### Subagente
Un agente que no hablas directamente, sino que lo lanza otro agente (o un comando). Trabaja en
paralelo y devuelve un resultado. La mayoria de los agentes de este framework son subagentes.

### Orquestador
El agente principal que coordina a los demas. No escribe codigo: reparte el trabajo entre los
subagentes y controla que se respeten las fases.

### Especificacion (spec)
El documento que describe que se quiere construir, antes de construir nada. Vive en `specs/`.
Es "la fuente de verdad".

### Requerimiento (RF / RNF)
Un "que debe hacer el sistema". `RF` es funcional (una accion: "registrar un gasto").
`RNF` es no funcional (una cualidad: "debe ser rapido", "debe proteger los datos").

### Criterio de aceptacion (CA)
Una frase verificable que dice como saber si un requerimiento se cumplio.
Formato: "CUANDO pasa X, EL SISTEMA DEBE hacer Y". Es lo que usan las pruebas.

### Spec-Driven Development (SDD)
Metodo de trabajo en el que la especificacion manda y el codigo la sigue. Es la idea central del framework.

### Harness (arnes)
El conjunto de cosas que permiten a los agentes **comprobar** su trabajo: los comandos de pruebas,
linter y build, mas los permisos. Sin harness, el agente dice "listo" sin poder demostrarlo.

### Comando
Una orden que escribes con `/` para lanzar una fase. Por ejemplo `/requerimientos`. Cada comando
esta asociado a un agente.

### Modelo
El "cerebro" de IA que usa un agente (por ejemplo `opencode-go/kimi-k2.7-code`). Distintos agentes
pueden usar distintos modelos: uno barato para tareas simples, uno potente para razonar.

### Permiso
Una regla que dice que puede y que no puede hacer un agente. Valores:
- `allow` = puede hacerlo sin preguntar.
- `ask` = te pide permiso cada vez.
- `deny` = no puede hacerlo.

### Contexto
Todo lo que el agente "tiene en la cabeza" en una conversacion: tus mensajes, los archivos que leyo,
los resultados de comandos. Si crece demasiado, se resume (se "compacta").

### Token
La unidad con la que se mide el texto que procesa un modelo. Mas tokens = mas coste. No necesitas
contarlos, solo saber que existen.

### Sesion
Una conversacion con opencode. Los subagentes crean "sesiones hijas" que puedes visitar.

### kebab-case
Forma de nombrar usando minusculas y guiones: `registro-gastos`. Se usa para las carpetas de funcionalidades.

### Fase
Cada etapa del flujo: requerimientos, arquitectura, planificacion, pruebas, implementacion, verificacion.

### Trazabilidad
Poder seguir el rastro: que requisito cubre cada tarea, y que prueba verifica cada criterio.
Evita que algo se quede "en el aire".

### Plantilla
Un formato vacio que se copia para crear un documento. Viven en `plantillas/`.

### ADR
"Architecture Decision Record": una nota corta que explica una decision de diseno importante
(que se decidio, que alternativas habia y por que).

---

**En una frase:** este glosario traduce el vocabulario tecnico del framework a palabras simples.

**Siguiente paso:** [03-antes-de-empezar.md](03-antes-de-empezar.md) para preparar tu proyecto.

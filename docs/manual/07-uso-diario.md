# 07. Uso diario

Este capítulo asume que ya hiciste el tutorial. Aquí van las cosas que usarás a menudo.

---

## Ver el estado del proyecto

```
/estado
```

Recorre `specs/` y te muestra, por cada funcionalidad, en qué fase está y cuál es el siguiente
comando a ejecutar. Es lo primero que deberías hacer al retomar el trabajo.

---

## ¿Qué comando uso?

| Situación | Comando |
|-----------|---------|
| Quiero algo que el sistema todavía no hace | `/requerimientos <idea>` (flujo completo) |
| Quiero que una funcionalidad existente haga algo distinto | `/cambio <nombre> <descripción>` |
| Algo no funciona como dice la especificación | `/arreglar <descripción>` |
| Empiezo a usar el framework en un proyecto que ya tiene código | `/mapear` |

**¿Defecto o cambio?** Abre `specs/<nombre>/requerimientos.md` y busca el criterio de aceptación.
Si lo que esperas ya está escrito ahí y el sistema no lo cumple, es un defecto: `/arreglar`.
Si no está escrito, o lo que quieres contradice un criterio, es un cambio: `/cambio`.
El desarrollador te lo preguntará igualmente antes de tocar código.

### Ejemplo de cambio

```
/cambio registro-gastos quiero poder adjuntar la foto del recibo a cada gasto
```

El `analista` te entrevista, escribe `specs/registro-gastos/cambios/C-01-foto-recibo.md` con lo que
se añade, modifica o elimina y, cuando lo apruebas, actualiza `requerimientos.md` (versión 2). Después
sigues con `/planificar`, `/pruebas`, `/implementar` y `/probar`, que actualizan lo existente en vez de
empezar de cero.

### Ejemplo de defecto

```
/arreglar al registrar un gasto con monto 0 lo guarda, pero CA-02 dice que debe rechazarlo
```

El `desarrollador` confirma que es un defecto, escribe una prueba de regresión que falla, corrige el
código, comprueba que todo pasa y lo anota en `specs/registro-gastos/defectos.md`.

---

## Dos formas de trabajar

### Paso a paso (recomendado al empezar)

Tú lanzas cada comando cuando quieres y apruebas cada documento:

```
/requerimientos ...
/arquitectura <nombre>
/planificar <nombre>
/pruebas <nombre>
/implementar <nombre>
/probar <nombre>
```

Ventaja: control total, entiendes cada fase. Ideal para aprender y para trabajo delicado.

### Orquestado (cuando ya le tienes la mano)

Cambia de agente con la tecla **Tab** hasta llegar a `orquestador`, y pídele el ciclo completo:

```
Quiero una funcionalidad para exportar los gastos a CSV. Lleva el ciclo completo.
```

El orquestador delegará en los subagentes y se detendrá en cada aprobación. Ventaja: menos tecleo.
Desventaja: menos control fino; si algo se desvía, es más difícil ver donde.

> Regla práctica: empieza paso a paso. Cuando te sientas cómodo, prueba el orquestador.

---

## Invocar un agente directamente

Puedes llamar a cualquier subagente con `@` en tu mensaje:

```
@analista ayúdame a aclarar los requisitos de una idea nueva
@verificador revisa la funcionalidad registro-gastos
```

Útil cuando quieres una tarea puntual sin recorrer toda la fase.

---

## Navegar entre sesiones

Cuando un subagente trabaja, crea su propia "sesión hija". Puedes entrar y salir:

| Tecla | Qué hace |
|-------|----------|
| `<Leader>+Down` | Entra a la primera sesión hija (la del subagente) |
| `Right` | Pasa a la siguiente sesión hija |
| `Left` | Vuelve a la sesión hija anterior |
| `Up` | Regresa a la sesión principal |

Esto sirve para ver **qué está haciendo** un subagente mientras trabaja, sin perder el hilo principal.

---

## Continuar donde lo dejaste

opencode guarda tus sesiones. Para retomar la última:

```powershell
opencode --continue
```

O desde dentro, usa las opciones de sesiones de la interfaz.

---

## Cuando pedir permiso te interrumpa demasiado

Algunos agentes están configurados para pedir permiso en ciertas acciones (por ejemplo, el
`disenador-pruebas` pide permiso para ejecutar comandos). Si confias en el flujo y quieres menos
interrupciones, puedes cambiar esos permisos. Se explica en [08-personalizar.md](08-personalizar.md).

---

## Hábitos que ahorran problemas

1. **Nunca apruebes sin leer.** El documento es lo que se construirá. Léelo.
2. **Una funcionalidad a la vez.** No mezcles "registro de gastos" con "login" en la misma spec.
3. **Sesiones cortas.** Un objetivo por sesión; si se alarga mucho, empieza otra.
4. **Commits pequeños.** Después de cada tarea o funcionalidad terminada.
5. **Revisa `/estado` al empezar el día.** Te dice exactamente dónde quedaste.

---

## Qué hace bien cada modo

| Situación | Mejor opción |
|-----------|--------------|
| Estoy aprendiendo | Paso a paso |
| Es una funcionalidad delicada | Paso a paso |
| Ya conozco el código y quiero velocidad | Orquestado |
| Quiero repetir una tarea puntual | `@agente` directo |
| No sé dónde quedé ayer | `/estado` |

---

**En una frase:** usa `/estado` para orientarte, trabaja paso a paso al principio, y el orquestador cuando ya domines el flujo.

**Siguiente paso:** [08-personalizar.md](08-personalizar.md) para adaptar el framework a tu gusto.

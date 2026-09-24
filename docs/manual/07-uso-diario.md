# 07. Uso diario

Este capitulo asume que ya hiciste el tutorial. Aqui van las cosas que usaras a menudo.

---

## Ver el estado del proyecto

```
/estado
```

Recorre `specs/` y te muestra, por cada funcionalidad, en que fase esta y cual es el siguiente
comando a ejecutar. Es lo primero que deberias hacer al retomar el trabajo.

---

## Dos formas de trabajar

### Paso a paso (recomendado al empezar)

Tu lanzas cada comando cuando quieres y apruebas cada documento:

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

Cambia de agente con la tecla **Tab** hasta llegar a `orquestador`, y pidele el ciclo completo:

```
Quiero una funcionalidad para exportar los gastos a CSV. Lleva el ciclo completo.
```

El orquestador delegara en los subagentes y se detendra en cada aprobacion. Ventaja: menos tecleo.
Desventaja: menos control fino; si algo se desvia, es mas dificil ver donde.

> Regla practica: empieza paso a paso. Cuando te sientas comodo, prueba el orquestador.

---

## Invocar un agente directamente

Puedes llamar a cualquier subagente con `@` en tu mensaje:

```
@analista ayudame a aclarar los requisitos de una idea nueva
@verificador revisa la funcionalidad registro-gastos
```

Util cuando quieres una tarea puntual sin recorrer toda la fase.

---

## Navegar entre sesiones

Cuando un subagente trabaja, crea su propia "sesion hija". Puedes entrar y salir:

| Tecla | Que hace |
|-------|----------|
| `<Leader>+Down` | Entra a la primera sesion hija (la del subagente) |
| `Right` | Pasa a la siguiente sesion hija |
| `Left` | Vuelve a la sesion hija anterior |
| `Up` | Regresa a la sesion principal |

Esto sirve para ver **que esta haciendo** un subagente mientras trabaja, sin perder el hilo principal.

---

## Continuar donde lo dejaste

opencode guarda tus sesiones. Para retomar la ultima:

```powershell
opencode --continue
```

O desde dentro, usa las opciones de sesiones de la interfaz.

---

## Cuando pedir permiso te interrumpa demasiado

Algunos agentes estan configurados para pedir permiso en ciertas acciones (por ejemplo, el
`disenador-pruebas` pide permiso para ejecutar comandos). Si confias en el flujo y quieres menos
interrupciones, puedes cambiar esos permisos. Se explica en [08-personalizar.md](08-personalizar.md).

---

## Habitos que ahorran problemas

1. **Nunca apruebes sin leer.** El documento es lo que se construira. Leelo.
2. **Una funcionalidad a la vez.** No mezcles "registro de gastos" con "login" en la misma spec.
3. **Sesiones cortas.** Un objetivo por sesion; si se alarga mucho, empieza otra.
4. **Commits pequenos.** Despues de cada tarea o funcionalidad terminada.
5. **Revisa `/estado` al empezar el dia.** Te dice exactamente donde quedaste.

---

## Que hace bien cada modo

| Situacion | Mejor opcion |
|-----------|--------------|
| Estoy aprendiendo | Paso a paso |
| Es una funcionalidad delicada | Paso a paso |
| Ya conozco el codigo y quiero velocidad | Orquestado |
| Quiero repetir una tarea puntual | `@agente` directo |
| No se donde quede ayer | `/estado` |

---

**En una frase:** usa `/estado` para orientarte, trabaja paso a paso al principio, y el orquestador cuando ya domines el flujo.

**Siguiente paso:** [08-personalizar.md](08-personalizar.md) para adaptar el framework a tu gusto.

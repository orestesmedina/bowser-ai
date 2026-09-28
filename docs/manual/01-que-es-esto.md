# 01. Qué es esto y para que sirve

## El problema que resuelve

Cuando le pides a una inteligencia artificial "hazme una aplicación para gastos", pasa algo típico:
empieza a escribir código sin preguntarte nada, inventa cosas que no le dijiste, y al final tienes
un monton de archivos que quizás no hacen lo que querías. Es rápido, pero desordenado y difícil de revisar.

Este framework arregla eso. Obliga a que **primero se acuerde que se quiere**, luego se planifique,
después se construya y al final se compruebe. Todo queda escrito en documentos que puedes leer y corregir.

## La analogía de la obra

Piensa en construir una casa:

| En una obra... | En este framework... |
|----------------|----------------------|
| El cliente explica que quiere | `/requerimientos` |
| El arquitecto dibuja los planos | `/arquitectura` |
| Se hace la lista de tareas y materiales | `/planificar` |
| Los albañiles construyen | `/implementar` |
| El inspector revisa que todo esté bien | `/probar` |

Nadie sensato empieza a poner ladrillos sin planos. Aquí pasa igual: **no se escribe código sin
especificación aprobada**.

## Qué es "SDD"

SDD significa **Spec-Driven Development** (desarrollo guiado por especificaciones). En palabras simples:

> La especificación (el documento que dice que se quiere) es la fuente de verdad.
> El código es solo el resultado de seguir esa especificación.

Si el código y la especificación no coinciden, se para y se pregunta cuál de los dos está mal.

## Qué piezas tiene el framework

El framework tiene tres capas que se complementan:

1. **La especificación (SDD):** los documentos en `specs/` que describen que construir.
2. **El harness (arnés):** el conjunto de permisos y comandos de verificación que hace que los
   agentes puedan comprobar su propio trabajo (pruebas, linter, build).
3. **Los agentes:** los "trabajadores" especializados. Cada uno tiene un rol, un modelo de IA y
   unos permisos. Hay uno que analiza, otro que diseña, otro que programa, otro que verifica.

## Qué NO es este framework

- **No es una aplicación.** Es un conjunto de reglas, plantillas y agentes que pones en tu proyecto.
- **No programa por ti sin supervisión.** Se detiene en cada fase para que apruebes.
- **No es magia.** Si le das requisitos vagos, obtendrás resultados vagos. La calidad de entrada
  importa.
- **No reemplaza tu criterio.** Tú decides, apruebas y corriges. El agente propone y ejecuta.

## Por qué usar agentes distintos

Podría ser un solo agente haciendo todo, pero es peor. Separar roles da tres ventajas:

- **Especialización:** cada agente tiene instrucciones enfocadas en una sola cosa.
- **Independencia:** quien verifica no es quien construyó, así no se "aprueba a sí mismo".
- **Control:** cada agente puede tener permisos distintos. El que solo analiza no puede tocar el código.

---

**En una frase:** es un método (con sus herramientas) para construir software ordenadamente: primero el documento, luego el código, y siempre con verificación.

**Siguiente paso:** [02-glosario.md](02-glosario.md) para aprender el vocabulario que usaremos.

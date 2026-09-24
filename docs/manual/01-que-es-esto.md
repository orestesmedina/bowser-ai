# 01. Que es esto y para que sirve

## El problema que resuelve

Cuando le pides a una inteligencia artificial "hazme una aplicacion para gastos", pasa algo tipico:
empieza a escribir codigo sin preguntarte nada, inventa cosas que no le dijiste, y al final tienes
un monton de archivos que quizas no hacen lo que querias. Es rapido, pero desordenado y dificil de revisar.

Este framework arregla eso. Obliga a que **primero se acuerde que se quiere**, luego se planifique,
despues se construya y al final se compruebe. Todo queda escrito en documentos que puedes leer y corregir.

## La analogia de la obra

Piensa en construir una casa:

| En una obra... | En este framework... |
|----------------|----------------------|
| El cliente explica que quiere | `/requerimientos` |
| El arquitecto dibuja los planos | `/arquitectura` |
| Se hace la lista de tareas y materiales | `/planificar` |
| Los albaniles construyen | `/implementar` |
| El inspector revisa que todo este bien | `/probar` |

Nadie sensato empieza a poner ladrillos sin planos. Aqui pasa igual: **no se escribe codigo sin
especificacion aprobada**.

## Que es "SDD"

SDD significa **Spec-Driven Development** (desarrollo guiado por especificaciones). En palabras simples:

> La especificacion (el documento que dice que se quiere) es la fuente de verdad.
> El codigo es solo el resultado de seguir esa especificacion.

Si el codigo y la especificacion no coinciden, se para y se pregunta cual de los dos esta mal.

## Que piezas tiene el framework

El framework tiene tres capas que se complementan:

1. **La especificacion (SDD):** los documentos en `specs/` que describen que construir.
2. **El harness (arnes):** el conjunto de permisos y comandos de verificacion que hace que los
   agentes puedan comprobar su propio trabajo (pruebas, linter, build).
3. **Los agentes:** los "trabajadores" especializados. Cada uno tiene un rol, un modelo de IA y
   unos permisos. Hay uno que analiza, otro que disena, otro que programa, otro que verifica.

## Que NO es este framework

- **No es una aplicacion.** Es un conjunto de reglas, plantillas y agentes que pones en tu proyecto.
- **No programa por ti sin supervision.** Se detiene en cada fase para que apruebes.
- **No es magia.** Si le das requisitos vagos, obtendras resultados vagos. La calidad de entrada
  importa.
- **No reemplaza tu criterio.** Tu decides, apruebas y corriges. El agente propone y ejecuta.

## Por que usar agentes distintos

Podria ser un solo agente haciendo todo, pero es peor. Separar roles da tres ventajas:

- **Especializacion:** cada agente tiene instrucciones enfocadas en una sola cosa.
- **Independencia:** quien verifica no es quien construyo, asi no se "aprueba a si mismo".
- **Control:** cada agente puede tener permisos distintos. El que solo analiza no puede tocar el codigo.

---

**En una frase:** es un metodo (con sus herramientas) para construir software ordenadamente: primero el documento, luego el codigo, y siempre con verificacion.

**Siguiente paso:** [02-glosario.md](02-glosario.md) para aprender el vocabulario que usaremos.

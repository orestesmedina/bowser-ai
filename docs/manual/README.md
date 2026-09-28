# Manual del Framework SDD para opencode

Bienvenido. Este manual explica, desde cero, como usar este framework para construir software
con ayuda de inteligencia artificial, aunque nunca hayas usado una herramienta de este tipo.

No necesitas saber programar para entenderlo. Si vas a escribir código, mucho mejor: aprovecharás
todo el potencial. Si solo quieres entender como funciona y dirigir el trabajo, también sirve.

---

## Por donde empezar

Elige según tu prisa:

- **Tengo 10 minutos y quiero ver algo funcionando** -> [INICIO-RAPIDO.md](INICIO-RAPIDO.md)
- **Quiero entender qué es esto antes de tocar nada** -> [01-que-es-esto.md](01-que-es-esto.md)
- **Ya sé qué es, quiero usarlo** -> [03-antes-de-empezar.md](03-antes-de-empezar.md)

---

## Mapa del manual

| # | Documento | Qué encontrarás |
|---|-----------|-----------------|
| - | [INICIO-RAPIDO.md](INICIO-RAPIDO.md) | Los 5 pasos mínimos para empezar hoy |
| 01 | [01-que-es-esto.md](01-que-es-esto.md) | Qué es el framework, con una analogía. Qué problema resuelve |
| 02 | [02-glosario.md](02-glosario.md) | El vocabulario: spec, agente, harness, comando... en palabras simples |
| 03 | [03-antes-de-empezar.md](03-antes-de-empezar.md) | Qué necesitas, cómo copiar el framework a tu proyecto y abrirlo |
| 04 | [04-configuracion.md](04-configuracion.md) | Como adaptarlo a tu proyecto: `constitucion.md` y `AGENTS.md` |
| 05 | [05-piezas.md](05-piezas.md) | Una ficha por cada agente, comando, carpeta y plantilla |
| 06 | [06-tutorial.md](06-tutorial.md) | Un ejemplo completo, paso a paso, de principio a fin |
| 07 | [07-uso-diario.md](07-uso-diario.md) | El día a día: `/estado`, modos de trabajo, sesiones |
| 08 | [08-personalizar.md](08-personalizar.md) | Cambiar modelos, permisos, añadir agentes y comandos |
| 09 | [09-problemas.md](09-problemas.md) | Preguntas frecuentes y errores comunes con solución |
| 10 | [10-apendices.md](10-apendices.md) | Plantillas explicadas campo por campo y tabla de permisos |

---

## El ejemplo que usaremos

A lo largo del manual usamos **una sola funcionalidad de ejemplo**: un sistema para
**registrar gastos** de una pequeña empresa. Así no cambiamos de contexto en cada documento.

La idea: un dueño de restaurante quiere anotar sus gastos diarios (quién, cuánto, cuándo, categoría)
y ver un resumen mensual. Sencillo, real y fácil de seguir.

---

## Cómo leer este manual

- Cada documento termina con dos bloques: **"En una frase"** (el resumen) y **"Siguiente paso"** (que leer después).
- Cuando veas `bloques como este`, es texto que escribes o lees en la pantalla.
- Cuando veas una ruta como `specs/registro-gastos/requerimientos.md`, es un archivo en tu proyecto.
- No hace falta memorizar nada: usa el [glosario](02-glosario.md) cuando te pierdas.

---

## Regla de oro de todo el framework

> La especificación manda. Primero se escribe que se quiere (el documento),
> después se construye (el código), y al final se comprueba que cumple (las pruebas).
> Si el código y el documento no coinciden, se para y se pregunta cuál corregir.

---

**En una frase:** este es el índice del manual; empieza por el inicio rápido o por el capítulo 01.

**Siguiente paso:** abre [INICIO-RAPIDO.md](INICIO-RAPIDO.md) si tienes prisa, o [01-que-es-esto.md](01-que-es-esto.md) si quieres entender primero.

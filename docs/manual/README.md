# Manual del Framework SDD para opencode

Bienvenido. Este manual explica, desde cero, como usar este framework para construir software
con ayuda de inteligencia artificial, aunque nunca hayas usado una herramienta de este tipo.

No necesitas saber programar para entenderlo. Si vas a escribir codigo, mucho mejor: aprovecharas
todo el potencial. Si solo quieres entender como funciona y dirigir el trabajo, tambien sirve.

---

## Por donde empezar

Elige segun tu prisa:

- **Tengo 10 minutos y quiero ver algo funcionando** -> [INICIO-RAPIDO.md](INICIO-RAPIDO.md)
- **Quiero entender que es esto antes de tocar nada** -> [01-que-es-esto.md](01-que-es-esto.md)
- **Ya se que es, quiero usarlo** -> [03-antes-de-empezar.md](03-antes-de-empezar.md)

---

## Mapa del manual

| # | Documento | Que encontraras |
|---|-----------|-----------------|
| - | [INICIO-RAPIDO.md](INICIO-RAPIDO.md) | Los 5 pasos minimos para empezar hoy |
| 01 | [01-que-es-esto.md](01-que-es-esto.md) | Que es el framework, con una analogia. Que problema resuelve |
| 02 | [02-glosario.md](02-glosario.md) | El vocabulario: spec, agente, harness, comando... en palabras simples |
| 03 | [03-antes-de-empezar.md](03-antes-de-empezar.md) | Que necesitas, como copiar el framework a tu proyecto y abrirlo |
| 04 | [04-configuracion.md](04-configuracion.md) | Como adaptarlo a tu proyecto: `constitucion.md` y `AGENTS.md` |
| 05 | [05-piezas.md](05-piezas.md) | Una ficha por cada agente, comando, carpeta y plantilla |
| 06 | [06-tutorial.md](06-tutorial.md) | Un ejemplo completo, paso a paso, de principio a fin |
| 07 | [07-uso-diario.md](07-uso-diario.md) | El dia a dia: `/estado`, modos de trabajo, sesiones |
| 08 | [08-personalizar.md](08-personalizar.md) | Cambiar modelos, permisos, anadir agentes y comandos |
| 09 | [09-problemas.md](09-problemas.md) | Preguntas frecuentes y errores comunes con solucion |
| 10 | [10-apendices.md](10-apendices.md) | Plantillas explicadas campo por campo y tabla de permisos |

---

## El ejemplo que usaremos

A lo largo del manual usamos **una sola funcionalidad de ejemplo**: un sistema para
**registrar gastos** de una pequena empresa. Asi no cambiamos de contexto en cada documento.

La idea: un dueno de restaurante quiere anotar sus gastos diarios (quien, cuanto, cuando, categoria)
y ver un resumen mensual. Sencillo, real y facil de seguir.

---

## Como leer este manual

- Cada documento termina con dos bloques: **"En una frase"** (el resumen) y **"Siguiente paso"** (que leer despues).
- Cuando veas `bloques como este`, es texto que escribes o lees en la pantalla.
- Cuando veas una ruta como `specs/registro-gastos/requerimientos.md`, es un archivo en tu proyecto.
- No hace falta memorizar nada: usa el [glosario](02-glosario.md) cuando te pierdas.

---

## Regla de oro de todo el framework

> La especificacion manda. Primero se escribe que se quiere (el documento),
> despues se construye (el codigo), y al final se comprueba que cumple (las pruebas).
> Si el codigo y el documento no coinciden, se para y se pregunta cual corregir.

---

**En una frase:** este es el indice del manual; empieza por el inicio rapido o por el capitulo 01.

**Siguiente paso:** abre [INICIO-RAPIDO.md](INICIO-RAPIDO.md) si tienes prisa, o [01-que-es-esto.md](01-que-es-esto.md) si quieres entender primero.

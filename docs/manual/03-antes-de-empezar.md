# 03. Antes de empezar

Este capítulo asume que **ya tienes opencode instalado**. Si no, instálalo primero desde su
documentación oficial y vuelve aquí.

---

## Qué necesitas

1. **opencode instalado** y funcionando. Comprueba en una terminal:

   ```powershell
   opencode --version
   ```

   Si responde con un número de versión, está listo.

2. **Al menos un proveedor de IA configurado** (para que los agentes tengan un "cerebro").
   Comprueba con:

   ```powershell
   opencode models
   ```

   Debería mostrar una lista de modelos. Los agentes de este framework usan modelos `opencode-go/...`,
   así que asegúrate de tener acceso a ese proveedor.

3. **Una carpeta de proyecto** donde vivir. Puede estar vacía o tener ya código.

## Paso 1. Instala el framework en tu proyecto

Necesitas también **Node.js 18 o superior** (compruébalo con `node --version`) y que tu proyecto sea un
repositorio git (si no lo es: `git init` dentro de la carpeta).

Desde la carpeta del framework, en PowerShell (ajusta la ruta):

```powershell
cd D:\IA\mi-framework-sdd-opencode
node herramientas/instalar.mjs C:\ruta\a\tu-proyecto --activar-hook
```

El instalador:

- Copia las carpetas ocultas `.opencode/` (agentes y comandos) y `.sdd/` (harness), las plantillas,
  `AGENTS.md`, `opencode.json` y `docs/constitucion.md`.
- **No sobrescribe** tus archivos. Si ya tenías `AGENTS.md`, `opencode.json` o `docs/constitucion.md`,
  deja la versión del framework al lado como `AGENTS.md.sdd-nuevo` (etc.) para que fusiones a mano
  y después borres el `.sdd-nuevo`.
- No copia el `.git` del framework, ni su README, ni `herramientas/` ni `ejemplo/`.
- Con `--activar-hook` activa el hook pre-commit. Con `--con-manual` copia también este manual.
- Con `--simular` te muestra lo que haría sin escribir nada.

> No copies el framework con `Copy-Item -Recurse -Force`: con `-Force` copia también la carpeta oculta
> `.git` del framework encima de la de tu proyecto y sobrescribe tus archivos.

## Paso 2. Comprueba la estructura

Entra a tu proyecto y lista el contenido, incluidos los ocultos:

```powershell
Get-ChildItem -Force
```

Deberías ver algo así:

```
AGENTS.md
opencode.json
(tus propios archivos, como README.md, siguen igual)
docs\
plantillas\
specs\
.opencode\
.sdd\
```

Y dentro de `.opencode\`:

```
agents\
commands\
```

## Paso 3. Abre opencode

```powershell
cd C:\ruta\a\tu-proyecto
opencode
```

Se abre una interfaz en la terminal. Abajo hay un cuadro donde escribes.

## Paso 4. Comprueba que el framework cargó

Dentro de opencode, escribe `/` (una barra). Se despliega la lista de comandos disponibles.
Debes ver:

```
/requerimientos
/arquitectura
/planificar
/pruebas
/implementar
/probar
/cambio
/arreglar
/mapear
/estado
```

También puedes comprobar los agentes desde una terminal aparte:

```powershell
opencode agent list
```

Deben aparecer, además de los de serie, estos: `analista`, `arquitecto`, `disenador-pruebas`,
`desarrollador`, `verificador` y `orquestador`.

Si algo no aparece, ve a [09-problemas.md](09-problemas.md).

## Paso 5. Antes de usar: configura

Todavía **no** empieces a pedir funcionalidades. Primero hay que adaptar el framework a tu proyecto.
Eso es el [siguiente capítulo](04-configuracion.md).

---

## Errores típicos en este punto

- **No copiaste la carpeta `.opencode/`** -> no aparecerán ni comandos ni agentes.
- **Copiaste dentro de una subcarpeta** en vez de la raíz -> opencode no los encuentra.
- **No tienes proveedor configurado** -> los comandos aparecen pero los agentes fallan al responder.

---

**En una frase:** copia el framework completo (incluida la carpeta oculta `.opencode/`), abre opencode en la raíz del proyecto y confirma que aparecen los 10 comandos.

**Siguiente paso:** [04-configuracion.md](04-configuracion.md) para adaptarlo a tu proyecto.

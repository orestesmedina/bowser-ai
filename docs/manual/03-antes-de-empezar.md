# 03. Antes de empezar

Este capitulo asume que **ya tienes opencode instalado**. Si no, instalalo primero desde su
documentacion oficial y vuelve aqui.

---

## Que necesitas

1. **opencode instalado** y funcionando. Comprueba en una terminal:

   ```powershell
   opencode --version
   ```

   Si responde con un numero de version, esta listo.

2. **Al menos un proveedor de IA configurado** (para que los agentes tengan un "cerebro").
   Comprueba con:

   ```powershell
   opencode models
   ```

   Deberia mostrar una lista de modelos. Los agentes de este framework usan modelos `opencode-go/...`,
   asi que asegurate de tener acceso a ese proveedor.

3. **Una carpeta de proyecto** donde vivir. Puede estar vacia o tener ya codigo.

## Paso 1. Copia el framework a tu proyecto

Copia **todo** el contenido de la carpeta del framework a la raiz de tu proyecto.

> Importante: incluye la carpeta oculta `.opencode/`. Es la que contiene los agentes y los comandos.
> En Windows, el Explorador de archivos suele ocultar las carpetas que empiezan por punto.
> Usa la terminal para estar seguro.

En PowerShell (ajusta las rutas):

```powershell
Copy-Item -Path "D:\IA\mi-framework-sdd-opencode\*" -Destination "C:\ruta\a\tu-proyecto" -Recurse -Force
```

Si tu proyecto **ya tenia** una carpeta `.opencode/`, copia solo los archivos que falten
(por ejemplo `.opencode\agents\` y `.opencode\commands\`) para no borrar tus propias cosas.

## Paso 2. Comprueba la estructura

Entra a tu proyecto y lista el contenido, incluidos los ocultos:

```powershell
Get-ChildItem -Force
```

Deberias ver algo asi:

```
AGENTS.md
opencode.json
README.md
docs\
plantillas\
specs\
.opencode\
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

## Paso 4. Comprueba que el framework cargo

Dentro de opencode, escribe `/` (una barra). Se despliega la lista de comandos disponibles.
Debes ver:

```
/requerimientos
/arquitectura
/planificar
/pruebas
/implementar
/probar
/estado
```

Tambien puedes comprobar los agentes desde una terminal aparte:

```powershell
opencode agent list
```

Deben aparecer, ademas de los de serie, estos: `analista`, `arquitecto`, `disenador-pruebas`,
`desarrollador`, `verificador` y `orquestador`.

Si algo no aparece, ve a [09-problemas.md](09-problemas.md).

## Paso 5. Antes de usar: configura

Todavia **no** empieces a pedir funcionalidades. Primero hay que adaptar el framework a tu proyecto.
Eso es el [siguiente capitulo](04-configuracion.md).

---

## Errores tipicos en este punto

- **No copiaste la carpeta `.opencode/`** -> no apareceran ni comandos ni agentes.
- **Copiaste dentro de una subcarpeta** en vez de la raiz -> opencode no los encuentra.
- **No tienes proveedor configurado** -> los comandos aparecen pero los agentes fallan al responder.

---

**En una frase:** copia el framework completo (incluida la carpeta oculta `.opencode/`), abre opencode en la raiz del proyecto y confirma que aparecen los 7 comandos.

**Siguiente paso:** [04-configuracion.md](04-configuracion.md) para adaptarlo a tu proyecto.

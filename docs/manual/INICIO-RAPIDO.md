# Inicio rapido

Para quien ya tiene opencode instalado y quiere ver el framework funcionando en 10 minutos.
Si prefieres entender antes de actuar, ve a [01-que-es-esto.md](01-que-es-esto.md).

---

## Paso 1. Copia el framework a tu proyecto

Copia **todo** el contenido de esta carpeta a la raiz de tu proyecto. Incluye la carpeta
oculta `.opencode/` (es la que trae los agentes y los comandos).

En Windows, con PowerShell:

```powershell
Copy-Item -Path "D:\IA\mi-framework-sdd-opencode\*" -Destination "C:\ruta\a\tu-proyecto" -Recurse -Force
```

Si tu proyecto ya tenia una carpeta `.opencode/`, copia solo lo que falte para no pisar tus cosas.

## Paso 2. Rellena dos archivos

Abre y edita:

1. **`docs/constitucion.md`** -> tus reglas: lenguaje, linter, framework de pruebas, seguridad.
2. **`AGENTS.md`** -> en la seccion **Harness**, pon los comandos reales de tu proyecto.

Ejemplo de la seccion Harness ya rellena:

```markdown
- **Pruebas:** `npm test`
- **Linter/formato:** `npm run lint`
- **Tipos/build:** `npx tsc --noEmit`
```

> Sin esto, el agente no sabe como comprobar su trabajo. Es el paso mas importante.

## Paso 3. Abre opencode en tu proyecto

```powershell
cd C:\ruta\a\tu-proyecto
opencode
```

## Paso 4. Comprueba que cargo

Dentro de opencode, escribe `/` y deberias ver en la lista:

`/requerimientos`, `/arquitectura`, `/planificar`, `/pruebas`, `/implementar`, `/probar`, `/estado`.

Si no aparecen, ve a [09-problemas.md](09-problemas.md).

## Paso 5. Recorre el flujo

Escribe estos comandos **en orden**, revisando y aprobando cada uno antes de seguir:

```
/requerimientos quiero registrar los gastos diarios de mi restaurante
/arquitectura registro-gastos
/planificar registro-gastos
/pruebas registro-gastos
/implementar registro-gastos
/probar registro-gastos
```

Cuando termines, usa `/estado` para ver un resumen de todo.

---

## Que acabas de hacer

- Cada comando lo ejecuta un **agente especializado** distinto.
- Cada fase deja un **documento** en `specs/registro-gastos/`.
- El codigo se escribe solo despues de aprobar los documentos.
- El ultimo agente **verifica de forma independiente** que se cumple lo prometido.

---

**En una frase:** copiar, rellenar `constitucion.md` y `AGENTS.md`, abrir opencode y correr los 6 comandos en orden.

**Siguiente paso:** lee [05-piezas.md](05-piezas.md) para entender que hace cada comando y cada agente, o [06-tutorial.md](06-tutorial.md) para verlo con detalle.

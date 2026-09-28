# Inicio rápido

Para quien ya tiene opencode instalado y quiere ver el framework funcionando en 10 minutos.
Si prefieres entender antes de actuar, ve a [01-que-es-esto.md](01-que-es-esto.md).

---

## Paso 1. Instala el framework en tu proyecto

Necesitas Node.js 18 o superior y que tu proyecto sea un repositorio git. En PowerShell:

```powershell
cd D:\IA\mi-framework-sdd-opencode
node herramientas/instalar.mjs C:\ruta\a\tu-proyecto --activar-hook
```

No sobrescribe archivos que ya existan en tu proyecto: si ya tenías `AGENTS.md` u `opencode.json`,
deja la versión del framework como `.sdd-nuevo` para que la fusiones (ver [03-antes-de-empezar.md](03-antes-de-empezar.md)).

## Paso 2. Rellena dos archivos

Abre y edita:

1. **`docs/constitucion.md`** -> tus reglas: lenguaje, linter, framework de pruebas, seguridad.
2. **`.sdd/config.json`** -> los comandos reales de pruebas, lint, build, auditoría de dependencias y
   escaneo de secretos de tu proyecto (`null` en los que no apliquen).

Ejemplo ya relleno:

```json
"verificacion": {
  "pruebas": "npm test",
  "lint": "npm run lint",
  "build": "npx tsc --noEmit",
  "dependencias": "npm audit --audit-level=high",
  "secretos": "gitleaks git --no-banner --redact"
}
```

Compruébalo con `node .sdd/verificar.mjs`. (El hook ya quedó activo con `--activar-hook`.)

> Sin esto, el agente no sabe cómo comprobar su trabajo. Es el paso más importante.

## Paso 3. Abre opencode en tu proyecto

```powershell
cd C:\ruta\a\tu-proyecto
opencode
```

## Paso 4. Comprueba que cargó

Dentro de opencode, escribe `/` y deberías ver en la lista:

`/requerimientos`, `/arquitectura`, `/planificar`, `/pruebas`, `/implementar`, `/probar`, `/cambio`, `/arreglar`, `/mapear`, `/estado`.

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

## Qué acabas de hacer

- Cada comando lo ejecuta un **agente especializado** distinto.
- Cada fase deja un **documento** en `specs/registro-gastos/`.
- El código se escribe solo después de aprobar los documentos.
- El último agente **verifica de forma independiente** que se cumple lo prometido.

---

**En una frase:** copiar, rellenar `constitucion.md` y `AGENTS.md`, abrir opencode y correr los 6 comandos en orden.

**Siguiente paso:** lee [05-piezas.md](05-piezas.md) para entender que hace cada comando y cada agente, o [06-tutorial.md](06-tutorial.md) para verlo con detalle.

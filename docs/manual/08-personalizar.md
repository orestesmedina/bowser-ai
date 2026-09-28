# 08. Personalizar el framework

Todo el framework es texto plano. Puedes cambiarlo sin miedo: si algo sale mal, lo restauras.
Este capítulo explica los cambios más útiles.

---

## 1. Cambiar el modelo de un agente

Todos los modelos están juntos en `opencode.json`, en el bloque `agent`:

```json
"agent": {
  "orquestador": { "model": "opencode-go/deepseek-v4-pro", "temperature": 0.2 },
  "analista": { "model": "opencode-go/kimi-k3", "temperature": 0.3 },
  "arquitecto": { "model": "opencode-go/glm-5.3", "temperature": 0.2 },
  "disenador-pruebas": { "model": "opencode-go/deepseek-v4-pro", "temperature": 0.1 },
  "desarrollador": { "model": "opencode-go/kimi-k2.7-code", "temperature": 0.2 },
  "verificador": { "model": "opencode-go/grok-4.7", "temperature": 0.1 }
}
```

Cambia el `model` que quieras. Los catálogos cambian cada pocos meses, así que revisa los disponibles
de vez en cuando:

```powershell
opencode models
```

Y comprueba qué modelo usa de verdad cada agente con `opencode debug agent <nombre>`.

> No pongas `model:` en los archivos de `.opencode/agents/`: si lo haces, ese valor gana sobre
> `opencode.json` y vuelves a tener los modelos repartidos en varios sitios.
>
> Muchos modelos de razonamiento ignoran `temperature`. Si un proveedor da error por ese campo, quítalo.

Ideas útiles:

| Si quieres... | Cambia... |
|---------------|-----------|
| Gastar menos | Modelos más baratos en `analista` y `disenador-pruebas` |
| Mejor código | Un modelo de código más potente en `desarrollador` |
| Más independencia al verificar | Que `verificador` use **otro proveedor** distinto al `desarrollador` |
| Respuestas más creativas | Sube `temperature` (0.7-1.0) |
| Respuestas más precisas | Baja `temperature` (0.0-0.2) |

> El modelo por defecto del proyecto está en `opencode.json`. Si un agente no define `model`,
> hereda el del agente principal que lo invoca.

---

## 2. Ajustar permisos

Los permisos controlan qué puede hacer cada agente. Tres valores:

- `allow` = sin preguntar.
- `ask` = te pide permiso.
- `deny` = prohibido.

Ejemplo: hacer que el `desarrollador` no pueda hacer `git push` sin preguntar. En su archivo:

```markdown
permission:
  question: allow
  edit: allow
  bash:
    "*": allow
    "git push": ask
```

### Regla importante de orden

Los patrones se evalúan **en orden** y **gana la última regla que coincide**. Por eso las reglas
generales van primero y las específicas después:

```markdown
permission:
  edit:
    "*": deny
    "specs/**": allow
```

Esto significa: "prohíbe editar todo, excepto dentro de `specs/`". Si lo pusieras al revés,
`"*": deny` al final lo prohibiría todo.

### Permitir más cosas

Si un agente se queda corto (por ejemplo, el `arquitecto` necesita leer el código con comandos),
cambia su `bash: deny` por `bash: ask`. Pero piénsalo: menos permisos = menos sorpresas.

---

## 3. Añadir un agente nuevo

Crea un archivo en `.opencode/agents/` con el nombre del agente. Por ejemplo,
`.opencode/agents/seguridad.md`:

```markdown
---
description: Revisa el código buscando problemas de seguridad. Úsalo antes de publicar.
mode: subagent
permission:
  question: allow
  webfetch: ask
  edit: deny
  bash:
    "*": ask
    "node .sdd/verificar.mjs*": allow
    "git diff*": allow
---

Eres un auditor de seguridad. Revisas el código en busca de:
- Validación de entradas.
- Manejo de secretos.
- Permisos y acceso a datos.
Reportas hallazgos con severidad y una recomendación. No modificas código.
```

Reglas para que funcione:

- El nombre del archivo es el nombre del agente (`seguridad.md` -> agente `seguridad`).
- `description` es obligatorio y debe decir **cuándo usarlo**: así el modelo lo elige bien.
- `mode: subagent` para que lo invoquen otros; `mode: primary` para hablarle con Tab; `mode: all` para ambos
  (necesario si su comando tiene que dialogar contigo).
- Su modelo va en `opencode.json`, junto a los demás:
  `"seguridad": { "model": "opencode-go/grok-4.7", "temperature": 0.1 }`.
- Empieza con permisos mínimos (`"*": ask` en bash) y abre solo lo que necesite.
- Si quieres que el `orquestador` pueda lanzarlo, añádelo a su `permission.task`.

---

## 4. Añadir un comando nuevo

Un comando tiene dos partes: la **skill** (el procedimiento) y el **comando** (quién lo ejecuta).

1. Crea la skill en `.agents/skills/sdd-seguridad/SKILL.md` (la carpeta y `name` deben coincidir):

```markdown
---
name: sdd-seguridad
description: "Auditoría de seguridad del código de una funcionalidad: entradas, secretos, permisos y datos personales. Úsala antes de publicar."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-seguridad

- **Rol recomendado:** auditor de seguridad (no modifica código)
- **Entrada:** el nombre de la funcionalidad

Pasos:
1. Lee `docs/constitucion.md`, sección de seguridad.
2. Revisa el código de la funcionalidad indicada.
3. Reporta hallazgos con severidad y recomendación.
```

2. Crea el comando en `.opencode/commands/seguridad.md`:

```markdown
---
description: Auditoría de seguridad sobre el código de una funcionalidad
agent: seguridad
---

Funcionalidad: $ARGUMENTS

Carga la skill `sdd-seguridad` con la herramienta `skill` y sigue sus instrucciones paso a paso.
Si la herramienta no está disponible, lee `.agents/skills/sdd-seguridad/SKILL.md` y síguelo.
```

- `$ARGUMENTS` se reemplaza por lo que escribas después del comando (solo en el comando, no en la skill).
- `agent:` indica qué agente lo ejecuta. Si es un subagente, se lanza en una sesión hija; añade
  `subtask: false` si el comando necesita dialogar contigo.
- Sin `agent:`, lo ejecuta el agente actual.
- Pon la `description` entre comillas si contiene `: ` (si no, el YAML es inválido y la skill no carga).
- Comprueba con `opencode debug skill` que aparece.

Luego podrás usar `/seguridad registro-gastos`.

---

## 5. Ajustar las plantillas

Si quieres que tus documentos tengan otros campos, edita los archivos en `plantillas/`.
Los agentes los usarán tal cual. Por ejemplo, añadir una sección "Presupuesto" a `arquitectura.md`.

---

## 6. El registro de lecciones aprendidas

En `docs/constitucion.md`, al final, hay una sección **"Registro de lecciones aprendidas"**.
Cada vez que un agente repita un error, añade una regla ahí. Ejemplos:

```markdown
## 8. Registro de lecciones aprendidas
- Usar siempre `Decimal` o centavos para dinero; nunca `float`.
- Las fechas se guardan en UTC y se muestran en hora local.
- No usar `SELECT *` en consultas nuevas.
```

Así el framework **mejora con cada proyecto**. Es la pieza que convierte errores repetidos en reglas permanentes.

---

## 7. Ajustar el harness

El harness vive en `.sdd/`:

- **Añadir un paso:** agrega una clave en `verificacion` de `.sdd/config.json`
  (por ejemplo `"licencias": "npx license-checker --failOn GPL"`). Se ejecuta en orden y, si falla, bloquea.
- **Desactivar la trazabilidad:** `"trazabilidad": false` (no recomendado).
- **Hook pre-commit:** `.sdd/hooks/pre-commit` ejecuta `node .sdd/verificar.mjs --omitir pruebas,dependencias`.
  Si tus pruebas son rápidas y no trabajas con pruebas en rojo, puedes quitar `pruebas` de esa lista.
- **CI:** la plantilla `plantillas/ci/github-actions-sdd.yml` ejecuta la suite completa en cada push.

Los agentes no pueden modificar `.sdd/` (permiso `deny`), así que estos cambios los haces tú.

---

**En una frase:** modelos y permisos se cambian en `.opencode/agents/`, comandos en `.opencode/commands/`, y las lecciones aprendidas en `docs/constitucion.md`.

**Siguiente paso:** [09-problemas.md](09-problemas.md) si algo no funciona como esperas.

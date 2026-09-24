# 08. Personalizar el framework

Todo el framework es texto plano. Puedes cambiarlo sin miedo: si algo sale mal, lo restauras.
Este capitulo explica los cambios mas utiles.

---

## 1. Cambiar el modelo de un agente

Cada agente tiene su modelo en la parte de arriba de su archivo, entre `---`. Por ejemplo,
abre `.opencode/agents/desarrollador.md`:

```markdown
---
description: Desarrollador. Usalo para implementar tareas del plan, una por una...
mode: subagent
model: opencode-go/kimi-k2.7-code
temperature: 0.2
permission:
  question: allow
  edit: allow
  bash: allow
---
```

Cambia la linea `model:` por el que quieras. Para ver los disponibles:

```powershell
opencode models
```

Ideas utiles:

| Si quieres... | Cambia... |
|---------------|-----------|
| Gastar menos | Modelos mas baratos en `analista` y `disenador-pruebas` |
| Mejor codigo | Un modelo de codigo mas potente en `desarrollador` |
| Mas independencia al verificar | Que `verificador` use **otro proveedor** distinto al `desarrollador` |
| Respuestas mas creativas | Sube `temperature` (0.7-1.0) |
| Respuestas mas precisas | Baja `temperature` (0.0-0.2) |

> El modelo por defecto del proyecto esta en `opencode.json`. Si un agente no define `model`,
> hereda el del agente principal que lo invoca.

---

## 2. Ajustar permisos

Los permisos controlan que puede hacer cada agente. Tres valores:

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

Los patrones se evaluan **en orden** y **gana la ultima regla que coincide**. Por eso las reglas
generales van primero y las especificas despues:

```markdown
permission:
  edit:
    "*": deny
    "specs/**": allow
```

Esto significa: "prohibe editar todo, excepto dentro de `specs/`". Si lo pusieras al reves,
`"*": deny` al final lo prohibiria todo.

### Permitir mas cosas

Si un agente se queda corto (por ejemplo, el `arquitecto` necesita leer el codigo con comandos),
cambia su `bash: deny` por `bash: ask`. Pero piensalo: menos permisos = menos sorpresas.

---

## 3. Anadir un agente nuevo

Crea un archivo en `.opencode/agents/` con el nombre del agente. Por ejemplo,
`.opencode/agents/seguridad.md`:

```markdown
---
description: Revisa el codigo buscando problemas de seguridad. Usalo antes de publicar.
mode: subagent
model: opencode-go/grok-4.7
temperature: 0.1
permission:
  question: allow
  edit: deny
  bash: allow
---

Eres un auditor de seguridad. Revisas el codigo en busca de:
- Validacion de entradas.
- Manejo de secretos.
- Permisos y acceso a datos.
Reportas hallazgos con severidad y una recomendacion. No modificas codigo.
```

Reglas para que funcione:

- El nombre del archivo es el nombre del agente (`seguridad.md` -> agente `seguridad`).
- `description` es obligatorio y debe decir **cuando usarlo**: asi el modelo lo elige bien.
- `mode: subagent` para que lo invoquen otros; `mode: primary` para hablarle con Tab.
- Si quieres que el `orquestador` pueda lanzarlo, anadelo a su `permission.task`.

---

## 4. Anadir un comando nuevo

Crea un archivo en `.opencode/commands/`. El nombre del archivo es el comando. Por ejemplo,
`.opencode/commands/seguridad.md`:

```markdown
---
description: Auditoria de seguridad sobre el codigo actual
agent: seguridad
---

Revisa los cambios recientes y busca problemas de seguridad.
Argumentos: $ARGUMENTS

Pasos:
1. Lee `docs/constitucion.md`, seccion de seguridad.
2. Revisa el codigo de la funcionalidad $ARGUMENTS.
3. Reporta hallazgos con severidad y recomendacion.
```

- `$ARGUMENTS` se reemplaza por lo que escribas despues del comando.
- `agent:` indica que agente lo ejecuta. Si es un subagente, se lanza como tal.
- Sin `agent:`, lo ejecuta el agente actual.

Luego podras usar `/seguridad registro-gastos`.

---

## 5. Ajustar las plantillas

Si quieres que tus documentos tengan otros campos, edita los archivos en `plantillas/`.
Los agentes los usaran tal cual. Por ejemplo, anadir una seccion "Presupuesto" a `arquitectura.md`.

---

## 6. El registro de lecciones aprendidas

En `docs/constitucion.md`, al final, hay una seccion **"Registro de lecciones aprendidas"**.
Cada vez que un agente repita un error, anade una regla ahi. Ejemplos:

```markdown
## 8. Registro de lecciones aprendidas
- Usar siempre `Decimal` o centavos para dinero; nunca `float`.
- Las fechas se guardan en UTC y se muestran en hora local.
- No usar `SELECT *` en consultas nuevas.
```

Asi el framework **mejora con cada proyecto**. Es la pieza que convierte errores repetidos en reglas permanentes.

---

## 7. Anadir un harness mas estricto (opcional)

Si quieres que nada se de por terminado sin pasar la verificacion, puedes anadir un "hook" o
integrar CI. Empieza simple: basta con que `AGENTS.md` liste los comandos y que el `desarrollador`
tenga `bash: allow`. Cuando el equipo crezca, anade un flujo de CI (por ejemplo GitHub Actions)
que corra los mismos comandos en cada push.

---

**En una frase:** modelos y permisos se cambian en `.opencode/agents/`, comandos en `.opencode/commands/`, y las lecciones aprendidas en `docs/constitucion.md`.

**Siguiente paso:** [09-problemas.md](09-problemas.md) si algo no funciona como esperas.

# 04. Configuración inicial

Antes de usar el framework hay que rellenar **dos archivos**. Son los más importantes de todos,
porque le dicen a los agentes cómo es tu proyecto y cómo comprobar su trabajo.

1. `docs/constitucion.md` -> tus reglas no negociables.
2. `.sdd/config.json` -> los comandos de verificación (el harness).

---

## 1. `docs/constitucion.md`

Es la "ley" del proyecto. Todo agente la lee antes de actuar. Los valores entre corchetes son
ejemplos que debes reemplazar por los tuyos.

### Qué significa cada sección

| Sección | Qué defines | Por qué importa |
|---------|-------------|-----------------|
| 1. Stack tecnológico | Lenguaje, frameworks, base de datos | Los agentes diseñan y programan para ese stack |
| 2. Estilo de código | Linter, idioma, reglas | Mantiene el código consistente |
| 3. Arquitectura | Cómo separar capas | Evita código desordenado |
| 4. Seguridad y privacidad | Qué datos cuidar y cómo | Evita fugas de datos y errores graves |
| 5. Pruebas | Framework de pruebas y reglas | Alimenta el harness |
| 6. Control de versiones | Cómo nombrar ramas y commits | Orden en el repositorio |
| 7. Definición de terminado | Checklist de cierre | Cuándo una tarea está realmente lista |
| 8. Lecciones aprendidas | Reglas nuevas que vas añadiendo | El framework aprende contigo |

### Ejemplo A: TypeScript + Next.js

```markdown
## 1. Stack tecnológico
- Lenguaje(s): TypeScript
- Frameworks: Next.js
- Base de datos: PostgreSQL
- Infraestructura / despliegue: Vercel
- No se agregan dependencias nuevas sin justificarlas en arquitectura.md.

## 2. Estilo de código
- Formateador y linter: Prettier + ESLint
- Nombres de código en inglés; comentarios y documentación en español.
- Funciones cortas y con una sola responsabilidad.
- Sin código comentado ni console.log de depuración en entregas.

## 5. Pruebas
- Toda lógica de negocio tiene pruebas unitarias.
- Cada criterio de aceptación tiene al menos una prueba que lo verifica.
- Herramientas: Vitest
- Una tarea no está terminada si sus pruebas no pasan.
```

### Ejemplo B: Python + FastAPI

```markdown
## 1. Stack tecnológico
- Lenguaje(s): Python 3.12
- Frameworks: FastAPI
- Base de datos: PostgreSQL
- Infraestructura / despliegue: Docker
- No se agregan dependencias nuevas sin justificarlas en arquitectura.md.

## 2. Estilo de código
- Formateador y linter: Ruff
- Nombres de código en inglés; comentarios y documentación en español.
- Funciones cortas y con una sola responsabilidad.

## 5. Pruebas
- Toda lógica de negocio tiene pruebas unitarias.
- Cada criterio de aceptación tiene al menos una prueba que lo verifica.
- Herramientas: Pytest
- Una tarea no está terminada si sus pruebas no pasan.
```

> Consejo: no inventes reglas que no vas a cumplir. Es mejor una constitución corta y real
> que una larga y decorativa.

---

## 2. `.sdd/config.json` (el harness)

Aquí van los comandos con los que se comprueba tu proyecto. Todos los agentes, el hook pre-commit y
el CI ejecutan lo mismo: `node .sdd/verificar.mjs`, que lee este archivo.

### Por qué es obligatorio

Los agentes `desarrollador` y `verificador` no adivinan cómo se prueba tu proyecto. Si dejas los comandos
vacíos, `node .sdd/verificar.mjs` falla con "sin configurar" y ninguna tarea puede darse por terminada.
Es como pedirle a un inspector que revise una obra pero no darle la llave.

### Cómo rellenarlo

TypeScript + Next.js:

```json
"verificacion": {
  "pruebas": "npm test",
  "lint": "npm run lint",
  "build": "npx tsc --noEmit",
  "dependencias": "npm audit --audit-level=high",
  "secretos": "gitleaks git --no-banner --redact"
}
```

Python + FastAPI:

```json
"verificacion": {
  "pruebas": "pytest -q",
  "lint": "ruff check .",
  "build": "mypy app",
  "dependencias": "pip-audit",
  "secretos": "gitleaks git --no-banner --redact"
}
```

- Si un paso no aplica a tu proyecto, pon `null` (se omite). Si lo dejas `""`, falla: así cada omisión
  es una decisión tuya y no un olvido.
- `dependencias` busca vulnerabilidades conocidas en tus paquetes. `secretos` busca claves y tokens en el
  repositorio. [gitleaks](https://github.com/gitleaks/gitleaks) se instala aparte (por ejemplo
  `winget install gitleaks`); comprueba con `gitleaks --help` la sintaxis de tu versión.
- Puedes añadir más pasos: se ejecutan en orden.
- Además de esos comandos, `verificar` corre la **trazabilidad** (`node .sdd/trazabilidad.mjs`): comprueba
  que cada requisito tenga tarea, cada criterio de aceptación tenga caso y prueba, y cada documento
  aprobado tenga su registro. Solo exige lo de las fases ya alcanzadas.

Compruébalo tú mismo:

```powershell
node .sdd/verificar.mjs
```

La regla práctica: **pon los mismos comandos que correrías tú antes de hacer commit.**

### Activa el hook y el CI

Si instalaste con `--activar-hook`, el hook ya está activo. Si no:

```powershell
git config core.hooksPath .sdd/hooks
```

Desde ese momento, un commit se bloquea si fallan lint, build, secretos o trazabilidad. Las pruebas no se
ejecutan en el hook (mientras implementas, las pruebas de aceptación de las tareas pendientes fallan
a propósito), ni la auditoría de dependencias (necesita red). La suite completa la ejecuta el CI: copia `plantillas/ci/github-actions-sdd.yml` a
`.github/workflows/sdd.yml` y hazlo obligatorio para fusionar a la rama principal.

---

## 3. `opencode.json` (opcional)

Este archivo define el modelo por defecto del proyecto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/deepseek-v4-pro"
}
```

Puedes cambiar el modelo por defecto aquí. Los agentes individuales pueden tener su propio modelo,
definido en cada archivo de `.opencode/agents/`. Eso se explica en [08-personalizar.md](08-personalizar.md).

---

## Lista de verificación

Antes de pasar al tutorial, confirma:

- [ ] Copié el framework completo (con `.opencode/` y `.sdd/`) a la raíz del proyecto.
- [ ] Rellené `docs/constitucion.md` con mi stack real.
- [ ] Rellené los comandos en `.sdd/config.json`.
- [ ] `node .sdd/verificar.mjs` se ejecuta sin "sin configurar".
- [ ] El hook está activo (`--activar-hook` al instalar, o `git config core.hooksPath .sdd/hooks`).
- [ ] Al escribir `/` en opencode aparecen los 10 comandos.

---

**En una frase:** adapta `constitucion.md` a tu stack y rellena `.sdd/config.json`; sin lo segundo, la verificación no funciona.

**Siguiente paso:** [05-piezas.md](05-piezas.md) para conocer cada agente, comando y carpeta.

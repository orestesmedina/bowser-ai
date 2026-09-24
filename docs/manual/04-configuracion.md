# 04. Configuracion inicial

Antes de usar el framework hay que rellenar **dos archivos**. Son los mas importantes de todos,
porque le dicen a los agentes como es tu proyecto y como comprobar su trabajo.

1. `docs/constitucion.md` -> tus reglas no negociables.
2. `AGENTS.md` -> en especial, la seccion **Harness** (los comandos de verificacion).

---

## 1. `docs/constitucion.md`

Es la "ley" del proyecto. Todo agente la lee antes de actuar. Los valores entre corchetes son
ejemplos que debes reemplazar por los tuyos.

### Que significa cada seccion

| Seccion | Que defines | Por que importa |
|---------|-------------|-----------------|
| 1. Stack tecnologico | Lenguaje, frameworks, base de datos | Los agentes disenan y programan para ese stack |
| 2. Estilo de codigo | Linter, idioma, reglas | Mantiene el codigo consistente |
| 3. Arquitectura | Como separar capas | Evita codigo desordenado |
| 4. Seguridad y privacidad | Que datos cuidar y como | Evita fugas de datos y errores graves |
| 5. Pruebas | Framework de pruebas y reglas | Alimenta el harness |
| 6. Control de versiones | Como nombrar ramas y commits | Orden en el repositorio |
| 7. Definicion de terminado | Checklist de cierre | Cuando una tarea esta realmente lista |
| 8. Lecciones aprendidas | Reglas nuevas que vas anadiendo | El framework aprende contigo |

### Ejemplo A: TypeScript + Next.js

```markdown
## 1. Stack tecnologico
- Lenguaje(s): TypeScript
- Frameworks: Next.js
- Base de datos: PostgreSQL
- Infraestructura / despliegue: Vercel
- No se agregan dependencias nuevas sin justificarlas en arquitectura.md.

## 2. Estilo de codigo
- Formateador y linter: Prettier + ESLint
- Nombres de codigo en ingles; comentarios y documentacion en espanol.
- Funciones cortas y con una sola responsabilidad.
- Sin codigo comentado ni console.log de depuracion en entregas.

## 5. Pruebas
- Toda logica de negocio tiene pruebas unitarias.
- Cada criterio de aceptacion tiene al menos una prueba que lo verifica.
- Herramientas: Vitest
- Una tarea no esta terminada si sus pruebas no pasan.
```

### Ejemplo B: Python + FastAPI

```markdown
## 1. Stack tecnologico
- Lenguaje(s): Python 3.12
- Frameworks: FastAPI
- Base de datos: PostgreSQL
- Infraestructura / despliegue: Docker
- No se agregan dependencias nuevas sin justificarlas en arquitectura.md.

## 2. Estilo de codigo
- Formateador y linter: Ruff
- Nombres de codigo en ingles; comentarios y documentacion en espanol.
- Funciones cortas y con una sola responsabilidad.

## 5. Pruebas
- Toda logica de negocio tiene pruebas unitarias.
- Cada criterio de aceptacion tiene al menos una prueba que lo verifica.
- Herramientas: Pytest
- Una tarea no esta terminada si sus pruebas no pasan.
```

> Consejo: no inventes reglas que no vas a cumplir. Es mejor una constitucion corta y real
> que una larga y decorativa.

---

## 2. `AGENTS.md` y el paso 3

`AGENTS.md` contiene las reglas generales que opencode lee siempre. Casi todo esta ya escrito;
lo unico que **debes** rellenar es la seccion **Harness (verificacion obligatoria)**.

### Por que es obligatorio

Los agentes `desarrollador` y `verificador` no adivinan como se prueba tu proyecto: **leen este archivo**.
Si dejas los marcadores de posicion (`<comando de pruebas>`), no saben que ejecutar y el bucle de
verificacion se rompe. Es como pedirle a un inspector que revise una obra pero no darle la llave.

### Como rellenarlo

Abre `AGENTS.md`, busca la seccion **Harness** y sustituye los ejemplos por tus comandos reales:

TypeScript + Next.js:

```markdown
- **Pruebas:** `npm test`
- **Linter/formato:** `npm run lint`
- **Tipos/build:** `npx tsc --noEmit`
```

Python + FastAPI:

```markdown
- **Pruebas:** `pytest -q`
- **Linter/formato:** `ruff check .`
- **Tipos/build:** `mypy app`
```

La regla practica: **pon los mismos comandos que correrias tu antes de hacer commit.**

---

## 3. `opencode.json` (opcional)

Este archivo define el modelo por defecto del proyecto:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "opencode-go/deepseek-v4-pro"
}
```

Puedes cambiar el modelo por defecto aqui. Los agentes individuales pueden tener su propio modelo,
definido en cada archivo de `.opencode/agents/`. Eso se explica en [08-personalizar.md](08-personalizar.md).

---

## Lista de verificacion

Antes de pasar al tutorial, confirma:

- [ ] Copie el framework completo (con `.opencode/`) a la raiz del proyecto.
- [ ] Rellene `docs/constitucion.md` con mi stack real.
- [ ] Rellene los comandos de la seccion **Harness** en `AGENTS.md`.
- [ ] Los comandos de prueba/lint funcionan si los ejecuto yo mismo.
- [ ] Al escribir `/` en opencode aparecen los 7 comandos.

---

**En una frase:** adapta `constitucion.md` a tu stack y rellena los comandos del harness en `AGENTS.md`; sin lo segundo, la verificacion no funciona.

**Siguiente paso:** [05-piezas.md](05-piezas.md) para conocer cada agente, comando y carpeta.

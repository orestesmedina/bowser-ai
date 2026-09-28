# 10. Apéndices

Referencia detallada: plantillas explicadas campo por campo y tabla de permisos.

---

## Apéndice A. Plantillas explicadas

### `requerimientos.md`

| Sección | Qué poner | Ejemplo |
|---------|-----------|---------|
| Estado | Borrador / En revisión / Aprobado | Borrador |
| 1. Contexto y problema | El problema de negocio y para quién | "Hoy los gastos se anotan en papel" |
| 2. Objetivos y métricas | Qué mejora y cómo se mide | "De 2 h a 10 min el cierre mensual" |
| 3. Usuarios y roles | Quién usa el sistema y con qué permisos | Dueño: registrar y ver |
| 4. Historias de usuario | "Como rol, quiero X, para Y" | HU-01 |
| 5. Requisitos funcionales | Qué debe hacer (RF-xx) | RF-01 registrar gasto |
| 6. Requisitos no funcionales | Cualidades (RNF-xx) | RNF-01 rápido |
| 7. Criterios de aceptación | Cómo verificar (CA-xx) | CA-01 CUANDO... DEBE... |
| 8. Fuera de alcance | Lo que NO se hará | No hay app móvil aún |
| 9. Supuestos y preguntas | Dudas y decisiones pendientes | Supuesto: un solo usuario |
| 10. Integraciones y datos | Sistemas externos y datos personales | Ninguno |

### `arquitectura.md`

| Sección | Qué poner |
|---------|-----------|
| 1. Resumen | La solución en 3-5 líneas |
| 2. Diagrama de componentes | Un esquema visual |
| 3. Componentes | Piezas, su responsabilidad y qué requisitos cubren |
| 4. Modelo de datos | Entidades y relaciones; marca datos sensibles |
| 5. Interfaces / API | Rutas, entradas, salidas y errores |
| 6. Flujos principales | Pasos de los casos de uso clave |
| 7. ADR | Decisiones importantes con alternativas |
| 8. Seguridad | Autenticación, secretos, protección de datos |
| 9. Dependencias nuevas | Qué librerías se añaden y por qué |
| 10. Riesgos | Qué puede salir mal y cómo mitigarlo |
| 11. Cumplimiento | Confirma o justifica excepciones a la constitución |

### `plan-tareas.md`

- Tareas pequeñas (menos de 2 horas), en orden de dependencia.
- Cada tarea: qué requisitos cubre, archivos afectados, cómo verificarla y estimación.
- Al final, la **matriz de trazabilidad**: requisito -> tareas -> pruebas.

### `plan-pruebas.md`

- Estrategia: unitarias, integración, end-to-end, manuales.
- Casos de prueba: uno por criterio de aceptación (CA).
- Casos límite y de error.
- Datos de prueba ficticios (nunca datos personales reales).
- Criterios de salida (qué debe cumplirse para considerar que está bien).

### `reporte-pruebas.md`

- Veredicto: APROBADO / APROBADO CON OBSERVACIONES / RECHAZADO.
- Resumen de pruebas: total, pasaron, fallaron, omitidas.
- Cobertura de criterios con evidencia real (salida de comandos).
- Defectos encontrados con severidad y pasos para reproducir.
- Revisión de la constitución.
- Recomendaciones.

---

## Apéndice B. Referencia de permisos

### Valores

| Valor | Significado |
|-------|-------------|
| `allow` | Se permite sin preguntar |
| `ask` | Se pide aprobación cada vez |
| `deny` | Se prohíbe (y el agente ni lo intenta) |

### Claves de permiso más usadas

| Clave | Controla |
|-------|----------|
| `read` | Leer archivos |
| `edit` | Escribir, editar y aplicar parches |
| `bash` | Ejecutar comandos de terminal |
| `task` | Lanzar subagentes |
| `question` | Hacer preguntas estructuradas al usuario |
| `webfetch` / `websearch` | Acceder a internet |
| `glob` / `grep` / `list` | Buscar y listar archivos |

### Cómo se evalúan las reglas

Los patrones se evalúan en orden y **gana la última regla que coincide**.
Por eso lo general va primero y lo específico después:

```markdown
permission:
  bash:
    "*": ask          # por defecto, pregunta
    "npm test": allow # pero las pruebas, sin preguntar
    "git push": ask   # y el push, siempre pregunta
```

Patrones con comodín:

- `"*"` = todo.
- `"specs/**"` = todo dentro de `specs/`.
- `"**/*.test.*"` = cualquier archivo cuyo nombre contenga `.test.`.
- `"mymcp_*"` = todo lo que empiece por `mymcp_`.

### Permisos de cada agente (resumen)

| Agente | edit | bash | task | question |
|--------|------|------|------|----------|
| `orquestador` | deny | deny | solo a sus subagentes | allow |
| `analista` | solo `specs/` | deny | (por defecto) | allow |
| `arquitecto` | solo `specs/` | deny | (por defecto) | allow |
| `disenador-pruebas` | solo `tests/aceptacion/` | lista (pruebas) + ask | (por defecto) | allow |
| `desarrollador` | todo menos specs, pruebas de aceptación y verificación, `docs/` y config | lista (pruebas/lint/build/git lectura) + ask | (por defecto) | allow |
| `verificador` | `reporte-pruebas.md`, `plan-tareas.md`, `tests/verificacion/` | lista (pruebas/lint/build/git lectura) + ask | (por defecto) | allow |

En todos: `webfetch` y `websearch` en `ask`; `git commit`, `git push` y borrados en `deny`.
El agente `build` de opencode pide permiso (`ask`) antes de editar `specs/`, `tests/aceptacion/`,
la constitución y la configuración (ver `opencode.json`).

---

## Apéndice C. Dónde está cada cosa

| Quiero cambiar... | Archivo |
|-------------------|---------|
| Las reglas generales y de aprobación | `AGENTS.md` |
| Los comandos de pruebas, lint y build | `.sdd/config.json` |
| Lo que bloquea un commit | `.sdd/hooks/pre-commit` |
| El CI | `plantillas/ci/github-actions-sdd.yml` (cópialo a `.github/workflows/`) |
| Los estándares (stack, estilo, seguridad) | `docs/constitucion.md` |
| El modelo de un agente | `opencode.json` (bloque `agent`) |
| Los permisos de un agente | `.opencode/agents/<agente>.md` (bloque `permission:`) |
| Lo que hace una fase (procedimiento) | `.agents/skills/sdd-<fase>/SKILL.md` |
| Qué agente ejecuta un comando | `.opencode/commands/<comando>.md` (línea `agent:`) |
| El formato de un documento | `plantillas/<plantilla>.md` |
| El modelo por defecto del proyecto | `opencode.json` |

---

## Apéndice D. Chuleta de comandos de opencode

| Quiero... | Comando (en terminal) |
|-----------|-----------------------|
| Ver la versión | `opencode --version` |
| Ver modelos disponibles | `opencode models` |
| Ver agentes cargados | `opencode agent list` |
| Ver detalle de un agente | `opencode debug agent <nombre>` |
| Continuar la última sesión | `opencode --continue` |
| Empezar en una carpeta concreta | `opencode <ruta>` |

Dentro de opencode:

| Quiero... | Cómo |
|-----------|------|
| Ver comandos | escribir `/` |
| Cambiar de agente principal | tecla `Tab` |
| Invocar un subagente | escribir `@nombre` |
| Ver estado del proyecto | `/estado` |

---

## Apéndice E. Enlaces del manual

- [Índice](README.md)
- [Inicio rápido](INICIO-RAPIDO.md)
- [01. Qué es esto](01-que-es-esto.md)
- [02. Glosario](02-glosario.md)
- [03. Antes de empezar](03-antes-de-empezar.md)
- [04. Configuración](04-configuracion.md)
- [05. Las piezas](05-piezas.md)
- [06. Tutorial](06-tutorial.md)
- [07. Uso diario](07-uso-diario.md)
- [08. Personalizar](08-personalizar.md)
- [09. Problemas frecuentes](09-problemas.md)
- [10. Apéndices](10-apendices.md)

---

**En una frase:** este apéndice es la referencia rápida de plantillas, permisos y comandos.

**Siguiente paso:** vuelve al [índice](README.md) cuando necesites orientarte.

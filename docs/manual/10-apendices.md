# 10. Apendices

Referencia detallada: plantillas explicadas campo por campo y tabla de permisos.

---

## Apendice A. Plantillas explicadas

### `requerimientos.md`

| Seccion | Que poner | Ejemplo |
|---------|-----------|---------|
| Estado | Borrador / En revision / Aprobado | Borrador |
| 1. Contexto y problema | El problema de negocio y para quien | "Hoy los gastos se anotan en papel" |
| 2. Objetivos y metricas | Que mejora y como se mide | "De 2 h a 10 min el cierre mensual" |
| 3. Usuarios y roles | Quien usa el sistema y con que permisos | Dueno: registrar y ver |
| 4. Historias de usuario | "Como rol, quiero X, para Y" | HU-01 |
| 5. Requisitos funcionales | Que debe hacer (RF-xx) | RF-01 registrar gasto |
| 6. Requisitos no funcionales | Cualidades (RNF-xx) | RNF-01 rapido |
| 7. Criterios de aceptacion | Como verificar (CA-xx) | CA-01 CUANDO... DEBE... |
| 8. Fuera de alcance | Lo que NO se hara | No hay app movil aun |
| 9. Supuestos y preguntas | Dudas y decisiones pendientes | Supuesto: un solo usuario |
| 10. Integraciones y datos | Sistemas externos y datos personales | Ninguno |

### `arquitectura.md`

| Seccion | Que poner |
|---------|-----------|
| 1. Resumen | La solucion en 3-5 lineas |
| 2. Diagrama de componentes | Un esquema visual |
| 3. Componentes | Piezas, su responsabilidad y que requisitos cubren |
| 4. Modelo de datos | Entidades y relaciones; marca datos sensibles |
| 5. Interfaces / API | Rutas, entradas, salidas y errores |
| 6. Flujos principales | Pasos de los casos de uso clave |
| 7. ADR | Decisiones importantes con alternativas |
| 8. Seguridad | Autenticacion, secretos, proteccion de datos |
| 9. Dependencias nuevas | Que librerias se anaden y por que |
| 10. Riesgos | Que puede salir mal y como mitigarlo |
| 11. Cumplimiento | Confirma o justifica excepciones a la constitucion |

### `plan-tareas.md`

- Tareas pequenas (menos de 2 horas), en orden de dependencia.
- Cada tarea: que requisitos cubre, archivos afectados, como verificarla y estimacion.
- Al final, la **matriz de trazabilidad**: requisito -> tareas -> pruebas.

### `plan-pruebas.md`

- Estrategia: unitarias, integracion, end-to-end, manuales.
- Casos de prueba: uno por criterio de aceptacion (CA).
- Casos limite y de error.
- Datos de prueba ficticios (nunca datos personales reales).
- Criterios de salida (que debe cumplirse para considerar que esta bien).

### `reporte-pruebas.md`

- Veredicto: APROBADO / APROBADO CON OBSERVACIONES / RECHAZADO.
- Resumen de pruebas: total, pasaron, fallaron, omitidas.
- Cobertura de criterios con evidencia real (salida de comandos).
- Defectos encontrados con severidad y pasos para reproducir.
- Revision de la constitucion.
- Recomendaciones.

---

## Apendice B. Referencia de permisos

### Valores

| Valor | Significado |
|-------|-------------|
| `allow` | Se permite sin preguntar |
| `ask` | Se pide aprobacion cada vez |
| `deny` | Se prohibe (y el agente ni lo intenta) |

### Claves de permiso mas usadas

| Clave | Controla |
|-------|----------|
| `read` | Leer archivos |
| `edit` | Escribir, editar y aplicar parches |
| `bash` | Ejecutar comandos de terminal |
| `task` | Lanzar subagentes |
| `question` | Hacer preguntas estructuradas al usuario |
| `webfetch` / `websearch` | Acceder a internet |
| `glob` / `grep` / `list` | Buscar y listar archivos |

### Como se evaluan las reglas

Los patrones se evaluan en orden y **gana la ultima regla que coincide**.
Por eso lo general va primero y lo especifico despues:

```markdown
permission:
  bash:
    "*": ask          # por defecto, pregunta
    "npm test": allow # pero las pruebas, sin preguntar
    "git push": ask   # y el push, siempre pregunta
```

Patrones con comodin:

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
| `disenador-pruebas` | `specs/` + tests | ask | (por defecto) | allow |
| `desarrollador` | allow | allow | (por defecto) | allow |
| `verificador` | solo `specs/` | allow | (por defecto) | allow |

---

## Apendice C. Donde esta cada cosa

| Quiero cambiar... | Archivo |
|-------------------|---------|
| Las reglas generales y el harness | `AGENTS.md` |
| Los estandares (stack, estilo, seguridad) | `docs/constitucion.md` |
| El modelo de un agente | `.opencode/agents/<agente>.md` (linea `model:`) |
| Los permisos de un agente | `.opencode/agents/<agente>.md` (bloque `permission:`) |
| Lo que hace una fase | `.opencode/commands/<comando>.md` |
| El formato de un documento | `plantillas/<plantilla>.md` |
| El modelo por defecto del proyecto | `opencode.json` |

---

## Apendice D. Chuleta de comandos de opencode

| Quiero... | Comando (en terminal) |
|-----------|-----------------------|
| Ver la version | `opencode --version` |
| Ver modelos disponibles | `opencode models` |
| Ver agentes cargados | `opencode agent list` |
| Ver detalle de un agente | `opencode debug agent <nombre>` |
| Continuar la ultima sesion | `opencode --continue` |
| Empezar en una carpeta concreta | `opencode <ruta>` |

Dentro de opencode:

| Quiero... | Como |
|-----------|------|
| Ver comandos | escribir `/` |
| Cambiar de agente principal | tecla `Tab` |
| Invocar un subagente | escribir `@nombre` |
| Ver estado del proyecto | `/estado` |

---

## Apendice E. Enlaces del manual

- [Indice](README.md)
- [Inicio rapido](INICIO-RAPIDO.md)
- [01. Que es esto](01-que-es-esto.md)
- [02. Glosario](02-glosario.md)
- [03. Antes de empezar](03-antes-de-empezar.md)
- [04. Configuracion](04-configuracion.md)
- [05. Las piezas](05-piezas.md)
- [06. Tutorial](06-tutorial.md)
- [07. Uso diario](07-uso-diario.md)
- [08. Personalizar](08-personalizar.md)
- [09. Problemas frecuentes](09-problemas.md)
- [10. Apendices](10-apendices.md)

---

**En una frase:** este apendice es la referencia rapida de plantillas, permisos y comandos.

**Siguiente paso:** vuelve al [indice](README.md) cuando necesites orientarte.

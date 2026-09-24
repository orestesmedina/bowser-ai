# 06. Tutorial completo paso a paso

Vamos a construir una funcionalidad de ejemplo de principio a fin: **registro de gastos** para
un restaurante. Sigue el tutorial con tu propio proyecto o simplemente leelo para entender el flujo.

> Antes de empezar, asegurate de haber completado [04-configuracion.md](04-configuracion.md).

Abrimos opencode en la raiz del proyecto:

```powershell
cd C:\ruta\a\tu-proyecto
opencode
```

---

## Paso 1. Requerimientos

Escribes:

```
/requerimientos quiero que el dueno del restaurante pueda anotar sus gastos diarios
```

### Que ocurre

El comando lanza al agente `analista`. Primero lee `AGENTS.md`, `docs/constitucion.md` y la plantilla.
Luego **no escribe nada todavia**: te entrevista.

### Lo que veras (ejemplo)

```
Antes de escribir los requisitos, necesito entender el problema. Te hago unas preguntas:

Sobre el problema
1. Hoy como anotas los gastos? En papel, Excel, nada?
2. Cuantos gastos al dia aproximadamente?

Sobre los usuarios
3. Solo tu los registras, o tambien tus empleados?
4. Necesitas que alguien los apruebe?

Sobre los datos
5. Que datos guardamos por gasto? (fecha, monto, categoria, proveedor, foto del recibo...)
6. Hay datos personales o de tarjetas involucrados?

Sobre el alcance
7. Necesitas reportes? Cuales?
8. Se conecta con algun sistema de contabilidad?
```

### Tu trabajo

Responder con sinceridad. Si no sabes algo, dilo: el agente anotara un supuesto en vez de inventar.
Por ejemplo:

```
1. Hoy en un cuaderno
2. Unos 15 al dia
3. Solo yo, por ahora
4. No
5. Fecha, monto, categoria, proveedor y una nota opcional
6. Ninguno
7. Un resumen mensual por categoria
8. No
```

### Lo que produce

Crea `specs/registro-gastos/requerimientos.md`. Un fragmento:

```markdown
## 5. Requisitos funcionales
- **RF-01:** El sistema debe permitir registrar un gasto con fecha, monto, categoria, proveedor y nota.
- **RF-02:** El sistema debe permitir consultar un resumen mensual agrupado por categoria.

## 7. Criterios de aceptacion
- **CA-01 (RF-01):** CUANDO se registra un gasto con todos los campos obligatorios,
  EL SISTEMA DEBE guardarlo y mostrarlo en la lista del mes.
- **CA-02 (RF-01, caso de error):** SI el monto es cero o negativo,
  ENTONCES EL SISTEMA DEBE rechazar el registro con un mensaje claro.
```

### Revisa y aprueba

Lee el documento. Si algo no te gusta, pideselo ("agrega un requisito para editar un gasto").
Cuando este bien, escribes:

```
aprobado
```

El agente marca el documento como **Aprobado** y te sugiere el siguiente paso.

---

## Paso 2. Arquitectura

Escribes:

```
/arquitectura registro-gastos
```

El `arquitecto` verifica que `requerimientos.md` este aprobado. Si no lo esta, se detiene y te avisa.
Despues disena la solucion y crea `specs/registro-gastos/arquitectura.md`.

Un fragmento:

```markdown
## 3. Componentes
| Componente | Responsabilidad | Tecnologia | Requisitos que cubre |
|------------|-----------------|------------|----------------------|
| Pantalla de gastos | Formulario y listado | Next.js | RF-01 |
| API de gastos | Validar y guardar | FastAPI | RF-01, RF-02 |
| Base de datos | Persistir gastos | PostgreSQL | RF-01, RF-02 |

## 7. Decisiones de arquitectura (ADR)
### ADR-01: Guardar el monto como entero (centavos)
- **Contexto:** los decimales con punto flotante dan errores de redondeo.
- **Decision:** guardar el monto en centavos (entero).
- **Consecuencias:** hay que convertir al mostrar y al guardar.
```

Si hay una decision con varias opciones razonables, el arquitecto **te pregunta antes de decidir**.

Revisa, corrige si hace falta y aprueba.

---

## Paso 3. Planificacion

Escribes:

```
/planificar registro-gastos
```

El `arquitecto` divide el trabajo en tareas pequenas y crea:

- `specs/registro-gastos/plan-tareas.md`
- `specs/registro-gastos/plan-pruebas.md`

Fragmento de `plan-tareas.md`:

```markdown
- [ ] **T-02** Crear la tabla de gastos y su migracion.
  - Cubre: RF-01
  - Archivos: `db/migrations/...`, `app/models/gasto.py`
  - Verificacion: la migracion corre sin errores
  - Estimacion: 1 h

## Matriz de trazabilidad
| Requisito | Tareas | Pruebas |
|-----------|--------|---------|
| RF-01 | T-02, T-03 | PR-01 |
| RF-02 | T-05 | PR-02 |
```

Aprueba para continuar.

---

## Paso 4a. Escribir las pruebas

Escribes:

```
/pruebas registro-gastos
```

El `disenador-pruebas` lee los criterios de aceptacion y escribe pruebas automatizadas, una por
cada `CA-xx`, **antes** de que exista el codigo. Las ejecuta y probablemente **fallen (rojo)**:
eso es lo esperado y correcto. Te lo dira asi:

```
Escribi 2 pruebas de aceptacion y 1 de caso limite.
Resultado: 0 pasaron, 3 fallaron. Es lo esperado: el codigo aun no existe.
Las pruebas estan listas para que el desarrollador las haga pasar.
```

> Si el agente escribiera las pruebas **despues** del codigo, correria el riesgo de escribir pruebas
> que "encajan" con los posibles errores. Hacerlas antes, desde la spec, es lo que da independencia.

---

## Paso 4b. Implementar

Escribes:

```
/implementar registro-gastos
```

El `desarrollador` toma la primera tarea pendiente y:

1. Anuncia que tarea hara y que requisitos cubre.
2. Escribe el codigo (y pruebas unitarias si aplican).
3. Ejecuta pruebas y linter.
4. Corrige hasta que pasen, mostrando la salida real.
5. Marca la tarea `[x]` en `plan-tareas.md`.
6. Propone un mensaje de commit.

Veras algo como:

```
T-02: Crear la tabla de gastos y su migracion.
Ejecutando pruebas... 3 pasaron, 0 fallaron.
Ejecutando linter... sin errores.
Tarea marcada como completada.
Commit sugerido: feat: agrega tabla de gastos
```

Despues de cada tarea te pregunta si seguir con la siguiente (salvo que le hayas dicho "hazlas todas").

> Si el agente descubre que la especificacion esta incompleta o es ambigua, **se detiene** y te lo
> dice. No cambia el comportamiento por su cuenta. Tu decides si se actualiza el documento.

Repite `/implementar registro-gastos` (o deja que siga) hasta terminar las tareas.

---

## Paso 5. Verificacion independiente

Escribes:

```
/probar registro-gastos
```

El `verificador` trabaja **sin el contexto** de quien programo. Ejecuta las pruebas, comprueba cada
criterio de aceptacion, revisa la constitucion y escribe
`specs/registro-gastos/reporte-pruebas.md`.

Un fragmento:

```markdown
- **Veredicto:** APROBADO CON OBSERVACIONES

## 2. Cobertura de criterios de aceptacion
| Criterio | Prueba(s) | Resultado | Evidencia |
|----------|-----------|-----------|-----------|
| CA-01 | PR-01 | OK | pytest: 1 passed |
| CA-02 | PR-02 | OK | pytest: 1 passed |

## 3. Defectos encontrados
| ID | Severidad | Descripcion | Criterio afectado |
|----|-----------|-------------|-------------------|
| D-01 | Baja | Falta validar longitud de la nota | RF-01 |
```

### Si hay defectos

El verificador propone **nuevas tareas** en `plan-tareas.md`. Vuelves a `/implementar` para
corregirlas y luego repites `/probar`. Es un ciclo normal: no es un fracaso, es control de calidad.

### Si esta aprobado

Felicidades. La funcionalidad cumple lo prometido y esta probado.

---

## Paso 6. Commit

Revisa el mensaje de commit que propuso el agente y hazlo tu (el framework no commitea solo):

```powershell
git add .
git commit -m "feat: registro de gastos con resumen mensual"
```

---

## Ver el estado general

En cualquier momento:

```
/estado
```

Muestra una tabla como:

| Funcionalidad | Requerimientos | Arquitectura | Plan | Tareas hechas | Pruebas | Siguiente paso |
|---------------|----------------|--------------|------|---------------|---------|----------------|
| registro-gastos | Aprobado | Aprobado | Aprobado | 5/5 | APROBADO | `/requerimientos` (nueva) |

---

## Que hacer si una fase sale mal

- **Los requisitos no te convencen:** pide cambios antes de aprobar. No apruebes por inercia.
- **El arquitecto elige algo que no quieres:** rechazalo y pide alternativas; te las presentara con pros y contras.
- **El plan tiene tareas muy grandes:** pidele que las parta en tareas de menos de 2 horas.
- **Una prueba no verifica bien el criterio:** corre `/pruebas` de nuevo o pide ajustar el plan de pruebas.
- **El verificador encuentra defectos:** es buena senal; deja que se corrijan antes de seguir.

---

**En una frase:** el flujo es siempre el mismo: requerimientos, arquitectura, plan, pruebas, implementacion y verificacion, aprobando cada documento antes de avanzar.

**Siguiente paso:** [07-uso-diario.md](07-uso-diario.md) para el dia a dia.

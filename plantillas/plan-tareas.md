# Plan de tareas: [Nombre de la funcionalidad]

- **Estado:** Borrador | En revisión | Aprobado
- **Versión:** 1
- **Aprobado por:**
- **Fecha de aprobación:**
- **Basado en:** `requerimientos.md` y `arquitectura.md` (versión de cada uno)
- **Estimación total:** [horas]

## Reglas
- Cada tarea se puede completar y verificar en una sesión corta (idealmente < 2 h).
- Las tareas están en orden de dependencia.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.

## Fase 0: Preparación
- [ ] **T-01** Configurar el proyecto / rama `feature/<nombre>`.
  - Cubre: -
  - Verificación: el proyecto compila y el linter pasa.

## Fase 1: [Nombre]
- [ ] **T-02** [Descripción concreta]
  - Cubre: RF-01, CA-01
  - Archivos: `src/...`
  - Verificación: [prueba o comando que demuestra que funciona]
  - Estimación: [h]

## Fase final: Cierre
- [ ] **T-XX** Actualizar documentación (README, cambios de API).
- [ ] **T-XX** Revisión contra la "Definición de terminado" de la constitución.

## Matriz de trazabilidad
| Requisito | Tareas | Pruebas |
|-----------|--------|---------|
| RF-01 | T-02 | PR-01 |

# Plan de tareas: [Nombre de la funcionalidad]

- **Basado en:** `requerimientos.md` y `arquitectura.md`
- **Estimacion total:** [horas]

## Reglas
- Cada tarea se puede completar y verificar en una sesion corta (idealmente < 2 h).
- Las tareas estan en orden de dependencia.
- `[P]` indica que la tarea puede hacerse en paralelo con la anterior.

## Fase 0: Preparacion
- [ ] **T-01** Configurar el proyecto / rama `feature/<nombre>`.
  - Cubre: -
  - Verificacion: el proyecto compila y el linter pasa.

## Fase 1: [Nombre]
- [ ] **T-02** [Descripcion concreta]
  - Cubre: RF-01, CA-01
  - Archivos: `src/...`
  - Verificacion: [prueba o comando que demuestra que funciona]
  - Estimacion: [h]

## Fase final: Cierre
- [ ] **T-XX** Actualizar documentacion (README, cambios de API).
- [ ] **T-XX** Revision contra la "Definicion de terminado" de la constitucion.

## Matriz de trazabilidad
| Requisito | Tareas | Pruebas |
|-----------|--------|---------|
| RF-01 | T-02 | PR-01 |

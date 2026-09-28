# Proyecto de ejemplo: registro de gastos

Una funcionalidad completa hecha con el framework, la misma del tutorial del manual. Tiene dos usos.

## 1. Referencia

Muestra cómo queda cada documento cuando se usa el framework de verdad:

- `specs/registro-gastos/`: requerimientos (versión 2), arquitectura, planes, reporte del verificador
- `specs/registro-gastos/cambios/C-01-proveedor-opcional.md`: un cambio aplicado. En `requerimientos.md`,
  CA-03 aparece tachado y CA-05 es nuevo.
- `specs/registro-gastos/defectos.md`: un defecto corregido con `/arreglar` y su prueba de regresión
- `tests/aceptacion/`, `tests/regresion/`: pruebas nombradas con el ID del criterio o del defecto

## 2. Prueba de humo del framework

Si cambias el framework (scripts, plantillas o reglas), este ejemplo tiene que seguir pasando:

```powershell
cd ejemplo
node ../.sdd/verificar.mjs
node ../.sdd/metricas.mjs
```

El CI del repositorio del framework (`.github/workflows/framework.yml`) lo ejecuta en cada push.

### Prueba con un modelo (antes de publicar una versión)

Los scripts se prueban solos, pero los agentes no. Antes de etiquetar una versión nueva:

1. Copia `ejemplo/` a una carpeta temporal, inicializa git e instala el framework:
   `node herramientas/instalar.mjs <carpeta-temporal>`.
2. Abre opencode allí y ejecuta, por ejemplo,
   `/cambio registro-gastos quiero una nota con máximo 200 caracteres` y el flujo completo que siga.
3. Comprueba que `node .sdd/verificar.mjs` pasa y apunta en el `CHANGELOG` lo que observaste:
   si el analista aplicó bien el delta, cuántas veces tuviste que corregir a un agente y la salida de
   `node .sdd/metricas.mjs`.

Repetir la misma prueba en cada versión permite comparar si un cambio en el framework ayudó o empeoró.

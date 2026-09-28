# Registro de defectos: Registro de gastos

| ID | Fecha | Criterio incumplido | Descripción | Causa raíz | Prueba de regresión | Commit sugerido |
|----|-------|---------------------|-------------|------------|---------------------|-----------------|
| D-01 | 2026-09-21 | CA-04 | "Insumos " e "Insumos" aparecían como categorías distintas en el resumen | La categoría no se normalizaba al registrar | `tests/regresion/registro-gastos/d01.test.mjs` | `fix: normaliza la categoría al registrar gastos` |

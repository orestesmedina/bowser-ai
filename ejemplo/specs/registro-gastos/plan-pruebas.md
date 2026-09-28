# Plan de pruebas: Registro de gastos

- **Estado:** Aprobado
- **Versión:** 2
- **Aprobado por:** Dueño del restaurante (ejemplo)
- **Fecha de aprobación:** 2026-09-20

## 2. Casos de prueba
| ID | Criterio (CA) | Tipo | Precondiciones | Pasos | Resultado esperado |
|----|---------------|------|----------------|-------|--------------------|
| PR-01 | CA-01 | Unitaria | Lista vacía | Registrar un gasto válido | La lista tiene el gasto |
| PR-02 | CA-02 | Unitaria | Lista vacía | Registrar montos 0, -500 y 10.5 | Los tres se rechazan con un mensaje sobre el monto |
| PR-04 | CA-04 | Unitaria | Gastos de dos meses y dos categorías | Pedir el resumen de 2026-09 | Totales por categoría solo de septiembre |
| PR-05 | CA-05 | Unitaria | Lista vacía | Registrar un gasto sin proveedor | Se guarda con proveedor vacío |

## 4. Datos de prueba
Montos y proveedores ficticios.

## 5. Criterios de salida
- 100 % de los criterios de aceptación con al menos una prueba pasando.

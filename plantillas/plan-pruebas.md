# Plan de pruebas: [Nombre de la funcionalidad]

## 1. Estrategia
- **Unitarias:** logica de negocio aislada.
- **Integracion:** API, base de datos y servicios externos.
- **End-to-end:** flujos completos del usuario (si aplica).
- **Manuales:** lo que no se puede automatizar razonablemente.

## 2. Casos de prueba
| ID | Criterio (CA) | Tipo | Precondiciones | Pasos | Resultado esperado |
|----|---------------|------|----------------|-------|--------------------|
| PR-01 | CA-01 | Unitaria | ... | ... | ... |
| PR-02 | CA-02 | Integracion | ... | ... | ... |

## 3. Casos limite y de error
- Entradas vacias, invalidas o muy grandes.
- Fallos de servicios externos.
- Permisos insuficientes.

## 4. Datos de prueba
Nunca usar datos personales reales. Describe los datos ficticios necesarios.

## 5. Criterios de salida
- 100 % de los criterios de aceptacion con al menos una prueba pasando.
- Sin errores criticos abiertos.

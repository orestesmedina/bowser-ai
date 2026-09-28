# Plan de pruebas: [Nombre de la funcionalidad]

- **Estado:** Borrador | En revisión | Aprobado
- **Versión:** 1
- **Aprobado por:**
- **Fecha de aprobación:**

## 1. Estrategia
- **Unitarias:** lógica de negocio aislada.
- **Integración:** API, base de datos y servicios externos.
- **End-to-end:** flujos completos del usuario (si aplica).
- **Manuales:** lo que no se puede automatizar razonablemente.

## 2. Casos de prueba
| ID | Criterio (CA) | Tipo | Precondiciones | Pasos | Resultado esperado |
|----|---------------|------|----------------|-------|--------------------|
| PR-01 | CA-01 | Unitaria | ... | ... | ... |
| PR-02 | CA-02 | Integración | ... | ... | ... |

## 3. Casos límite y de error
- Entradas vacías, inválidas o muy grandes.
- Fallos de servicios externos.
- Permisos insuficientes.

## 4. Datos de prueba
Nunca usar datos personales reales. Describe los datos ficticios necesarios.

## 5. Criterios de salida
- 100 % de los criterios de aceptación con al menos una prueba pasando.
- Sin errores críticos abiertos.

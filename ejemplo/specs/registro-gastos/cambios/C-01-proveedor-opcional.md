# Cambio C-01: Proveedor opcional

- **Funcionalidad:** `specs/registro-gastos/`
- **Estado:** Aplicado
- **Aprobado por:** Dueño del restaurante (ejemplo)
- **Fecha de aprobación:** 2026-09-20
- **Versión de requerimientos.md antes del cambio:** 1

## 1. Motivo
Muchos gastos pequeños (mercado, taxi) no tienen un proveedor identificable y hoy no se pueden registrar.

## 2. Delta de requisitos

### Añadidos
- **CA-05 (RF-01):** CUANDO se registra un gasto sin proveedor, EL SISTEMA DEBE guardarlo con el proveedor vacío.

### Modificados
| ID | Antes | Después |
|----|-------|---------|
| RF-01 | ... con fecha, monto, categoría, proveedor y nota opcional. | ... con fecha, monto, categoría, proveedor opcional y nota opcional. |

### Eliminados
| ID | Motivo |
|----|--------|
| CA-03 | El proveedor deja de ser obligatorio. |

## 3. Impacto
- **Arquitectura:** ninguno.
- **Datos existentes:** ninguno; los gastos anteriores ya tienen proveedor.
- **Pruebas de aceptación afectadas:** se elimina la prueba de CA-03 y se añade la de CA-05.
- **Otras funcionalidades afectadas:** ninguna.

## 4. Fuera de alcance
Catálogo de proveedores.

## 5. Supuestos y preguntas abiertas
- Ninguna.

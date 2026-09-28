# Requerimientos: Registro de gastos

- **Estado:** Aprobado
- **Versión:** 2
- **Aprobado por:** Dueño del restaurante (ejemplo)
- **Fecha de aprobación:** 2026-09-20
- **Cliente / solicitante:** Restaurante de ejemplo
- **Fecha:** 2026-09-15

## 1. Contexto y problema
El dueño anota unos 15 gastos diarios en un cuaderno y tarda unas 4 horas en cerrar el mes.

## 2. Objetivos y métricas de éxito
- Objetivo: cerrar el mes más rápido -> Métrica: de 4 h a 30 min el resumen mensual.

## 3. Usuarios y roles
| Rol | Descripción | Permisos principales |
|-----|-------------|----------------------|
| Dueño | Único usuario | Registrar gastos y ver el resumen |

## 4. Historias de usuario
- **HU-01:** Como dueño, quiero anotar cada gasto al momento, para no perder recibos.
- **HU-02:** Como dueño, quiero ver cuánto gasté por categoría en un mes, para controlar costos.

## 5. Requisitos funcionales
- **RF-01:** El sistema debe permitir registrar un gasto con fecha, monto, categoría, proveedor opcional y nota opcional. (modificado en C-01)
- **RF-02:** El sistema debe mostrar el total gastado por categoría en un mes dado.

## 6. Requisitos no funcionales
- **RNF-01 (Precisión):** Los montos se guardan como enteros en centavos; las sumas no tienen errores de redondeo.

## 7. Criterios de aceptación
- **CA-01 (RF-01):** CUANDO se registra un gasto con fecha, monto mayor que cero y categoría, EL SISTEMA DEBE guardarlo.
- **CA-02 (RF-01, caso de error):** SI el monto es cero, negativo o no es un número entero de centavos, ENTONCES EL SISTEMA DEBE rechazarlo con un mensaje claro.
- ~~**CA-03 (RF-01, caso de error):** SI falta el proveedor, ENTONCES EL SISTEMA DEBE rechazar el registro.~~ (eliminado en C-01)
- **CA-04 (RF-02, RNF-01):** CUANDO se pide el resumen de un mes, EL SISTEMA DEBE sumar por categoría solo los gastos de ese mes, sin errores de redondeo.
- **CA-05 (RF-01) (C-01):** CUANDO se registra un gasto sin proveedor, EL SISTEMA DEBE guardarlo con el proveedor vacío.

## 8. Fuera de alcance
- Varios usuarios, fotos de recibos, exportación a contabilidad.

## 9. Supuestos y preguntas abiertas
- **Supuesto:** una sola moneda (colones).

## 10. Integraciones y datos
Ninguna integración. Sin datos personales.

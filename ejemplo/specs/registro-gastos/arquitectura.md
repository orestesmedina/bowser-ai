# Arquitectura: Registro de gastos

- **Estado:** Aprobado
- **Versión:** 1
- **Aprobado por:** Dueño del restaurante (ejemplo)
- **Fecha de aprobación:** 2026-09-16
- **Basado en:** `requerimientos.md` (versión 1)

## 1. Resumen de la solución
Un módulo sin dependencias (`src/gastos.mjs`) con dos funciones puras: registrar un gasto validado
y calcular el resumen mensual. La persistencia queda fuera de este ejemplo.

## 3. Componentes
| Componente | Responsabilidad | Tecnología | Requisitos que cubre |
|------------|-----------------|------------|----------------------|
| `registrarGasto` | Validar y añadir un gasto | JavaScript (Node) | RF-01, RNF-01 |
| `resumenMensual` | Sumar por categoría los gastos de un mes | JavaScript (Node) | RF-02, RNF-01 |

## 7. Decisiones de arquitectura (ADR)
### ADR-01: Montos en centavos enteros
- **Contexto:** los decimales en punto flotante producen errores de redondeo.
- **Decisión:** guardar y sumar enteros de centavos.
- **Alternativas consideradas:** `number` con decimales; biblioteca de decimales.
- **Consecuencias:** hay que convertir al mostrar; ninguna dependencia nueva.

## 9. Dependencias nuevas
Ninguna.

## 11. Cumplimiento de la constitución
Sin excepciones.

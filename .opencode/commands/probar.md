---
description: Fase 5 - Verificacion independiente contra los criterios de aceptacion
agent: verificador
---

Funcionalidad: $ARGUMENTS

Verifica sin el contexto de quien implemento. Trabaja contra los criterios de aceptacion
y la constitucion, no contra el plan de tareas.

Pasos:
1. Lee `specs/$ARGUMENTS/requerimientos.md`, `plan-pruebas.md` y `docs/constitucion.md`.
2. Verifica cada criterio de aceptacion ejecutando las pruebas y capturando la salida real.
   Si falta una prueba, escribela y ejecutala.
3. Prueba casos limite y de error no cubiertos.
4. Revisa el codigo contra la constitucion (estilo, seguridad, secretos, datos personales).
5. Escribe `specs/$ARGUMENTS/reporte-pruebas.md` segun `plantillas/reporte-pruebas.md`, con evidencia real.
6. Muestra el veredicto, los defectos y las recomendaciones.
   Si hay defectos, propone nuevas tareas en `plan-tareas.md` para corregirlos y sugiere `/implementar`.

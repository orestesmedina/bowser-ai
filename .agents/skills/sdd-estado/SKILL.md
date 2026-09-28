---
name: sdd-estado
description: "Muestra en qué fase está cada funcionalidad de specs/, los cambios pendientes, los defectos corregidos, los faltantes de trazabilidad y el comando exacto a ejecutar después. Úsala al retomar el trabajo o cuando el usuario pregunte por el estado del proyecto."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-estado

- **Rol recomendado:** cualquiera (solo lectura)
- **Entrada:** nada
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Revisa todas las carpetas en `specs/` y muestra una tabla con:

| Funcionalidad | Requerimientos | Arquitectura | Plan | Tareas hechas | Pruebas | Siguiente paso |

- Para cada documento indica: no existe / borrador / en revisión / aprobado.
- Si un documento dice **Aprobado** pero tiene cambios sin commit (`git status`) que no sean
  solo tareas marcadas `[x]`, indícalo como `aprobado*` y avisa que hay cambios sin revisar.
- Si un documento dice **Aprobado** pero le faltan "Aprobado por" o "Fecha", indícalo como `aprobado?`.
- En "Tareas hechas" usa el formato `completadas/total` según `plan-tareas.md`.
- En "Pruebas" usa el veredicto de `reporte-pruebas.md`, si existe.
- Si hay cambios en `specs/<nombre>/cambios/` que no estén **Aplicado**, indícalos (ID y estado) y
  el siguiente paso de cada uno.
- Si existe `specs/<nombre>/defectos.md`, indica cuántos defectos se corrigieron.
- Si hay código en el proyecto pero no existe `docs/sistema.md`, sugiere `/mapear`.
- En "Siguiente paso" indica el comando exacto a ejecutar.
- Si puedes ejecutar comandos, corre `node .sdd/trazabilidad.mjs` y resume debajo de la tabla los faltantes que reporte.

No modifiques ningún archivo.

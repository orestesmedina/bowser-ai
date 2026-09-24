---
description: Fase 2 - Disena la arquitectura tecnica a partir de requerimientos aprobados
agent: arquitecto
---

Funcionalidad: $ARGUMENTS

Pasos:
1. Verifica que `specs/$ARGUMENTS/requerimientos.md` exista y este **Aprobado**. Si no, detente y avisa.
2. Lee `docs/constitucion.md`, `plantillas/arquitectura.md` y explora el codigo existente del proyecto
   para respetar su estructura y convenciones.
3. Si hay decisiones importantes con varias opciones razonables, presentalas con pros y contras
   y pide al usuario que elija antes de continuar.
4. Crea `specs/$ARGUMENTS/arquitectura.md` segun la plantilla. Cada componente indica que requisitos cubre;
   todo requisito debe quedar cubierto.
5. Registra las decisiones como ADR y justifica cualquier excepcion a la constitucion.
6. Pide revision y aprobacion. Al aprobar, marca **Aprobado** y sugiere `/planificar $ARGUMENTS`.

No escribas codigo de produccion en esta fase.

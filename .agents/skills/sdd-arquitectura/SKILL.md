---
name: sdd-arquitectura
description: "Fase 2 del flujo SDD: diseña o actualiza specs/<nombre>/arquitectura.md (componentes, datos, API, ADR, dependencias verificadas, riesgos) a partir de requerimientos aprobados. Úsala después de aprobar los requerimientos o tras un cambio que afecte al diseño."
metadata:
  framework: mi-framework-sdd
  version: "0.3.0"
---

# sdd-arquitectura

- **Rol recomendado:** arquitecto (solo escribe en `specs/`)
- **Entrada:** el nombre de la funcionalidad
- **Reglas generales:** `AGENTS.md` (aprobaciones, harness, seguridad) y `docs/constitucion.md`

Pasos:
1. Verifica que `specs/<nombre>/requerimientos.md` exista y esté **Aprobado**. Si no, detente y avisa.
2. Lee `docs/constitucion.md`, `plantillas/arquitectura.md`, `docs/sistema.md` (si existe) y explora el código
   existente del proyecto para respetar su estructura y convenciones.
   - **Si `arquitectura.md` ya existe** (vienes de un `/cambio`): léelo junto con el cambio aplicado en
     `specs/<nombre>/cambios/`, actualiza solo lo afectado, añade un ADR si la decisión cambia,
     incrementa su "Versión" y déjalo **En revisión**.
3. Si hay decisiones importantes con varias opciones razonables, preséntalas con pros y contras
   y pide al usuario que elija antes de continuar.
4. Crea `specs/<nombre>/arquitectura.md` según la plantilla. Cada componente indica que requisitos cubre;
   todo requisito debe quedar cubierto.
5. Registra las decisiones como ADR y justifica cualquier excepción a la constitución.
6. Pide revisión y aprobación. Cuando el usuario lo apruebe explícitamente, marca **Aprobado**,
   completa el registro de aprobación según `AGENTS.md` y sugiere `/planificar <nombre>`.

No escribas código de producción en esta fase.

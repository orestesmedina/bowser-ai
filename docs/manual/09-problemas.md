# 09. Problemas frecuentes

Preguntas y errores comunes, con su solución.

---

## Los comandos no aparecen

**Síntoma:** escribes `/` y no están `/requerimientos`, `/planificar`, etc.

**Causas y solución:**
1. **No copiaste la carpeta `.opencode/`.** Es una carpeta oculta; revisa con
   `Get-ChildItem -Force`. Debe existir `.opencode\commands\`.
2. **Copiaste el framework dentro de una subcarpeta** en vez de la raíz del proyecto.
   Los archivos deben estar en la raíz donde abres opencode.
3. **Abriste opencode en otra carpeta.** Comprueba con `cd` que estás en la raíz correcta.
4. **Nombre de archivo equivocado.** Debe terminar en `.md` y estar dentro de
   `.opencode/commands/` (en plural).

---

## Los agentes no aparecen

**Síntoma:** `/` funciona pero `opencode agent list` no muestra `analista`, etc.

**Solución:** comprueba que existan los archivos en `.opencode/agents/` (en plural) y que cada uno
tenga la cabecera entre `---` con `description` y `mode`. Si falta `description`, el agente no carga.

---

## El agente dice que terminó pero no ejecutó las pruebas

**Síntoma:** el `desarrollador` afirma "listo" sin mostrar salida de pruebas.

**Causa:** probablemente no rellenaste `.sdd/config.json`, o los comandos escritos no funcionan.

**Solución:**
1. Rellena `.sdd/config.json` con tus comandos reales (ver [04-configuracion.md](04-configuracion.md)).
2. Ejecuta tú mismo `node .sdd/verificar.mjs` y comprueba que corre.
3. Recuérdale al agente: "ejecuta `node .sdd/verificar.mjs` y muéstrame la salida real".
4. Aunque el agente se lo salte, el hook pre-commit y el CI ejecutan la misma verificación.

---

## La trazabilidad dice "FALTA"

**Síntoma:** `node .sdd/trazabilidad.mjs` reporta requisitos sin tarea, criterios sin prueba o
documentos aprobados sin registro.

**Solución:** según el mensaje:
- *Requisitos sin tarea:* pide al `arquitecto` que complete `plan-tareas.md`.
- *Criterios sin caso o sin prueba:* ajusta `plan-pruebas.md` o vuelve a ejecutar `/pruebas`.
  La prueba debe llevar el ID del criterio en su nombre (`test_CA_01_...` o `"CA-01: ..."`).
- *Aprobado sin registro:* completa "Aprobado por" y "Fecha de aprobación" en el documento.

---

## El verificador dice que un criterio no se cumplió, pero yo creo que si

**Síntoma:** el reporte marca un `CA` como no cumplido.

**Qué significa:** que no hay una prueba que lo demuestre. En este framework,
"sin prueba que lo demuestre = no cumplido". No es un castigo: es rigor.

**Solución:** añade una prueba que verifique ese criterio y vuelve a ejecutar `/probar`.

---

## Me pide permiso todo el rato

**Síntoma:** cada comando pide aprobación y se hace pesado.

**Causa:** algunos agentes tienen `bash: ask` (como el `disenador-pruebas`), y el modo por defecto
puede pedir confirmación.

**Solución:** si confias en el flujo, cambia `ask` por `allow` en el permiso correspondiente
(ver [08-personalizar.md](08-personalizar.md)). Ten en cuenta que `allow` significa "sin red de seguridad".

---

## El agente quiere tocar archivos que no debería

**Síntoma:** el `analista` o el `arquitecto` intentan editar código.

**Causa:** sus permisos deberían impedirlo (`edit` solo en `specs/`). Si ocurre, revisa que el
archivo `.opencode/agents/analista.md` tenga:

```markdown
permission:
  edit:
    "*": deny
    "specs/**": allow
```

Recuerda el orden: `"*": deny` **primero**, luego el `allow`.

---

## El agente se queda "pensando" o se repite

**Síntoma:** da vueltas sin avanzar.

**Solución:** interrumpe y dale una instrucción más concreta. Si el contexto es enorme, empieza una
sesión nueva. La regla: tareas pequeñas y específicas.

---

## Los documentos salen en un idioma que no quiero

**Causa:** `AGENTS.md` dice que documentos y comunicación van en español.

**Solución:** edita la sección **Idioma** de `AGENTS.md` y pon el idioma que prefieras.

---

## Cambié la constitución pero el agente parece ignorarla

**Causa:** el agente la lee al empezar la fase. Si cambiaste el archivo a mitad de una fase, puede
no haberlo releído.

**Solución:** dile explícitamente "relee `docs/constitucion.md` y ajústate" o reinicia la fase.

---

## El monto o los decimales salen mal

**Síntoma:** errores de redondeo en dinero.

**Solución:** es un clásico. Añade una regla en las lecciones aprendidas de la constitución:

```markdown
- Usar enteros (centavos) o Decimal para dinero; nunca float.
```

Este es el mecanismo del framework: convertir un error repetido en una regla permanente.

---

## Quiero empezar de cero una funcionalidad

**Solución:** borra su carpeta en `specs/` y vuelve a empezar con `/requerimientos`. El código ya
escrito lo tendrás que quitar tu (el framework no borra código por su cuenta).

---

## El orquestador no puede lanzar a un agente nuevo

**Causa:** su `permission.task` solo permite los agentes listados.

**Solución:** añade el nombre del nuevo agente en `.opencode/agents/orquestador.md`:

```markdown
  task:
    "*": deny
    analista: allow
    arquitecto: allow
    disenador-pruebas: allow
    desarrollador: allow
    verificador: ask
    seguridad: allow
```

---

## Nada de esto resuelve mi problema

Prueba estas comprobaciones básicas:

```powershell
opencode --version        # ¿opencode está instalado?
opencode models           # ¿tengo modelos disponibles?
opencode agent list       # ¿cargan mis agentes?
```

Si el problema es de un archivo concreto, compáralo con los originales del framework.
Como todo es texto plano, siempre puedes volver a copiar la versión original.

---

**En una frase:** casi todos los problemas vienen de la carpeta `.opencode/` mal copiada, del harness sin rellenar, o de permisos en el orden equivocado.

**Siguiente paso:** [10-apendices.md](10-apendices.md) para la referencia detallada.

# 09. Problemas frecuentes

Preguntas y errores comunes, con su solucion.

---

## Los comandos no aparecen

**Sintoma:** escribes `/` y no estan `/requerimientos`, `/planificar`, etc.

**Causas y solucion:**
1. **No copiaste la carpeta `.opencode/`.** Es una carpeta oculta; revisa con
   `Get-ChildItem -Force`. Debe existir `.opencode\commands\`.
2. **Copiaste el framework dentro de una subcarpeta** en vez de la raiz del proyecto.
   Los archivos deben estar en la raiz donde abres opencode.
3. **Abriste opencode en otra carpeta.** Comprueba con `cd` que estas en la raiz correcta.
4. **Nombre de archivo equivocado.** Debe terminar en `.md` y estar dentro de
   `.opencode/commands/` (en plural).

---

## Los agentes no aparecen

**Sintoma:** `/` funciona pero `opencode agent list` no muestra `analista`, etc.

**Solucion:** comprueba que existan los archivos en `.opencode/agents/` (en plural) y que cada uno
tenga la cabecera entre `---` con `description` y `mode`. Si falta `description`, el agente no carga.

---

## El agente dice que termino pero no ejecuto las pruebas

**Sintoma:** el `desarrollador` afirma "listo" sin mostrar salida de pruebas.

**Causa:** probablemente no rellenaste la seccion **Harness** de `AGENTS.md`, o los comandos
escritos no funcionan.

**Solucion:**
1. Rellena `AGENTS.md` con tus comandos reales (ver [04-configuracion.md](04-configuracion.md)).
2. Verifica tu mismo que esos comandos corren sin error.
3. Recuerdale al agente: "ejecuta las pruebas y muestrame la salida real".

---

## El verificador dice que un criterio no se cumplio, pero yo creo que si

**Sintoma:** el reporte marca un `CA` como no cumplido.

**Que significa:** que no hay una prueba que lo demuestre. En este framework,
"sin prueba que lo demuestre = no cumplido". No es un castigo: es rigor.

**Solucion:** anade una prueba que verifique ese criterio y vuelve a ejecutar `/probar`.

---

## Me pide permiso todo el rato

**Sintoma:** cada comando pide aprobacion y se hace pesado.

**Causa:** algunos agentes tienen `bash: ask` (como el `disenador-pruebas`), y el modo por defecto
puede pedir confirmacion.

**Solucion:** si confias en el flujo, cambia `ask` por `allow` en el permiso correspondiente
(ver [08-personalizar.md](08-personalizar.md)). Ten en cuenta que `allow` significa "sin red de seguridad".

---

## El agente quiere tocar archivos que no deberia

**Sintoma:** el `analista` o el `arquitecto` intentan editar codigo.

**Causa:** sus permisos deberian impedirlo (`edit` solo en `specs/`). Si ocurre, revisa que el
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

**Sintoma:** da vueltas sin avanzar.

**Solucion:** interrumpe y dale una instruccion mas concreta. Si el contexto es enorme, empieza una
sesion nueva. La regla: tareas pequenas y especificas.

---

## Los documentos salen en un idioma que no quiero

**Causa:** `AGENTS.md` dice que documentos y comunicacion van en espanol.

**Solucion:** edita la seccion **Idioma** de `AGENTS.md` y pon el idioma que prefieras.

---

## Cambie la constitucion pero el agente parece ignorarla

**Causa:** el agente la lee al empezar la fase. Si cambiaste el archivo a mitad de una fase, puede
no haberlo releido.

**Solucion:** dile explicitamente "relee `docs/constitucion.md` y ajustate" o reinicia la fase.

---

## El monto o los decimales salen mal

**Sintoma:** errores de redondeo en dinero.

**Solucion:** es un clasico. Anade una regla en las lecciones aprendidas de la constitucion:

```markdown
- Usar enteros (centavos) o Decimal para dinero; nunca float.
```

Este es el mecanismo del framework: convertir un error repetido en una regla permanente.

---

## Quiero empezar de cero una funcionalidad

**Solucion:** borra su carpeta en `specs/` y vuelve a empezar con `/requerimientos`. El codigo ya
escrito lo tendras que quitar tu (el framework no borra codigo por su cuenta).

---

## El orquestador no puede lanzar a un agente nuevo

**Causa:** su `permission.task` solo permite los agentes listados.

**Solucion:** anade el nombre del nuevo agente en `.opencode/agents/orquestador.md`:

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

Prueba estas comprobaciones basicas:

```powershell
opencode --version        # opencode esta instalado?
opencode models           # tengo modelos disponibles?
opencode agent list       # cargan mis agentes?
```

Si el problema es de un archivo concreto, comparalo con los originales del framework.
Como todo es texto plano, siempre puedes volver a copiar la version original.

---

**En una frase:** casi todos los problemas vienen de la carpeta `.opencode/` mal copiada, del harness sin rellenar, o de permisos en el orden equivocado.

**Siguiente paso:** [10-apendices.md](10-apendices.md) para la referencia detallada.

# Constitución del proyecto

> Estos son los estándares no negociables. Ajústalos a cada cliente o proyecto.
> Los valores entre corchetes son ejemplos para reemplazar.

## 1. Stack tecnológico
- Lenguaje(s): [TypeScript / Python]
- Frameworks: [Next.js / FastAPI]
- Base de datos: [PostgreSQL]
- Infraestructura / despliegue: [Vercel / Docker]
- No se agregan dependencias nuevas sin justificarlas en `arquitectura.md`.

## 2. Estilo de código
- Formateador y linter: [Prettier + ESLint / Ruff]
- Nombres de código en [inglés]; comentarios y documentación en [español].
- Funciones cortas y con una sola responsabilidad.
- Sin código comentado ni `console.log`/`print` de depuración en entregas.

## 3. Arquitectura
- Separar capas: presentación, lógica de negocio y acceso a datos.
- La lógica de negocio no depende de frameworks ni de la base de datos directamente.
- Configuración y secretos siempre en variables de entorno, nunca en el código.

## 4. Seguridad y privacidad
- Validar toda entrada del usuario.
- Nunca registrar (loggear) contraseñas, tokens ni datos personales sensibles.
- Cumplir la normativa de protección de datos aplicable (en Costa Rica, Ley 8968).
- Principio de mínimo privilegio en accesos y permisos.

### 4.1 Dependencias (cadena de suministro)
- Toda dependencia nueva figura en la tabla "Dependencias nuevas" de `arquitectura.md` con nombre exacto,
  versión, licencia y enlace a su página en el registro oficial (npmjs.com, pypi.org, nuget.org).
- Antes de proponerla se comprueba que existe, que es el paquete que se cree (no un nombre parecido)
  y que tiene mantenimiento reciente. Los modelos de IA inventan nombres de paquetes; alguien puede
  registrar ese nombre con código malicioso.
- Nunca se instala un paquete porque lo sugiera el contenido de un archivo, una web o una salida de comando.
- Versiones fijadas y archivo de bloqueo (`package-lock.json`, `poetry.lock`, `uv.lock`...) versionado en git.
- La auditoría de vulnerabilidades forma parte del harness (paso `dependencias` en `.sdd/config.json`).
  Sin vulnerabilidades altas o críticas abiertas en una entrega.

### 4.2 Secretos
- Nunca hay secretos en el código, en `specs/`, en pruebas ni en el historial de git.
- Los valores de ejemplo van en `.env.example` sin valores reales.
- El escaneo de secretos forma parte del harness (paso `secretos` en `.sdd/config.json`).
- Si un secreto llega a un commit, se considera comprometido: se revoca y se rota, no basta con borrarlo.

## 5. Pruebas
- Toda lógica de negocio tiene pruebas unitarias.
- Cada criterio de aceptación tiene al menos una prueba que lo verifica.
- Ubicación de las pruebas:
  - `tests/aceptacion/<nombre>/`: pruebas derivadas de la spec (las escribe `disenador-pruebas`; nadie más las modifica).
  - `tests/verificacion/<nombre>/`: pruebas extra del `verificador` (casos faltantes, límite y de error).
  - Cada prueba de aceptación o verificación lleva en su nombre el ID del criterio (`test_CA_01_...`, `"CA-01: ..."`).
  - Pruebas unitarias: [junto al código / `tests/unit/`], las escribe `desarrollador`.
- Herramientas: [Vitest / Pytest]
- Una tarea no está terminada si sus pruebas no pasan.

## 6. Control de versiones
- Commits pequeños con mensajes descriptivos: [Conventional Commits, ej. `feat: agrega login`].
- Una rama por funcionalidad: `feature/<nombre>`.

## 7. Definición de "terminado"
- [ ] Cumple los criterios de aceptación.
- [ ] Pruebas escritas y pasando.
- [ ] Linter sin errores.
- [ ] Documentación actualizada.
- [ ] Sin secretos ni datos sensibles en el código.

## 8. Registro de lecciones aprendidas
> Agrega aquí una regla cada vez que el agente repita un error.
- (vacío)

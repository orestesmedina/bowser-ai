# Constitucion del proyecto

> Estos son los estandares no negociables. Ajustalos a cada cliente o proyecto.
> Los valores entre corchetes son ejemplos para reemplazar.

## 1. Stack tecnologico
- Lenguaje(s): [TypeScript / Python]
- Frameworks: [Next.js / FastAPI]
- Base de datos: [PostgreSQL]
- Infraestructura / despliegue: [Vercel / Docker]
- No se agregan dependencias nuevas sin justificarlas en `arquitectura.md`.

## 2. Estilo de codigo
- Formateador y linter: [Prettier + ESLint / Ruff]
- Nombres de codigo en [ingles]; comentarios y documentacion en [espanol].
- Funciones cortas y con una sola responsabilidad.
- Sin codigo comentado ni `console.log`/`print` de depuracion en entregas.

## 3. Arquitectura
- Separar capas: presentacion, logica de negocio y acceso a datos.
- La logica de negocio no depende de frameworks ni de la base de datos directamente.
- Configuracion y secretos siempre en variables de entorno, nunca en el codigo.

## 4. Seguridad y privacidad
- Validar toda entrada del usuario.
- Nunca registrar (loggear) contrasenas, tokens ni datos personales sensibles.
- Cumplir la normativa de proteccion de datos aplicable (en Costa Rica, Ley 8968).
- Principio de minimo privilegio en accesos y permisos.

## 5. Pruebas
- Toda logica de negocio tiene pruebas unitarias.
- Cada criterio de aceptacion tiene al menos una prueba que lo verifica.
- Herramientas: [Vitest / Pytest]
- Una tarea no esta terminada si sus pruebas no pasan.

## 6. Control de versiones
- Commits pequenos con mensajes descriptivos: [Conventional Commits, ej. `feat: agrega login`].
- Una rama por funcionalidad: `feature/<nombre>`.

## 7. Definicion de "terminado"
- [ ] Cumple los criterios de aceptacion.
- [ ] Pruebas escritas y pasando.
- [ ] Linter sin errores.
- [ ] Documentacion actualizada.
- [ ] Sin secretos ni datos sensibles en el codigo.

## 8. Registro de lecciones aprendidas
> Agrega aqui una regla cada vez que el agente repita un error.
- (vacio)

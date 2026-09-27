# Krak Real Estate

Repo de trabajo para Krak Real Estate. Integra la skill `trello` (compartida
con el proyecto MarceClaude) para consultar los tableros de Trello del
workspace de Marce, con foco en el tablero **Krak Real Estate**.

- Skill de Trello: `.claude/skills/trello/SKILL.md`
- Reglas de operación por tablero: `memory/context/trello-tableros.md`
- Contexto de proyectos por empresa: `memory/projects/empresas.md`

En este repo, el tablero de Trello **Krak Real Estate** es de solo lectura
para Claude (ver la regla de alcance en la skill) — es el calendario de
contenido operado por el equipo de la agencia.

## Regla de accesos externos — SIEMPRE

Si Marce pasa una referencia web (link, canal, sitio, plataforma) y el entorno
no puede acceder, **no se debe ejecutar la tarea con un sustituto ni dejar el
punto como "no pude revisarlo" en el entregable**. Hay que avisarle antes de
avanzar, indicando:

1. Qué URL exacta falló y con qué error.
2. Si es bloqueo de red del entorno, falta de credencial o el recurso no existe.
3. Qué vías alternativas existen y cuál necesita acción de él.

Recién después de esa respuesta se sigue. El motivo es suyo: puede ser una
cuestión de configuración o de permisos que él resuelve en el momento.

Esto aplica también a lo que se descubre a mitad de una tarea, no solo al
arranque. Ver el estado verificado de accesos en `memory/context/accesos-red.md`.

## Campaña de naves industriales — Krak Industrial

Trabajo en curso. **Antes de tocar cualquier cosa de esta campaña, leer
`memory/projects/campana-naves-industriales.md`** — tiene el estado completo,
la cartera, la economía, los dolores validados y los pendientes.

Los entregables están en `marketing/naves-industriales/`. El documento más
vivo es `guiones-y-decisiones.md`: ahí están las decisiones de copy tomadas
sobre los guiones en producción, y en varios casos corrigen lo que dicen los
kits.

### Reglas de copy que no se negocian

1. **Modo capacidad, nunca modo carencia.** No se debe decir "si ninguna te
   sirve, la buscamos": eso admite que no tenemos lo que el cliente necesita.
   Se dice "y acceso a todo el corredor". Cómo se consigue la nave es método
   interno y no se publicita.
2. **Lo técnico es prueba, no gancho.** Altura libre, capacidad de piso, kVA,
   garantías, expensas y comisión no son dolores: son especificaciones. Van en
   el cuerpo del anuncio, nunca en la primera línea.
3. **No se debe inventar escasez.** Sin disponibilidad real desde Tokko, no
   hay contador ni "últimas unidades".
4. **No se debe usar render ni banco de imágenes** para representar una nave
   concreta. Foto real o no sale.
5. **El Kit A no se modifica.** Queda intacto como término de comparación
   contra el Kit B.

### Dato que se equivoca seguido

El Camino del Buen Ayre es corredor **Oeste**, no Norte. El Norte va por
Panamericana y Ruta 9.

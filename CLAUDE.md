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

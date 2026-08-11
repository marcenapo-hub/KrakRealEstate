# Krak Real Estate

Repo de trabajo para Krak Real Estate. Integra la skill `trello` (compartida
con el proyecto MarceClaude) para consultar los tableros de Trello del
workspace de Marce, con foco en el tablero **Krak Real Estate**.

- Skill de Trello: `.claude/skills/trello/SKILL.md`
- Reglas de operación por tablero: `memory/context/trello-tableros.md`
- Contexto de proyectos por empresa: `memory/projects/empresas.md`
- Dashboard de seguimiento de la Jornada de Ventas en Equipo (quincenal,
  compromisos de agentes): `memory/context/ventas-dashboard.md` — incluye
  el proceso para procesar transcripciones de Gemini y la URL del artifact
  publicado. Datos en `data/ventas-reuniones.json`, generador en
  `scripts/build_dashboard.py`.

En este repo, el tablero de Trello **Krak Real Estate** es de solo lectura
para Claude (ver la regla de alcance en la skill) — es el calendario de
contenido operado por el equipo de la agencia.

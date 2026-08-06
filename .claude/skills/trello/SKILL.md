---
name: trello
description: Consultar los tableros de Trello del workspace de Marce vía la API REST de Trello, con foco en Krak Real Estate. Usar esta skill siempre que el usuario mencione Trello, un tablero, tarjetas, listas, vencimientos, o pida un resumen del estado de algún cliente/proyecto gestionado en Trello — aunque no diga la palabra "Trello" explícitamente (ej. "¿qué hay vencido de Krak RE?", "resumen del calendario de contenido").
---

# Trello

Integración con la API REST de Trello para los tableros del workspace de Marce
(usuario Trello: `marcekrak`). Este repo (Krak Real Estate) reutiliza el mismo
cliente de la skill `trello` del proyecto MarceClaude.

## Herramienta principal

Usar el script `scripts/trello.py` para todo — no armar URLs de la API a mano,
porque el script ya maneja credenciales sin exponerlas, búsqueda de tableros por
nombre parcial, y formato de salida con vencimientos:

```bash
python3 .claude/skills/trello/scripts/trello.py whoami                      # verificar conexión
python3 .claude/skills/trello/scripts/trello.py boards                      # tableros abiertos
python3 .claude/skills/trello/scripts/trello.py summary "Krak Real Estate"  # resumen por listas
python3 .claude/skills/trello/scripts/trello.py overdue "Krak Real Estate"  # solo vencidas
python3 .claude/skills/trello/scripts/trello.py cards "Krak Real Estate" "Por subir"
python3 .claude/skills/trello/scripts/trello.py show "Krak Real Estate" "Nombre tarjeta"
```

`add-card`, `comment`, `move` y `label` también están disponibles en el script,
pero ver la regla de alcance abajo antes de usarlos en este tablero.

## Regla de alcance para este repo: Krak Real Estate = OBSERVAR, no operar

Según `memory/context/trello-tableros.md`, el tablero **Krak Real Estate** es
el calendario de contenido de redes de la inmobiliaria (se trata como un
cliente más de Krak Studio, operado por Agustina/CM y Catalina/PM). Regla
vigente (2026-07): **Claude NO hace cambios en este tablero** (no crear, mover,
comentar ni etiquetar tarjetas) — solo consultar/leer para estar al tanto del
contenido y vincularlo con el resto de las tareas de Marce. Si el usuario pide
explícitamente una operación de escritura en este tablero, confirmar antes de
ejecutarla.

Para tableros donde Claude sí opera (Administración, Krak Studio, Marce
Personal), ver la skill equivalente en el proyecto MarceClaude.

## Credenciales — reglas de seguridad (importantes)

El script lee `TRELLO_API_KEY` y `TRELLO_TOKEN` desde variables de entorno, o
desde un archivo `.env.trello` en la raíz del repo o en `~`. Ese archivo está en
`.gitignore` y **nunca debe commitearse**.

- Nunca pegar la key o el token en el chat, en commits, en código, ni en logs.
  Si el usuario los pega en el chat, avisarle que quedaron expuestos y que debe
  regenerar el token en https://trello.com/power-ups/admin (sección "Clave de API").
- Nunca pasar credenciales como argumentos de línea de comandos ni imprimirlas.
- Si faltan credenciales, el script lo dice claramente: pedirle al usuario que
  cree `.env.trello` (dos líneas: `TRELLO_API_KEY=...` y `TRELLO_TOKEN=...`) o
  configure las variables. NO ofrecerle que las pegue en el chat.
- Ojo con el campo "Variables de entorno" del entorno cloud de Claude Code: la
  UI advierte que son visibles para cualquiera que use el entorno. Preferir el
  archivo `.env.trello` local a la sesión.

## Requisitos del entorno

El dominio `api.trello.com` debe estar en la lista de dominios permitidos del
entorno cloud (Acceso a la red → Personalizado). Si las llamadas fallan con
error de red, verificar eso primero.

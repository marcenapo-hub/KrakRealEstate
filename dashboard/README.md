# Dashboard PM — Krak Studio

Tablero de control de solo lectura sobre el Trello **Krak Studio**, pensado para
dirigir al equipo (Agustina Padin, Cata Cettolo, Facundo Lanza y Diseño Krak),
no para reemplazar el tablero. **Nunca escribe en Trello.**

## Dos formas de usarlo

**1. En vivo (recomendado para el día a día)**

Abrí `dashboard/krak-studio-pm.html` en el navegador. La primera vez pide la
clave y el token de Trello: quedan guardados solo en ese equipo (localStorage),
no viajan al repositorio ni al chat. Se actualiza con el botón *Actualizar*.

Si el navegador bloquea la llamada al abrirlo con doble clic, servilo local:

```bash
cd dashboard && python3 -m http.server 8000
# después abrir http://localhost:8000/krak-studio-pm.html
```

**2. Snapshot (para mandar o mirar sin credenciales)**

```bash
python3 .claude/skills/trello/scripts/pm_dashboard.py snapshot
```

Genera `dashboard/out/krak-studio-<fecha>.html`: un archivo autocontenido, con
los datos adentro, que se abre con doble clic y no pide nada. Sirve para
compartir la foto del tablero con un socio o guardar el estado de una semana.
La carpeta `out/` está gitignoreada — son datos, no código.

**3. Publicado en el chat de Claude**

```bash
python3 .claude/skills/trello/scripts/pm_dashboard.py artifact
```

Genera `dashboard/out/krak-studio-artifact.html`, la misma foto pero sin el
esqueleto `html/head/body` ni el formulario de credenciales — el formato que
pide la herramienta de Artifacts. Se publica desde Claude y queda como una
página privada que se abre desde el chat. La versión publicada es siempre
estática: el navegador de Artifacts bloquea las llamadas a `api.trello.com`.

**Brief de texto** (terminal, mail o WhatsApp):

```bash
python3 .claude/skills/trello/scripts/pm_dashboard.py brief
```

## Qué mira cada pestaña

| Pestaña | Para qué sirve |
|---|---|
| **Foco** | Vencidas, lo que vence en 7 días y el top 5 de cada lista por orden vertical (prioridad). |
| **Esperan tu revisión** | La cola de *En revisión*, ordenada por días parada. Incluye un bloque de 8 tarjetas para cerrar en una sesión. |
| **Equipo** | Carga por persona, con alerta de WIP y las vencidas de cada uno. |
| **Clientes** | Carga por cuenta y detección de clientes con ficha abierta pero sin ninguna tarea viva. |
| **Riesgos del tablero** | Estancadas, deuda vieja, sin fecha, sin etiqueta y el calendario propio de publicaciones. |
| **Reunión semanal** | Agenda generada del estado real, copiable en formato reunión o WhatsApp. |

## Criterios de lectura (los mismos en el HTML y en el script)

- **Terminado lo define la lista, no el check de fecha.** En el tablero hay
  tarjetas con la fecha tildada que siguen esperando revisión.
- La lista *Generales de cada cliente Activo* mezcla dos cosas: las **fichas
  permanentes** por cliente (sin fecha) y el **calendario propio de
  publicaciones** (`Publicar - …`, con fecha). Ninguna de las dos cuenta como
  carga de trabajo; las publicaciones vencidas se muestran aparte porque son
  deuda de registro, no tareas pendientes.
- Las etiquetas mezclan **cliente** (Krak Inmobiliaria, VAV, Rebis…) con
  **formato** (Carrusel, REEL, POST, PAUTA META, HISTORIAL KRAK). El dashboard
  las separa para que la carga por cuenta se lea limpia.
- **Prioridad = orden vertical** de cada lista, como en el resto de los tableros.
- Umbrales: WIP de alerta 8 tarjetas por persona, estancada a los 14 días sin
  actividad. Se cambian arriba del `<script>` (`WIP_ALERTA`, `DIAS_ESTANCADA`)
  y en `pm_dashboard.py`.

## Credenciales

Ver las reglas en `.claude/skills/trello/SKILL.md`. Resumen: viven en
`.env.trello` (gitignoreado) o en el localStorage del navegador; nunca en el
repositorio ni en un chat. Si alguna vez se filtran, se regeneran en
<https://trello.com/power-ups/admin>.

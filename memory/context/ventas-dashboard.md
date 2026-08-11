# Dashboard de seguimiento — Jornada de Ventas en Equipo

Contexto de cómo mantener actualizado el dashboard de seguimiento de
compromisos de las Jornadas de Ventas en Equipo de Krak Real Estate.

**Artifact publicado**: https://claude.ai/code/artifact/0ce60b05-c170-402d-a48a-467f41a260fa
Al actualizar `data/ventas-reuniones.json`, correr
`python3 scripts/build_dashboard.py` y republicar con la herramienta
Artifact pasando esta misma URL en el parámetro `url` (para no crear un
artifact nuevo).

## El proceso que se sigue (fuente: Marce)

Documento fuente: "Reunión De Equipo de Ventas" (Google Doc de Marce).

- Instancia **quincenal**, con **todo el equipo de agentes** de la oficina.
- No es reporte de resultados: es trabajo colaborativo. Estructura de la
  jornada: (1) apertura y foco (novedades de admin/marketing/portales,
  campañas activas), (2) puesta en común de cartera (cada agente presenta lo
  que gestiona), (3) trabajo colaborativo — con 3 subprocesos: **cruce de
  cartera y búsquedas**, **compartir información de mercado**, **activación
  de operaciones trabadas** —, (4) cierre y compromisos (cada agente anuncia
  un compromiso concreto).
- Cada agente llega con: cartera actualizada, búsquedas activas de sus
  clientes, una operación trabada (opcional), un dato de mercado o contacto
  nuevo, y el CRM al día.

## Cómo se alimenta el dashboard

Las reuniones se graban con **Gemini en Google Meet**. La transcripción /
notas de Gemini llegan a `marcelo@krak.com.ar` como un Google Doc
compartido (notificación de Drive, asunto tipo `"... - Notas de Gemini"` o
`"La reunión se inició a las ... - Notas de Gemini"`).

**Cuando llegue una transcripción de una Jornada de Ventas de Krak Real
Estate:**

1. Buscarla en Gmail, por ejemplo:
   `subject:(Notas de Gemini) newer_than:14d` — luego filtrar por
   asistentes (agentes de Krak RE) para descartar transcripciones de otras
   reuniones/empresas (ej. Tienda Tool, clientes, prospects individuales).
   Si el asunto o los asistentes no dejan claro que es la Jornada de Ventas
   en equipo, confirmar con Marce antes de cargarla.
2. Abrir el Google Doc con `mcp__Google_Drive__read_file_content` (usar el
   `fileId` que viene en el link del mail).
3. Extraer de la transcripción, siguiendo la estructura de la jornada:
   - Agentes presentes.
   - Novedades de apertura.
   - Cruces de cartera/búsquedas detectados (quién ofrece, quién busca, en
     qué quedó).
   - Datos de mercado / contactos nuevos compartidos.
   - Operaciones trabadas discutidas y qué se resolvió.
   - **Compromisos concretos del cierre** (foco principal del dashboard):
     agente responsable, descripción, fecha límite si se mencionó.
4. Agregar un registro nuevo al array `reuniones` en
   `data/ventas-reuniones.json`, siguiendo el esquema documentado en
   `_schema` de ese mismo archivo. Guardar `gmail_thread_id` y
   `drive_doc_id` para trazabilidad.
5. **Actualizar el estado de compromisos de reuniones anteriores**: si un
   compromiso pendiente se menciona como resuelto en la jornada nueva,
   pasarlo a `cumplido`. Si venció su `fecha_limite` sin cumplirse y no se
   retomó, pasarlo a `vencido`.
6. Regenerar el dashboard con `scripts/build_dashboard.py` (lee el JSON y
   genera el HTML) y republicar el artifact con la misma URL (ver
   `memory/context/ventas-dashboard-artifact.md` para la URL vigente una
   vez publicado por primera vez).

## Foco del dashboard

Elegido con Marce: el dashboard prioriza el **seguimiento de compromisos**
(qué se comprometió cada agente, con qué vencimiento, si se cumplió), no un
reporte de resultados de venta — coherente con el espíritu no-reporte de la
jornada. Secundariamente muestra cruces activados e info de mercado
acumulada, como registro histórico útil.

## Pendiente / a definir

- Lista formal de agentes de la oficina (se va completando con los nombres
  que aparezcan en las transcripciones).
- Si en algún momento se quiere sumar resultados de venta/comisiones, esa
  data vive en Tokko Broker (pipeline de 7 estados), no en esta jornada —
  sería una fuente aparte a integrar si Marce lo pide.

# Accesos de red del entorno — verificado 13/09/2026

Las sesiones de Claude Code en la nube salen por un proxy de egreso con
política restrictiva. Esto es lo que se comprobó ejecutando las llamadas,
no lo que se supone.

## Alcanzable

| Recurso | Estado | Nota |
|---|---|---|
| `krak.com.ar` | 200 | Web principal. Se lee bien, lista las unidades de negocio y los videos del blog. |
| `www.googleapis.com` | 403 | **No está bloqueado.** El 403 es de la API pidiendo credencial. Con API key funciona. |
| Google Drive (MCP) | OK | Vía conector, no vía red. Es el camino principal para archivos. |
| Gmail, Google Calendar (MCP) | OK | Ídem. |
| Búsqueda web | OK | Devuelve resultados y resúmenes de páginas que el proxy no deja abrir. |
| Documentación pública (support.google.com, facebook.com/business) | OK | Útil para verificar datos de plataforma. |

## Bloqueado por el proxy de egreso

| Recurso | Error | Impacto |
|---|---|---|
| `www.youtube.com` / `m.youtube.com` | EGRESS_BLOCKED | No se puede ver el canal ni el feed RSS del canal. |
| `propiedades.krak.com.ar` | sin respuesta | No se puede leer la cartera publicada. |
| `www.argenprop.com` | EGRESS_BLOCKED | No se pueden leer los avisos propios en el portal. |
| `www.tokkobroker.com` y `developers.tokkobroker.com` | EGRESS_BLOCKED | La API de Tokko no se puede consultar desde la sesión. |
| `funnelytics.io` | EGRESS_BLOCKED | — |

## Vías que sí funcionan para cada necesidad

- **Videos de YouTube** → YouTube Data API v3 con una API key de Google Cloud
  (`www.googleapis.com/youtube/v3/...` es alcanzable). Alternativa sin key:
  que Marce exporte o pegue el listado.
- **Cartera de Tokko** → export a Google Drive en `.xlsx` o Google Sheet.
  El `.xls` viejo no se puede leer; el formato moderno sí.
- **Archivos en general** → Google Drive por conector, o subirlos al chat.

## Regla

Cuando una referencia que pasó Marce no se puede abrir, avisarle antes de
seguir. No se debe entregar el trabajo con el punto marcado como pendiente
sin haberle dado la chance de resolver el acceso.

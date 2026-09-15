# Radar Industrial Krak — Especificación funcional

**Estado:** propuesta para validar con Pablo Kisieluk
**Fecha:** 2026-09-15

---

## 1. Decisión y principio rector

Se descarta el "scraper de bases de datos para ofrecer servicios" en su forma original.
Se adopta un **sistema de inteligencia de captación**.

> **Principio rector (definido por Marce):**
> El software **informa**. La prospección la hace **un humano**.

El sistema nunca contacta, nunca envía mensajes, nunca automatiza outreach.
Detecta eventos, los enriquece con contexto y los entrega como objetivos
priorizados a los agentes de Krak Real Estate.

## 2. El problema real

El universo de naves industriales de +500 m² en AMBA es finito (orden de 3.000 a
8.000 activos). No es un problema de volumen de datos.

Un dueño de nave industrial no despierta queriendo vender: vende cuando ocurre un
**evento** (concurso, quiebra, sucesión, cierre de planta, mudanza a parque
industrial, vencimiento de contrato, conflicto societario).

> El objetivo del sistema no es encontrar naves. Es **enterarse del evento antes
> que la competencia**.

Corolario: scrapear portales devuelve propiedades ya publicadas, es decir, dueños
que ya eligieron broker. Se llega tarde por definición, y el teléfono publicado
es el del competidor.

## 3. Qué es y qué no es

| Es | No es |
|---|---|
| Motor de detección de eventos | Scraper masivo de avisos |
| 5 objetivos por agente por semana | 200 leads sin filtrar |
| Fichas con contexto y ángulo de entrada | Base de datos de teléfonos |
| Alimentador de Tokko Broker | CRM nuevo |
| Fuentes públicas y APIs oficiales | Bypass de anti-bot de portales |

**Restricción de volumen (crítica):** los agentes prospectan entre operaciones
vivas, no full-time. El sistema debe entregar poco y muy calificado. El filtro
importa más que el crawler.

## 4. Entregable: la Ficha de Objetivo

Unidad de salida del sistema. Una ficha por objetivo, asignada a un agente:

- **Señal** — qué evento se detectó, fuente y fecha
- **Activo** — superficie, ubicación, tipología, titular si se pudo resolver
- **Operación probable** — venta / alquiler (inferida del tipo de señal)
- **Por qué ahora** — ventana temporal estimada
- **Ángulo de entrada** — comercial, institucional o judicial
- **Contacto** — datos disponibles y su fuente
- **Guion sugerido** — 3 líneas de apertura

## 5. Fuentes de datos

Estado verificado 2026-09-15 desde el entorno de desarrollo:

| # | Fuente | Señal | Estado |
|---|---|---|---|
| 1 | Boletín Oficial (quiebras, concursos, subastas, edictos) | Muy alta | Alcanzable — endpoint a desarrollar |
| 2 | Datos Abiertos CABA (habilitaciones con CUIT, parcelas, usos) | Alta | Alcanzable |
| 3 | API oficial MercadoLibre (dueño directo, avisos rancios, cambios de precio) | Alta | **Requiere credenciales de developer** |
| 4 | Catastro ARBA / IDEBA (capa parcelaria provincia) | Media-alta | A investigar |
| 5 | Grandes usuarios eléctricos (CAMMESA) | Alta, poco explotada | Endpoint a investigar |
| 6 | Padrón de parques industriales (RENPI / provincia) | Media | A investigar |
| 7 | Relevamiento propio de carteles (foto + geo, carga del agente) | Alta | Desarrollo propio |
| 8 | Google Places | Baja | Antecedente propio: 24 empresas, alto costo por registro |

**Regla legal:** personas jurídicas (SA/SRL) no son datos personales bajo Ley
25.326 — riesgo bajo. Personas físicas: solo fuente pública y contacto
profesional, respetando Registro No Llame. Sin scraping de portales con ToS
restrictivo: se usa API oficial o dato público.

## 6. Motor de señales

Cada señal se clasifica y puntúa:

- **Tipo de operación probable:** concurso/quiebra/sucesión → venta;
  cierre/mudanza/vencimiento de contrato → alquiler; aviso rancio → según publicación.
- **Urgencia:** ventana estimada de decisión del titular.
- **Encaje Krak:** zona y tipología dentro del foco definido por Pablo.
- **Ángulo diferencial:** si la señal es judicial, entra por el rol de Marce como
  Martillero Público / Perito Tasador / Auxiliar de la Justicia — canal que la
  competencia institucional no tiene.

Solo el top N por agente y por semana se convierte en ficha. El resto queda en
base, sin generar tarea.

## 7. Integración

- **Destino operativo: Tokko Broker** (CRM oficial, pipeline de 7 estados ya
  configurado). Las fichas entran como objetivos de captación trazables.
- **Trello:** el tablero *Krak Real Estate* es calendario de contenido y es de
  **solo lectura** — no se toca. Si hace falta tablero, se crea uno nuevo
  ("Radar Industrial"), nunca el de contenido.
- **Asignación:** por zona, sin superposición entre agentes. Evita competencia
  interna por el mismo objetivo.

## 8. Fases

**Fase 0 — Validación manual (2 semanas, sin desarrollo).**
Lista armada a mano de 60 objetivos calificados. Los agentes contactan. Se mide.
Criterio de continuidad: **3+ reuniones y 1 captación**. Si da cero, el problema
es el pitch o el canal, y el software no lo resolvía.

**Fase 1 — Motor de señales (4 semanas).**
Conectores Boletín Oficial + MercadoLibre, scoring, generación de fichas,
export a Tokko.

**Fase 2 — Padrón de naves (6 semanas).**
Base propia de activos industriales AMBA con titular. Activo patrimonial de la
empresa: se aprecia con el tiempo.

**Fase 3 — Registro de demanda + inversión del pitch.**
Base de empresas buscando m². Cambia la llamada de "¿me das tu nave?" a
"tengo un inquilino para tu nave". Es la llamada que firma exclusividad.

**Fase 4 — Inbound (Krak Studio).**
Valuador online de naves + Índice Krak de Naves Industriales AMBA (trimestral).
Autoridad como Perito Tasador → dueños que llaman solos. Compone; el outbound no.

## 9. KPIs

| KPI | Por qué |
|---|---|
| Fichas entregadas vs. contactadas | Mide adopción de los agentes — el riesgo #1 |
| Contactos por reunión | Calidad del filtro |
| **Captaciones en exclusiva** | KPI rey: captar sin exclusividad en industrial es perder plata |
| Honorarios originados por el Radar | ROI del sistema |

## 10. Riesgos

1. **Adopción de los agentes (crítico).** Los agentes inmobiliarios no prospectan
   en frío de forma consistente. Sin mínimo semanal medible y sin revisión en la
   jornada quincenal de ventas, el sistema se muere en el mes dos.
2. **Foco de Marce.** Compite con ON Pacheco (preventa), bot de Rebis y la lista
   "En revisión" de Krak Studio. Alcance acotado o no se termina.
3. **Dependencia de credenciales externas** (MercadoLibre).
4. **Fragilidad de fuentes públicas** — cambian sin aviso, requieren mantenimiento.

## 11. Sinergias entre empresas

- **Tienda Tool:** el padrón de empresas industriales con CUIT y rubro es su base
  de clientes B2B. Un dato, dos monetizaciones.
- **VAV Desarrollos:** detección de lotes industriales subutilizados → originación
  de tierra y built-to-suit.
- **Ejercicio judicial:** el monitor de edictos alimenta el pipeline de
  martillero/perito con costo marginal cero.
- **Krak Studio:** construye el valuador y el Índice de la Fase 4.

## 12. Decisiones pendientes (para la sesión con Pablo)

1. Zonas y tipologías objetivo — ¿todo AMBA o se arranca por un corredor?
2. Rango de superficie — la hipótesis es 500 a 3.000 m² (segmento fragmentado y
   desatendido por los brokers institucionales).
3. Mínimo semanal de contactos exigible por agente.
4. Regla de asignación por zona y resolución de conflictos.
5. Quién valida el padrón (criterio técnico de Pablo).

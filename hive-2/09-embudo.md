# Hive 2 — Fase 3: Embudo de marketing y ventas

## Principio de diseño

Hay **dos embudos en paralelo** que convergen en el mismo CRM y el mismo
proceso de cierre. No es un embudo con dos fuentes de tráfico: son dos
recorridos distintos, con mensajes, tiempos y responsables distintos.

```
   EMBUDO A — OUTBOARD (60%)          EMBUDO B — INBOUND (40%)
   base propia, referidos             Meta, orgánico, portales
        │                                    │
   contacto directo del vendedor        landing → formulario/WhatsApp
        │                                    │
        └──────────► TOKKO BROKER ◄──────────┘
                          │
              calificación (mismo criterio)
                          │
              reunión con la desarrolladora
                          │
                   reserva USD 10.000
                          │
                 adhesión al fideicomiso
                          │
                     REFERIDOS
```

---

# EMBUDO A — Outbound sobre base propia

**Es el que tiene que producir 3 a 4 de las 5 ventas.**

## A1 · Construcción de la lista maestra

| Fuente | Volumen estimado | Calidad |
|---|---|---|
| Propietarios de Hive 1 | 18 | **Máxima** — ya compraron a este desarrollador, enfrente |
| Compradores del Polo Buen Ayre 2 | por relevar | Máxima — ya compraron en este polo |
| Compradores de Arbox Norlog II vía Krak | por relevar | Alta — ya compraron industrial con Krak |
| Compradores de Logipark vía Krak | por relevar | Alta |
| Contactos de Hive (base histórica) | por relevar | Media — interesados que no cerraron |
| Empresas industriales Zona Norte/Oeste (scraping propio) | 24+ | Media — usuarios finales, no inversores |
| Cartera general de Krak RE Industrial | por relevar | Variable |

**Entregable:** una única planilla maestra, deduplicada, con campos
`nombre · empresa · teléfono · email · origen · segmento · última operación ·
responsable · estado`. Se carga a Tokko antes del lanzamiento.

**Criterio de priorización:** primero los que ya compraron industrial. Después
los que consultaron y no cerraron. Último, la base fría de empresas.

## A2 · Secuencia de contacto (por vendedor, no automatizada)

| Día | Acción | Canal | Contenido |
|---|---|---|---|
| 0 | Primer contacto personal | Llamada o WhatsApp | Sin pitch. "Salió Hive 2, enfrente de Hive 1, a menor valor que aquel. Te quería avisar antes de publicarlo." |
| 0 | Envío de material | WhatsApp | Brochure actualizado + link a landing |
| 2 | Seguimiento | WhatsApp | Pregunta de calificación: qué tipología le sirve |
| 5 | Propuesta de reunión | Llamada | Reunión con la desarrolladora |
| 10 | Cierre de ciclo | WhatsApp | "¿Lo dejamos para más adelante o lo vemos ahora?" |
| 30 | Reactivación | WhatsApp | Novedad real: avance, unidad reservada, cambio de precio |

**Regla:** el aviso previo a la publicación es real y es el activo más potente
del outbound. **Se contacta la lista maestra ANTES de encender la pauta.**
Quien ya compró merece enterarse primero, y eso mismo lo hace sentir adentro.

## A3 · Programa de referidos

Los 18 de Hive 1 son el mejor canal de prospección disponible.

- **Mecánica:** cada propietario de Hive 1 recibe una propuesta formal de
  referido, con comisión definida por Marce.
- **Momento:** semana 1, antes del lanzamiento público.
- **Argumento:** al propietario le conviene que el parque de enfrente se
  complete y se valorice el corredor.

---

# EMBUDO B — Inbound

## B1 · Descubrimiento

| | |
|---|---|
| **Objetivo** | Alcance calificado dentro del AMBA |
| **Canales** | Meta (Instagram y Facebook), contenido orgánico, Zonaprop/Argenprop |
| **Activos** | 3 ángulos creativos: precio comparado, producto (altura y calles), prueba (Hive 1) |
| **Métrica** | Alcance, CPM, frecuencia (tope 2,5 en 7 días), CTR saliente (objetivo >1%) |

## B2 · Consideración

| | |
|---|---|
| **Objetivo** | Que entienda el producto y se autoexcluya el que no califica |
| **Activo principal** | **Landing** con precio "desde", tipologías, ubicación y Hive 1 |
| **Decisión clave** | **Se publica el precio "desde USD 260.820"**. Con ticket alto, publicar filtra: el que no puede no consulta, y el equipo no pierde tiempo |
| **Métrica** | Tiempo en página, scroll al bloque de tipologías, tasa de conversión (objetivo 3-5%) |

## B3 · Captación

| | |
|---|---|
| **Objetivo** | Lead con datos suficientes para calificar |
| **Conversión primaria** | **WhatsApp** — es como compra este mercado |
| **Conversión secundaria** | Formulario corto (nombre, teléfono, email, tipología de interés, uso previsto) |
| **Anti-fricción** | Nada de "presupuesto disponible" en el formulario. Eso se pregunta en la conversación |
| **Automatización** | Alta automática en Tokko + notificación al vendedor de guardia |
| **Métrica** | Leads, CPL, % que llega por WhatsApp vs formulario |

## B4 · Calificación (común a ambos embudos)

**Lead calificado = 3 de estos 4 criterios:**

1. Puede afrontar una reserva de USD 10.000 y conoce el esquema 50% + 18 cuotas.
2. Tiene un motivo concreto: inversión, mudanza operativa o expansión.
3. La zona le sirve (o no le molesta el peaje y la ubicación).
4. Tiene horizonte compatible con febrero 2028.

**Lead scoring (0-100):**

| Señal | Puntos |
|---|---:|
| Ya compró industrial (Hive 1, Polo, Arbox, Logipark) | +40 |
| Referido de un propietario | +30 |
| Consultó por una tipología específica | +15 |
| Es empresa con actividad verificable | +15 |
| Pidió reunión o visita | +20 |
| Preguntó por forma de pago | +15 |
| Proveedor de materiales (canje posible) | +25 |
| Preguntó solo el precio y no respondió más | −20 |
| Busca alquiler, no compra | −30 |
| Fuera del AMBA sin explicación | −15 |

- **≥60:** contacto en menos de 1 hora, agenda de reunión.
- **30-59:** nurturing, seguimiento a 7 días.
- **<30:** base de nutrición, sin dedicación del vendedor.

## B5 · Reunión con la desarrolladora

Es el paso que más convierte y el que más se puede trabar (depende de la agenda
de Stark).

- **Formato:** presencial en el predio cuando se pueda, o en oficinas de Stark
  (Martínez). Presentación de obra, masterplan y estructura del fideicomiso.
- **Preparación:** el vendedor manda una ficha del prospecto a Stark antes de
  la reunión (perfil, tipología de interés, objeciones detectadas).
- **Riesgo a mitigar:** **fijar dos ventanas semanales de reunión** con Stark
  antes de lanzar. Si esto depende de la agenda caso por caso, se pierde el
  momentum del lead.

## B6 · Reserva y cierre

| Paso | Instrumento |
|---|---|
| Reserva | Seña de **USD 10.000**, vigencia 60 días, imputable a cuenta de precio |
| Definitivo | Contrato de Adhesión al Fideicomiso y/o boleto |
| Alternativa | Canje por materiales + saldo en dólares |

**Los 60 días de vigencia de la reserva son el verdadero ciclo de cierre.**
Todo el seguimiento se organiza alrededor de esa ventana.

## B7 · Posventa y referidos

- Comunicación de avance de obra trimestral a todos los compradores.
- Pedido formal de referidos a los 30 días de firmada la adhesión.
- Los compradores de Hive 2 alimentan la lista maestra de la etapa siguiente.

---

## Métricas por etapa

| Etapa | Métrica | Objetivo a 4 meses |
|---|---|---:|
| Alcance | Personas alcanzadas | 40.000 – 60.000 |
| Tráfico | Sesiones en landing | 2.000 – 3.000 |
| Captación | Leads totales (ambos embudos) | **130** |
| Calificación | Leads calificados (score ≥60) | **35** |
| Reunión | Reuniones con la desarrolladora | **15** |
| Reserva | Reservas de USD 10.000 | **7** |
| Cierre | Adhesiones firmadas | **5** |

**Tasas implícitas:** 27% de calificación · 43% de calificado a reunión ·
47% de reunión a reserva · 71% de reserva a cierre.

## Automatizaciones mínimas

| # | Disparador | Acción |
|---|---|---|
| 1 | Lead nuevo (form o WhatsApp) | Alta en Tokko + aviso al vendedor de guardia |
| 2 | Lead sin contactar a los 30 min | Alerta al responsable comercial |
| 3 | Lead con score ≥60 | Etiqueta prioritaria + tarea de llamada en el día |
| 4 | Lead sin respuesta a 48 h | WhatsApp de reintento (plantilla) |
| 5 | Reunión agendada | Recordatorio 24 h antes al prospecto y a Stark |
| 6 | Reserva firmada | Inicio de secuencia de seguimiento a 60 días |
| 7 | Reserva a 15 días de vencer | Alerta al vendedor y a Marce |
| 8 | Lead frío a 30 días | Ingreso a la secuencia de nurturing |

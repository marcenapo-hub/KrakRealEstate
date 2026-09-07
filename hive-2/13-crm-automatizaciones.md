# Hive 2 — Fase 7: CRM, automatizaciones y guiones comerciales

CRM: **Tokko Broker**. Carga automática de leads ya configurada.
Vendedores: equipo Industrial de Krak RE.

---

## 1. Pipeline

Siete etapas. Krak ya tiene un pipeline de 7 estados con SLA y colores; esto
lo adapta a Hive 2.

| # | Etapa | Definición de entrada | SLA | Salida |
|---|---|---|---|---|
| 1 | **Nuevo** | Lead creado por cualquier canal | **Contacto < 1 h hábil** | Contactado o descartado |
| 2 | **Contactado** | Hubo conversación real (no un mensaje sin respuesta) | 48 h | Calificado o nutrición |
| 3 | **Calificado** | Cumple 3 de los 4 criterios · score ≥60 | 5 días | Reunión agendada |
| 4 | **Reunión** | Agendada con la desarrolladora | Según agenda | Propuesta |
| 5 | **Propuesta** | Recibió tipología, precio y esquema de pago | 10 días | Reserva |
| 6 | **Reserva** | Seña de USD 10.000 pagada | **60 días** (vigencia) | Adhesión |
| 7 | **Cerrado** | Adhesión al fideicomiso firmada | — | Posventa y referidos |

**Estados terminales:** `Perdido` (con motivo obligatorio) · `Nutrición`
(no ahora, sí más adelante).

### Motivos de pérdida (obligatorio elegir uno)
Precio · **Anticipo del 50%** · Zona / inseguridad · Peaje · Plazo de entrega ·
Sin escritura definida · Compró en la competencia · No tenía capital real ·
Sin respuesta · Otro.

> Este campo es la fuente de verdad para saber si la objeción que suponemos es
> la que realmente pierde operaciones. Sin él, a los tres meses discutimos de
> memoria.

## 2. Campos a crear en Tokko

| Campo | Tipo | Para qué |
|---|---|---|
| Segmento | Lista: Inversor conocido / Inversor nuevo / Usuario final / Proveedor materiales | Segmenta mensajes y mide qué canal trae qué |
| Origen detallado | Lista: Meta / Landing orgánico / Referido Hive 1 / Base propia / Outbound / Portal / Otro | Atribución real |
| UTM source / medium / campaign | Texto | Atribución de la pauta |
| Tipología de interés | Lista A–J | Prioriza y detecta demanda concentrada |
| Lead score | Número | Prioriza la cola del vendedor |
| Uso previsto | Lista: Inversión / Uso propio / Indefinido | Define el guion |
| Acepta canje de materiales | Sí / No | Detecta el segmento 4 |
| Objeción principal | Lista | Alimenta creatividades y FAQ |
| Fecha de vencimiento de reserva | Fecha | Dispara alertas |
| Motivo de pérdida | Lista | Aprendizaje |

## 3. Lead scoring

Ver el detalle en `09-embudo.md`, sección B4. Resumen operativo:

- **≥60** → contacto en menos de 1 hora, se empuja a reunión.
- **30-59** → seguimiento a 7 días, nurturing.
- **<30** → base de nutrición, sin dedicación del vendedor.

## 4. Asignación de leads

1. **Round robin** entre los vendedores del área Industrial, salvo excepciones.
2. **Excepción 1:** un lead que ya es cliente de Krak va a su vendedor histórico.
3. **Excepción 2:** referido de un propietario de Hive 1 → al vendedor que
   gestionó esa relación.
4. **Excepción 3:** proveedor de materiales → directo a Marce, porque la
   operación se estructura con Stark.
5. **Reasignación automática** si el lead no se contacta dentro del SLA.

## 5. Automatizaciones

| # | Disparador | Acción | Canal |
|---|---|---|---|
| 1 | Lead nuevo | Alta en Tokko + notificación al vendedor asignado | Interno |
| 2 | Lead nuevo | Acuse inmediato al prospecto | WhatsApp |
| 3 | Sin contactar a los 30 min | Alerta al responsable comercial | Interno |
| 4 | Sin contactar a los 60 min | Reasignación automática | Interno |
| 5 | Score ≥60 | Etiqueta prioritaria + tarea de llamada en el día | Interno |
| 6 | Sin respuesta a 48 h | Reintento con plantilla | WhatsApp |
| 7 | Sin respuesta a 7 días | Ingreso a nurturing | Email |
| 8 | Reunión agendada | Recordatorio 24 h antes al prospecto y a Stark | WhatsApp + email |
| 9 | Reunión realizada | Tarea de seguimiento a 48 h | Interno |
| 10 | Reserva firmada | Inicio de secuencia de 60 días | WhatsApp + email |
| 11 | Reserva a 15 días de vencer | Alerta al vendedor y a Marce | Interno |
| 12 | Adhesión firmada | Secuencia de posventa + pedido de referido a 30 días | Email |
| 13 | Perdido por "anticipo" | Suma a un tablero de conteo | Interno |

> La automatización 13 no es burocracia: si en dos meses hay 8 pérdidas por el
> anticipo, eso es el caso de negocio para renegociar el esquema con Stark.

## 6. Secuencias de mensajes

### S1 · Acuse inmediato (automático)

> Hola [nombre], soy [vendedor] de Krak Real Estate. Recibí tu consulta por
> Hive 2. Te escribo en unos minutos con la info de la tipología [X].
>
> Mientras tanto, el brochure: [link]

### S2 · Primer contacto real (vendedor, no automatizado)

> [Nombre], ¿cómo estás? Te escribo por Hive 2, en el Polo Buen Ayre 2.
>
> Antes de mandarte números, dos preguntas para no hacerte perder tiempo:
> ¿lo estás mirando como inversión o para operar vos? ¿Y qué superficie
> necesitarías?

**Nunca abrir con el precio.** El precio ya está en la landing: quien escribió
lo vio. La conversación empieza por la necesidad.

### S3 · Nurturing (leads fríos, cada 15 días, 4 envíos)

| # | Asunto | Contenido |
|---|---|---|
| 1 | Por qué el entrepiso cambia el número | Educativo: superficie que no paga suelo |
| 2 | Qué mirar antes de comprar una nave | Altura libre, ancho de calle, potencia |
| 3 | Avance de obra | Novedad real, con foto |
| 4 | Disponibilidad actualizada | Qué tipologías quedan |

**Regla:** ningún envío sin novedad real. Si no hay noticia, no se manda.

### S4 · Seguimiento de reserva (60 días)

| Día | Acción |
|---|---|
| 1 | Confirmación de reserva + documentación del fideicomiso |
| 7 | Llamada de seguimiento: dudas sobre la estructura |
| 20 | Envío del contrato de adhesión para revisión |
| 40 | Llamada de cierre |
| 50 | Aviso de vencimiento de reserva |
| 55 | Última gestión, con Marce involucrado |

### S5 · Reactivación de base histórica (leads viejos de Hive y Krak Industrial)

> [Nombre], ¿te acordás que consultaste por [proyecto]? Salió Hive 2, en el
> Polo Buen Ayre 2, y arranca por debajo del valor al que se vendió el primero.
> ¿Te paso la info?

## 7. Guion de calificación (para el vendedor)

**Cuatro preguntas, en este orden:**

1. *"¿Lo mirás como inversión o para operar vos?"* → define el guion completo.
2. *"¿Qué superficie necesitás?"* → tipología y ticket.
3. *"¿Manejás plazos? Porque la entrega es febrero 2028."* → filtra al que
   necesita mudarse ya.
4. *"¿Trabajaste alguna vez con compra en pozo o fideicomiso?"* → mide cuánta
   explicación de estructura hace falta.

**Nunca preguntar "¿cuánto tenés para invertir?".** Se infiere de la tipología
y se confirma en la reunión.

## 8. Registro obligatorio

| Evento | Qué queda en Tokko |
|---|---|
| Reunión | Fecha, asistentes, tipología discutida, objeciones, próximo paso |
| Propuesta | Tipología, precio, esquema de pago ofrecido, fecha |
| Reserva | Monto, fecha, **vencimiento**, forma de pago (efectivo o canje) |
| Venta | Unidad, precio final, instrumento, fecha |
| Pérdida | **Motivo obligatorio** |

Sin este registro no hay modelo económico real a los 90 días, solo métricas de
Meta. La diferencia entre las dos es la diferencia entre saber y suponer.

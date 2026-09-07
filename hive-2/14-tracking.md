# Hive 2 — Fase 8: Tracking, analítica y medición

**Principio:** las métricas de Meta miden la pauta. El negocio se mide en
Tokko. Cuando las dos no coinciden, manda Tokko.

---

## 1. Stack

| Capa | Herramienta | Función |
|---|---|---|
| Captura web | **Meta Pixel + Conversion API** | Eventos de la landing |
| Analítica | **GA4** | Comportamiento, fuentes, embudo de página |
| Gestión de etiquetas | **Google Tag Manager** | Un solo punto de control |
| CRM | **Tokko Broker** | Verdad comercial |
| Respaldo | Google Sheets | Copia cruda de cada lead |
| Reporte | Looker Studio | Tablero único |

**La Conversion API no es opcional.** Con presupuesto chico, la pérdida de
señal por bloqueo de navegador se come una parte grande de las conversiones
atribuidas. Sin CAPI el algoritmo optimiza a ciegas.

## 2. Eventos

| Evento | Se dispara cuando | Uso |
|---|---|---|
| `PageView` | Carga de la landing | Base |
| `ViewContent` | Llega al bloque de tipologías | **Optimización de campañas** |
| `Contact` | Clic a WhatsApp | Medición e intención alta |
| `Lead` | Envío del formulario (página de gracias) | Medición y exclusión de remarketing |
| `Schedule` | Reunión agendada | Señal de calidad |
| Offline: `Reunion` | Cargado desde Tokko | Conversión offline |
| Offline: `Reserva` | Cargado desde Tokko | Conversión offline |
| Offline: `Venta` | Cargado desde Tokko | Conversión offline |

**Prioridad de eventos** (verificación de dominio, 8 posiciones):
`Venta` > `Reserva` > `Reunion` > `Lead` > `Contact` > `Schedule` >
`ViewContent` > `PageView`

## 3. Conversiones offline

Es lo que separa una campaña que reporta leads de una que reporta ventas.

**Implementación realista dado el volumen:** carga manual quincenal de un CSV
desde Tokko al conjunto de datos offline de Meta, con `email` y `teléfono`
hasheados más la fecha del evento.

Con 5 ventas en 4 meses el volumen es demasiado bajo para que Meta optimice
sobre esos eventos. **Su valor no es algorítmico, es de reporte:** permite
decir "de los 40 leads de Meta, 12 llegaron a reunión y 2 reservaron", que es
la única frase que importa a los 90 días.

## 4. UTMs

Convención fija, en minúscula, sin acentos:

```
utm_source    = meta | google | instagram_bio | whatsapp | email | zonaprop | referido
utm_medium    = cpc | organico | outbound | email
utm_campaign  = hive2_adq | hive2_rmk | hive2_base
utm_content   = angulo-precio-a1 | angulo-producto-b1 | angulo-prueba-c1
utm_term      = tipologia-j | generico
```

**Los UTM se persisten y viajan al formulario**, para que en Tokko cada lead
tenga su origen. Si esto no se implementa, la atribución muere en la landing.

## 5. Medición de WhatsApp

El problema clásico: el clic se mide, la conversación no.

| Nivel | Cómo | Qué mide |
|---|---|---|
| Básico | Evento `Contact` en el clic a `wa.me` | Intención |
| Medio | Mensaje precargado con la tipología, más un código por origen | De qué bloque vino |
| Real | Alta del contacto en Tokko con el origen del mensaje | Conversación efectiva |

**Regla operativa:** todo lead de WhatsApp se carga en Tokko con su origen
detallado. Es trabajo manual del vendedor y no hay atajo con el stack actual.

## 6. Tablero

Una sola pantalla, tres bloques.

### Bloque 1 — Pauta (Meta)
Inversión · alcance · frecuencia · CPM · CTR saliente · coste por ViewContent ·
leads · CPL

### Bloque 2 — Negocio (Tokko)
Leads totales por origen · leads calificados · tasa de calificación ·
reuniones · reservas · ventas · **coste por lead calificado** ·
**coste por reunión** · ciclo promedio en días

### Bloque 3 — Aprendizaje
Objeciones más frecuentes · motivos de pérdida · tipologías más consultadas ·
ángulo creativo con mejor conversión a calificado

### Métricas de cabecera (las cuatro que se miran primero)

| Métrica | Objetivo |
|---|---:|
| Leads calificados acumulados | 35 en 4 meses |
| Coste por lead calificado | < USD 35 |
| Reuniones agendadas | 15 |
| Reservas | 7 |

## 7. Cadencia de revisión

| Cuándo | Quién | Qué |
|---|---|---|
| Diario, 5 min | Responsable de pauta | Que gaste y que no haya rechazos |
| **Lunes, 30 min** | Pauta + comercial | Leads de la semana, calidad, SLA de contacto, rotación de creatividades |
| **Primer lunes de mes, 60 min** | Marce + comercial + pauta | Coste por lead calificado, reuniones, reservas, objeciones, decisión de escalar o corregir |

**La revisión semanal es conjunta entre pauta y comercial, no separada.** El
dato que importa —si los leads sirven— solo lo tiene el vendedor.

## 8. Lo que no se va a poder medir bien, y hay que aceptarlo

- **Atribución del outbound.** Si el vendedor llama y el prospecto además vio
  el anuncio, Meta se lo va a atribuir o no según la ventana. Con este volumen
  no hay forma limpia de resolverlo. Se registra el origen que declara el
  prospecto y se acepta el ruido.
- **Significancia estadística.** Con 130 leads no hay test A/B concluyente.
  Las decisiones se toman por dirección, no por significancia.
- **ROAS.** No aplica: el ingreso se cobra en cuotas durante 18 meses. La
  métrica de negocio es **coste de adquisición por venta**, no retorno
  publicitario.

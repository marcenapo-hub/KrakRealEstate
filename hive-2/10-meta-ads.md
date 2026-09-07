# Hive 2 — Fase 4: Arquitectura de Meta Ads

**Presupuesto: USD 300/mes = USD 10/día.** Todo lo que sigue está diseñado
para ese número, no para uno ideal.

---

## 1. Las tres restricciones que definen la arquitectura

### 1.1 Con USD 10/día no se fragmenta

Meta necesita volumen de eventos por conjunto de anuncios para salir de la
fase de aprendizaje. Con USD 10/día repartidos en cuatro conjuntos, ninguno
aprende y todos rinden mal.

**Regla dura: nunca más de dos conjuntos activos al mismo tiempo.**

### 1.2 No vamos a salir de la fase de aprendizaje, y está bien

El umbral de referencia de Meta es de ~50 eventos de optimización por conjunto
por semana. Con un objetivo de 130 leads en 4 meses (≈8 por semana, y solo una
parte desde Meta), ese umbral es inalcanzable.

**Consecuencia:** no optimizamos por el evento escaso. Optimizamos por un
evento más frecuente y usamos el escaso para medir.

| Evento | Rol |
|---|---|
| `ViewContent` (llegó a la landing y vio tipologías) | **Optimización** — frecuente |
| `Lead` (formulario o clic a WhatsApp) | **Medición** y remarketing |
| `Contact` (conversación de WhatsApp iniciada) | Medición |
| Conversión offline: reunión, reserva, venta | Medición real del negocio |

### 1.3 Categoría especial de anuncios

No se pudo verificar en la fuente oficial de Meta (facebook.com está bloqueado
en este entorno). Lo consistente en fuentes secundarias: la categoría **Vivienda**
cubre oportunidades **residenciales** —venta y alquiler de viviendas, hipotecas,
seguros de hogar—. Una nave industrial no encuadra ahí. Pero varias fuentes
coinciden en que Meta puede clasificar automáticamente por las imágenes del
anuncio, y si eso ocurre se pierden edad, género, radio fino y exclusiones.

**Decisión: la arquitectura se diseña para funcionar igual en los dos
escenarios.** No dependemos de segmentación por edad, género ni código postal.
Con presupuesto chico eso además es lo que conviene: audiencias amplias y que
la creatividad haga el filtro.

**Acción antes de lanzar:** consultar a soporte de Meta desde la cuenta de Krak
y dejar la respuesta por escrito. Si nos marcan, no cambia el plan.

---

## 2. Arquitectura por fases

### FASE 0 — Preparación (antes de gastar un peso)

| # | Tarea |
|---|---|
| 1 | Business Manager de Krak: crear activos de Hive 2 |
| 2 | Instagram y Facebook de Hive: crear, cargar 9 publicaciones de base |
| 3 | Pixel + **Conversion API** (obligatoria, no opcional: sin CAPI se pierde señal) |
| 4 | Eventos: `ViewContent`, `Lead`, `Contact` |
| 5 | Dominio verificado y priorización de 8 eventos configurada |
| 6 | Subir bases propias como **audiencias personalizadas** (hasheadas) |
| 7 | Crear **lookalike 1%** sobre compradores industriales de Krak |
| 8 | UTMs en todos los destinos |

**La lookalike sobre compradores reales es el activo más valioso de toda la
cuenta.** Es lo que reemplaza la segmentación fina que quizá no tengamos.

### FASE 1 — Mes 1: adquisición pura (USD 300)

Todavía no hay audiencias de retargeting. Todo va a adquisición.

```
CAMPAÑA:  HIVE2 | ADQ
Objetivo: Ventas (conversiones)
Evento:   ViewContent
Puja:     Costo más bajo, sin límite de puja
Presupuesto: CBO USD 10/día
```

| Conjunto | Audiencia | Presupuesto |
|---|---|---|
| `HIVE2 \| ADQ \| LAL-COMPRADORES` | Lookalike 1% de compradores industriales de Krak + AMBA | USD 6/día |
| `HIVE2 \| ADQ \| AMPLIA-AMBA` | AMBA, sin intereses, Advantage+ audience | USD 4/día |

- **Ubicaciones:** automáticas. Con este presupuesto, restringir es tirar plata.
- **Creatividades:** 3 por conjunto, un ángulo cada una. Meta reparte.
- **Segmentación geográfica:** AMBA. Sin radios finos: si nos marcan como
  categoría especial, el radio mínimo se agranda y el plan no se cae.

### FASE 2 — Meses 2 a 4: adquisición + remarketing + base

```
CAMPAÑA 1: HIVE2 | ADQ    USD 6/día   (60%)
CAMPAÑA 2: HIVE2 | RMK    USD 2,5/día (25%)
CAMPAÑA 3: HIVE2 | BASE   USD 1,5/día (15%)
```

**HIVE2 | ADQ** — se queda con el conjunto ganador del mes 1. Un solo conjunto.

**HIVE2 | RMK** — un conjunto, audiencia combinada:
- Visitantes de landing, 90 días (excluir quienes convirtieron)
- Interacción con Instagram y Facebook, 365 días
- Reproducciones de video al 50%, 180 días

Creatividad de remarketing: la que resuelve objeciones. Hive 1, el pórtico de
control, las calles de 10 m, la reserva de USD 10.000.

**HIVE2 | BASE** — audiencias propias cargadas. Refuerza el trabajo del
vendedor: el prospecto recibe la llamada y además ve el proyecto en el
teléfono. **Es apoyo del outbound, no captación.**

---

## 3. Los tres ángulos creativos

| Ángulo | Idea | Segmento | Fase |
|---|---|---|---|
| **A · Precio comparado** | El metro operativo más barato del corredor | Inversor nuevo | Adquisición |
| **B · Producto** | 7 metros de altura y calles de 10. Entra el camión | Usuario final / PyME | Adquisición |
| **C · Prueba** | El proyecto anterior está enfrente, lleno y funcionando | Todos | Remarketing |

**El ángulo C no se usa en frío**: es el que cierra, no el que abre.

---

## 4. Reglas de optimización

### Qué se mira, y cuándo

| Frecuencia | Qué se revisa |
|---|---|
| Diaria (5 min) | Que esté gastando y que no haya rechazos |
| Semanal | CTR saliente, CPM, frecuencia, coste por ViewContent, leads y CPL |
| Quincenal | Rotación de creatividades, calidad de los leads según Tokko |
| Mensual | **Coste por lead calificado y por reunión** — la única métrica que importa |

### Umbrales de acción

| Señal | Acción |
|---|---|
| Frecuencia >2,5 en 7 días | Rotar creatividad |
| CTR saliente <0,8% | Cambiar el gancho, no el diseño |
| CPL calificado >USD 60 | Revisar el filtro de la landing, no la pauta |
| CPL calificado <USD 25 y el equipo da abasto | Subir presupuesto 20-30% cada 4-5 días |
| Un conjunto sin gasto 48 h | Fusionar o apagar: le falta señal |
| Leads que no califican >80% | El problema es el mensaje, no la audiencia |

### Testing con presupuesto chico

**No hay test A/B estadístico con USD 10/día.** Se testea de forma secuencial:
tres creatividades en el mismo conjunto, dos semanas, y se conserva la que
produce mejor coste por ViewContent **y** mejores leads en Tokko. La segunda
señal manda sobre la primera.

### Escalado

Solo se escala si se cumplen las tres condiciones a la vez:

1. Coste por lead calificado por debajo de USD 25.
2. El equipo comercial responde en menos de 1 hora sin acumular pendientes.
3. Hay reuniones agendándose, no solo leads entrando.

Si falla cualquiera, **el problema no se resuelve con más presupuesto.**

---

## 5. Lo que esta campaña NO va a hacer

Con USD 1.200 totales de pauta en 4 meses, la proyección honesta es de
**1 a 2 ventas atribuibles a Meta**, sobre un objetivo de 5. Las otras 3 a 4
salen del outbound.

Meta cumple tres funciones concretas y ninguna es "traer las ventas":

1. **Capturar la demanda latente** que ya busca depósito o inversión industrial.
2. **Dar credibilidad**: cuando el vendedor llama, el prospecto ya vio el
   proyecto. Eso sube la tasa de respuesta del outbound.
3. **Construir el activo**: pixel, audiencias y aprendizajes que sirven para
   Hive 3 y para el resto de los desarrollos de Krak Industrial.

**Si el objetivo pasa a ser que Meta traiga las 5 ventas, el presupuesto tiene
que ir a USD 1.500/mes por 6 meses.** Está calculado en el modelo económico.

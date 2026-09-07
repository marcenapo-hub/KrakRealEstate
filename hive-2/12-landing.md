# Hive 2 — Fase 6: Landing page

Desarrolla y mantiene **Krak**. Objetivo de conversión primario:
**WhatsApp**. Secundario: formulario.

---

## 1. Decisiones de partida

| Decisión | Fundamento |
|---|---|
| **Se publica el precio** ("desde USD 260.820") | Con ticket alto, publicar filtra. El que no puede, no consulta, y el equipo no pierde tiempo |
| **WhatsApp primero** | Es como compra este mercado. El formulario es la alternativa para quien no quiere hablar todavía |
| **Una sola página**, sin navegación | Todo el scroll empuja a un único objetivo |
| **Mobile primero** | El tráfico de Meta en Argentina es abrumadoramente móvil |
| **Sin plano interactivo en v1** | Requiere mantener disponibilidad al día. Se evalúa para la v2 |

---

## 2. Estructura (orden de scroll)

### 01 · Hero
- **Imagen:** render exterior, fachada al atardecer.
- **Título:** *18 naves industriales con entrepiso privado, sobre el Camino del Buen Ayre.*
- **Bajada:** Desde 276 m² totales. Más de 7 metros de altura libre. Entrega febrero 2028.
- **Precio visible:** `Desde USD 260.820 · Se reserva con USD 10.000`
- **CTA primario:** Consultar por WhatsApp · **CTA secundario:** Ver tipologías

> El hero muestra precio y forma de reserva arriba de todo. No se esconde el
> número: se usa como filtro.

### 02 · Barra de datos
`18 unidades` · `276 a 907 m²` · `+7 m de altura libre` · `Feb 2028`

### 03 · El problema y la propuesta
Tres bloques cortos:
- **Comprás metros, no aire.** Cada nave incluye entrepiso privado (≈33%) a USD 630 el m² contra 1.050 de la planta.
- **Entra el camión.** Calles internas de hormigón de 10 m, circulación separada, playa para semirremolque.
- **Trabajás desde el día uno.** Trifásica, fibra óptica, red de incendios, pórtico de control de ingreso.

### 04 · Tipologías
Grilla de 10 fichas: letra, m² de nave, m² de entrepiso, total y **precio**.
Cada ficha con botón *Consultar esta unidad* → WhatsApp con mensaje
precargado que incluye la tipología.

> Esto es calificación pasiva: el vendedor recibe el mensaje sabiendo qué
> unidad le interesa.

### 05 · Ubicación
Mapa. Camino del Buen Ayre y De Benedetti, Polo Industrial Buen Ayre 2,
General San Martín. Tiempos de acceso a los nodos logísticos.

**Acá se aborda la objeción de zona, no se esquiva:** el bloque de accesos y el
de seguridad del predio van juntos.

### 06 · Prueba — Hive 1
El bloque más importante de la página.

> *El primero está cruzando la calle.*
> Hive 1, del mismo desarrollador, se vendió entero y hoy está lleno de
> empresas operando. Hive 2 es el segundo, con las calles más anchas: ese fue
> el aprendizaje.

Sin fotos de Hive 1 (no autorizado). Se resuelve con el plano aéreo del
corredor y con texto.

### 07 · Cómo se compra
Cuatro pasos numerados, honestos:
1. Reservás con USD 10.000. Tenés 60 días.
2. Reunión con la desarrolladora: obra, masterplan y estructura.
3. Firmás la adhesión al fideicomiso de construcción al costo.
4. Posesión al terminar la obra, febrero 2028.

### 08 · Preguntas frecuentes
1. ¿Cuánto necesito para reservar? → USD 10.000, imputables a cuenta de precio, 60 días de vigencia.
2. ¿Cómo se paga el resto? → 50% de anticipo y 18 cuotas. El esquema se detalla en la reunión.
3. ¿Qué puedo hacer adentro de la nave? → *pendiente: usos permitidos de Stark.*
4. ¿Cuándo se entrega? → Febrero de 2028.
5. ¿Cómo se instrumenta la compra? → Adhesión a un fideicomiso de construcción al costo.
6. ¿Cuándo escrituro? → *La escritura depende de los plazos de subdivisión de la Provincia. Lo que tenés desde el primer día es tu posición en el fideicomiso.*
7. ¿Qué seguridad tiene el predio? → *pendiente de confirmación de Stark.*
8. ¿Puedo unir dos unidades? → *pendiente.*
9. ¿Cuánto son las expensas? → *pendiente.*
10. ¿Se puede visitar? → Sí, con turno.

> **Las FAQ son el filtro de honestidad de la campaña.** Cuatro de diez están
> pendientes de Stark. Ninguna se publica inventada: la que no tiene respuesta,
> no sale hasta tenerla.

### 09 · Cierre
Repetición del CTA con el precio y la reserva. Formulario como alternativa.

### 10 · Pie
Krak Real Estate, matrícula del corredor, datos de contacto, política de
privacidad, aviso legal.

---

## 3. Formulario

**Campos (5, ni uno más):**
`Nombre y apellido` · `Teléfono` · `Email` · `Tipología de interés` (select) ·
`Uso previsto` (select: inversión / uso propio / todavía no sé)

**Checkbox obligatorio:** consentimiento de tratamiento de datos con link a la
política de privacidad.

**No se pregunta** presupuesto disponible ni plazo de compra: se conversa. Cada
campo extra baja la conversión y acá cada lead vale mucho.

---

## 4. Especificaciones técnicas

| Requisito | Detalle |
|---|---|
| Dominio | A definir. Sugerido `hive2.com.ar` o subdominio de Krak |
| Rendimiento | LCP <2,5 s en 4G. Renders en WebP, carga diferida bajo el pliegue |
| Tracking | Pixel + **Conversion API** · GA4 · GTM |
| Eventos | `ViewContent` (llega al bloque de tipologías) · `Lead` (envío de formulario) · `Contact` (clic a WhatsApp) |
| Integración | Formulario → **Tokko Broker** por API o Zapier/Make + copia a Google Sheets como respaldo |
| WhatsApp | `wa.me` con mensaje precargado y parámetro de tipología por ficha |
| UTMs | Persistidos en el envío del formulario, para atribuir origen dentro de Tokko |
| Accesibilidad | Contraste AA, foco visible, textos alternativos en renders |
| Legales | Política de privacidad conforme Ley 25.326, aviso de datos personales, matrícula del corredor visible |

### Página de gracias
Confirmación clara + tiempo de respuesta prometido ("te escribimos dentro de la
hora, en horario comercial") + descarga del brochure **actualizado** + dispara
el evento `Lead`. Es también la audiencia a excluir del remarketing.

---

## 5. Bloqueantes antes de publicar

1. **Brochure actualizado** — el actual vende un coworking que ya no existe.
2. **Usos permitidos y habilitación** — sin eso faltan tres FAQ.
3. **Esquema de seguridad confirmado** — sin eso no se puede escribir el bloque
   que responde la objeción principal de la zona.
4. **Render de la tipología J** — es la unidad de entrada y no tiene imagen.

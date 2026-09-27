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
- **Bajada:** Desde 276 m² totales. Más de 7 metros de altura libre. Entrega mediados de 2028.
- **Precio visible:** `Desde USD 260.820 · Se reserva con USD 10.000`
- **CTA primario:** Consultar por WhatsApp · **CTA secundario:** Ver tipologías

> El hero muestra precio y forma de reserva arriba de todo. No se esconde el
> número: se usa como filtro.

### 02 · Barra de datos
`18 unidades` · `276 a 907 m²` · `+7 m de altura libre` · `Med. 2028`

### 03 · Qué resuelve
Cuatro bloques cortos, en el orden de los ángulos creativos:
- **La misma huella, usada dos veces.** Más de 7 m de altura libre para estibar hacia arriba, y entrepiso privado incluido para oficina, vestuario o repuestos. Superficie que no paga suelo.
- **Entra y gira el camión.** Calles internas de hormigón de 10 m de ancho, circulación separada entre tráfico pesado y liviano, playa para semirremolque.
- **Trabajás, no solo guardás.** Trifásica, fibra óptica y red de incendios. Habilitado para categorías I y II.
- **Doble anillo de seguridad.** Un control al entrar al Polo Industrial y otro al entrar al predio de Hive 2.

### 04 · Tipologías
Grilla de 10 fichas: letra, m² de nave, m² de entrepiso, total y **precio**.
Cada ficha con botón *Consultar esta unidad* → WhatsApp con mensaje
precargado que incluye la tipología.

> Esto es calificación pasiva: el vendedor recibe el mensaje sabiendo qué
> unidad le interesa.

### 05 · Ubicación y seguridad
Mapa. Camino del Buen Ayre y De Benedetti, Polo Industrial Buen Ayre 2,
General San Martín. Tiempos de acceso a los nodos logísticos.

**Acá se aborda la objeción de zona de frente**, con un esquema visual del
**doble anillo**: primer control en el ingreso al parque industrial, segundo
control en el ingreso al predio de Hive 2. Más cerco perimetral de 2,20 m,
pórtico e iluminación LED en las calles internas.

> Este bloque es el que desactiva la objeción principal del proyecto. No va
> escondido abajo: va inmediatamente después del mapa.

### 06 · Respaldo — Hive 1
El bloque de confianza. **Con el encuadre correcto: Hive 1 avala al
desarrollador, no describe a Hive 2.**

> *El primero lo entregaron. Está cruzando la calle, lleno.*
> Hive 1, del mismo desarrollador, se vendió entero y hoy opera lleno de
> empresas. Hive 2 es el paso siguiente, no la repetición: calles más anchas,
> más altura libre, entrepiso privado en cada unidad y doble anillo de
> seguridad.

Sin fotos de Hive 1 (no autorizado). Se resuelve con el plano aéreo del
corredor y con texto.

### 07 · Cómo se compra
Cuatro pasos numerados, honestos:
1. Reservás con USD 10.000. Tenés 60 días.
2. Reunión con la desarrolladora: obra, masterplan y estructura.
3. Firmás la adhesión al fideicomiso de construcción al costo.
4. Posesión al terminar la obra, mediados de 2028.

### 08 · Preguntas frecuentes
1. ¿Cuánto necesito para reservar? → USD 10.000, imputables a cuenta de precio, 60 días de vigencia.
2. ¿Cómo se paga el resto? → 50% de anticipo y 18 cuotas. El esquema se detalla en la reunión.
3. ¿Qué puedo hacer adentro de la nave? → Zonificación de categorías I y II: toda actividad industrial, comercial, logística y de depósito, **excepto las complejas** (químicos y productos con impacto ambiental).
4. ¿Cuándo se entrega? → Mediados de 2028.
5. ¿Cómo se instrumenta la compra? → Adhesión a un fideicomiso de construcción al costo.
6. ¿Cuándo escrituro? → *La escritura depende de los plazos de subdivisión de la Provincia. Lo que tenés desde el primer día es tu posición en el fideicomiso.*
7. ¿Qué seguridad tiene el predio? → Doble anillo de control de acceso: uno al ingresar al Polo Industrial Buen Ayre 2 y otro al ingresar al predio de Hive 2. Cerco perimetral de 2,20 m, pórtico de control e iluminación LED en las calles internas.
8. ¿Puedo unir dos unidades? → *pendiente.*
9. ¿Cuánto son las expensas? → *pendiente.*
10. ¿Se puede visitar? → Sí, con turno.

> **Las FAQ son el filtro de honestidad de la campaña.** Quedan **dos**
> pendientes de Stark: expensas y unión de unidades. Ninguna se publica
> inventada: la que no tiene respuesta, no sale hasta tenerla.

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

**Resueltos el 2026-09-21:** usos permitidos (categorías I y II) · esquema de
seguridad (doble anillo) · fecha de entrega (mediados de 2028).

**Abiertos:**

1. **Brochure actualizado** — el actual vende un coworking que ya no existe.
   En camino desde Stark.
2. **Cuadro definitivo de las 18 unidades** — terminado por Stark, falta que
   llegue a Krak. Sin él, el bloque de tipologías sale con las superficies del
   brochure actual.
3. **Render de la tipología J** — es la unidad de entrada y no tiene imagen.
4. **Expensas** — es la FAQ que más preguntan los inversores.

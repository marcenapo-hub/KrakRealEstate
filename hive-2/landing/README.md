# Landing Hive 2 — v1

`index.html` — página completa, un solo archivo, sin dependencias salvo Google Fonts.

## Qué es y qué no es

**Es** la landing maquetada con los copys definitivos, la estructura de 10
bloques de `../12-landing.md` y todos los datos confirmados en la Ficha Maestra.

**No es** la versión publicable todavía: faltan las imágenes y cuatro datos.
Todo lo que falta está marcado **dentro de la propia página**, visible, para que
no se publique por error.

## Slots de imagen — buscar "Aquí va render"

| # | Bloque | Qué va | Estado |
|---|---|---|---|
| 1 | Hero | Exterior, fachada al atardecer | ✅ **Existe**: `RENDER EXTERIOR HIVE 2 - FACHADA ATARDECER.png` |
| 2 | Producto | **Corte o axonometría** con los 7 m de altura y el entrepiso, con figura humana | ❌ A producir — Stark |
| 3 | Ubicación | Mapa embebido o plano aéreo del corredor | ❌ A producir — drone |
| 4 | Seguridad | Pórtico de ingreso al predio | ✅ **Existe**: `RENDER INGRESO PÓRTICO corregido.png` · falta la del acceso al parque |
| 5 | Respaldo | Aérea del corredor con Hive 1 al fondo, **a distancia** | ❌ A producir — drone |

El slot 2 es el más importante: sostiene el argumento central del producto.

## Notas de obra dentro de la página — borrar antes de publicar

1. **Bloque ámbar después de las FAQ** (`class="buildnote"`): lista las dos FAQ
   pendientes y la advertencia sobre las superficies.
2. **Párrafo final del pie**: recuerda completar matrícula del corredor, CUIT y
   domicilio.

Buscar `buildnote` y `Nota de obra` y eliminarlos.

## Reemplazos obligatorios

| Buscar | Reemplazar por |
|---|---|
| `5491100000000` | Número real de WhatsApp de guardia comercial (10 apariciones) |
| `/privacidad` | URL real de la política de privacidad |
| `industrial@krak.com.ar` | Casilla real del área |
| `action="#"` en el formulario | Endpoint que integra con Tokko |

## Pendiente de datos

- **Cuadro definitivo de las 18 unidades.** Las diez fichas de tipología usan
  las superficies del brochure. Falta identificar la unidad n.º 18 (hoy figuran
  17 distribuidas).
- **Expensas** y **unión de unidades**: las dos FAQ que faltan.

## Tracking a implementar

`ViewContent` al entrar en viewport el bloque `#tipologias` · `Contact` en cada
clic a `wa.me` · `Lead` en la página de gracias. Pixel + Conversion API + GA4
vía GTM. Ver `../14-tracking.md`.

## Decisiones de diseño

- **Tema oscuro único, no sigue el tema del sistema.** Es una decisión de marca:
  la identidad del proyecto es industrial oscura (panel sándwich negro,
  estructura metálica expuesta). Todos los colores se pintan explícitamente.
- **Ámbar de señalización industrial** (#F5A623) como único acento, tomado del
  lenguaje de demarcación de depósitos.
- Tipografía Barlow Condensed (títulos, señalética) + Barlow (texto) +
  IBM Plex Mono (cifras, con `tabular-nums` en las tablas de precios).
- **El precio está en el hero.** Con este ticket, publicar filtra.
- **WhatsApp fijo al pie en móvil**, que es de donde va a venir casi todo el
  tráfico de Meta.

# Campaña de alquiler de naves industriales — Krak Industrial

Estado al 27 de septiembre de 2026. Trabajado en sesiones de Claude Code en la
nube; continúa en local. **Todo lo producido está en `marketing/naves-industriales/`.**

## Qué es esto

Campaña de captación de inquilinos para la cartera de naves industriales en
alquiler de GBA. Unidad de negocio: **Krak Industrial** (gama de grises, B2B
racional), dentro del ecosistema Krak. Socio a cargo del industrial: Pablo
Kisieluk.

## El insight que ordena todo

**El cliente B2B industrial no se enamora de una nave.** Entra con tres
parámetros cerrados —metros, actividad, zona— y quiere que le manden lo que
hay. El formulario de requerimiento no es un peaje: es exactamente lo que vino
a hacer.

La bifurcación real del embudo no es la zona geográfica sino **si lo que
necesita entra o no en las nueve naves propias**. Si entra: ficha técnica y
visita. Si no entra —que es la mayoría— el producto es el informe comparativo.

## Reglas de copy vigentes

1. **Modo capacidad, nunca modo carencia.** Nunca "si ninguna te sirve,
   buscamos". Siempre "y acceso a todo el corredor". El método no se
   publicita. Ver `guiones-y-decisiones.md` §1.1.
2. **Lo técnico es prueba, no gancho.** Altura, piso, kVA, garantías, expensas
   y comisión no son dolores: son especificaciones. Van en el cuerpo, nunca en
   la primera línea.
3. **La estética no se desprecia.** No dispara la búsqueda pero gana la
   comparación. En frío hablamos del problema, en la comparación mostramos el
   producto.
4. **Nunca escasez falsa.** Sin disponibilidad real desde Tokko, no hay
   contador ni "últimas unidades".
5. **Foto real o nada.** Ni render ni banco de imágenes para representar una
   nave concreta.
6. **Tono:** profesional y directo, tuteo argentino, sin signos de admiración.
   Si una frase podría estar en un aviso de departamento, está mal escrita.

## Los once dolores validados

Marce validó once sobre una lista de cincuenta. Se nombran así, no por número.

**Disparadores** — por qué arranca a buscar:
Tengo fecha de salida · Ya no entra nada · Pago metros vacíos ·
Me observaron la habilitación · Lo pago en fletes

**Fricciones** — por qué buscar es desesperante:
No hay dónde buscar · Los avisos no dicen nada · No puedo comparar ·
Busco yo, que además opero · Lo bueno no se publica ·
Me atiende alguien que no entiende

Descartó tres bloques enteros: lo técnico de la nave, lo contractual y legal,
y lo económico.

## Cartera base (informe del 27/6/2026)

Nueve naves en exclusiva, **1.325 a 9.000 m²**, **USD 5,50 a 8,84 /m²/mes**,
25 a 40 minutos de CABA.

| # | Ubicación | Corredor | m² | USD/mes | Estado |
|---|---|---|---|---|---|
| 1 | P.I. Ezeiza | Sur | 6.000 + 350 ofic. | 30.000 | Disponible |
| 2 | P.I. Hurlingham | Oeste | 5.530 | 28.400 | Disponible |
| 3 | Polo Ind. Ezeiza | Sur | 6.000 | 36.000 | A estrenar |
| 4 | Arbox Park Escobar | Norte | 5.000 | 32.500 | A estrenar |
| 5 | Arbox Park Escobar | Norte | 4 mód. de 1.325 | 8.612/mód. | Disponible |
| 6 | P.I. Reconquista | Oeste | 9.000 | 67.500 | Disponible |
| 7 | C.M. Pablo Podestá | Oeste | 4.927 | 39.416 | Disponible |
| 8 | Norlog | Norte | 6.000 | Consultar | Final de obra |
| 9 | El Triángulo (Malvinas) | Norte | 6.447 | 57.000 | Disponible |

**Ojo con los corredores:** el Camino del Buen Ayre es **Oeste**, no Norte. El
Norte va por Panamericana y Ruta 9.

## Economía

Honorario: **un mes del valor locativo, a cargo del locador**. Promedio sobre
la cartera: **USD 37.428** por operación. Incluso suponiendo un cierre cada
cien requerimientos, cada requerimiento calificado vale USD 374.

**Consecuencia:** el costo por lead no es la restricción del negocio. La
capacidad de atención del equipo sí.

## Hallazgos del CRM (export de contactos, 18/7/2026)

- **El pipeline histórico se muere solo.** La mayoría figura `Cerrado` por
  `Busqueda suspendida` o `Fantasma`, con cierres en lote el 8 y el 13 de
  julio de 2026 sobre leads de 2020-2022. Meterle tráfico pago a ese embudo
  sin resolver la gestión es tirar plata.
- **Tokko piensa en parques, no en zonas:** `Ubicación De La Consulta`
  registra `BuenAyre2`, `Polo 25`, `Panamericana`.
- **Los campos necesarios ya existen:** `Rubro Del Consultante`, escalas de
  inversión, capacidad constructiva en m², `Origen De Contacto` con taxonomía.
- **El histórico es de venta de lotes**, no de alquiler de naves. Sirve como
  aprendizaje de canal, no como audiencia.

## Canal de YouTube (75 videos, auditado vía API)

Sólo nueve piezas son industriales; dos muestran naves de la cartera:
**"Esta Nave Industrial Mide 2 Canchas de Fútbol | Parque Reconquista"** y
**"Arbox Escobar 2"**. En contenido industrial, **los shorts rinden 10 a 25
veces más que los videos largos**. La serie "Un Café en Krak" promedia 76
vistas con episodios de 43 a 68 minutos.

Inventario completo en `canal-youtube-inventario.json`.

## Qué hay en el repositorio

| Archivo | Qué es |
|---|---|
| `kit-campana.html` | **Kit A.** 34 piezas. Intacto como término de comparación |
| `kit-b-diagnostico.html` | Auditoría del Kit A contra el framework de Platzi, pain map y seis ángulos |
| `kit-b.html` | **Kit B.** 15 piezas sobre los tres ángulos aprobados |
| `anexo-alternativas.html` | Alternativa apareada por cada pieza del Kit A, mismo slot |
| `guiones-y-decisiones.md` | **Guiones en producción y decisiones de copy.** El más vivo |
| `funnel-naves-industriales.html` | Documento estratégico inicial |
| `funnel-naves-industriales-v2.excalidraw` | Mapa de recorrido, lógica Funnelytics |
| `landing-busqueda-naves.excalidraw` | Wireframe de la landing de requerimiento |
| `canal-youtube-inventario.json` | Los 75 videos del canal |

## Pendientes

1. **Datos técnicos de las nueve naves:** altura libre útil, capacidad de piso
   en t/m², potencia instalada en kVA, portones, radio de giro, alcance de las
   expensas. Bloquea fichas, recorridos y remarketing por nave.
2. **Los cinco plazos de una mudanza industrial** (relevar, visitar, negociar,
   habilitar, mudar). Bloquea una pieza del Kit B.
3. **¿El locatario paga honorarios?** Si no paga, es un argumento sin usar.
4. **Capacidad de atención semanal del equipo.** Define el techo del
   presupuesto de medios.
5. **Texto completo de dos rubros de Tokko** truncados en la captura:
   "Fabricación de Maquinaria y […]" y "Productos Informáticos, Elect[…]".
6. **Cuántos viajes por día** hace una operación típica, para la cuenta del
   guion de fletes.

## Contexto que no está en el repo

- **Landing:** vive en `krak.com.ar/industrial/naves-en-alquiler`, dentro del
  proyecto de ecosistema web de TIKI AI Solutions (propuesta del 27/8/2026,
  $900.000, siete semanas). El CRM permite traer propiedades por API, ya
  verificado por ellos.
- **Documento de guiones vivo:** lo edita Marce a mano en Google Docs,
  `1XreqBgwYNNA2ggE9teluBQHMqdE6_3QZq7_5-h7IZJc`.
- **Marca:** Manual Krak RE 2025 — Inter, `#08407C` + grises `#4E586E`,
  `#7C8594`, `#C3C3C3`. Logo "Krak Industrial Vertical Gris" en Drive.
- **Contacto:** WhatsApp +54 9 11 3888 2095 · info@krak.com.ar ·
  Dardo Rocha 2070, 1er piso, Martínez.
- **No hay casos con nombre.** El cliente industrial argentino no acepta que
  se publique dónde alquiló ni cuánto paga. La prueba se apoya en el proceso
  (informe comparativo con datos tapados), en la cartera, y en las
  credenciales propias de Marce: perito tasador, martillero público, pericias
  judiciales de activos industriales.

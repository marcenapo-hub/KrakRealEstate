# Campaña de alquiler de naves industriales — Krak Industrial

Estrategia, arquitectura de embudo y kit de producción para la captación de
inquilinos de la cartera de naves industriales en GBA.

## Archivos

| Archivo | Qué es |
|---|---|
| `kit-campana.html` | **Entregable para el equipo de marketing.** 34 piezas con copy literal, brief visual, guiones de rodaje, spec de landing y orden de producción. |
| `funnel-naves-industriales.html` | Documento estratégico: diagnóstico, comparación de arquitecturas A/B/C, medición y auditoría del borrador v1. |
| `funnel-naves-industriales-v2.excalidraw` | Mapa de recorrido con lógica Funnelytics. Abrir en excalidraw.com. |
| `funnel-naves-industriales-v1-borrador.excalidraw` | Borrador original auditado, conservado como referencia. |
| `kit-b-diagnostico.html` | **Kit B — fase de diagnóstico.** Auditoría del Kit A contra el framework de Platzi, mapa de dolores validado y seis ángulos creativos. |
| `kit-b.html` | **Kit B — piezas.** Quince piezas de pauta sobre los tres ángulos aprobados, con copy completo. |
| `anexo-alternativas.html` | **Anexo al Kit A.** Una alternativa apareada por cada pieza de pauta, más tres slots nuevos, con su ubicación exacta. |
| `landing-busqueda-naves.excalidraw` | Wireframe de la landing de requerimiento, adaptado del mockup de captación. |
| `canal-youtube-inventario.json` | Inventario de los 75 videos del canal, vía API de YouTube. |

## Decisiones tomadas

- **Producto:** solo alquiler de naves. La venta de lotes en parques es otra campaña.
- **Arquitectura:** híbrida (opción C). Campaña fría única en Meta con creativos
  por corredor; Google Search sí separado por corredor; LinkedIn por cargo.
- **Promesa:** cartera como prueba + búsqueda como servicio, en ese orden, en toda pieza.
- **Precio:** valor o rango visible en todas las piezas.
- **Destino:** landing de requerimiento en `krak.com.ar/industrial/naves-en-alquiler`,
  dentro del proyecto de ecosistema web.
- **Marca:** Manual Krak RE 2025 (Inter, `#08407C`) con gama de grises para la unidad industrial.

## El insight que ordena todo

El cliente B2B industrial no se enamora de una nave. Entra con tres parámetros
cerrados — metros, actividad y zona — y quiere que le manden lo que hay. El
formulario de requerimiento no es un peaje: es exactamente lo que vino a hacer.

La bifurcación real del embudo no es la zona geográfica sino **si lo que necesita
entra o no en las 9 naves propias**. Si entra: ficha técnica y visita. Si no
entra — que es la mayoría — el producto es el informe comparativo.

## Cartera base

9 naves en exclusiva, 1.325 a 9.000 m², USD 5,50 a 8,84 /m²/mes, 25 a 40 minutos
de CABA. Corredores: Norte (4), Oeste (3), Sur (2). Fuente: informe de búsqueda
del 27/6/2026.

## Pendiente antes de producir

1. **Datos técnicos por nave** (bloquea fichas, recorridos y remarketing):
   altura libre útil, capacidad de piso en t/m², potencia instalada en kVA,
   portones, radio de giro y alcance de expensas.
2. **Listado del canal de YouTube** para cerrar la selección de re-edición (V-00).
3. **Export actualizado de propiedades de Tokko** en `.xlsx` o Google Sheet.

## Kit A y Kit B

El **Kit A** (`kit-campana.html`) queda **intacto**: es la fuente de verdad sobre qué se
dice y a quién, y el término de comparación del test.

El **Kit B** replantea únicamente las piezas de pauta, sobre los once dolores que Marce
validó de una lista de cincuenta. La corrección central: lo técnico de la nave —altura,
piso, potencia— **no es dolor, es especificación**. Su lugar es la prueba, no el gancho.

Los tres ángulos aprobados:

1. **B-01 · El mercado que no ves** — las mejores naves se alquilan antes de llegar al portal.
2. **B-02 · La mudanza no arranca cuando te vence** — el único que le habla a quien todavía no busca.
3. **B-03 · Estás haciendo trabajo de broker gratis** — el más cercano al Kit A, sirve de control.

## Tres documentos, tres funciones

| Documento | Qué hace |
|---|---|
| Kit A | Intacto. Fuente de verdad sobre qué se dice y a quién. |
| Kit B | Quince piezas nuevas sobre tres ángulos completos de dolor. |
| Anexo de alternativas | Una alternativa apareada por pieza del Kit A, mismo slot, sin rearmar la campaña. |

El anexo y el Kit B no compiten: el Kit B propone una campaña alternativa completa;
el anexo permite cambiar pieza por pieza sin tocar la estructura. Se pueden usar los
dos, uno o ninguno.

## Economía de la campaña

Honorario: un mes del valor locativo, a cargo del locador. Sobre la cartera actual son
USD 8.612 a 67.500 por operación, con un promedio de USD 37.428. Incluso suponiendo un
cierre cada cien requerimientos, cada requerimiento calificado vale USD 374.

**Consecuencia:** el costo por lead no es la restricción del negocio. La capacidad de
atención del equipo sí — y ese dato sigue pendiente.

## Pendientes

1. Los cinco plazos de una mudanza industrial (bloquea B02-M3).
2. ¿El locatario paga honorarios? Si no, es un argumento sin usar en ningún kit.
3. Capacidad de atención semanal del equipo.
4. Datos técnicos por nave: altura libre, capacidad de piso, kVA, portones, radio de giro.
5. Texto completo de los dos rubros truncados de Tokko.

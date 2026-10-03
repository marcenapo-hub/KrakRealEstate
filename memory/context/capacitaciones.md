# Sistema de capacitaciones de Krak (2026-09/10)

Cómo se producen las capacitaciones internas en este repo, qué sabe hacer bien
este flujo y dónde están sus límites reales.

---

## Para qué sirve esto, en una frase

**Convertir material disperso —un manual, un PDF, transcripciones de videos, una
conversación— en una capacitación de marca versionada y regenerable.**

La palabra que importa es *regenerable*. El deck no es un archivo que alguien
tocó a mano una vez: es la salida de un script. Eso es lo que hace que el
trabajo se acumule en vez de evaporarse.

### La mejor función: el deck como código, no como archivo

Todo el valor está en `capacitaciones/krak.js`, que es el sistema visual de la
marca escrito una sola vez (paleta del Manual de Marca 2025, Inter, rail con
isotipo, tarjetas, ondas, carátula y cierre). Los cuatro generadores lo importan.

Consecuencias prácticas, que son el motivo para usar este flujo y no Canva:

- **Si cambia la marca, se toca un archivo y se regeneran los cuatro decks.**
  En Canva habría que rehacer cada diapositiva a mano.
- **Una capacitación nueva es contenido, no diseño.** El layout ya está resuelto;
  el trabajo es decidir qué se dice.
- **El contenido es diffeable.** Se ve en el historial qué cambió y por qué
  (ej.: el commit que corrigió el ITI derogado).
- **De una sola fuente salen varias salidas**: el .pptx, el guion hablado,
  el PDF del guion, el material de referencia web.

### La segunda función: el control de calidad visual

El ciclo es `node` → LibreOffice → PDF → JPEG → mirar cada página → corregir.
En esta sesión encontró y arregló unos quince desbordes de texto: rótulos que
pisaban el cuerpo, tarjetas que se salían por abajo, el cierre que se
superponía con la bajada.

**Esto es lo que diferencia un deck usable de un deck que se rompe delante de
la sala.** No saltearlo nunca: pptxgenjs no avisa cuando el texto no entra.

---

## Qué hay hoy

| Capacitación | Carpeta | Slides | Estado |
|---|---|---|---|
| Impuestos para agentes | `capacitaciones/impuestos/` | 13 | Lista |
| Prospección | `capacitaciones/prospeccion/` | 11 | Lista |
| Prospección avanzada | `capacitaciones/prospeccion/` | 14 | Lista |
| Créditos hipotecarios UVA | `capacitaciones/creditos-uva/` | 18 | Lista + guion + PDF |
| Co-broking: compartir honorarios con colegas | `capacitaciones/co-broking/` | 14 | Lista, falta validar con Marce (ver Pendiente) |

Regenerar: `npm run impuestos` · `prospeccion` · `prospeccion-avanzada` · `creditos-uva` · `co-broking`.
Requiere `npm install` (pptxgenjs). Para el QA visual: `libreoffice-impress`,
`poppler-utils` y `fonts-inter`.

**Inter tiene que estar instalada** en la máquina que abra los .pptx o PowerPoint
sustituye la tipografía. Los TTF están en Drive, en
`Manual de Marca Krak 2025/manual_Carpeta/Fonts`.

---

## Reglas de contenido que no se negocian

Nacieron de un error real: en la capacitación de Impuestos se afirmó que el ITI
seguía vigente. Está derogado por el art. 67 de la Ley 27.743 desde julio de
2024. Se corrigió, pero el episodio fijó el criterio.

1. **Clasificar todo dato antes de ponerlo en pantalla.**

    - *Estructural*: cómo funciona el instrumento. No caduca.
    - *Coyuntural*: valor UVA, IPC, tasas. Caduca. Lleva fecha visible.
    - *Por entidad*: LTV, cuota/ingreso, score, plazos. **Nunca como regla
      universal.** Siempre "depende del banco".
    - *Hipotético*: los ejemplos numéricos. Marcados como tales en la diapositiva.

2. **Fecha de corte visible** en carátula, cierre y notas del orador, más la
   lista de qué verificar antes de volver a dictar.
3. **Sin pronósticos** de inflación, dólar ni precios.
4. **No convertir al agente en asesor financiero.** En el deck de UVA la
   aclaración aparece dicha tres veces, a propósito.
5. **Si un número no se pudo verificar, se dice.** Preferible un hueco
   declarado que un dato inventado con aire de certeza.

---

## Límites reales del entorno

- **Canva no funciona.** El conector necesita autorización, y además el diseño
  que pasó Marce dio `permission_denied`: no está compartido con la cuenta
  autorizada. Diagnóstico hecho en tres pasos (brand kits OK → diseño accesible
  OK → diseño objetivo denegado). **Workaround probado y bueno: Marce exporta
  el PDF y de ahí se extraen los assets reales** (logo, isotipo, ondas,
  degradado) con PyMuPDF, compositando el canal alfa.
- **YouTube está bloqueado** por el proxy, y no hay `yt-dlp`. Para usar un video
  hay que pasar la transcripción (pegada o en un Doc de Drive). Funcionó muy
  bien: tres transcripciones aportaron el programa oficial 2026, el argumento
  TIPS + riesgo país, el credit score y el tratamiento de monotributistas.
- **bcra.gob.ar, arca.gob.ar, afip.gob.ar y arba.gob.ar están bloqueados.** No
  se pueden verificar valores oficiales desde acá. El valor de la UVA del deck
  viene de agregadores que citan al BCRA. **Chequearlo es tarea de Marce, el
  día anterior a dictar.**
- **Google Fonts no carga en Chromium headless** aunque sí responda por curl.
  Para generar PDFs hay que incrustar la tipografía como data URI en el HTML.
- **El contenedor es efímero.** Todo lo que no se commitea se pierde. Al
  retomar, sincronizar: `git fetch` + `git reset --hard origin/<rama>`.
- **WebSearch devuelve datos viejos con cara de actuales.** Pasó con las escalas
  de Ganancias: devolvió montos de 2021 como si fueran vigentes. Verificar
  siempre contra fuente primaria o declarar la incertidumbre.

---

## Rol de Claude en capacitaciones

**Operador pleno.** Escribir el generador, producir el contenido, hacer el QA
visual, commitear y pushear. Marce revisa el resultado, no el proceso.

Al producir una capacitación nueva:

1. Leer el material fuente completo antes de diseñar nada.
2. Proponer estructura y **esperar aprobación** si el pedido lo dice.
3. Escribir el generador sobre `krak.js`. No duplicar tokens de marca.
4. Notas del orador en **todas** las diapositivas: el deck es poco texto, el
   desarrollo vive en las notas.
5. QA visual página por página. Corregir. Volver a renderizar.
6. Commitear con mensaje que explique el criterio, no solo el qué.
7. Al entregar: decir la fecha de corte, qué quedó sin verificar y qué hay que
   chequear antes de usarlo.

### Si la capacitación se va a grabar en video

Texto corto, tipografía grande, pocos elementos por diapositiva. Marcar en las
notas dónde van los silencios. En el deck de UVA son dos: después de la analogía
de los litros de nafta, y los cinco segundos tras leer la tabla del año 12.

---

## Pendiente

- **Co-broking (2026-10-03)**: contenido armado con el criterio dictado por Marce (formas de reparto, qué cambia por producto, convenio vs reserva, mail y WhatsApp como prueba, preguntar primero). Antes de dictar, confirmar: (1) el alcance de la tercera forma de reparto, "a veces te comparten el uno" quedó como porcentaje fijo, por ejemplo 1%; (2) que la lectura de "mitad del comprador" del ejemplo numérico es la correcta (el colega con la propiedad conserva el honorario del vendedor); (3) la regla para naves, locales y alquileres, que figura como "se acuerda"; (4) la regla de comisión entre unidades del grupo, no definida. No hay casos reales: los tres de la diapositiva 11 son hipotéticos y el taller de la 12 junta los del equipo para la próxima versión.

- **Unificación de las dos capacitaciones de prospección**: estructura propuesta,
  **esperando aprobación de Marce**. Quedaron cuatro preguntas abiertas: 25
  diapositivas o versión de 60 minutos; si se incluyen ejercicios en vivo;
  guiones y objeciones reales del equipo; datos de embudo si existen.
- **Decisión de fondo sin tomar**: dónde vive la fuente de verdad de los decks,
  si el repo o Canva. Hoy es el repo, de hecho.
- El guion del deck UVA dura ~38 minutos reales, no 30. El orden de recorte
  está documentado en el propio guion.

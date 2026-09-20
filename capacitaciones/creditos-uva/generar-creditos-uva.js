/*
 * Capacitación: Créditos Hipotecarios UVA para agentes inmobiliarios.
 *
 * 18 diapositivas (carátula + 16 de contenido + cierre), 30 minutos.
 * Sistema visual: capacitaciones/krak.js (Manual de Marca Krak 2025).
 *
 * Diseñado para doble uso: sala presencial y grabación de video. Por eso
 * el texto en pantalla es corto y grande, y todo el desarrollo vive en las
 * notas del orador.
 *
 * FECHA DE CORTE DE LOS DATOS: 19/09/2026.
 *
 * Criterio con los números (ver notas de la última slide):
 *   · estructural  → cómo funciona el instrumento. No cambia.
 *   · coyuntural   → valor de la UVA, IPC, tasas. Cambia. Lleva fecha.
 *   · por entidad  → LTV, cuota/ingreso, score, plazos. NUNCA como regla
 *                    universal: siempre "según el banco".
 *   · hipotético   → los ejemplos numéricos. Marcados en pantalla.
 *
 * Uso:  node generar-creditos-uva.js [salida.pptx]
 */
const K = require("../krak");
const {
  BLUE, GRAYC, SLATE, BLUE2, INK, MUTED, LIGHT, ONBLUE, ONGRAY, W,
  GREEN, RED, F, AZUL, GRIS, NEUTRO, L, CW, H,
} = K;

const d = K.deck("Créditos Hipotecarios UVA", __dirname);
const { pres, A, round, rect, cover, slide, keyBar, bandHeader, closing } = d;

/* ===================== HELPERS DE ESTE DECK ===================== */

/* Tarjeta con número grande arriba y rótulo debajo. */
function stat(s, o) {
  const fill = o.fill || BLUE;
  const onFill = fill === BLUE || fill === SLATE || fill === BLUE2 ? ONBLUE : ONGRAY;
  round(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: fill } });
  s.addText(o.numero, {
    x: o.x + 0.2, y: o.y + 0.16, w: o.w - 0.4, h: 0.62, margin: 0, valign: "middle",
    fontFace: F, fontSize: o.tam || 30, bold: true, color: W,
  });
  s.addText(o.rotulo, {
    x: o.x + 0.2, y: o.y + 0.78, w: o.w - 0.4, h: 0.24, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: W, charSpacing: 1,
  });
  if (o.detalle) {
    s.addText(o.detalle, {
      x: o.x + 0.2, y: o.y + 1.04, w: o.w - 0.4, h: o.h - 1.16, margin: 0, valign: "top",
      fontFace: F, fontSize: 9.5, color: onFill, lineSpacing: 11.5,
    });
  }
}

/* Tarjeta de texto: rótulo chico arriba, título, cuerpo. */
function card(s, o) {
  const fill = o.fill || LIGHT;
  const oscura = fill === BLUE || fill === SLATE || fill === GRAYC || fill === BLUE2;
  const cTit = oscura ? W : BLUE;
  const cTxt = oscura ? (fill === GRAYC ? ONGRAY : ONBLUE) : INK;
  const cRot = oscura ? (fill === GRAYC ? ONGRAY : ONBLUE) : MUTED;
  round(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: fill } });
  let y = o.y + 0.18;
  if (o.rotulo) {
    s.addText(o.rotulo, {
      x: o.x + 0.22, y, w: o.w - 0.44, h: 0.2, margin: 0, valign: "middle",
      fontFace: F, fontSize: 8.5, bold: true, color: cRot, charSpacing: 1.1,
    });
    y += 0.24;
  }
  if (o.titulo) {
    s.addText(o.titulo, {
      x: o.x + 0.22, y, w: o.w - 0.44, h: o.altoTitulo || 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: o.tamTitulo || 13, bold: true, color: cTit,
      lineSpacing: (o.tamTitulo || 13) * 1.15,
    });
    y += (o.altoTitulo || 0.3) + 0.06;
  }
  if (o.cuerpo) {
    s.addText(o.cuerpo, {
      x: o.x + 0.22, y, w: o.w - 0.44, h: o.y + o.h - y - 0.16, margin: 0, valign: "top",
      fontFace: F, fontSize: o.tamCuerpo || 10.5, color: cTxt,
      lineSpacing: (o.tamCuerpo || 10.5) * 1.28,
    });
  }
}

/* Flecha "→" de conexión entre cajas. */
function flecha(s, x, y, w, color) {
  s.addText("→", {
    x, y, w, h: 0.3, margin: 0, align: "center", valign: "middle",
    fontFace: F, fontSize: 17, bold: true, color: color || AZUL[1],
  });
}

/* Franja de aviso (hipotético / atención). */
function aviso(s, y, texto, color) {
  const fill = color || GRAYC;
  round(s, { x: L, y, w: CW, h: 0.34, fill: { color: fill } });
  s.addText(texto, {
    x: L + 0.24, y, w: CW - 0.48, h: 0.34, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9.5, bold: true, color: W, charSpacing: 0.6,
  });
}

/* Fila de tabla comparativa de dos columnas numéricas. */
function filaComp(s, y, rowH, etiqueta, a, b, opts) {
  const o = opts || {};
  const xE = L, wE = 3.5;
  const xA = L + 3.62, wA = 2.55;
  const xB = L + 6.29, wB = 2.55;
  if (o.zebra) {
    round(s, { x: L, y, w: CW, h: rowH - 0.06, fill: { color: NEUTRO[3] } });
  }
  s.addText(etiqueta, {
    x: xE + 0.24, y, w: wE - 0.3, h: rowH - 0.06, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11, bold: !!o.fuerte, color: o.fuerte ? BLUE : INK,
  });
  [[xA, wA, a, o.colorA], [xB, wB, b, o.colorB]].forEach(([x, w, txt, col]) => {
    s.addText(txt, {
      x, y, w, h: rowH - 0.06, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: o.tam || 12.5, bold: true, color: col || INK,
    });
  });
}

/* ===================== 01 · CARÁTULA ===================== */
const s1 = cover(
  "Créditos\nHipotecarios UVA",
  "Cómo funciona y cómo hablar de esto con un cliente  ·  30 min  ·  Datos al 19/09/2026"
);
s1.addNotes(
  [
    "APERTURA (30 segundos). No leer la slide.",
    "",
    'Arrancar con esto: "Esto no es una clase de economía. Es una herramienta de venta.',
    'En 30 minutos van a entender el producto lo suficiente como para tener mejores',
    'conversaciones y no perder operaciones por no saber qué contestar."',
    "",
    "Aclarar de entrada las dos reglas de la capacitación:",
    "1. Todos los números concretos tienen fecha. Se desactualizan. Los conceptos no.",
    "2. Nosotros no somos asesores financieros. Explicamos el producto y derivamos.",
    "   Esa frase se repite tres veces a lo largo de la charla, a propósito.",
  ].join("\n")
);

/* ===================== 02 · EL TEMA YA ESTÁ EN LA MESA ===================== */
{
  const s = slide(
    "El tema ya está en la mesa",
    "Levanten la mano: ¿a cuántos les preguntaron por crédito este mes?"
  );
  const w = (CW - 2 * 0.2) / 3;
  stat(s, {
    x: L, y: 1.3, w, h: 1.76, fill: BLUE, numero: "~950",
    rotulo: "CON HIPOTECA · CABA · JUL 2026",
    detalle: "Sobre ~6.051 escrituras totales. Una de cada seis operaciones pasa por un crédito.",
  });
  stat(s, {
    x: L + w + 0.2, y: 1.3, w, h: 1.76, fill: SLATE, numero: "2%",
    rotulo: "STOCK HIPOTECARIO / PBI",
    detalle: "Chile ronda el 27% y Estados Unidos llegó al 75%. El margen de crecimiento es enorme.",
  });
  stat(s, {
    x: L + 2 * (w + 0.2), y: 1.3, w, h: 1.76, fill: GRAYC, numero: "$2 bill.",
    rotulo: "PROGRAMA OFICIAL 2026",
    detalle: "Estimación oficial: entre 17.000 y 18.000 familias. Lo vemos en detalle más adelante.",
  });

  card(s, {
    x: L, y: 3.14, w: CW, h: 1.2, fill: LIGHT,
    rotulo: "EL PUNTO DE LA DIAPOSITIVA",
    titulo: "La demanda sobra. Lo que falta es oferta de crédito — y gente que sepa explicarlo.",
    cuerpo:
      "Cada línea nueva genera miles de consultas y termina en cientos de créditos. El cuello de botella no es el " +
      "interés del comprador: es cuántas carpetas procesa el sistema y cuántos llegan bien preparados.",
  });
  keyBar(s, 4.42, "SI NO SABÉS CONTESTAR, LA CONVERSACIÓN SE MUERE AHÍ",
    "No hace falta ser experto en finanzas. Alcanza con entender el producto lo suficiente como para sostener la charla y derivar bien.");

  s.addNotes(
    [
      "2,5 MINUTOS. Slide de enganche: hacer levantar la mano de verdad, esperar.",
      "",
      "Datos y de dónde salen (fecha de corte 19/09/2026):",
      "· Escrituras CABA julio 2026: ~6.051 traslativas de dominio, ~950 con hipoteca.",
      "  Fuente: Colegio de Escribanos de CABA, citado en el análisis de Inmobiliarios.com.",
      "  Ojo: no todas esas hipotecas son bancarias, también hay peer-to-peer.",
      "· Stock hipotecario / PBI: ~2% en Argentina. Comparaciones (Chile ~27%, EE.UU. hasta 75%)",
      "  mencionadas por el ministro de Economía en el anuncio del programa.",
      "· Programa de $2 billones: anuncio oficial de 2026. Detalle en la slide 14.",
      "",
      "El mensaje, dicho con todas las letras: hay muchísima más gente preguntando que",
      "créditos otorgados. Eso significa que la mayoría de esas conversaciones se pierde.",
      "Muchas se pierden porque del otro lado no hay nadie que sepa contestar.",
      "",
      "NO decir que el crédito 'está para todos'. No lo está. Son cientos o algunos miles",
      "de operaciones frente a millones de personas que querrían comprar. Sé honesto con eso:",
      "la sala lo sabe y perdés credibilidad si lo exagerás.",
    ].join("\n")
  );
}

/* ===================== 03 · QUÉ ES UN CRÉDITO HIPOTECARIO ===================== */
{
  const s = slide(
    "Qué es un crédito hipotecario",
    "Seis actores, un solo circuito. Nadie pierde la propiedad por tomar un crédito."
  );
  const actores = [
    ["COMPRADOR", "Pone el anticipo, toma la deuda y firma la escritura a su nombre."],
    ["BANCO", "Presta el dinero e inscribe una hipoteca como garantía. No es dueño."],
    ["VENDEDOR", "Cobra el 100% en el acto de escritura, como en cualquier operación."],
    ["TASADOR", "Define el valor que el banco toma como referencia. Puede no coincidir con el precio."],
    ["ESCRIBANO", "Suele designarlo el banco. Escritura y constitución de hipoteca en el mismo acto."],
    ["SEGURO", "De vida y de incendio, obligatorios. Entran dentro del costo financiero total."],
  ];
  const w = (CW - 2 * 0.18) / 3;
  const h = 1.28;
  actores.forEach((a, i) => {
    const col = i % 3, fila = Math.floor(i / 3);
    const fills = [BLUE, SLATE, GRAYC, LIGHT, LIGHT, LIGHT];
    card(s, {
      x: L + col * (w + 0.18), y: 1.3 + fila * (h + 0.16), w, h,
      fill: fills[i], rotulo: a[0], cuerpo: a[1], tamCuerpo: 10,
    });
  });
  keyBar(s, 4.32, "EL MIEDO QUE HAY QUE DESACTIVAR PRIMERO",
    "La escritura va a nombre del comprador desde el día uno. El banco solo inscribe una hipoteca: es una garantía, no una copropiedad.");

  s.addNotes(
    [
      "2 MINUTOS. Es la slide que baja la ansiedad de la sala.",
      "",
      "El miedo más común del cliente —y de muchos vendedores— es creer que 'la casa es",
      "del banco hasta que termines de pagar'. Es falso. La escritura traslativa de dominio",
      "va a nombre del comprador en el mismo acto. Lo que el banco inscribe es un derecho",
      "real de garantía sobre el inmueble. Si el comprador paga, esa hipoteca se cancela",
      "y listo. Si deja de pagar, el banco puede ejecutar — pero eso es el final de un",
      "camino largo, no el punto de partida.",
      "",
      "Dos puntos operativos que conviene marcar acá:",
      "· TASACIÓN: el banco presta sobre el valor de tasación, no sobre el precio pactado.",
      "  Si la tasación da más bajo, el comprador tiene que poner la diferencia. Esto rompe",
      "  operaciones y es de las cosas que más conviene anticipar.",
      "· PROPIEDAD APTA CRÉDITO: título perfecto, sin deudas, planos en regla, sin ocupantes.",
      "  Si la propiedad tiene un problema registral, la operación se cae o se demora meses.",
      "  Un caso real contado en las entrevistas: llegaron a la escribanía y descubrieron que",
      "  la propiedad ya tenía una hipoteca previa sin cancelar.",
      "",
      "GASTOS: variables según jurisdicción y según si aplica alguna exención por vivienda",
      "única. Como orden de magnitud se mencionan entre 6% y 9% del valor de la propiedad",
      "(comisión ~4%, escribanía ~1% y algo, sellos e impuestos, gastos administrativos).",
      "Decirlo como rango y aclarar que hay que verificarlo caso por caso.",
    ].join("\n")
  );
}

/* ===================== 04 · LAS CINCO PALABRAS ===================== */
{
  const s = slide(
    "Las cinco palabras que hay que saber",
    "Con estas cinco alcanza para sostener el 90% de las conversaciones."
  );
  const defs = [
    ["CAPITAL", "Lo que te prestan. En un crédito UVA se expresa en UVA, no en pesos."],
    ["TASA", "El interés real anual sobre el saldo. Es el «más algo» de UVA + 6%."],
    ["PLAZO", "En cuántos meses se devuelve. Más plazo, menos cuota, más interés."],
    ["CUOTA", "Lo que se paga por mes. En UVA es casi fija; en pesos, no."],
    ["AMORTIZACIÓN", "La parte de la cuota que reduce la deuda. El resto es interés."],
  ];
  const wIzq = 5.02;
  const rowH = 0.62;
  defs.forEach((it, i) => {
    const y = 1.3 + i * rowH;
    if (i % 2 === 0) round(s, { x: L, y, w: wIzq, h: rowH - 0.06, fill: { color: LIGHT } });
    s.addText(it[0], {
      x: L + 0.24, y: y + 0.03, w: wIzq - 0.5, h: 0.24, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11, bold: true, color: BLUE, charSpacing: 0.5,
    });
    s.addText(it[1], {
      x: L + 0.24, y: y + 0.26, w: wIzq - 0.5, h: rowH - 0.34, margin: 0,
      fontFace: F, fontSize: 9.5, color: INK, lineSpacing: 11,
    });
  });

  // Sistema francés: cómo se reparte cada cuota
  const xD = L + wIzq + 0.22;
  const wD = CW - wIzq - 0.22;
  round(s, { x: xD, y: 1.3, w: wD, h: 3.1, fill: { color: BLUE } });
  s.addText("SISTEMA FRANCÉS", {
    x: xD + 0.22, y: 1.44, w: wD - 0.44, h: 0.2, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: ONBLUE, charSpacing: 1.1,
  });
  s.addText("Cómo se reparte cada cuota", {
    x: xD + 0.22, y: 1.66, w: wD - 0.44, h: 0.26, margin: 0, valign: "middle",
    fontFace: F, fontSize: 12.5, bold: true, color: W,
  });
  const barras = [["Mes 1", 75], ["Mes 120", 50], ["Mes 240", 1]];
  barras.forEach((b, i) => {
    const y = 2.06 + i * 0.66;
    s.addText(b[0], {
      x: xD + 0.22, y, w: 0.78, h: 0.24, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, bold: true, color: W,
    });
    const xb = xD + 1.02, wb = wD - 1.24;
    const wInt = (wb * b[1]) / 100;
    rect(s, { x: xb, y: y + 0.03, w: wInt, h: 0.2, fill: { color: AZUL[2] } });
    rect(s, { x: xb + wInt, y: y + 0.03, w: wb - wInt, h: 0.2, fill: { color: GREEN } });
    s.addText(`${b[1]}% interés  ·  ${100 - b[1]}% capital`, {
      x: xD + 1.02, y: y + 0.26, w: wb, h: 0.2, margin: 0, valign: "middle",
      fontFace: F, fontSize: 8.5, color: ONBLUE,
    });
  });
  s.addText("Al principio casi todo es interés. Por eso al año de pagar la deuda bajó poco.", {
    x: xD + 0.22, y: 4.02, w: wD - 0.44, h: 0.3, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9, italic: true, color: ONBLUE, lineSpacing: 11,
  });

  keyBar(s, 4.52, "OJO CON ESTA CONFUSIÓN",
    "«Cuota casi fija» es cierto en UVA, no en pesos. Es la distinción que ordena toda la charla que viene.", SLATE);

  s.addNotes(
    [
      "2 MINUTOS. Vocabulario. Ir rápido por las cinco definiciones y frenar en el gráfico.",
      "",
      "El gráfico de la derecha explica solo algo que después ahorra diez minutos de",
      "discusión: en sistema francés la cuota se reparte entre interés y capital, y esa",
      "proporción cambia con el tiempo. Al principio pagás casi todo interés.",
      "",
      "Los porcentajes del gráfico son los de nuestro ejemplo (50.000 UVA, 240 meses,",
      "UVA + 7%): mes 1 → 75% interés, mes 120 → mitad y mitad, mes 240 → casi todo capital.",
      "Cambian si cambia la tasa o el plazo. Son ilustrativos, no una tabla universal.",
      "",
      "Anticipar la queja clásica: 'pagué un año y la deuda no bajó nada'. En parte es por",
      "esto —al principio amortizás poco— y en parte es por la actualización UVA, que vemos",
      "en las slides 8 y 10. Son dos efectos distintos que la gente mezcla.",
      "",
      "AMORTIZACIÓN es la palabra clave de toda la capacitación. Si se llevan una sola,",
      "que sea esta: parte de la cuota es gasto (interés) y parte es patrimonio (capital).",
      "Un alquiler, en cambio, es 100% gasto.",
    ].join("\n")
  );
}

/* ===================== 05 · POR QUÉ NO HAY TASA FIJA ===================== */
{
  const s = slide(
    "¿Por qué no hay crédito a tasa fija a 20 años?",
    "Preguntarlo a la sala antes de mostrar la respuesta."
  );
  const w = (CW - 2 * 0.2) / 3;
  card(s, {
    x: L, y: 1.3, w, h: 1.5, fill: BLUE, rotulo: "DE DÓNDE SACA LA PLATA",
    titulo: "Depósitos a 1–30 días",
    cuerpo: "Cajas de ahorro, cuentas corrientes y plazos fijos cortos. Es el fondeo que realmente tiene.",
  });
  card(s, {
    x: L + w + 0.2, y: 1.3, w, h: 1.5, fill: SLATE, rotulo: "QUÉ LE PIDEN QUE PRESTE",
    titulo: "Créditos a 15–30 años",
    cuerpo: "Un hipotecario es el préstamo más largo que da un banco minorista.",
  });
  card(s, {
    x: L + 2 * (w + 0.2), y: 1.3, w, h: 1.5, fill: GRAYC, rotulo: "EL PROBLEMA",
    titulo: "Descalce de plazos",
    cuerpo: "Prestar a 25 años con fondeo a 30 días. Por eso el crédito nunca se desarrolló acá.",
  });

  card(s, {
    x: L, y: 2.96, w: CW, h: 1.34, fill: LIGHT,
    rotulo: "LA RESPUESTA",
    titulo: "Con inflación alta, una tasa fija que cubra el riesgo daría una cuota inicial impagable.",
    cuerpo:
      "El banco tendría que cargar en esa tasa todo lo que puede pasar en 20 años, y la cuota del primer año se vuelve imposible. " +
      "El UVA parte el problema en dos: la actualización por inflación por un lado, el interés real por el otro.",
  });
  keyBar(s, 4.42, "DECILO ASÍ, SIN ADORNO",
    "El UVA no es un truco para perjudicar a nadie: es lo que hace que la cuota del primer año sea pagable. A cambio, el riesgo de que la inflación le gane al sueldo queda del lado del comprador.");

  s.addNotes(
    [
      "2 MINUTOS. Slide conceptual. Es la que hace que el UVA deje de parecer una trampa.",
      "",
      "MÉTODO: preguntar a la sala '¿por qué les parece que ningún banco presta a tasa fija",
      "a 20 años en Argentina?' y esperar. Que lo digan ellos. Se fija mucho mejor.",
      "",
      "El descalce de plazos fue exactamente el diagnóstico que dio el ministro de Economía",
      "al anunciar el programa de 2026: los bancos se fondean a un día o a 30 días y les",
      "piden prestar a 25 años. Por eso el programa oficial ataca el fondeo (plazos fijos",
      "largos del FGS en los bancos) y no la demanda.",
      "",
      "SER HONESTO CON EL COSTADO INCÓMODO: el UVA no elimina el riesgo de inflación,",
      "lo reasigna. El banco se lo saca de encima y se lo pasa al comprador. Eso es",
      "literalmente lo que pasó entre 2018 y 2023 y es el origen de todo el conflicto",
      "político alrededor de los créditos UVA. Si vos no lo decís, el cliente lo va a leer",
      "en cualquier nota y vas a perder credibilidad.",
      "",
      "La formulación que conviene: el riesgo real no es la inflación. Es que la inflación",
      "le gane al sueldo de esa persona en particular. Esa frase vuelve tres veces más.",
    ].join("\n")
  );
}

/* ===================== 06 · LÍNEA DE TIEMPO ===================== */
{
  const s = slide(
    "Cómo llegamos hasta acá",
    "Cinco hitos. La lección está en el cuarto."
  );
  const hitos = [
    ["1991–2001", "Convertibilidad", "Un peso, un dólar. Hubo crédito hipotecario a tasa fija porque no había inflación.", SLATE],
    ["2002", "Nace el CER", "Tras la salida de la convertibilidad aparece un coeficiente que ajusta por inflación.", GRAYC],
    ["2016", "Nace la UVA", "El BCRA crea la Unidad de Valor Adquisitivo. Se otorgan unos 130.000 créditos.", BLUE],
    ["2018–2023", "El salario queda atrás", "Crisis, devaluaciones e inflación alta. La cuota le gana al sueldo. Estalla el conflicto.", RED],
    ["2024–2026", "Relanzamiento", "Vuelven las líneas UVA. En 2026 se anuncia un programa oficial de fondeo.", BLUE2],
  ];
  const w = 1.66, gap = 0.13;
  hitos.forEach((hi, i) => {
    const x = L + i * (w + gap);
    round(s, { x, y: 1.32, w, h: 0.42, fill: { color: hi[3] } });
    s.addText(hi[0], {
      x, y: 1.32, w, h: 0.42, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: 10.5, bold: true, color: W,
    });
    round(s, { x, y: 1.8, w, h: 1.94, fill: { color: LIGHT } });
    s.addText(hi[1], {
      x: x + 0.14, y: 1.9, w: w - 0.28, h: 0.5, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: BLUE, lineSpacing: 13,
    });
    s.addText(hi[2], {
      x: x + 0.14, y: 2.44, w: w - 0.28, h: 1.2, margin: 0, align: "center", valign: "top",
      fontFace: F, fontSize: 9, color: INK, lineSpacing: 11,
    });
  });
  keyBar(s, 3.92, "LA LECCIÓN DE 2018",
    "El problema nunca fue la inflación sola. Fue la inflación ganándole al salario. Mientras el sueldo acompaña, un crédito UVA es manejable; cuando se desacopla, la cuota se vuelve el problema.", RED);
  s.addText(
    "El conflicto de los créditos UVA de 2016–2018 fue real y afectó a familias concretas. Negarlo frente a un cliente es la forma más rápida de perder la conversación.",
    { x: L, y: 4.78, w: CW, h: 0.4, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, italic: true, color: MUTED, lineSpacing: 11.5 }
  );

  s.addNotes(
    [
      "2 MINUTOS. Contexto histórico. No es relleno: es lo que explica la resistencia del cliente.",
      "",
      "El dato de los ~130.000 créditos UVA del período 2016–2019 sale de la entrevista a un",
      "desarrollador en uno de los videos de referencia. Tomarlo como orden de magnitud.",
      "",
      "LO IMPORTANTE DE ESTA SLIDE es el hito 4. Cuando un cliente dice 'no quiero saber",
      "nada con el UVA', casi siempre está pensando en 2018–2023. Tiene razón en algo:",
      "hubo gente que la pasó muy mal. Lo que pasó fue que el salario real cayó fuerte",
      "mientras la cuota seguía ajustando por inflación.",
      "",
      "NO discutirle al cliente que eso pasó. Sí ubicarlo: el problema no fue el instrumento",
      "en abstracto, fue la relación entre la cuota y el ingreso de esa familia en ese",
      "período. Y aclarar que hoy la decisión hay que tomarla mirando el caso concreto,",
      "no la historia.",
      "",
      "Un matiz que vale la pena tener: la morosidad de la cartera hipotecaria del sistema",
      "es baja —se menciona alrededor de 1,6%— aun después de todo ese período. La gente",
      "hace un esfuerzo enorme por no perder la casa. Eso no invalida el drama individual,",
      "pero ordena la magnitud del fenómeno.",
    ].join("\n")
  );
}

/* ===================== 07 · QUÉ ES UNA UVA ===================== */
{
  const s = slide(
    "Qué es una UVA",
    "Unidad de Valor Adquisitivo. Una unidad de cuenta que sigue a la inflación."
  );
  const cadena = [
    ["INDEC", "Mide los precios de la economía todos los meses."],
    ["IPC", "El índice de precios al consumidor. La inflación publicada."],
    ["CER", "El coeficiente que traslada esa inflación a un número diario."],
    ["UVA", "El valor en pesos que resulta. Lo publica el BCRA todos los días."],
  ];
  const wB = 1.895, gap = 0.42;
  cadena.forEach((c, i) => {
    const x = L + i * (wB + gap);
    round(s, { x, y: 1.3, w: wB, h: 1.4, fill: { color: i === 3 ? BLUE : SLATE } });
    s.addText(c[0], {
      x: x + 0.14, y: 1.44, w: wB - 0.28, h: 0.36, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: 18, bold: true, color: W,
    });
    s.addText(c[1], {
      x: x + 0.14, y: 1.84, w: wB - 0.28, h: 0.76, margin: 0, align: "center", valign: "top",
      fontFace: F, fontSize: 9, color: ONBLUE, lineSpacing: 11,
    });
    if (i < 3) flecha(s, x + wB, 1.85, gap, AZUL[1]);
  });

  const wIzq = 4.3;
  card(s, {
    x: L, y: 2.82, w: wIzq, h: 1.5, fill: LIGHT,
    rotulo: "VALOR DE REFERENCIA · 19/09/2026",
    titulo: "1 UVA ≈ $2.120",
    tamTitulo: 21, altoTitulo: 0.42,
    cuerpo: "Verificar SIEMPRE en bcra.gob.ar antes de usarlo con un cliente. Cambia todos los días hábiles.",
    tamCuerpo: 9.5,
  });
  card(s, {
    x: L + wIzq + 0.22, y: 2.82, w: CW - wIzq - 0.22, h: 1.5, fill: GRAYC,
    rotulo: "EL DETALLE QUE CASI NADIE EXPLICA",
    titulo: "La UVA de hoy trae la inflación de hace ~45 días",
    altoTitulo: 0.48,
    cuerpo: "Se publica con rezago. Cuando la inflación baja, eso juega a favor del que paga.",
    tamCuerpo: 9.5,
  });
  keyBar(s, 4.42, "LA IMAGEN QUE SIRVE",
    "Existe el peso, existe el dólar, existe el euro — y existe la UVA. Es otra unidad de cuenta. Tu deuda está escrita en esa unidad.");

  s.addNotes(
    [
      "2 MINUTOS.",
      "",
      "CUIDADO CON EL VALOR DE LA UVA. El número de esta slide es de referencia al",
      "19/09/2026 y proviene de fuentes que citan al BCRA. ANTES DE DICTAR la capacitación,",
      "entrá a bcra.gob.ar y actualizalo. Es el único dato del deck que cambia todos los días.",
      "Si lo decís desactualizado frente a un cliente informado, perdés autoridad.",
      "",
      "Como referencia de cuánto se mueve: a comienzos de enero de 2026 la UVA rondaba",
      "los $1.709 y hacia mediados de 2026 estaba cerca de $1.931. La escalada es el",
      "mecanismo funcionando, no una anomalía.",
      "",
      "CONTEXTO DE INFLACIÓN (agosto 2026, INDEC): 1,7% mensual, 33,5% interanual.",
      "Actualizar también esto. Y NO pronosticar inflación futura: no es nuestro trabajo,",
      "no tenemos cómo saberlo y si nos equivocamos frente a un cliente el costo es alto.",
      "",
      "EL REZAGO de ~45 días vale explicarlo porque genera confusión: el cliente ve que la",
      "inflación bajó y no entiende por qué su cuota sigue subiendo fuerte. La respuesta es",
      "que la UVA de este mes está trayendo la inflación de mes y medio atrás.",
      "",
      "La comparación con Chile ayuda: allá existe desde hace décadas una unidad indexada",
      "equivalente y se usa con normalidad para créditos y depósitos. No es un invento",
      "argentino ni una trampa local.",
    ].join("\n")
  );
}

/* ===================== 08 · LITROS DE NAFTA ===================== */
{
  const s = slide(
    "Tu deuda, en litros de nafta",
    "La analogía que más van a usar frente a un cliente. Vale detenerse acá."
  );
  card(s, {
    x: L, y: 1.28, w: CW, h: 0.82, fill: LIGHT,
    titulo: "Imaginá que no debés pesos: debés 1.000 litros de nafta.",
    tamTitulo: 16, altoTitulo: 0.4,
  });

  const w = (CW - 0.22) / 2;
  round(s, { x: L, y: 2.24, w, h: 1.92, fill: { color: GREEN } });
  s.addText("LO QUE DEBÉS", {
    x: L + 0.24, y: 2.4, w: w - 0.48, h: 0.22, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: W, charSpacing: 1.1,
  });
  s.addText("Litros  ↓", {
    x: L + 0.24, y: 2.66, w: w - 0.48, h: 0.5, margin: 0, valign: "middle",
    fontFace: F, fontSize: 26, bold: true, color: W,
  });
  s.addText("Cada mes que pagás, debés menos litros. Eso no se discute: baja siempre, mes a mes, hasta cero.", {
    x: L + 0.24, y: 3.24, w: w - 0.48, h: 0.78, margin: 0, valign: "top",
    fontFace: F, fontSize: 11, color: W, lineSpacing: 13.5,
  });

  round(s, { x: L + w + 0.22, y: 2.24, w, h: 1.92, fill: { color: RED } });
  s.addText("LO QUE CUESTA CADA LITRO", {
    x: L + w + 0.46, y: 2.4, w: w - 0.48, h: 0.22, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: W, charSpacing: 1.1,
  });
  s.addText("Precio  ↑", {
    x: L + w + 0.46, y: 2.66, w: w - 0.48, h: 0.5, margin: 0, valign: "middle",
    fontFace: F, fontSize: 26, bold: true, color: W,
  });
  s.addText("El litro sube con la inflación. Por eso el número en pesos puede subir aunque debas menos litros.", {
    x: L + w + 0.46, y: 3.24, w: w - 0.48, h: 0.78, margin: 0, valign: "top",
    fontFace: F, fontSize: 11, color: W, lineSpacing: 13.5,
  });

  keyBar(s, 4.32, "TRADUCCIÓN AL CRÉDITO",
    "Los litros son las UVA. El precio del litro es el valor de la UVA en pesos. Tu deuda se mide en litros — el banco te los cuenta, no te cuenta los pesos.");

  s.addNotes(
    [
      "2 MINUTOS, y son dos minutos bien gastados. Esta es LA diapositiva de la charla.",
      "",
      "MÉTODO: contar la analogía completa y después pedirle a alguien de la sala que la",
      "repita con sus propias palabras. Si la puede repetir, la va a poder usar con un",
      "cliente. Si no, repetirla una vez más. No avanzar hasta que alguien la diga bien.",
      "",
      "Por qué funciona: separa limpiamente las dos cosas que la gente mezcla —la cantidad",
      "que debe (baja) y el precio de esa unidad (sube)—. Es el mismo fenómeno que ver el",
      "precio del alquiler subir todos los años: no es que uno alquile más metros.",
      "",
      "Para grabación de video: esta es la slide para dejar unos segundos de silencio",
      "después de decirlo. Que respire.",
      "",
      "SI ALGUIEN PREGUNTA por qué el banco no te lo cobra en pesos directamente: porque",
      "entonces el banco asumiría todo el riesgo de inflación de 20 años y, para cubrirse,",
      "tendría que cobrar una tasa inicial impagable. Volvemos a la slide 5.",
    ].join("\n")
  );
}

/* ===================== 09 · QUÉ SIGNIFICA UVA + 6% ===================== */
{
  const s = slide(
    "Qué significa «UVA + 6%»",
    "Son dos cosas distintas pegadas con un signo más. Conviene separarlas."
  );
  const w = (CW - 0.22) / 2;
  card(s, {
    x: L, y: 1.3, w, h: 1.62, fill: BLUE,
    rotulo: "LA PRIMERA PARTE",
    titulo: "UVA = actualización",
    tamTitulo: 16, altoTitulo: 0.34,
    cuerpo: "No es ganancia del banco. Es lo que mantiene el valor del capital prestado a lo largo de 20 o 30 años. Si la inflación fuera cero, esta parte sería cero.",
    tamCuerpo: 10.5,
  });
  card(s, {
    x: L + w + 0.22, y: 1.3, w, h: 1.62, fill: SLATE,
    rotulo: "LA SEGUNDA PARTE",
    titulo: "+6% = interés real",
    tamTitulo: 16, altoTitulo: 0.34,
    cuerpo: "Anual, y se calcula sobre el saldo expresado en UVA. Esta sí es la ganancia del banco por prestarte y por el riesgo que asume.",
    tamCuerpo: 10.5,
  });

  card(s, {
    x: L, y: 3.06, w: CW, h: 1.24, fill: LIGHT,
    rotulo: "QUÉ NO SIGNIFICA — Y ES EL ERROR MÁS COMÚN",
    titulo: "No es «la inflación más un 6% extra sobre la cuota».",
    cuerpo:
      "El 6% no se suma a la inflación: es la tasa que se aplica sobre el saldo medido en UVA, igual que en cualquier crédito. " +
      "Lo que la inflación mueve es el precio de la UVA, no la tasa.",
  });
  keyBar(s, 4.42, "EL 6% DE ESTA SLIDE ES UN EJEMPLO, NO UNA OFERTA",
    "Cada banco publica su propia tasa y cambian seguido. Nunca digas un número de memoria: mostrá dónde consultarlo o derivá al banco.", GRAYC);

  s.addNotes(
    [
      "2 MINUTOS.",
      "",
      "REGLA INNEGOCIABLE DE ESTA SLIDE: el 6% es ilustrativo. Como referencia de rango,",
      "al 19/09/2026 se veían líneas aproximadamente entre UVA + 6% y UVA + 11% según la",
      "entidad, el destino del crédito y si se acredita el sueldo en el banco. Algunos",
      "ejemplos que se mencionaban en ese momento: Banco Nación en torno a UVA + 6%,",
      "Banco Ciudad con una línea en UVA + 7,5%.",
      "CHEQUEAR ANTES DE CADA CAPACITACIÓN. Y jamás decirle un número a un cliente como si",
      "fuera la tasa que va a conseguir: eso lo define el banco mirando su carpeta.",
      "",
      "Un matiz útil: la tasa promedio OFRECIDA en el mercado y la tasa que efectivamente",
      "terminan pagando los créditos otorgados no son la misma. Los que se concretan suelen",
      "concentrarse en las líneas más baratas, porque la gente elige.",
      "",
      "SI ALGUIEN PREGUNTA '¿UVA + 7,5% no es carísimo?', ver la slide 15 (mitos). Ahí está",
      "el razonamiento completo con la comparación contra el costo de endeudamiento del país.",
      "",
      "Mencionar el COSTO FINANCIERO TOTAL (CFT): la tasa no es lo único. Seguros de vida e",
      "incendio, gastos administrativos y comisiones entran en el CFT. Comparar líneas por",
      "la tasa nominal y no por el CFT lleva a conclusiones equivocadas.",
    ].join("\n")
  );
}

/* ===================== 10 · PAGO Y DEBO MÁS ===================== */
{
  const s = slide(
    "«Pago todos los meses, ¿por qué debo más?»",
    "La pregunta que más van a recibir. Conviene tener la respuesta memorizada."
  );
  const w = (CW - 0.22) / 2;
  round(s, { x: L, y: 1.3, w, h: 1.5, fill: { color: GREEN } });
  s.addText("↓", {
    x: L + 0.24, y: 1.4, w: 0.5, h: 0.44, margin: 0, valign: "middle",
    fontFace: F, fontSize: 24, bold: true, color: W,
  });
  s.addText("Tu deuda en UVA baja", {
    x: L + 0.78, y: 1.4, w: w - 1.02, h: 0.44, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, bold: true, color: W,
  });
  s.addText("Todos los meses amortizás una parte del capital. La cantidad de UVA que debés es menor que el mes pasado. Siempre.", {
    x: L + 0.24, y: 1.9, w: w - 0.48, h: 0.78, margin: 0, valign: "top",
    fontFace: F, fontSize: 10.5, color: W, lineSpacing: 13,
  });

  round(s, { x: L + w + 0.22, y: 1.3, w, h: 1.5, fill: { color: RED } });
  s.addText("↑", {
    x: L + w + 0.46, y: 1.4, w: 0.5, h: 0.44, margin: 0, valign: "middle",
    fontFace: F, fontSize: 24, bold: true, color: W,
  });
  s.addText("El valor de la UVA sube", {
    x: L + w + 1.0, y: 1.4, w: w - 1.02, h: 0.44, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, bold: true, color: W,
  });
  s.addText("Cada UVA vale más pesos que el mes pasado. Si la inflación corre más rápido que tu amortización, el número en pesos sube.", {
    x: L + w + 0.46, y: 1.9, w: w - 0.48, h: 0.78, margin: 0, valign: "top",
    fontFace: F, fontSize: 10.5, color: W, lineSpacing: 13,
  });

  round(s, { x: L, y: 2.94, w: CW, h: 1.36, fill: { color: BLUE } });
  s.addText("LA RESPUESTA DE MOSTRADOR · TRES FRASES, DICHAS DESPACIO", {
    x: L + 0.26, y: 3.06, w: CW - 0.52, h: 0.22, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: ONBLUE, charSpacing: 1.1,
  });
  const frases = [
    "1.  Tu deuda no está en pesos: está en UVA.",
    "2.  La cantidad de UVA que debés bajó. El precio de cada UVA subió.",
    "3.  Lo que importa no es el número en pesos, es cuánto pesa la cuota sobre tu ingreso.",
  ];
  frases.forEach((f, i) => {
    s.addText(f, {
      x: L + 0.26, y: 3.32 + i * 0.3, w: CW - 0.52, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: i === 2, color: W,
    });
  });
  keyBar(s, 4.42, "NO PROMETAS NADA",
    "Que la deuda en pesos baje o suba depende de la inflación y del ingreso de esa persona. No lo sabemos y no lo vamos a pronosticar.", GRAYC);

  s.addNotes(
    [
      "2 MINUTOS. Slide de guion: estas tres frases hay que saberlas de memoria.",
      "",
      "Es la pregunta que efectivamente reciben los que ya tienen un crédito UVA: 'vengo",
      "pagando hace un año y debo más que cuando empecé'. Y es literalmente cierto en pesos.",
      "Negarlo es el peor error posible.",
      "",
      "Hay que separar TRES efectos que el cliente vive como uno solo:",
      "1. Al principio amortizás poco porque en sistema francés casi todo es interés (slide 4).",
      "2. La actualización UVA sube el valor en pesos de lo que queda (slide 8).",
      "3. Su propio sueldo subió o no subió al mismo ritmo — y eso es lo que realmente duele.",
      "",
      "LA FRASE 3 ES LA IMPORTANTE. Que la cuota pase de $800.000 a $970.000 no dice nada",
      "por sí solo. Dice todo si el ingreso pasó de $3.200.000 a $3.900.000 — o si no se movió.",
      "Llevar siempre la conversación a la relación cuota/ingreso.",
      "",
      "LÍMITE DE NUESTRO ROL: hasta acá llegamos. Si el cliente quiere saber si le conviene,",
      "si le conviene precancelar, o qué va a pasar con la inflación, eso es el banco o su",
      "contador. Nosotros explicamos el producto. No somos asesores financieros.",
    ].join("\n")
  );
}

/* ===================== 11 · EL EJEMPLO ===================== */
{
  const s = slide(
    "El ejemplo: una propiedad de USD 100.000",
    "Construirlo en vivo, paso a paso. No mostrarlo ya resuelto."
  );
  aviso(s, 1.26, "VALORES HIPOTÉTICOS · NO SON UNA COTIZACIÓN, UNA OFERTA NI UN PRONÓSTICO", RED);

  const sup = [
    ["Valor de la propiedad", "USD 100.000"],
    ["Financia el banco", "75%  →  USD 75.000"],
    ["Tipo de cambio supuesto", "$1.400"],
    ["Valor UVA supuesto", "$2.100"],
    ["Tasa supuesta", "UVA + 7% anual"],
    ["Plazo", "240 meses (20 años)"],
  ];
  const wIzq = 4.18;
  round(s, { x: L, y: 1.72, w: wIzq, h: 2.58, fill: { color: LIGHT } });
  s.addText("SUPUESTOS", {
    x: L + 0.24, y: 1.84, w: wIzq - 0.48, h: 0.2, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: MUTED, charSpacing: 1.1,
  });
  sup.forEach((it, i) => {
    const y = 2.1 + i * 0.35;
    s.addText(it[0], {
      x: L + 0.24, y, w: 2.18, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, color: INK,
    });
    s.addText(it[1], {
      x: L + 2.42, y, w: wIzq - 2.66, h: 0.3, margin: 0, align: "right", valign: "middle",
      fontFace: F, fontSize: 10, bold: true, color: BLUE,
    });
  });

  const xD = L + wIzq + 0.22, wD = CW - wIzq - 0.22;
  round(s, { x: xD, y: 1.72, w: wD, h: 2.58, fill: { color: BLUE } });
  s.addText("LA CUENTA, EN DOS PASOS", {
    x: xD + 0.24, y: 1.84, w: wD - 0.48, h: 0.2, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: ONBLUE, charSpacing: 1.1,
  });
  s.addText("USD 75.000  ×  $1.400  =  $105.000.000", {
    x: xD + 0.24, y: 2.12, w: wD - 0.48, h: 0.3, margin: 0, valign: "middle",
    fontFace: F, fontSize: 12, color: W,
  });
  s.addText("$105.000.000  ÷  $2.100", {
    x: xD + 0.24, y: 2.46, w: wD - 0.48, h: 0.28, margin: 0, valign: "middle",
    fontFace: F, fontSize: 12, color: W,
  });
  round(s, { x: xD + 0.24, y: 2.82, w: wD - 0.48, h: 0.74, fill: { color: BLUE2 } });
  s.addText("=  50.000 UVA de deuda", {
    x: xD + 0.44, y: 2.82, w: wD - 0.88, h: 0.74, margin: 0, valign: "middle",
    fontFace: F, fontSize: 19, bold: true, color: W,
  });
  s.addText("Cuota inicial: 387,64 UVA/mes  ≈  $814.000", {
    x: xD + 0.24, y: 3.64, w: wD - 0.48, h: 0.28, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, bold: true, color: ONBLUE,
  });
  s.addText("Además hay que sumar gastos de escrituración: entre 6% y 9% del valor, según el caso.", {
    x: xD + 0.24, y: 3.94, w: wD - 0.48, h: 0.28, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9, italic: true, color: ONBLUE,
  });

  keyBar(s, 4.42, "LO QUE TIENE QUE QUEDAR",
    "El banco no te presta pesos: te presta una cantidad de UVA. Ese número —50.000— es tu deuda real y es el que va a bajar mes a mes.");

  s.addNotes(
    [
      "2 MINUTOS. Hacer la cuenta EN VIVO. Que vean la división en pantalla.",
      "",
      "TODO ES HIPOTÉTICO y el cartel rojo está para que nadie de la sala anote estos números",
      "como si fueran reales. Decirlo en voz alta además de mostrarlo. El tipo de cambio, el",
      "valor de la UVA y la tasa son supuestos elegidos para que la cuenta sea limpia.",
      "",
      "La cuota de 387,64 UVA sale de la fórmula de sistema francés con 50.000 UVA, 240",
      "meses y 7% anual (0,5833% mensual). No hace falta mostrar la fórmula; si alguien",
      "pregunta, es la cuota constante estándar de cualquier simulador.",
      "",
      "GASTOS: el 6%–9% es un rango, no un número. Depende de la jurisdicción, de si hay",
      "exención de sellos por vivienda única hasta cierto monto, de si hay comisión",
      "inmobiliaria y de los honorarios del escribano que designe el banco. Como referencia",
      "de composición: comisión ~4%, escribanía ~1% y algo, más sellos e impuestos.",
      "Con exenciones se acerca a 6%–7%; sin exenciones, más cerca de 9%.",
      "",
      "PUNTO COMERCIAL IMPORTANTE: el comprador necesita más efectivo del que cree. Sobre",
      "una propiedad de USD 100.000 con 75% financiado no alcanza con USD 25.000: hay que",
      "sumar los gastos. Anticipar esto evita operaciones que se caen a mitad de camino.",
      "",
      "COMPARACIÓN OPCIONAL, si la sala está enganchada: el ejemplo oficial del anuncio de",
      "2026 usaba una propiedad de ~USD 106.000 con un préstamo de ~USD 80.000 a 25 años",
      "en UVA + 7%, con una cuota estimada de ~$865.000 y un ingreso requerido de ~$3.460.000",
      "(tomando la cuota como 25% del ingreso). Mismo orden de magnitud que nuestro ejemplo.",
    ].join("\n")
  );
}

/* ===================== 12 · UN AÑO DESPUÉS ===================== */
{
  const s = slide(
    "La misma persona, un año después",
    "Supuesto pedagógico: inflación de 1,5% mensual durante 12 meses."
  );
  aviso(s, 1.24, "EJERCICIO HIPOTÉTICO · EL 1,5% MENSUAL ES UN SUPUESTO, NO UN PRONÓSTICO", RED);

  // encabezado de columnas
  s.addText("", { x: L, y: 1.66, w: 3.5, h: 0.4 });
  bandHeader(s, L + 3.62, 1.66, 2.55, "MES 0", SLATE);
  bandHeader(s, L + 6.29, 1.66, 2.55, "MES 12", BLUE);

  const rowH = 0.5;
  filaComp(s, 2.2, rowH, "Valor de la UVA", "$2.100", "$2.511", { zebra: true, colorB: BLUE });
  filaComp(s, 2.7, rowH, "Deuda en UVA", "50.000", "48.810", { fuerte: true, colorB: GREEN });
  filaComp(s, 3.2, rowH, "Deuda en pesos", "$105,0 M", "$122,5 M", { zebra: true, fuerte: true, colorB: RED });
  filaComp(s, 3.7, rowH, "Cuota mensual", "≈ $814.000", "≈ $973.000", { colorB: INK });

  round(s, { x: L, y: 4.26, w: CW, h: 0.92, fill: { color: BLUE } });
  s.addText("LAS DOS FLECHAS, JUNTAS", {
    x: L + 0.26, y: 4.36, w: CW - 0.52, h: 0.2, margin: 0, valign: "middle",
    fontFace: F, fontSize: 8.5, bold: true, color: ONBLUE, charSpacing: 1.1,
  });
  s.addText(
    "Debe 1.190 UVA menos que hace un año — y $17,5 millones más. Las dos cosas son verdad al mismo tiempo. Lo que decide si esto es un problema no está en esta tabla: está en qué pasó con su ingreso.",
    { x: L + 0.26, y: 4.58, w: CW - 0.52, h: 0.52, margin: 0, valign: "top",
      fontFace: F, fontSize: 11, color: W, lineSpacing: 13.5 }
  );

  s.addNotes(
    [
      "2 MINUTOS. ES EL CLÍMAX DE LA CAPACITACIÓN. Bajar el ritmo.",
      "",
      "MÉTODO: mostrar la tabla, leer la fila 'Deuda en UVA' (bajó), leer la fila 'Deuda en",
      "pesos' (subió 17%), y QUEDARSE CALLADO unos segundos. Dejar que la sala procese la",
      "contradicción aparente. Recién ahí explicar. Si lo explicás enseguida, se pierde.",
      "",
      "Para grabación de video: acá va el silencio más largo del deck.",
      "",
      "De dónde salen los números (todos derivados de los supuestos de la slide 11):",
      "· UVA mes 12 = $2.100 × 1,015^12 = $2.511.",
      "· Deuda en UVA tras 12 cuotas de sistema francés: 48.810 UVA.",
      "· Deuda en pesos = 48.810 × $2.511 = ~$122,5 millones.",
      "· Cuota = 387,64 UVA × $2.511 = ~$973.000.",
      "El 1,5% mensual es un supuesto elegido para el ejercicio. NO es un pronóstico.",
      "Si alguien pregunta qué va a pasar con la inflación: no lo sabemos y no opinamos.",
      "",
      "EL CIERRE DE LA SLIDE, textual: 'lo que decide si esto es un problema no está en esta",
      "tabla'. Si el ingreso de esa familia subió 20% en el año, la cuota pesa MENOS que",
      "antes aunque el número sea más grande. Si el ingreso no se movió, pesa más.",
      "Esa es toda la película del crédito UVA en una frase.",
      "",
      "SI ALGUIEN SE ASUSTA: recordar que el alquiler también sube, y sube sin que quede",
      "nada. Lo vemos en la slide 15. Pero no minimizar: el riesgo es real y es asimétrico.",
    ].join("\n")
  );
}

/* ===================== 13 · CÓMO CALIFICA UN COMPRADOR ===================== */
{
  const s = slide(
    "Cómo califica un comprador",
    "Lo de la izquierda vale siempre. Lo de la derecha lo define cada banco."
  );
  const w = (CW - 0.22) / 2;
  bandHeader(s, L, 1.28, w, "SIEMPRE SE MIRA ESTO", SLATE);
  const izq = [
    "Ingreso demostrable y formal",
    "Relación entre la cuota y el ingreso",
    "Historial crediticio (score)",
    "Antigüedad laboral o fiscal",
    "Edad al terminar de pagar",
    "Que la propiedad sea apta crédito",
  ];
  round(s, { x: L, y: 1.84, w, h: 1.94, fill: { color: LIGHT } });
  izq.forEach((t, i) => {
    s.addText("·  " + t, {
      x: L + 0.24, y: 1.94 + i * 0.3, w: w - 0.48, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK,
    });
  });

  bandHeader(s, L + w + 0.22, 1.28, w, "ESTO CAMBIA SEGÚN LA ENTIDAD", BLUE);
  const der = [
    "Cuánto financia:  suele ir de 70% a 80%",
    "Qué % del ingreso afecta:  ~20% a 30%",
    "Score mínimo exigido",
    "Plazos y monto máximo disponibles",
    "Tasa, y si baja por acreditar el sueldo",
    "Qué codeudores acepta y cuánto computa",
  ];
  round(s, { x: L + w + 0.22, y: 1.84, w, h: 1.94, fill: { color: NEUTRO[2] } });
  der.forEach((t, i) => {
    s.addText("·  " + t, {
      x: L + w + 0.46, y: 1.94 + i * 0.3, w: w - 0.48, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK,
    });
  });

  const wc = (CW - 2 * 0.18) / 3;
  card(s, {
    x: L, y: 3.9, w: wc, h: 1.34, fill: BLUE,
    rotulo: "EL CONSEJO MÁS ÚTIL", titulo: "Llegar limpio",
    tamTitulo: 12, altoTitulo: 0.26,
    cuerpo: "Cada cuota de otra deuda resta capacidad de crédito. Cancelar antes de pedir.",
    tamCuerpo: 9,
  });
  card(s, {
    x: L + wc + 0.18, y: 3.9, w: wc, h: 1.34, fill: SLATE,
    rotulo: "MONOTRIBUTISTAS", titulo: "Sí califican",
    tamTitulo: 12, altoTitulo: 0.26,
    cuerpo: "Piden antigüedad —suele ser ~2 años— y miran el historial, no la última categoría.",
    tamCuerpo: 9,
  });
  card(s, {
    x: L + 2 * (wc + 0.18), y: 3.9, w: wc, h: 1.34, fill: GRAYC,
    rotulo: "TIEMPOS", titulo: "Paciencia",
    tamTitulo: 12, altoTitulo: 0.26,
    cuerpo: "Intervienen tasador, escribano e informes registrales. No depende solo del banco.",
    tamCuerpo: 9,
  });

  s.addNotes(
    [
      "3 MINUTOS. Es la slide más operativa y la que más preguntas genera.",
      "",
      "LA REGLA DE ORO DE ESTA SLIDE: los porcentajes de la columna derecha son RANGOS",
      "OBSERVADOS, no reglas. 'Suele ir de 70% a 80%' no es lo mismo que 'te prestan el 80%'.",
      "Si un vendedor le dice a un cliente 'te prestan el 80%' y el banco le presta el 70%,",
      "la operación se cae y la culpa es nuestra. Decir siempre 'depende del banco'.",
      "",
      "SCORE: es un puntaje de comportamiento crediticio dentro del sistema financiero.",
      "En la escala que se mencionaba en las entrevistas llega a ~999 puntos, y valores de",
      "870, 900 o 920 son habituales en alguien ordenado. Lo que destrabó el acceso en la",
      "última etapa fue que los bancos bajaran el mínimo exigido (de ~909 a ~870 en el caso",
      "comentado). No es una escala oficial única: cada entidad la usa a su manera.",
      "",
      "MONOTRIBUTISTAS: no es que 'no califican'. El banco necesita ver ingresos. La categoría",
      "de monotributo es el proxy. Suelen pedir antigüedad (se mencionan ~2 años) y mirar el",
      "historial: recategorizarse para arriba el mes anterior a pedir el crédito no funciona,",
      "porque puede tomarse la categoría más baja del último año.",
      "",
      "CODEUDORES: se pueden sumar ingresos de pareja, padres o hermanos. Cuánto computa",
      "cada uno lo define la entidad. Es de las palancas más útiles y menos conocidas.",
      "",
      "MINI CASO PARA LA SALA (2 minutos, opcional si el tiempo aprieta):",
      "Sofía y Damián, 32 y 34 años. Ella en relación de dependencia, él monotributista",
      "categoría D hace tres años. Tienen ahorros por el equivalente al 25% de la propiedad",
      "que miran. Él está pagando la cuota de un auto. Preguntar a la sala: ¿son candidatos?",
      "¿Qué le preguntarían primero? La respuesta que buscamos: sí, pero conviene ver si",
      "puede cancelar el auto antes, y hay que contar los gastos de escrituración aparte",
      "de ese 25%.",
    ].join("\n")
  );
}

/* ===================== 14 · EL PROGRAMA OFICIAL ===================== */
{
  const s = slide(
    "El programa oficial anunciado en 2026",
    "Es la novedad que trae el cliente a la conversación. Conviene saber qué dice."
  );
  card(s, {
    x: L, y: 1.26, w: CW, h: 0.84, fill: LIGHT,
    rotulo: "QUÉ HACE, EN UNA FRASE",
    titulo: "No le presta a la gente: le presta a los bancos para que presten más barato y a más plazo.",
    tamTitulo: 13, altoTitulo: 0.32,
  });
  const w = (CW - 3 * 0.18) / 4;
  stat(s, {
    x: L, y: 2.22, w, h: 1.7, fill: BLUE, numero: "$2 bill.", tam: 23,
    rotulo: "EL PROGRAMA",
    detalle: "Vía plazos fijos del FGS en bancos, a 1 a 5 años.",
  });
  stat(s, {
    x: L + w + 0.18, y: 2.22, w, h: 1.7, fill: SLATE, numero: "UVA+7,5%", tam: 18,
    rotulo: "TOPE DE TASA",
    detalle: "Techo, no piso. El banco puede prestar más barato.",
  });
  stat(s, {
    x: L + 2 * (w + 0.18), y: 2.22, w, h: 1.7, fill: GRAYC, numero: "150.000", tam: 23,
    rotulo: "UVA · MÁXIMO",
    detalle: "El préstamo promedio del mercado es bastante menor.",
  });
  stat(s, {
    x: L + 3 * (w + 0.18), y: 2.22, w, h: 1.7, fill: BLUE2, numero: "1.ª vivienda", tam: 15,
    rotulo: "DESTINO",
    detalle: "No dijeron «vivienda única de ocupación permanente».",
  });
  keyBar(s, 4.02, "LO QUE TODAVÍA NO SE SABE — Y HAY QUE DECIRLO ASÍ",
    "Cada banco tiene que armar o rearmar su línea. Frecuencia de licitaciones, requisitos y tiempos no están definidos. Ningún cliente tiene todavía condiciones cerradas.", RED);
  s.addText(
    "El riesgo de que el crédito no se pague lo sigue asumiendo el banco, no el Estado. Por eso el banco sigue eligiendo a quién le presta con sus propios criterios.",
    { x: L, y: 4.86, w: CW, h: 0.4, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, italic: true, color: MUTED, lineSpacing: 11.5 }
  );

  s.addNotes(
    [
      "2 MINUTOS. Slide de actualidad: es la más perecedera del deck.",
      "",
      "REVISAR ANTES DE CADA DICTADO. Si ya salieron las líneas concretas de los bancos,",
      "esta slide hay que actualizarla o reemplazarla por las condiciones reales.",
      "",
      "Cómo funciona el mecanismo, para explicarlo si preguntan: el FGS coloca plazos fijos",
      "largos (de 1 a 5 años) en los bancos mediante licitaciones. Eso les resuelve",
      "parcialmente el descalce de plazos de la slide 5. A cambio, el banco se compromete",
      "a no prestar por encima de UVA + 7,5%. Las tasas mínimas que pide el FGS por ese",
      "fondeo son de UVA + 2,5% a un año y UVA + 4,5% a cinco años.",
      "",
      "MAGNITUD: se anunció una primera licitación del orden de $200.000 millones y una",
      "estimación oficial de 17.000 a 18.000 familias alcanzadas por el total del programa.",
      "Es relevante para un mercado hipotecario chico, pero es chico frente a la demanda.",
      "No vender esto como que 'ahora todos acceden'.",
      "",
      "EL DETALLE DE 'PRIMERA VIVIENDA': varias líneas vigentes exigen 'vivienda única de",
      "ocupación permanente', que es más restrictivo. Si el programa efectivamente usa",
      "'primera vivienda', abre el juego a más gente. Todavía hay que ver cómo lo",
      "instrumenta cada banco. No afirmarlo como un hecho cerrado.",
      "",
      "HONESTIDAD SOBRE LA FUENTE: estos números vienen del anuncio oficial. Lo que NO",
      "tenemos confirmado es cómo lo va a implementar cada entidad. Esa distinción hay",
      "que trasladarla al cliente tal cual.",
      "",
      "Si alguien abre el debate político sobre usar fondos del FGS: no entramos. Es una",
      "discusión legítima y no es nuestro tema. Nosotros informamos sobre el producto.",
    ].join("\n")
  );
}

/* ===================== 15 · MITO O REALIDAD ===================== */
{
  const s = slide(
    "Mito o realidad",
    "A mano alzada, antes de mostrar la respuesta."
  );
  const items = [
    ["«El banco se queda con la casa hasta que termines de pagar»", "MITO",
      "La escritura va a nombre del comprador desde el día uno. El banco inscribe una hipoteca como garantía.", RED],
    ["«Una tasa de UVA + 7,5% es un disparate»", "DISCUTIBLE",
      "Un bono del Tesoro de EE.UU. indexado a 10 años rendía ~2,35% y el riesgo argentino sumaba ~5,1 puntos: da ~7,5%. Es caro, pero tiene lógica financiera.", GRAYC],
    ["«La cuota se puede duplicar de un mes para otro»", "MITO",
      "La cuota en UVA es prácticamente constante. Lo que se mueve es el valor de la UVA, y sigue a la inflación publicada.", RED],
    ["«Pagar una cuota es igual que pagar un alquiler»", "MITO",
      "El alquiler es 100% gasto. En la cuota, una parte es interés y otra reduce la deuda. Esa parte es patrimonio.", RED],
  ];
  const rowH = 0.74;
  items.forEach((it, i) => {
    const y = 1.28 + i * (rowH + 0.08);
    round(s, { x: L, y, w: CW, h: rowH, fill: { color: i % 2 === 0 ? LIGHT : NEUTRO[2] } });
    round(s, { x: L + 0.14, y: y + 0.13, w: 1.18, h: 0.52, fill: { color: it[3] } });
    s.addText(it[1], {
      x: L + 0.14, y: y + 0.13, w: 1.18, h: 0.52, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: it[1].length > 5 ? 8.5 : 10, bold: true, color: W, charSpacing: 0.4,
    });
    s.addText(it[0], {
      x: L + 1.46, y: y + 0.08, w: CW - 1.68, h: 0.28, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: BLUE,
    });
    s.addText(it[2], {
      x: L + 1.46, y: y + 0.36, w: CW - 1.68, h: 0.36, margin: 0, valign: "top",
      fontFace: F, fontSize: 9.5, color: INK, lineSpacing: 11,
    });
  });
  keyBar(s, 4.58, "REGLA",
    "«Discutible» también es una respuesta honesta. No todo es mito o verdad, y el cliente lo agradece.", SLATE);

  s.addNotes(
    [
      "3 MINUTOS. Formato participativo: leer el mito, que voten a mano alzada, después mostrar.",
      "",
      "MITO 2 EN DETALLE, porque es el que más se discute. El razonamiento completo:",
      "· Un TIPS —bono del Tesoro de EE.UU. protegido contra inflación— a 10 años rendía",
      "  alrededor de 2,35%. Ese es el precio de que alguien te preste plata indexada sin",
      "  ningún riesgo de crédito.",
      "· El riesgo país argentino rondaba los 511 puntos básicos, o sea 5,11 puntos",
      "  porcentuales por encima.",
      "· 2,35% + 5,11% ≈ 7,46%. Ese sería, a grandes rasgos, el costo real al que se",
      "  endeudaría Argentina como país en un instrumento indexado comparable.",
      "Que una familia consiga algo parecido —gracias a que hay una garantía hipotecaria",
      "detrás— no es financieramente absurdo. Datos de referencia a agosto/septiembre 2026;",
      "cambian, así que si citás el número decí la fecha.",
      "",
      "ESTO NO SIGNIFICA que le convenga a esa persona. Una cosa es que la tasa tenga lógica",
      "de mercado y otra muy distinta es que a Juan le convenga tomarla. Dejarlo dicho.",
      "",
      "MITO 4: acá está el mejor argumento comercial de toda la capacitación, y es honesto.",
      "Si alguien paga $900.000 de alquiler, gasta $900.000. Si paga $900.000 de cuota,",
      "una parte —al principio chica— reduce su deuda. Es ahorro forzoso. Para muchas",
      "familias de clase media es la única forma en que efectivamente acumulan patrimonio.",
      "EL CONTRAARGUMENTO HONESTO, que conviene conocer: alguien disciplinado podría alquilar",
      "e invertir la diferencia y terminar mejor. Es cierto. Muy poca gente lo sostiene 20",
      "años. Si el cliente lo plantea, reconocerlo en vez de discutirlo.",
      "",
      "SI SALE EL TEMA DEL RIESGO, no esquivarlo: el peor escenario es perder el ingreso y",
      "tener que vender en un mal momento. Y con apalancamiento duele más: si comprás con",
      "20% propio y la propiedad cae 20%, en términos simples te comiste todo el anticipo.",
      "Dato útil: ante una dificultad, lo primero es hablar con el banco y buscar",
      "reestructurar, no dejar de pagar. Al banco tampoco le sirve ejecutar.",
    ].join("\n")
  );
}

/* ===================== 16 · CÓMO SE DICE ===================== */
{
  const s = slide(
    "Cómo se dice",
    "Misma información, dos formas de decirla. Una nos expone y la otra no."
  );
  const pares = [
    ["«Te conviene sacarlo ahora que está barato»",
      "«Estas son las condiciones. Quién califica y si le sirve lo define el banco con tu carpeta.»"],
    ["«La cuota te va a quedar más baja que el alquiler»",
      "«Hoy arranca en este orden de magnitud. Va a ajustar por inflación, igual que tu alquiler.»"],
    ["«El UVA es un robo» / «El UVA no tiene ningún riesgo»",
      "«El riesgo concreto es que la inflación le gane a tu sueldo. Mirá cuánto pesa la cuota sobre tu ingreso.»"],
  ];
  bandHeader(s, L, 1.28, (CW - 0.22) / 2, "NO DIGAS ESTO", RED);
  bandHeader(s, L + (CW - 0.22) / 2 + 0.22, 1.28, (CW - 0.22) / 2, "DECÍ ESTO", GREEN);
  const w = (CW - 0.22) / 2;
  pares.forEach((p, i) => {
    const y = 1.9 + i * 0.84;
    round(s, { x: L, y, w, h: 0.76, fill: { color: NEUTRO[2] } });
    s.addText(p[0], {
      x: L + 0.22, y, w: w - 0.44, h: 0.76, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, italic: true, color: SLATE, lineSpacing: 13,
    });
    round(s, { x: L + w + 0.22, y, w, h: 0.76, fill: { color: LIGHT } });
    s.addText(p[1], {
      x: L + w + 0.44, y, w: w - 0.44, h: 0.76, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 13,
    });
  });
  keyBar(s, 4.5, "EL LÍMITE DE NUESTRO ROL",
    "Explicamos cómo funciona el producto y acompañamos la operación. No recomendamos tomar deuda, no prometemos tasas y no pronosticamos inflación.");

  s.addNotes(
    [
      "2,5 MINUTOS. Método: mostrar solo la columna izquierda, pedir que la sala reformule,",
      "y recién después mostrar la derecha. Se fija mucho mejor que si la leen hecha.",
      "",
      "POR QUÉ IMPORTA, dicho sin vueltas: si un vendedor le promete a un cliente una tasa,",
      "una cuota o una aprobación, y después no se cumple, el problema vuelve a la",
      "inmobiliaria. No es una cuestión de estilo: es de exposición.",
      "",
      "Las tres reformulaciones tienen la misma lógica: dar información verificable, poner",
      "la decisión del lado del cliente y el veredicto del lado del banco.",
      "",
      "LA TERCERA ES LA MÁS IMPORTANTE porque cubre los dos extremos. Tan malo es decir",
      "'el UVA es un robo' —te quedás sin la operación y sin credibilidad— como decir 'no",
      "tiene riesgo', que es falso. La formulación honesta nombra el riesgo real y lo hace",
      "medible: cuánto pesa la cuota sobre el ingreso.",
      "",
      "CERRAR CON LA REGLA DEL ROL. Es la tercera vez que se dice en la charla y es a",
      "propósito. Nosotros no somos asesores financieros ni productores de seguros ni",
      "oficiales de crédito. Somos los que entienden el producto lo suficiente como para",
      "que la conversación no se muera y para derivar bien.",
    ].join("\n")
  );
}

/* ===================== 17 · CINCO IDEAS ===================== */
{
  const s = slide(
    "Cinco ideas para llevarse",
    "Si se olvidan todo lo demás, que queden estas."
  );
  const ideas = [
    "La deuda está en UVA, no en pesos. Es la frase que ordena todo lo demás.",
    "La cantidad de UVA baja siempre. El valor de cada UVA sube. Las dos cosas son verdad.",
    "El riesgo no es la inflación: es que la inflación le gane al sueldo de esa persona.",
    "Todo porcentaje concreto depende del banco. Nunca lo digas como si fuera una regla.",
    "Un alquiler es 100% gasto. Una cuota, no. Esa diferencia es el argumento más honesto que tenemos.",
  ];
  const rowH = 0.66;
  ideas.forEach((t, i) => {
    const y = 1.32 + i * (rowH + 0.08);
    round(s, { x: L, y, w: CW, h: rowH, fill: { color: i % 2 === 0 ? BLUE : SLATE } });
    s.addText(String(i + 1), {
      x: L + 0.2, y, w: 0.46, h: rowH, margin: 0, align: "center", valign: "middle",
      fontFace: F, fontSize: 20, bold: true, color: AZUL[2],
    });
    s.addText(t, {
      x: L + 0.82, y, w: CW - 1.04, h: rowH, margin: 0, valign: "middle",
      fontFace: F, fontSize: 12, color: W, lineSpacing: 14.5,
    });
  });
  s.addText(
    "Datos al 19/09/2026. Los valores de UVA, tasas y condiciones cambian: verificarlos antes de usarlos con un cliente.",
    { x: L, y: 5.0, w: CW, h: 0.32, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9, italic: true, color: MUTED }
  );

  s.addNotes(
    [
      "1 MINUTO. No agregar contenido nuevo. Leerlas y repartir el cheat sheet impreso.",
      "",
      "Si hay tiempo, pedir que cada uno diga en voz alta cuál se lleva. Obliga a elegir",
      "y fija el contenido mejor que cualquier resumen.",
      "",
      "Recordar el cierre operativo: el material completo —guion, ejemplo paso a paso,",
      "preguntas frecuentes y cheat sheet— está disponible aparte. Esta capacitación es",
      "la versión de 30 minutos, no el material de referencia.",
    ].join("\n")
  );
}

/* ===================== 18 · CIERRE ===================== */
{
  const s = closing(
    "Ya podés contestar.",
    "Entender el producto no te convierte en asesor financiero. Te convierte en alguien que no pierde la operación.",
    "Capacitaciones Krak Real Estate  ·  Datos al 19/09/2026  ·  Fuentes: anuncio oficial del programa 2026, INDEC, BCRA y análisis de mercado del sector. Los valores de UVA, tasas y condiciones bancarias cambian — verificar antes de cada uso."
  );
  s.addNotes(
    [
      "CIERRE.",
      "",
      "FECHA DE CORTE: 19/09/2026. Decirla en voz alta al abrir y al cerrar.",
      "",
      "QUÉ HAY QUE VERIFICAR ANTES DE VOLVER A DICTAR ESTA CAPACITACIÓN:",
      "1. Valor de la UVA → bcra.gob.ar. Cambia todos los días hábiles.",
      "2. IPC del último mes → indec.gob.ar.",
      "3. Tasas y condiciones de las líneas vigentes → sitio de cada banco.",
      "4. Estado del programa oficial: si ya salieron las líneas concretas, la slide 14",
      "   cambia por completo.",
      "",
      "SOBRE LAS FUENTES, con honestidad: las cifras del programa provienen del anuncio",
      "oficial. Los datos de mercado (escrituras, precios, rentas, score, prácticas de los",
      "bancos) provienen de análisis del sector y de entrevistas con gente que trabaja en",
      "bancos y en desarrollo inmobiliario. Son fuentes serias pero secundarias: si un dato",
      "va a usarse para decidir algo, verificarlo en la fuente primaria.",
      "",
      "LO QUE ESTA CAPACITACIÓN NO HACE, y hay que sostenerlo:",
      "· No recomienda tomar ni no tomar un crédito.",
      "· No pronostica inflación, dólar ni precios de propiedades.",
      "· No afirma condiciones bancarias como si fueran universales.",
      "· No convierte a nadie en asesor financiero.",
    ].join("\n")
  );
}

/* ===================== GUARDAR ===================== */
d.save(process.argv[2] || "Capacitacion-Creditos-Hipotecarios-UVA.pptx");

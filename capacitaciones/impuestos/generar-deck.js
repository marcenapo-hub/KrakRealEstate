/*
 * Capacitación de impuestos para agentes inmobiliarios — Krak Real Estate.
 * Sistema visual tomado del deck "Home y Warehouse Staging": paleta, rail
 * izquierdo con isotipo, tarjetas redondeadas y ondas de marca.
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

const A = (f) => path.join(__dirname, "brand", f);

// Paleta muestreada del deck de referencia de Krak
const BLUE = "08407C"; // azul Krak: títulos, tarjetas, callouts
const SLATE = "4E586E"; // barra del rail
const GRAYC = "7C8594"; // tarjetas grises
const GREEN = "26AE60";
const RED = "E74B3C";
const INK = "2E4258"; // cuerpo sobre blanco
const MUTED = "6A7686";
const W = "FFFFFF";
const F = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.author = "Krak Real Estate";
pres.title = "Impuestos para Agentes Inmobiliarios";

const RAIL = 0.45; // ancho del rail izquierdo
const L = 0.66; // margen izquierdo del contenido
const CW = 8.84; // ancho útil (hasta 9.5)

const round = (s, o) => {
  const fill = (o.fill && o.fill.color) || W;
  return s.addShape(pres.ShapeType.roundRect, {
    rectRadius: 0.09, ...o, line: { color: fill, width: 0 },
  });
};

// Slide de contenido: fondo de ondas + rail con isotipo + título
function contentSlide(title, subtitle) {
  const s = pres.addSlide();
  s.background = { path: A("bg_content.png") };
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: RAIL, h: 5.625, fill: { color: SLATE }, line: { color: SLATE, width: 0 },
  });
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: RAIL, h: 0.44, fill: { color: BLUE }, line: { color: BLUE, width: 0 },
  });
  s.addImage({ path: A("iso_white.png"), x: 0.135, y: 0.075, w: 0.18, h: 0.238 });
  s.addText(title, {
    x: L, y: 0.28, w: CW, h: 0.52, margin: 0, valign: "middle",
    fontFace: F, fontSize: 27, bold: true, color: BLUE,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: L, y: 0.82, w: CW, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 12, italic: true, color: MUTED,
    });
  }
  return s;
}

// Franja azul de cierre de slide, como el "Clave:" del deck de referencia
function keyBar(s, y, label, text, color) {
  const fill = color || BLUE;
  round(s, { x: L, y, w: CW, h: 0.72, fill: { color: fill } });
  s.addText(label, {
    x: L + 0.26, y: y + 0.08, w: CW - 0.5, h: 0.22, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9.5, bold: true, color: W, charSpacing: 1.2,
  });
  s.addText(text, {
    x: L + 0.26, y: y + 0.29, w: CW - 0.52, h: 0.36, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, color: W, lineSpacing: 14,
  });
}

/* ============================================================ 1. CARÁTULA */
{
  const s = pres.addSlide();
  s.background = { path: A("bg_cover.png") };
  s.addImage({ path: A("logo_white.png"), x: 0.72, y: 0.85, w: 2.02, h: 0.898 });
  s.addText("Capacitaciones Krak Real Estate", {
    x: 0.72, y: 2.32, w: 7.5, h: 0.34, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, color: W,
  });
  s.addText("Impuestos para Agentes Inmobiliarios", {
    x: 0.7, y: 2.72, w: 8.7, h: 1.5, margin: 0, valign: "top",
    fontFace: F, fontSize: 40, bold: true, color: W, lineSpacing: 48,
  });
  s.addNotes(
    "Presentación de la capacitación. Objetivo: que el equipo identifique rápido qué impuesto aparece en cada operación, quién lo cobra y qué hay que controlar antes de pagar o cobrar. No busca convertir a nadie en contador. Base: Manual de Impuestos para Administrativos en Argentina, edición 2026."
  );
}

/* ================================================ 2. LOS TRES NIVELES */
{
  const s = contentSlide(
    "El sistema tributario argentino",
    "Argentina es federal: tres niveles cobran, cada uno con su organismo y su calendario."
  );
  const cols = [
    {
      x: L, fill: BLUE, t: "NACIÓN", org: "ARCA (ex AFIP)",
      items: ["IVA", "Ganancias", "Bienes Personales", "Monotributo y Autónomos"],
      note: "arca.gob.ar",
    },
    {
      x: L + 3.03, fill: GRAYC, t: "PROVINCIA / CABA", org: "ARBA · AGIP",
      items: ["Ingresos Brutos", "Sellos", "Impuesto Inmobiliario", "Patentes · ABL en CABA"],
      note: "arba.gob.ar · agip.gob.ar",
    },
    {
      x: L + 6.06, fill: BLUE, t: "MUNICIPIO", org: "Rentas municipales",
      items: ["Seguridad e Higiene", "ABL / Tasa de Servicios Urbanos", "Habilitaciones", "Tasa vial y publicidad"],
      note: "El portal de cada municipio",
    },
  ];
  cols.forEach((c) => {
    round(s, { x: c.x, y: 1.3, w: 2.78, h: 2.85, fill: { color: c.fill } });
    s.addText(c.t, {
      x: c.x + 0.24, y: 1.46, w: 2.3, h: 0.24, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, bold: true, color: W, charSpacing: 1.2,
    });
    s.addText(c.org, {
      x: c.x + 0.24, y: 1.72, w: 2.32, h: 0.34, margin: 0, valign: "middle",
      fontFace: F, fontSize: 16, bold: true, color: W,
    });
    s.addText(
      c.items.map((t, i) => ({
        text: t, options: { bullet: { indent: 14 }, breakLine: i < c.items.length - 1 },
      })),
      { x: c.x + 0.28, y: 2.2, w: 2.28, h: 1.35, margin: 0, fontFace: F, fontSize: 11, color: W, paraSpaceAfter: 6 }
    );
    s.addText(c.note, {
      x: c.x + 0.24, y: 3.72, w: 2.32, h: 0.28, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, italic: true, color: "D9E2EE",
    });
  });
  keyBar(s, 4.38, "EN LA PRÁCTICA",
    "Alquilar una oficina en PBA activa los tres niveles a la vez: Sellos e Ingresos Brutos en ARBA, el Inmobiliario del propietario y la tasa municipal del local.");
  s.addNotes(
    "Idea central: no hay un único fisco. Nación, provincia y municipio tienen potestad tributaria propia y no se piden permiso entre sí. Antes de cerrar una operación, preguntarse siempre: ¿dónde está el inmueble? ¿dónde se presta el servicio? Eso define qué organismos intervienen y qué vencimientos hay que mirar."
  );
}

/* ================================================== 3. IDENTIDAD FISCAL */
{
  const s = contentSlide(
    "Tu identidad fiscal",
    "Los cuatro elementos sin los cuales no se puede facturar ni operar."
  );
  const items = [
    { t: "CUIT", d: "11 dígitos que identifican ante todos los organismos, no solo ARCA. Prefijo 20/23/24/27 personas humanas, 30/33/34 sociedades. Es el mismo número de por vida." },
    { t: "Clave Fiscal", d: "La contraseña para operar en ARCA. La mayoría de los trámites exige nivel 3. Desde ahí se delegan permisos al estudio contable sin compartir la clave." },
    { t: "Domicilio Fiscal Electrónico", d: "Buzón digital obligatorio. Una intimación queda notificada apenas se deposita ahí, se haya leído o no. Hay que revisarlo con periodicidad." },
    { t: "Constancia de inscripción", d: "Resume la situación fiscal de un CUIT: en qué impuestos está inscripto, su categoría y desde cuándo. Se descarga gratis con solo cargar el CUIT." },
  ];
  items.forEach((it, i) => {
    const x = L + (i % 2) * 4.52;
    const y = 1.3 + Math.floor(i / 2) * 1.72;
    round(s, { x, y, w: 4.32, h: 1.6, fill: { color: i % 2 === 0 ? BLUE : GRAYC } });
    round(s, {
      x: x + 0.26, y: y + 0.26, w: 0.4, h: 0.4, rectRadius: 0.5, fill: { color: W },
    });
    s.addText(String(i + 1), {
      x: x + 0.26, y: y + 0.26, w: 0.4, h: 0.4, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: i % 2 === 0 ? BLUE : SLATE,
    });
    s.addText(it.t, {
      x: x + 0.8, y: y + 0.24, w: 3.3, h: 0.34, margin: 0, valign: "middle",
      fontFace: F, fontSize: 14.5, bold: true, color: W,
    });
    s.addText(it.d, {
      x: x + 0.8, y: y + 0.64, w: 3.3, h: 0.82, margin: 0,
      fontFace: F, fontSize: 10.5, color: "EAEFF5", lineSpacing: 14,
    });
  });
  keyBar(s, 4.78, "REGLA",
    "Constancia de inscripción + CBU a nombre del mismo CUIT: es lo primero que se le pide a todo proveedor o cliente nuevo.");
  s.addNotes(
    "El CUIT y la Clave Fiscal son la puerta de entrada. El Domicilio Fiscal Electrónico es el que más problemas genera: se asume que si no llegó un mail no hay notificación, y no es así — la notificación es válida desde que se deposita en el buzón. La constancia de inscripción es la herramienta de control del día a día."
  );
}

/* ==================================== 4. MONOTRIBUTO VS RESP. INSCRIPTO */
{
  const s = contentSlide(
    "Monotributo o Responsable Inscripto",
    "Define qué factura emite tu cliente, tu proveedor y vos mismo."
  );
  const cx = [L, L + 2.55, L + 5.75];
  const cwid = [2.4, 3.1, 3.05];

  s.addText("ASPECTO", {
    x: cx[0] + 0.12, y: 1.28, w: cwid[0], h: 0.5, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10, bold: true, color: MUTED, charSpacing: 1,
  });
  round(s, { x: cx[1], y: 1.28, w: cwid[1], h: 0.5, fill: { color: BLUE } });
  s.addText("MONOTRIBUTO", {
    x: cx[1] + 0.24, y: 1.28, w: cwid[1] - 0.4, h: 0.5, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, bold: true, color: W, charSpacing: 1,
  });
  round(s, { x: cx[2], y: 1.28, w: cwid[2], h: 0.5, fill: { color: GRAYC } });
  s.addText("RESPONSABLE INSCRIPTO", {
    x: cx[2] + 0.24, y: 1.28, w: cwid[2] - 0.4, h: 0.5, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, bold: true, color: W, charSpacing: 1,
  });

  const rows = [
    ["Facturación", "Tope de la categoría K", "Sin tope"],
    ["IVA", "No lo discrimina (va incluido)", "Discrimina 21% / 10,5% / 27%"],
    ["Ganancias", "Incluido en la cuota fija", "DDJJ anual + anticipos"],
    ["Aportes jubilatorios", "Incluidos en la cuota", "Régimen de Autónomos, aparte"],
    ["Tipo de factura", "C", "A o B"],
  ];
  rows.forEach((r, i) => {
    const y = 1.92 + i * 0.53;
    if (i % 2 === 0) round(s, { x: L, y, w: CW, h: 0.47, fill: { color: "F2F4F7" } });
    s.addText(r[0], {
      x: cx[0] + 0.12, y, w: cwid[0], h: 0.47, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: BLUE,
    });
    s.addText(r[1], {
      x: cx[1] + 0.24, y, w: cwid[1] - 0.4, h: 0.47, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11, color: INK,
    });
    s.addText(r[2], {
      x: cx[2] + 0.24, y, w: cwid[2] - 0.4, h: 0.47, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11, color: INK,
    });
  });
  keyBar(s, 4.66, "OJO CON LAS FECHAS",
    "La recategorización del Monotributo es obligatoria en febrero y en agosto, aunque no cambie la categoría. Si no se hace, ARCA recategoriza de oficio.");
  s.addNotes(
    "Casi todos los contratistas y proveedores chicos con los que trabajamos son monotributistas: pintores, fotógrafos, service, fletes. Conviene tener a mano su categoría vigente. Si un monotributista factura por encima del tope de su categoría, hay que avisarle: puede quedar excluido de oficio del régimen, con efecto retroactivo."
  );
}

/* ================================================== 5. TIPOS DE FACTURA */
{
  const s = contentSlide(
    "Qué factura corresponde",
    "El tipo de comprobante depende de la condición fiscal del emisor y del receptor."
  );
  const tipos = [
    { l: "A", em: "Resp. Inscripto", re: "Resp. Inscripto", iva: "IVA discriminado", hi: true },
    { l: "B", em: "Resp. Inscripto", re: "Cons. final o Monotributista", iva: "IVA incluido" },
    { l: "C", em: "Monotributista", re: "Cualquiera", iva: "Nunca discrimina IVA" },
    { l: "E", em: "Exportador", re: "Cliente del exterior", iva: "No aplica" },
    { l: "M", em: "Sin solvencia verificada", re: "Resp. Inscripto", iva: "IVA + retención extra" },
  ];
  tipos.forEach((t, i) => {
    const x = L + i * 1.79;
    round(s, { x, y: 1.3, w: 1.6, h: 2.85, fill: { color: t.hi ? BLUE : GRAYC } });
    round(s, {
      x: x + 0.5, y: 1.5, w: 0.6, h: 0.6, rectRadius: 0.16, fill: { color: W },
    });
    s.addText(t.l, {
      x: x + 0.5, y: 1.5, w: 0.6, h: 0.6, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 26, bold: true, color: t.hi ? BLUE : SLATE,
    });
    s.addText("EMITE", {
      x: x + 0.12, y: 2.24, w: 1.36, h: 0.2, margin: 0, align: "center",
      fontFace: F, fontSize: 8, bold: true, color: "C9D6E6", charSpacing: 0.8,
    });
    s.addText(t.em, {
      x: x + 0.1, y: 2.44, w: 1.4, h: 0.44, margin: 0, align: "center", valign: "top",
      fontFace: F, fontSize: 10, color: W, lineSpacing: 12,
    });
    s.addText("RECIBE", {
      x: x + 0.12, y: 2.92, w: 1.36, h: 0.2, margin: 0, align: "center",
      fontFace: F, fontSize: 8, bold: true, color: "C9D6E6", charSpacing: 0.8,
    });
    s.addText(t.re, {
      x: x + 0.1, y: 3.12, w: 1.4, h: 0.5, margin: 0, align: "center", valign: "top",
      fontFace: F, fontSize: 10, color: W, lineSpacing: 12,
    });
    s.addText(t.iva, {
      x: x + 0.1, y: 3.66, w: 1.4, h: 0.42, margin: 0, align: "center", valign: "top",
      fontFace: F, fontSize: 9.5, italic: true, color: "DCE6F2", lineSpacing: 11,
    });
  });
  keyBar(s, 4.38, "SEÑAL DE ALERTA",
    "Si el tipo de factura no coincide con la condición fiscal del emisor, algo está mal: hay que frenar y revisar la constancia antes de pagar.", RED);
  s.addNotes(
    "La pregunta práctica es siempre la misma: ¿quién emite y quién recibe? Como Responsable Inscripto, la inmobiliaria factura A a empresas y B a consumidores finales. Un monotributista siempre emite C, incluso a una empresa grande: el comprador simplemente no computa crédito fiscal de IVA. La M es poco frecuente y es señal de que ARCA no le reconoce solvencia al emisor."
  );
}

/* ================================================================ 6. CAE */
{
  const s = contentSlide(
    "El CAE: sin eso, no se paga",
    "Código de Autorización Electrónico — es lo que le da validez fiscal a la factura."
  );
  round(s, { x: L, y: 1.3, w: 3.1, h: 3.55, fill: { color: BLUE } });
  s.addText("¿Qué es?", {
    x: L + 0.26, y: 1.5, w: 2.6, h: 0.34, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W,
  });
  s.addText(
    "El número único que ARCA le asigna a cada comprobante al validarlo. Toda la facturación es electrónica: ya no existe el talonario impreso como opción habitual.\n\nSin CAE, o con el CAE vencido, el comprobante no tiene respaldo ante el fisco.",
    { x: L + 0.26, y: 1.95, w: 2.6, h: 1.85, margin: 0, fontFace: F, fontSize: 10.5, color: "DCE6F2", lineSpacing: 15 }
  );
  round(s, { x: L + 0.26, y: 3.9, w: 2.6, h: 0.72, fill: { color: "0A5296" } });
  s.addText("Si pagás sin CAE válido, ARCA puede impugnar el gasto en IVA y Ganancias.", {
    x: L + 0.42, y: 3.9, w: 2.3, h: 0.72, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9.5, color: W, lineSpacing: 12,
  });

  s.addText("Cómo validar el CAE de una factura recibida", {
    x: L + 3.35, y: 1.3, w: 5.5, h: 0.36, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, bold: true, color: BLUE,
  });
  const pasos = [
    "Ubicar el CAE y su fecha de vencimiento, al pie del comprobante.",
    "Entrar a arca.gob.ar → Comprobantes en línea.",
    "Cargar el CUIT del emisor y el tipo y número de comprobante.",
    "Verificar que el CAE informado coincida con el de la factura.",
    "Si no coincide o no existe: no pagar y avisar al proveedor.",
  ];
  pasos.forEach((p, i) => {
    const y = 1.82 + i * 0.62;
    round(s, {
      x: L + 3.35, y: y + 0.04, w: 0.4, h: 0.4, rectRadius: 0.5,
      fill: { color: i === 4 ? RED : BLUE },
    });
    s.addText(String(i + 1), {
      x: L + 3.35, y: y + 0.04, w: 0.4, h: 0.4, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 11.5, bold: true, color: W,
    });
    s.addText(p, {
      x: L + 3.9, y, w: 4.95, h: 0.48, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, color: INK, lineSpacing: 14,
    });
  });
  s.addNotes(
    "Este es el control más concreto del día a día: toma dos minutos y evita el problema más caro de la lista. Complemento del tema: las notas de crédito anulan o reducen una factura ya emitida (devolución, descuento, corrección) y las notas de débito la aumentan (intereses por mora, gastos adicionales). Ambas necesitan su propio CAE y deben referenciar la factura original."
  );
}

/* =============================================== 7. IVA Y GANANCIAS */
{
  const s = contentSlide(
    "IVA y Ganancias",
    "Los dos impuestos nacionales que atraviesan toda la operación."
  );
  round(s, { x: L, y: 1.3, w: 4.32, h: 3.55, fill: { color: BLUE } });
  s.addText("IVA", {
    x: L + 0.28, y: 1.5, w: 3.7, h: 0.38, margin: 0, valign: "middle",
    fontFace: F, fontSize: 20, bold: true, color: W,
  });
  s.addText("Indirecto: lo paga el consumidor final dentro del precio, pero cada eslabón lo liquida ante ARCA. Declaración jurada mensual.", {
    x: L + 0.28, y: 1.92, w: 3.76, h: 0.6, margin: 0,
    fontFace: F, fontSize: 10.5, color: "DCE6F2", lineSpacing: 14,
  });
  const alic = [
    { v: "21%", d: "Alícuota general" },
    { v: "10,5%", d: "Construcción, transporte, prepagas" },
    { v: "27%", d: "Luz, gas y teléfono comerciales" },
  ];
  alic.forEach((a, i) => {
    const x = L + 0.28 + i * 1.29;
    s.addText(a.v, {
      x, y: 2.6, w: 1.24, h: 0.44, margin: 0, valign: "middle",
      fontFace: F, fontSize: 23, bold: true, color: W,
    });
    s.addText(a.d, {
      x, y: 3.06, w: 1.2, h: 0.62, margin: 0, valign: "top",
      fontFace: F, fontSize: 9, color: "C9D6E6", lineSpacing: 11,
    });
  });
  round(s, { x: L + 0.28, y: 3.78, w: 3.76, h: 0.84, fill: { color: "0A5296" } });
  s.addText("Crédito fiscal es el IVA que pagaste en tus compras; débito fiscal, el que cobraste en tus ventas. Se liquida la diferencia.", {
    x: L + 0.46, y: 3.78, w: 3.4, h: 0.84, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10, color: W, lineSpacing: 13,
  });

  round(s, { x: L + 4.52, y: 1.3, w: 4.32, h: 3.55, fill: { color: GRAYC } });
  s.addText("Ganancias", {
    x: L + 4.8, y: 1.5, w: 3.7, h: 0.38, margin: 0, valign: "middle",
    fontFace: F, fontSize: 20, bold: true, color: W,
  });
  s.addText("Grava la renta de personas y empresas. Declaración jurada anual, con anticipos durante el año.", {
    x: L + 4.8, y: 1.92, w: 3.76, h: 0.5, margin: 0,
    fontFace: F, fontSize: 10.5, color: "F0F2F5", lineSpacing: 14,
  });
  const gan = [
    ["En relación de dependencia", "El empleador retiene del sueldo cuando supera el mínimo no imponible vigente."],
    ["En sociedades", "Grava la utilidad fiscal, con alícuotas escalonadas según la ganancia y si se reinvierte (Ley 27.630)."],
    ["Bienes Personales", "Impuesto anual al patrimonio al 31/12: inmuebles, vehículos, inversiones y participaciones societarias."],
  ];
  gan.forEach((g, i) => {
    const y = 2.52 + i * 0.78;
    s.addText(g[0], {
      x: L + 4.8, y, w: 3.8, h: 0.26, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: W,
    });
    s.addText(g[1], {
      x: L + 4.8, y: y + 0.26, w: 3.8, h: 0.5, margin: 0,
      fontFace: F, fontSize: 9.5, color: "F0F2F5", lineSpacing: 12,
    });
  });
  s.addNotes(
    "Lo importante del IVA es entender que no es un costo para la empresa, porque se descuenta: es un costo para el consumidor final. Ganancias y Bienes Personales son anuales y los liquida el estudio contable; lo que nos toca es tener la documentación ordenada. Caso típico del rubro: un cliente argentino que compra un departamento en el exterior tributa allá, pero acá puede impactarle Bienes Personales si es residente fiscal argentino."
  );
}

/* ============================== 8. INGRESOS BRUTOS Y CONVENIO MULTILATERAL */
{
  const s = contentSlide(
    "Ingresos Brutos: el que más duele",
    "Provincial, mensual y calculado sobre lo facturado — exista o no ganancia."
  );
  round(s, { x: L, y: 1.3, w: 4.32, h: 2.3, fill: { color: BLUE } });
  s.addText("Se paga sobre la facturación, no sobre la rentabilidad.", {
    x: L + 0.28, y: 1.5, w: 3.76, h: 0.8, margin: 0, valign: "top",
    fontFace: F, fontSize: 17, bold: true, color: W, lineSpacing: 22,
  });
  s.addText("Cada provincia fija su propia alícuota según el rubro: la de real estate no es la misma que la de venta de herramientas o marketing. Se liquida mensualmente ante ARBA, AGIP u otra provincia.", {
    x: L + 0.28, y: 2.42, w: 3.76, h: 1.0, margin: 0,
    fontFace: F, fontSize: 10.5, color: "DCE6F2", lineSpacing: 15,
  });

  round(s, { x: L + 4.52, y: 1.3, w: 4.32, h: 2.3, fill: { color: GRAYC } });
  s.addText("Convenio Multilateral", {
    x: L + 4.8, y: 1.5, w: 3.76, h: 0.36, margin: 0, valign: "middle",
    fontFace: F, fontSize: 17, bold: true, color: W,
  });
  s.addText("Si la inmobiliaria factura en CABA y en PBA, no paga Ingresos Brutos completo en cada jurisdicción por el mismo ingreso: el Convenio reparte la base imponible entre ambas.", {
    x: L + 4.8, y: 1.94, w: 3.76, h: 0.9, margin: 0,
    fontFace: F, fontSize: 10.5, color: "F0F2F5", lineSpacing: 14,
  });
  round(s, { x: L + 4.8, y: 2.86, w: 3.76, h: 0.6, fill: { color: SLATE } });
  s.addText("Una única DDJJ mensual (SIFERE) + el CM05 anual al cierre del ejercicio.", {
    x: L + 4.96, y: 2.86, w: 3.45, h: 0.6, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10, color: W, lineSpacing: 12,
  });

  const rp = [
    ["Retención", "LA COBRA QUIEN PAGA", "Descuenta un porcentaje de la factura del proveedor y lo deposita al fisco a cuenta de ese proveedor, que recibe un certificado."],
    ["Percepción", "LA COBRA QUIEN VENDE", "Suma un importe por encima del precio y lo deposita al fisco a cuenta de las obligaciones futuras del comprador."],
  ];
  rp.forEach((r, i) => {
    const x = L + i * 4.52;
    round(s, { x, y: 3.78, w: 4.32, h: 1.1, fill: { color: "F2F4F7" } });
    s.addText(r[0], {
      x: x + 0.24, y: 3.9, w: 1.7, h: 0.28, margin: 0, valign: "middle",
      fontFace: F, fontSize: 12.5, bold: true, color: BLUE,
    });
    s.addText(r[1], {
      x: x + 1.9, y: 3.9, w: 2.2, h: 0.28, margin: 0, align: "right", valign: "middle",
      fontFace: F, fontSize: 8.5, bold: true, color: MUTED, charSpacing: 0.8,
    });
    s.addText(r[2], {
      x: x + 0.24, y: 4.2, w: 3.86, h: 0.56, margin: 0,
      fontFace: F, fontSize: 9.5, color: INK, lineSpacing: 12,
    });
  });
  s.addNotes(
    "IIBB es el impuesto que más impacta el margen del negocio inmobiliario, porque se calcula sobre la comisión bruta y no sobre lo que queda. Al presupuestar hay que netear IIBB antes de calcular el margen real. Y sí: se paga aunque el período cierre en pérdida. Sobre retenciones: para retener hay que estar designado agente de retención por el organismo, no se le retiene a cualquiera."
  );
}

/* ============================================================= 9. SELLOS */
{
  const s = contentSlide(
    "Sellos: el impuesto de la firma",
    "Impuesto provincial sobre la instrumentación de actos y contratos."
  );
  round(s, { x: L, y: 1.3, w: 3.5, h: 3.55, fill: { color: BLUE } });
  s.addText("Se paga una sola vez, al firmar, sobre el valor total del acto.", {
    x: L + 0.28, y: 1.55, w: 2.95, h: 1.1, margin: 0, valign: "top",
    fontFace: F, fontSize: 17, bold: true, color: W, lineSpacing: 23,
  });
  s.addText(
    "Alcanza alquileres, boletos de compraventa y contratos comerciales o societarios.\n\nA diferencia de Ingresos Brutos, que se liquida mes a mes, Sellos es un pago único al momento de la firma.",
    { x: L + 0.28, y: 2.75, w: 2.95, h: 1.9, margin: 0, fontFace: F, fontSize: 11, color: "DCE6F2", lineSpacing: 16 }
  );

  const puntos = [
    ["La base es el valor total del acto", "En un alquiler, la suma de todos los meses del contrato — no un mes suelto."],
    ["Impacta la rentabilidad neta", "Sellos es un costo de la operación: hay que sumarlo al cálculo, no mirar solo la comisión."],
    ["El sellado da fecha cierta", "Sin sellar, el contrato pierde fuerza probatoria ante el fisco y ante la contraparte."],
    ["Se coordina antes de firmar", "Conviene resolver el trámite ante ARBA o AGIP para no atrasar la firma."],
  ];
  puntos.forEach((p, i) => {
    const y = 1.3 + i * 0.92;
    round(s, { x: L + 3.72, y, w: 5.12, h: 0.8, fill: { color: "F2F4F7" } });
    round(s, {
      x: L + 3.94, y: y + 0.22, w: 0.36, h: 0.36, rectRadius: 0.5, fill: { color: BLUE },
    });
    s.addText(String(i + 1), {
      x: L + 3.94, y: y + 0.22, w: 0.36, h: 0.36, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 10.5, bold: true, color: W,
    });
    s.addText(p[0], {
      x: L + 4.44, y: y + 0.1, w: 4.28, h: 0.26, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: BLUE,
    });
    s.addText(p[1], {
      x: L + 4.44, y: y + 0.37, w: 4.28, h: 0.36, margin: 0,
      fontFace: F, fontSize: 9.5, color: INK, lineSpacing: 12,
    });
  });
  s.addNotes(
    "Sellos es el impuesto más propio del negocio inmobiliario y el que más se olvida al presupuestar una operación. Regla de oro del manual: siempre pedir el contrato de alquiler sellado. Sin sellado no hay fecha cierta y, ante un conflicto o una inspección, el contrato pierde valor probatorio frente al fisco y frente a terceros."
  );
}

/* ========================================= 10. IMPUESTOS DEL INMUEBLE */
{
  const s = contentSlide(
    "Los impuestos del inmueble",
    "Lo que paga el propietario — y lo que hay que saber leer para tasar y asesorar."
  );
  const box = [
    { t: "Impuesto Inmobiliario", q: "ARBA (PBA)", d: "Sobre la titularidad del inmueble, calculado sobre la valuación fiscal. Vencimientos bimestrales o trimestrales. En CABA no existe por separado: va dentro del ABL.", fill: BLUE },
    { t: "ABL / TSU", q: "AGIP · MUNICIPIO", d: "Alumbrado, Barrido y Limpieza en CABA; fuera, cada municipio tiene su Tasa de Servicios Urbanos. Retribuye servicios urbanos sobre el inmueble.", fill: GRAYC },
    { t: "Patentes", q: "ARBA · AGIP", d: "Sobre la titularidad de un vehículo, según valuación fiscal por marca, modelo y año. En PBA se cobra habitualmente en cinco cuotas anuales.", fill: BLUE },
    { t: "Seguridad e Higiene", q: "MUNICIPIO", d: "Tasa municipal por desarrollar actividad comercial en un local. Base variable: ingresos, superficie o ambas. Va de la mano de la habilitación.", fill: GRAYC },
  ];
  box.forEach((b, i) => {
    const x = L + i * 2.26;
    round(s, { x, y: 1.3, w: 2.06, h: 2.85, fill: { color: b.fill } });
    s.addText(b.t, {
      x: x + 0.22, y: 1.48, w: 1.68, h: 0.6, margin: 0, valign: "top",
      fontFace: F, fontSize: 13.5, bold: true, color: W, lineSpacing: 16,
    });
    s.addText(b.q, {
      x: x + 0.22, y: 2.12, w: 1.7, h: 0.22, margin: 0, valign: "middle",
      fontFace: F, fontSize: 8.5, bold: true, color: "C9D6E6", charSpacing: 0.8,
    });
    s.addText(b.d, {
      x: x + 0.22, y: 2.44, w: 1.7, h: 1.55, margin: 0,
      fontFace: F, fontSize: 9.5, color: "EAEFF5", lineSpacing: 12,
    });
  });
  keyBar(s, 4.38, "IMPUESTO NO ES LO MISMO QUE TASA",
    "El impuesto no tiene contraprestación directa (Ganancias, IVA). La tasa siempre retribuye un servicio concreto: alumbrado, inspecciones, habilitación.");
  s.addNotes(
    "Para el agente esto sirve en dos momentos: al tasar, porque la valuación fiscal y las boletas dicen mucho del inmueble; y al asesorar sobre qué gastos corren por cuenta del propietario y cuáles del inquilino. Para leer cualquier boleta —ARBA, AGIP o municipal— buscar siempre lo mismo: qué impuesto es, número de partida o padrón, período, importe y fecha de vencimiento."
  );
}

/* ==================================== 11. CONTROLES Y ERRORES CAROS */
{
  const s = contentSlide(
    "El control de todos los días",
    "Qué verificar antes de pagar, y qué errores salen más caros."
  );
  round(s, { x: L, y: 1.3, w: 4.32, h: 0.52, fill: { color: GREEN } });
  s.addText("SÍ — CONTROLAR SIEMPRE", {
    x: L + 0.3, y: 1.3, w: 3.9, h: 0.52, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, bold: true, color: W, charSpacing: 1,
  });
  round(s, { x: L + 4.52, y: 1.3, w: 4.32, h: 0.52, fill: { color: RED } });
  s.addText("NO — ERRORES QUE SALEN CAROS", {
    x: L + 4.82, y: 1.3, w: 3.9, h: 0.52, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, bold: true, color: W, charSpacing: 1,
  });

  const si = [
    "Que el CUIT esté activo y no dado de baja.",
    "Que la condición de IVA de la constancia coincida con el tipo de factura.",
    "Que el comprobante tenga CAE vigente.",
    "Que el CBU esté a nombre del mismo CUIT que factura.",
    "Que el contrato de alquiler esté sellado antes de firmar.",
  ];
  const no = [
    "Pagar una factura sin verificar el CAE.",
    "No presentar la DDJJ por no tener actividad en el período.",
    "No recategorizar el Monotributo en febrero y agosto.",
    "Operar con un proveedor de alto riesgo fiscal.",
    "Firmar un contrato de alquiler sin sellar.",
  ];
  const rowY = (i) => 1.98 + i * 0.56;
  si.forEach((t, i) => {
    const y = rowY(i);
    round(s, { x: L, y: y + 0.02, w: 0.34, h: 0.34, rectRadius: 0.5, fill: { color: GREEN } });
    s.addText("✓", {
      x: L, y: y + 0.02, w: 0.34, h: 0.34, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: W,
    });
    s.addText(t, {
      x: L + 0.48, y, w: 3.84, h: 0.4, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 13,
    });
  });
  no.forEach((t, i) => {
    const y = rowY(i);
    round(s, { x: L + 4.52, y: y + 0.02, w: 0.34, h: 0.34, rectRadius: 0.5, fill: { color: RED } });
    s.addText("✕", {
      x: L + 4.52, y: y + 0.02, w: 0.34, h: 0.34, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 11, bold: true, color: W,
    });
    s.addText(t, {
      x: L + 5.0, y, w: 3.84, h: 0.4, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 13,
    });
  });
  keyBar(s, 4.76, "PARA DAR DE ALTA A UN PROVEEDOR",
    "Constancia de inscripción actualizada, CBU a nombre del mismo CUIT, condición frente al IVA y certificado de ART vigente si tiene personal a cargo.");
  s.addNotes(
    "Cierre operativo de la capacitación: estos controles son el 90% del trabajo diario. Recordar además qué hacer ante una fiscalización: verificar la notificación en el Domicilio Fiscal Electrónico, identificar qué período y qué impuesto revisan, reunir la documentación y avisar al estudio contable ANTES de entregar o responder nada. Nunca entregar documentación a un inspector sin que el contador esté al tanto."
  );
}

/* =========================================================== 12. CIERRE */
{
  const s = pres.addSlide();
  s.background = { path: A("bg_close.png") };
  s.addImage({ path: A("logo_stack.png"), x: 8.0, y: 0.45, w: 0.94, h: 1.6 });
  s.addText("Muchas gracias.", {
    x: 0.82, y: 2.05, w: 6.5, h: 0.72, margin: 0, valign: "middle",
    fontFace: F, fontSize: 38, bold: true, color: BLUE,
  });
  s.addText("Ante la duda: preguntar antes de pagar, nunca después.", {
    x: 0.85, y: 2.85, w: 6.5, h: 0.36, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, color: SLATE,
  });
  s.addText("Capacitaciones Krak Real Estate · 2026 · Material de consulta: Manual de Impuestos para Administrativos en Argentina", {
    x: 0.85, y: 4.62, w: 8.2, h: 0.3, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9.5, color: MUTED,
  });
  s.addNotes(
    "Cierre. El manual completo —40 puntos, glosario, preguntas frecuentes y modelos de mensajes para proveedores— queda disponible como material de consulta. Es un documento vivo: cuando cambie una normativa relevante o aparezca un caso nuevo, se actualiza."
  );
}

pres.writeFile({ fileName: process.argv[2] }).then((f) => console.log("OK:", f));

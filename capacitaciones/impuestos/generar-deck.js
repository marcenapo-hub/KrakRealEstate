const pptxgen = require("pptxgenjs");

const SLATE = "16283C";
const SLATE2 = "2A4763";
const GOLD = "B8862B";
const GOLDL = "F6EEDD";
const LIGHT = "F1F3F6";
const GRAY = "5B6B7C";
const W = "FFFFFF";
const RED = "9E2B25";
const REDL = "F7E9E8";

const HF = "Cambria";
const BF = "Calibri";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.author = "Krak Real Estate";
pres.title = "Impuestos para Agentes Inmobiliarios";

const card = (s, x, y, w, h, fill) =>
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: fill || LIGHT },
    line: { color: fill || LIGHT, width: 0 },
  });

// Encabezado estándar de slide de contenido: chip dorado con número + título
function header(s, num, title, kicker) {
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.5, y: 0.34, w: 0.52, h: 0.52, rectRadius: 0.5,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  s.addText(String(num), {
    x: 0.5, y: 0.34, w: 0.52, h: 0.52, align: "center", valign: "middle",
    fontFace: HF, fontSize: 16, bold: true, color: W, margin: 0,
  });
  s.addText(title, {
    x: 1.18, y: 0.3, w: 8.3, h: 0.42, align: "left", valign: "middle",
    fontFace: HF, fontSize: 25, bold: true, color: SLATE, margin: 0,
  });
  if (kicker) {
    s.addText(kicker, {
      x: 1.18, y: 0.74, w: 8.3, h: 0.28, align: "left", valign: "middle",
      fontFace: BF, fontSize: 11.5, color: GRAY, margin: 0,
    });
  }
}

function callout(s, y, label, text, tone) {
  const fill = tone === "red" ? REDL : GOLDL;
  const chip = tone === "red" ? RED : GOLD;
  card(s, 0.5, y, 9.0, 0.7, fill);
  s.addText(label, {
    x: 0.72, y: y + 0.05, w: 5.0, h: 0.22, margin: 0, valign: "middle",
    fontFace: BF, fontSize: 9, bold: true, color: chip, charSpacing: 1,
  });
  s.addText(text, {
    x: 0.72, y: y + 0.27, w: 8.6, h: 0.36, margin: 0,
    fontFace: BF, fontSize: 11, color: SLATE, valign: "middle", lineSpacing: 14,
  });
}

/* ---------------------------------------------------------- 1. CARÁTULA */
{
  const s = pres.addSlide();
  s.background = { color: SLATE };
  s.addShape(pres.ShapeType.roundRect, {
    x: 5.6, y: -1.2, w: 6.4, h: 6.4, rectRadius: 0.05,
    fill: { color: SLATE2 }, line: { color: SLATE2, width: 0 }, rotate: 20,
  });
  s.addText("KRAK REAL ESTATE  ·  CAPACITACIÓN INTERNA", {
    x: 0.7, y: 0.85, w: 6.0, h: 0.3, margin: 0,
    fontFace: BF, fontSize: 10.5, bold: true, color: GOLD, charSpacing: 1.6,
  });
  s.addText("Impuestos", {
    x: 0.7, y: 1.35, w: 6.2, h: 0.85, margin: 0,
    fontFace: HF, fontSize: 48, bold: true, color: W,
  });
  s.addText("para agentes inmobiliarios", {
    x: 0.7, y: 2.18, w: 6.2, h: 0.6, margin: 0,
    fontFace: HF, fontSize: 30, color: GOLD,
  });
  s.addText(
    "Los conceptos básicos del sistema tributario argentino aplicados al día a día de una operación inmobiliaria: qué impuesto es, quién lo cobra y cuándo mirarlo.",
    { x: 0.7, y: 3.05, w: 5.6, h: 0.9, margin: 0, fontFace: BF, fontSize: 13, color: "C3CEDA", lineSpacing: 20 }
  );
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.7, y: 4.35, w: 2.15, h: 0.42, rectRadius: 0.2,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  s.addText("Edición 2026", {
    x: 0.7, y: 4.35, w: 2.15, h: 0.42, align: "center", valign: "middle", margin: 0,
    fontFace: BF, fontSize: 11.5, bold: true, color: W,
  });
  s.addText("Basado en el Manual de Impuestos para Administrativos en Argentina", {
    x: 3.05, y: 4.35, w: 5.0, h: 0.42, valign: "middle", margin: 0,
    fontFace: BF, fontSize: 10, italic: true, color: "8FA3B5",
  });
  s.addNotes(
    "Presentación de la capacitación. Objetivo: que el equipo pueda identificar rápido qué impuesto aparece en cada operación, quién lo cobra y qué hay que controlar antes de pagar o cobrar. No busca convertir a nadie en contador."
  );
}

/* ------------------------------------------- 2. LOS TRES NIVELES DEL ESTADO */
{
  const s = pres.addSlide();
  header(s, 1, "Un país, tres niveles que cobran", "Toda operación puede generar obligaciones en más de un nivel a la vez");
  const cols = [
    {
      x: 0.5, t: "NACIÓN", org: "ARCA (ex AFIP)",
      items: ["IVA", "Ganancias", "Bienes Personales", "Monotributo y Autónomos", "Aportes y aduana"],
      note: "arca.gob.ar",
    },
    {
      x: 3.565, t: "PROVINCIA / CABA", org: "ARBA  ·  AGIP",
      items: ["Ingresos Brutos", "Sellos", "Impuesto Inmobiliario", "Patentes", "ABL (solo CABA, vía AGIP)"],
      note: "arba.gob.ar · agip.gob.ar",
    },
    {
      x: 6.63, t: "MUNICIPIO", org: "Rentas municipales",
      items: ["Seguridad e Higiene", "ABL / Tasa de Servicios Urbanos", "Habilitaciones", "Tasa vial y publicidad"],
      note: "Cada municipio, su propio portal",
    },
  ];
  cols.forEach((c) => {
    card(s, c.x, 1.2, 2.87, 2.85);
    s.addText(c.t, {
      x: c.x + 0.22, y: 1.34, w: 2.45, h: 0.24, margin: 0,
      fontFace: BF, fontSize: 9.5, bold: true, color: GOLD, charSpacing: 1.2,
    });
    s.addText(c.org, {
      x: c.x + 0.22, y: 1.6, w: 2.45, h: 0.32, margin: 0,
      fontFace: HF, fontSize: 15.5, bold: true, color: SLATE,
    });
    s.addText(
      c.items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < c.items.length - 1 } })),
      { x: c.x + 0.22, y: 2.0, w: 2.45, h: 1.4, margin: 0, fontFace: BF, fontSize: 11, color: SLATE, paraSpaceAfter: 5 }
    );
    s.addText(c.note, {
      x: c.x + 0.22, y: 3.58, w: 2.45, h: 0.3, margin: 0,
      fontFace: BF, fontSize: 9.5, italic: true, color: GRAY,
    });
  });
  callout(s, 4.28, "EN LA PRÁCTICA",
    "Alquilar una oficina en PBA activa los tres niveles: Sellos e IIBB (ARBA), el Inmobiliario del propietario y la tasa municipal del local.");
  s.addNotes(
    "Idea central: no hay un único fisco. Nación, provincia y municipio tienen potestad tributaria propia y no se piden permiso entre sí. Antes de cerrar una operación conviene preguntarse siempre: ¿dónde está el inmueble? ¿dónde se presta el servicio? Eso define qué organismos intervienen."
  );
}

/* --------------------------------------------------- 3. IDENTIDAD FISCAL */
{
  const s = pres.addSlide();
  header(s, 2, "Tu identidad fiscal", "Los cuatro elementos sin los cuales no se puede facturar ni operar");
  const items = [
    { x: 0.5, y: 1.18, t: "CUIT", d: "11 dígitos que te identifican ante todos los organismos, no solo ARCA. Prefijo 20/23/24/27 personas humanas, 30/33/34 sociedades. Es el mismo número de por vida." },
    { x: 5.15, y: 1.18, t: "Clave Fiscal", d: "La contraseña para operar en ARCA. La mayoría de los trámites exige nivel 3. Desde ahí se delegan permisos al estudio contable sin compartir la clave." },
    { x: 0.5, y: 2.88, t: "Domicilio Fiscal Electrónico", d: "Buzón digital obligatorio. Una intimación queda notificada apenas se deposita ahí, se haya leído o no. Hay que revisarlo con periodicidad." },
    { x: 5.15, y: 2.88, t: "Constancia de inscripción", d: "Resume la situación fiscal de un CUIT: en qué impuestos está inscripto y desde cuándo. Gratis, con solo cargar el CUIT." },
  ];
  items.forEach((it, i) => {
    card(s, it.x, it.y, 4.35, 1.62);
    s.addShape(pres.ShapeType.roundRect, {
      x: it.x + 0.22, y: it.y + 0.24, w: 0.42, h: 0.42, rectRadius: 0.5,
      fill: { color: SLATE }, line: { color: SLATE, width: 0 },
    });
    s.addText(String(i + 1), {
      x: it.x + 0.22, y: it.y + 0.24, w: 0.42, h: 0.42, align: "center", valign: "middle", margin: 0,
      fontFace: BF, fontSize: 12, bold: true, color: GOLD,
    });
    s.addText(it.t, {
      x: it.x + 0.78, y: it.y + 0.22, w: 3.4, h: 0.32, margin: 0, valign: "middle",
      fontFace: HF, fontSize: 15.5, bold: true, color: SLATE,
    });
    s.addText(it.d, {
      x: it.x + 0.78, y: it.y + 0.6, w: 3.35, h: 0.9, margin: 0,
      fontFace: BF, fontSize: 10.5, color: GRAY, lineSpacing: 14,
    });
  });
  callout(s, 4.7, "REGLA",
    "Constancia de inscripción + CBU a nombre del mismo CUIT: es lo primero que se le pide a todo proveedor o cliente nuevo.");
  s.addNotes(
    "El CUIT y la Clave Fiscal son la puerta de entrada. El Domicilio Fiscal Electrónico es el punto que más problemas genera: la gente asume que si no le llegó un mail no le notificaron nada, y no es así. La constancia de inscripción es la herramienta de control diaria."
  );
}

/* -------------------------------------- 4. MONOTRIBUTO VS RESP. INSCRIPTO */
{
  const s = pres.addSlide();
  header(s, 3, "Monotributo o Responsable Inscripto", "Define qué factura emite tu cliente, tu proveedor y vos mismo");

  const rows = [
    ["Facturación", "Tope de la categoría K", "Sin tope"],
    ["IVA", "No lo discrimina (va incluido)", "Discrimina 21% / 10,5% / 27%"],
    ["Ganancias", "Incluido en la cuota fija", "DDJJ anual + anticipos"],
    ["Aportes jubilatorios", "Incluidos en la cuota", "Régimen de Autónomos, aparte"],
    ["Tipo de factura", "C", "A o B"],
  ];
  const cx = [0.5, 3.05, 6.3];
  const cw = [2.45, 3.15, 3.2];

  // Encabezado de columnas
  s.addText("ASPECTO", { x: cx[0] + 0.15, y: 1.2, w: cw[0], h: 0.3, margin: 0, fontFace: BF, fontSize: 9.5, bold: true, color: GRAY, charSpacing: 1.2, valign: "middle" });
  card(s, cx[1], 1.15, cw[1], 0.42, GOLDL);
  s.addText("MONOTRIBUTO", { x: cx[1] + 0.18, y: 1.15, w: cw[1] - 0.3, h: 0.42, margin: 0, fontFace: BF, fontSize: 10.5, bold: true, color: GOLD, charSpacing: 1, valign: "middle" });
  card(s, cx[2], 1.15, cw[2], 0.42, SLATE);
  s.addText("RESPONSABLE INSCRIPTO", { x: cx[2] + 0.18, y: 1.15, w: cw[2] - 0.3, h: 0.42, margin: 0, fontFace: BF, fontSize: 10.5, bold: true, color: W, charSpacing: 1, valign: "middle" });

  rows.forEach((r, i) => {
    const y = 1.68 + i * 0.52;
    if (i % 2 === 0) card(s, 0.5, y, 9.0, 0.46, "F7F8FA");
    s.addText(r[0], { x: cx[0] + 0.15, y, w: cw[0], h: 0.46, margin: 0, valign: "middle", fontFace: BF, fontSize: 11.5, bold: true, color: SLATE });
    s.addText(r[1], { x: cx[1] + 0.18, y, w: cw[1] - 0.3, h: 0.46, margin: 0, valign: "middle", fontFace: BF, fontSize: 11, color: GRAY });
    s.addText(r[2], { x: cx[2] + 0.18, y, w: cw[2] - 0.3, h: 0.46, margin: 0, valign: "middle", fontFace: BF, fontSize: 11, color: GRAY });
  });

  callout(s, 4.4, "OJO CON LAS FECHAS",
    "La recategorización del Monotributo es obligatoria en febrero y en agosto, aunque no cambie la categoría. Si no, ARCA recategoriza de oficio.");
  s.addNotes(
    "Casi todos los contratistas y proveedores chicos con los que trabajamos son monotributistas: pintores, fotógrafos, service. Saber en qué categoría están evita sorpresas. Y si un monotributista factura por encima del tope de su categoría, hay que avisarle: puede quedar excluido de oficio."
  );
}

/* ------------------------------------------------- 5. TIPOS DE FACTURA */
{
  const s = pres.addSlide();
  header(s, 4, "Qué factura corresponde", "El tipo depende de la condición fiscal del emisor y del receptor");
  const tipos = [
    { l: "A", em: "Resp. Inscripto", re: "Resp. Inscripto", iva: "IVA discriminado", hi: true },
    { l: "B", em: "Resp. Inscripto", re: "Cons. final o Monotributista", iva: "IVA incluido" },
    { l: "C", em: "Monotributista", re: "Cualquiera", iva: "Nunca discrimina IVA" },
    { l: "E", em: "Exportador", re: "Cliente del exterior", iva: "No aplica" },
    { l: "M", em: "Sin solvencia verificada", re: "Resp. Inscripto", iva: "IVA + retención extra" },
  ];
  tipos.forEach((t, i) => {
    const x = 0.5 + i * 1.84;
    card(s, x, 1.2, 1.64, 2.9);
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.52, y: 1.42, w: 0.6, h: 0.6, rectRadius: 0.12,
      fill: { color: t.hi ? GOLD : SLATE }, line: { color: t.hi ? GOLD : SLATE, width: 0 },
    });
    s.addText(t.l, {
      x: x + 0.52, y: 1.42, w: 0.6, h: 0.6, align: "center", valign: "middle", margin: 0,
      fontFace: HF, fontSize: 24, bold: true, color: W,
    });
    s.addText("EMITE", { x: x + 0.16, y: 2.16, w: 1.32, h: 0.2, margin: 0, align: "center", fontFace: BF, fontSize: 8, bold: true, color: GOLD, charSpacing: 0.8 });
    s.addText(t.em, { x: x + 0.12, y: 2.36, w: 1.4, h: 0.44, margin: 0, align: "center", fontFace: BF, fontSize: 10, color: SLATE });
    s.addText("RECIBE", { x: x + 0.16, y: 2.82, w: 1.32, h: 0.2, margin: 0, align: "center", fontFace: BF, fontSize: 8, bold: true, color: GOLD, charSpacing: 0.8 });
    s.addText(t.re, { x: x + 0.12, y: 3.02, w: 1.4, h: 0.5, margin: 0, align: "center", fontFace: BF, fontSize: 10, color: SLATE });
    s.addText(t.iva, { x: x + 0.12, y: 3.58, w: 1.4, h: 0.42, margin: 0, align: "center", fontFace: BF, fontSize: 9.5, italic: true, color: GRAY });
  });
  callout(s, 4.28, "SEÑAL DE ALERTA",
    "Si el tipo de factura no coincide con la condición fiscal del emisor, algo está mal: hay que frenar y revisar la constancia antes de pagar.");
  s.addNotes(
    "La pregunta práctica: ¿quién emite y quién recibe? Nuestra inmobiliaria, como Responsable Inscripto, factura A a empresas y B a consumidores finales. Un monotributista siempre factura C, incluso a una empresa grande: el comprador simplemente no computa crédito fiscal."
  );
}

/* ----------------------------------------------------------- 6. CAE */
{
  const s = pres.addSlide();
  header(s, 5, "El CAE: sin eso, no se paga", "Código de Autorización Electrónico — es lo que le da validez fiscal a la factura");

  card(s, 0.5, 1.2, 3.15, 3.55, SLATE);
  s.addText("¿Qué es?", { x: 0.75, y: 1.4, w: 2.7, h: 0.36, margin: 0, valign: "middle", fontFace: HF, fontSize: 17, bold: true, color: GOLD });
  s.addText(
    "El número único que ARCA le asigna a cada comprobante al validarlo. Toda la facturación es electrónica: ya no existe el talonario impreso como opción habitual.\n\nSin CAE, o con el CAE vencido, el comprobante no tiene respaldo ante el fisco.",
    { x: 0.75, y: 1.9, w: 2.68, h: 1.85, margin: 0, fontFace: BF, fontSize: 10.5, color: "C3CEDA", lineSpacing: 15 }
  );
  card(s, 0.75, 3.85, 2.68, 0.62, SLATE2);
  s.addText("Si pagás sin CAE válido, ARCA puede impugnar el gasto en IVA y Ganancias.", {
    x: 0.9, y: 3.85, w: 2.4, h: 0.62, margin: 0, valign: "middle", fontFace: BF, fontSize: 9.5, color: W,
  });

  s.addText("Cómo validar el CAE de una factura recibida", {
    x: 3.95, y: 1.2, w: 5.55, h: 0.34, margin: 0, fontFace: HF, fontSize: 16, bold: true, color: SLATE,
  });
  const pasos = [
    "Ubicar el CAE y su vencimiento, al pie del comprobante.",
    "Entrar a arca.gob.ar → Comprobantes en línea.",
    "Cargar el CUIT del emisor y el tipo y número de comprobante.",
    "Verificar que el CAE informado coincida con el de la factura.",
    "Si no coincide o no existe: no pagar y avisar al proveedor.",
  ];
  pasos.forEach((p, i) => {
    const y = 1.68 + i * 0.62;
    s.addShape(pres.ShapeType.roundRect, {
      x: 3.95, y: y + 0.04, w: 0.4, h: 0.4, rectRadius: 0.5,
      fill: { color: i === 4 ? RED : GOLD }, line: { color: i === 4 ? RED : GOLD, width: 0 },
    });
    s.addText(String(i + 1), { x: 3.95, y: y + 0.04, w: 0.4, h: 0.4, align: "center", valign: "middle", margin: 0, fontFace: BF, fontSize: 11.5, bold: true, color: W });
    s.addText(p, { x: 4.5, y, w: 5.0, h: 0.48, margin: 0, valign: "middle", fontFace: BF, fontSize: 11.5, color: SLATE });
  });
  s.addNotes(
    "Este es el control más concreto del día a día. Toma dos minutos y evita el problema más caro de la lista. Complemento: notas de crédito (anulan o reducen una factura ya emitida) y notas de débito (la aumentan, por intereses o gastos). Ambas necesitan su propio CAE y deben referenciar la factura original."
  );
}

/* ---------------------------------------------------- 7. IVA Y GANANCIAS */
{
  const s = pres.addSlide();
  header(s, 6, "IVA y Ganancias", "Los dos impuestos nacionales que atraviesan toda la operación");

  card(s, 0.5, 1.2, 4.45, 3.6);
  s.addText("IVA", { x: 0.75, y: 1.4, w: 3.9, h: 0.36, margin: 0, fontFace: HF, fontSize: 20, bold: true, color: SLATE });
  s.addText("Indirecto: lo paga el consumidor final dentro del precio, pero cada eslabón lo liquida ante ARCA. DDJJ mensual.", {
    x: 0.75, y: 1.78, w: 3.9, h: 0.6, margin: 0, fontFace: BF, fontSize: 11, color: GRAY, lineSpacing: 15,
  });
  const alic = [
    { v: "21%", d: "Alícuota general", x: 0.75 },
    { v: "10,5%", d: "Construcción, transporte, prepagas", x: 2.05 },
    { v: "27%", d: "Luz, gas y teléfono comerciales", x: 3.35 },
  ];
  alic.forEach((a) => {
    s.addText(a.v, { x: a.x, y: 2.45, w: 1.25, h: 0.45, margin: 0, fontFace: HF, fontSize: 24, bold: true, color: GOLD });
    s.addText(a.d, { x: a.x, y: 2.92, w: 1.2, h: 0.6, margin: 0, valign: "top", fontFace: BF, fontSize: 9.5, color: GRAY, lineSpacing: 12 });
  });
  card(s, 0.75, 3.62, 3.95, 0.95, GOLDL);
  s.addText("Crédito fiscal es el IVA que pagaste en tus compras; débito fiscal, el que cobraste en tus ventas. Se liquida la diferencia.", {
    x: 0.95, y: 3.62, w: 3.6, h: 0.95, margin: 0, valign: "middle", fontFace: BF, fontSize: 10.5, color: SLATE, lineSpacing: 14,
  });

  card(s, 5.15, 1.2, 4.35, 3.6);
  s.addText("Ganancias", { x: 5.4, y: 1.4, w: 3.8, h: 0.36, margin: 0, fontFace: HF, fontSize: 20, bold: true, color: SLATE });
  s.addText("Grava la renta de personas y empresas. DDJJ anual, con anticipos durante el año.", {
    x: 5.4, y: 1.78, w: 3.8, h: 0.45, margin: 0, fontFace: BF, fontSize: 11, color: GRAY, lineSpacing: 15,
  });
  const gan = [
    ["En relación de dependencia", "El empleador retiene del sueldo cuando supera el mínimo no imponible vigente."],
    ["En sociedades", "Grava la utilidad fiscal, con alícuotas escalonadas según ganancia y si se reinvierte (Ley 27.630)."],
    ["Bienes Personales", "Impuesto anual al patrimonio al 31/12: inmuebles, vehículos, inversiones y participaciones societarias."],
  ];
  gan.forEach((g, i) => {
    const y = 2.35 + i * 0.78;
    s.addText(g[0], { x: 5.4, y, w: 3.85, h: 0.24, margin: 0, fontFace: BF, fontSize: 11.5, bold: true, color: SLATE });
    s.addText(g[1], { x: 5.4, y: y + 0.24, w: 3.85, h: 0.5, margin: 0, fontFace: BF, fontSize: 10, color: GRAY, lineSpacing: 13 });
  });
  s.addNotes(
    "IVA: lo importante es entender que no es un costo para la empresa (se descuenta), pero sí para el consumidor final. Ganancias y Bienes Personales son anuales y los liquida el estudio contable; lo que nos toca es tener la documentación ordenada. Caso típico: un cliente argentino que compra un departamento en el exterior tributa allá, pero acá puede impactarle Bienes Personales."
  );
}

/* --------------------------------------- 8. INGRESOS BRUTOS Y CONVENIO M. */
{
  const s = pres.addSlide();
  header(s, 7, "Ingresos Brutos: el que más duele", "Provincial, mensual y calculado sobre lo facturado — exista o no ganancia");

  card(s, 0.5, 1.2, 4.45, 2.35, SLATE);
  s.addText("Se paga sobre la facturación,\nno sobre la rentabilidad.", {
    x: 0.78, y: 1.45, w: 3.9, h: 0.85, margin: 0, fontFace: HF, fontSize: 19, bold: true, color: W, lineSpacing: 24,
  });
  s.addText(
    "Cada provincia fija su propia alícuota según el rubro: la de real estate no es la misma que la de venta de herramientas o marketing. Se liquida mensualmente ante ARBA, AGIP u otra provincia.",
    { x: 0.78, y: 2.4, w: 3.9, h: 1.0, margin: 0, fontFace: BF, fontSize: 11, color: "C3CEDA", lineSpacing: 16 }
  );

  card(s, 5.15, 1.2, 4.35, 2.35);
  s.addText("Convenio Multilateral", { x: 5.4, y: 1.4, w: 3.85, h: 0.34, margin: 0, fontFace: HF, fontSize: 18, bold: true, color: SLATE });
  s.addText(
    "Si la inmobiliaria factura en CABA y en PBA, no paga IIBB completo en cada jurisdicción por el mismo ingreso: el Convenio reparte la base imponible entre ambas.",
    { x: 5.4, y: 1.8, w: 3.85, h: 0.95, margin: 0, fontFace: BF, fontSize: 10.5, color: GRAY, lineSpacing: 15 }
  );
  card(s, 5.4, 2.8, 3.85, 0.6, GOLDL);
  s.addText("Una única DDJJ mensual (SIFERE) + el CM05 anual al cierre del ejercicio.", {
    x: 5.6, y: 2.8, w: 3.5, h: 0.6, margin: 0, valign: "middle", fontFace: BF, fontSize: 10.5, color: SLATE, lineSpacing: 13,
  });

  const rp = [
    ["Retención", "La cobra quien PAGA", "Descuenta un % de la factura del proveedor y lo deposita al fisco a cuenta de ese proveedor, que recibe un certificado."],
    ["Percepción", "La cobra quien VENDE", "Suma un importe por encima del precio y lo deposita al fisco a cuenta de las obligaciones futuras del comprador."],
  ];
  rp.forEach((r, i) => {
    const x = 0.5 + i * 4.65;
    card(s, x, 3.72, 4.35, 1.05, "F7F8FA");
    s.addText(r[0], { x: x + 0.22, y: 3.85, w: 1.6, h: 0.26, margin: 0, fontFace: BF, fontSize: 12.5, bold: true, color: SLATE });
    s.addText(r[1], { x: x + 1.85, y: 3.85, w: 2.3, h: 0.26, margin: 0, align: "right", fontFace: BF, fontSize: 9.5, bold: true, color: GOLD, charSpacing: 0.8 });
    s.addText(r[2], { x: x + 0.22, y: 4.13, w: 3.9, h: 0.55, margin: 0, fontFace: BF, fontSize: 10, color: GRAY, lineSpacing: 13 });
  });
  s.addNotes(
    "IIBB es el impuesto que más impacta el margen del negocio inmobiliario porque se calcula sobre la comisión bruta, no sobre lo que queda. Al presupuestar, siempre netear IIBB antes de calcular el margen real. Y sí: se paga aunque el período cierre en pérdida. Para retener hay que estar designado agente de retención; no se le retiene a cualquiera."
  );
}

/* --------------------------------------------------------- 9. SELLOS */
{
  const s = pres.addSlide();
  s.background = { color: W };
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: 3.9, h: 5.625,
    fill: { color: SLATE }, line: { color: SLATE, width: 0 },
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.55, y: 0.55, w: 0.52, h: 0.52, rectRadius: 0.5,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  s.addText("8", { x: 0.55, y: 0.55, w: 0.52, h: 0.52, align: "center", valign: "middle", margin: 0, fontFace: HF, fontSize: 16, bold: true, color: W });
  s.addText("Sellos", { x: 0.55, y: 1.35, w: 2.9, h: 0.6, margin: 0, fontFace: HF, fontSize: 36, bold: true, color: W });
  s.addText("El impuesto de la firma", { x: 0.55, y: 1.98, w: 2.9, h: 0.36, margin: 0, fontFace: HF, fontSize: 17, color: GOLD });
  s.addText(
    "Impuesto provincial sobre la instrumentación de actos y contratos: alquileres, boletos de compraventa, contratos comerciales.\n\nNo se paga mes a mes: se paga una vez, al firmar, sobre el valor total del acto.",
    { x: 0.55, y: 2.6, w: 2.9, h: 2.0, margin: 0, fontFace: BF, fontSize: 11.5, color: "C3CEDA", lineSpacing: 17 }
  );

  s.addText("Qué mirar en cada operación", { x: 4.3, y: 0.72, w: 5.2, h: 0.4, margin: 0, fontFace: HF, fontSize: 22, bold: true, color: SLATE });
  const puntos = [
    ["La base es el valor total del acto", "En un alquiler, la suma de todos los meses del contrato — no un mes suelto."],
    ["Impacta la rentabilidad neta", "Sellos es un costo de la operación: hay que sumarlo al cálculo, no solo mirar la comisión."],
    ["El sellado da fecha cierta", "Sin sellar, el contrato pierde fuerza probatoria ante el fisco y ante la contraparte."],
    ["Se coordina antes de firmar", "Conviene resolver el trámite ante ARBA o AGIP para no atrasar la firma."],
  ];
  puntos.forEach((p, i) => {
    const y = 1.3 + i * 1.02;
    card(s, 4.3, y, 5.2, 0.9, "F7F8FA");
    s.addShape(pres.ShapeType.roundRect, {
      x: 4.5, y: y + 0.26, w: 0.36, h: 0.36, rectRadius: 0.5,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 },
    });
    s.addText(String(i + 1), { x: 4.5, y: y + 0.26, w: 0.36, h: 0.36, align: "center", valign: "middle", margin: 0, fontFace: BF, fontSize: 10.5, bold: true, color: W });
    s.addText(p[0], { x: 5.0, y: y + 0.14, w: 4.35, h: 0.28, margin: 0, valign: "middle", fontFace: BF, fontSize: 12, bold: true, color: SLATE });
    s.addText(p[1], { x: 5.0, y: y + 0.42, w: 4.35, h: 0.4, margin: 0, fontFace: BF, fontSize: 10, color: GRAY, lineSpacing: 13 });
  });
  s.addNotes(
    "Sellos es el impuesto más propio del negocio inmobiliario y el que más se olvida al presupuestar. Regla de oro del manual: siempre pedir el contrato de alquiler sellado. Sin sellado no hay fecha cierta y, ante un conflicto o una inspección, el contrato pierde valor probatorio."
  );
}

/* ------------------------------------------ 10. IMPUESTOS DEL INMUEBLE */
{
  const s = pres.addSlide();
  header(s, 9, "Los impuestos del inmueble", "Lo que paga el propietario — y lo que hay que saber leer para tasar y asesorar");
  const box = [
    { t: "Impuesto Inmobiliario", q: "ARBA (PBA)", d: "Sobre la titularidad del inmueble, calculado sobre la valuación fiscal. Vencimientos bimestrales o trimestrales. En CABA no existe por separado: va dentro del ABL." },
    { t: "ABL / TSU", q: "AGIP · Municipio", d: "Alumbrado, Barrido y Limpieza en CABA; fuera, cada municipio tiene su Tasa de Servicios Urbanos. Retribuye servicios urbanos sobre el inmueble." },
    { t: "Patentes", q: "ARBA · AGIP", d: "Sobre la titularidad de un vehículo, según valuación fiscal por marca, modelo y año. En PBA, habitualmente en cinco cuotas anuales." },
    { t: "Seguridad e Higiene", q: "Municipio", d: "Tasa municipal por desarrollar actividad comercial en un local. Base variable: ingresos, superficie o ambas. Va de la mano de la habilitación." },
  ];
  box.forEach((b, i) => {
    const x = 0.5 + i * 2.3;
    card(s, x, 1.2, 2.1, 2.9);
    s.addText(b.t, { x: x + 0.2, y: 1.38, w: 1.75, h: 0.6, margin: 0, fontFace: HF, fontSize: 14, bold: true, color: SLATE, lineSpacing: 17 });
    s.addText(b.q, { x: x + 0.2, y: 2.0, w: 1.75, h: 0.24, margin: 0, fontFace: BF, fontSize: 9, bold: true, color: GOLD, charSpacing: 0.8 });
    s.addText(b.d, { x: x + 0.2, y: 2.3, w: 1.75, h: 1.65, margin: 0, fontFace: BF, fontSize: 9.5, color: GRAY, lineSpacing: 13 });
  });
  callout(s, 4.28, "IMPUESTO ≠ TASA",
    "El impuesto no tiene contraprestación directa (Ganancias, IVA). La tasa retribuye un servicio concreto: alumbrado, inspecciones, habilitación.");
  s.addNotes(
    "Para el agente esto sirve en dos momentos: al tasar (la valuación fiscal y las boletas dicen mucho del inmueble) y al asesorar al propietario o al inquilino sobre qué gastos corren por cuenta de quién. Para leer cualquier boleta, buscar siempre lo mismo: qué impuesto es, número de partida o padrón, período, importe y vencimiento."
  );
}

/* --------------------------------------- 11. CONTROLES Y ERRORES CAROS */
{
  const s = pres.addSlide();
  header(s, 10, "El control de todos los días", "Cuatro chequeos antes de pagar y los cinco errores que salen más caros");

  card(s, 0.5, 1.2, 4.45, 3.55, SLATE);
  s.addText("Antes de pagar una factura", { x: 0.75, y: 1.4, w: 3.95, h: 0.34, margin: 0, fontFace: HF, fontSize: 15.5, bold: true, color: GOLD });
  const checks = [
    "Que el CUIT esté activo y no dado de baja.",
    "Que la condición de IVA de la constancia coincida con el tipo de factura.",
    "Que el comprobante tenga CAE vigente.",
    "Que el CBU esté a nombre del mismo CUIT que factura.",
  ];
  checks.forEach((c, i) => {
    const y = 1.86 + i * 0.6;
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.75, y: y + 0.06, w: 0.32, h: 0.32, rectRadius: 0.5,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 },
    });
    s.addText("✓", { x: 0.75, y: y + 0.06, w: 0.32, h: 0.32, align: "center", valign: "middle", margin: 0, fontFace: BF, fontSize: 11, bold: true, color: SLATE });
    s.addText(c, { x: 1.22, y, w: 3.5, h: 0.46, margin: 0, valign: "middle", fontFace: BF, fontSize: 11, color: W, lineSpacing: 14 });
  });
  s.addText("Para dar de alta: constancia actualizada, CBU, condición de IVA y ART vigente si tiene personal.", {
    x: 0.75, y: 4.25, w: 3.95, h: 0.45, margin: 0, fontFace: BF, fontSize: 9.5, italic: true, color: "9FB0C0", lineSpacing: 12,
  });

  s.addText("Los cinco errores más caros", { x: 5.15, y: 1.2, w: 4.35, h: 0.32, margin: 0, fontFace: HF, fontSize: 15.5, bold: true, color: RED });
  const errores = [
    ["Pagar sin verificar el CAE", "ARCA puede impugnar el gasto en IVA y Ganancias."],
    ["No presentar la DDJJ por no tener actividad", "La multa es automática, aun con impuesto en cero."],
    ["No recategorizar el Monotributo a tiempo", "ARCA recategoriza de oficio, casi siempre más caro."],
    ["Operar con un proveedor de alto riesgo fiscal", "Puede derivar en responsabilidad solidaria por su deuda."],
    ["Firmar un alquiler sin sellar", "El contrato pierde fuerza probatoria ante el fisco."],
  ];
  errores.forEach((e, i) => {
    const y = 1.66 + i * 0.62;
    if (i % 2 === 0) card(s, 5.15, y, 4.35, 0.58, "F7F8FA");
    s.addText(e[0], { x: 5.35, y: y + 0.04, w: 4.0, h: 0.24, margin: 0, fontFace: BF, fontSize: 11, bold: true, color: SLATE });
    s.addText(e[1], { x: 5.35, y: y + 0.28, w: 4.0, h: 0.24, margin: 0, fontFace: BF, fontSize: 9.5, color: GRAY });
  });
  s.addNotes(
    "Cierre operativo de la capacitación. Estos cuatro chequeos son el 90% del control diario. Recordar también qué hacer ante una fiscalización: verificar la notificación en el Domicilio Fiscal Electrónico, identificar período e impuesto, reunir la documentación y avisar al estudio contable ANTES de entregar o responder nada."
  );
}

/* --------------------------------------------------------- 12. CIERRE */
{
  const s = pres.addSlide();
  s.background = { color: SLATE };
  s.addShape(pres.ShapeType.roundRect, {
    x: -3.9, y: 4.0, w: 6.4, h: 6.4, rectRadius: 0.05,
    fill: { color: SLATE2 }, line: { color: SLATE2, width: 0 }, rotate: 20,
  });
  s.addText("PARA LLEVARSE", { x: 0.7, y: 0.7, w: 5.0, h: 0.3, margin: 0, fontFace: BF, fontSize: 10.5, bold: true, color: GOLD, charSpacing: 1.6 });
  s.addText("“Preguntar antes de pagar,\nnunca después.”", {
    x: 0.7, y: 1.12, w: 8.0, h: 1.2, margin: 0, fontFace: HF, fontSize: 31, bold: true, color: W, lineSpacing: 40,
  });
  const tk = [
    ["Identificá el nivel", "Nación, provincia o municipio: eso define el organismo, el portal y el vencimiento."],
    ["Controlá antes de pagar", "Constancia, tipo de factura y CAE vigente. Dos minutos que evitan el error más caro."],
    ["Ante la duda, consultá", "Esta capacitación cubre lo básico; no reemplaza el criterio del estudio contable."],
  ];
  tk.forEach((t, i) => {
    const x = 0.7 + i * 2.95;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.62, w: 2.7, h: 1.72, rectRadius: 0.08,
      fill: { color: SLATE2 }, line: { color: SLATE2, width: 0 },
    });
    s.addText(t[0], { x: x + 0.22, y: 2.8, w: 2.3, h: 0.5, margin: 0, fontFace: HF, fontSize: 14, bold: true, color: GOLD, lineSpacing: 17 });
    s.addText(t[1], { x: x + 0.22, y: 3.34, w: 2.3, h: 0.85, margin: 0, fontFace: BF, fontSize: 10.5, color: "C3CEDA", lineSpacing: 14 });
  });
  s.addText("Krak Real Estate  ·  Capacitación interna 2026  ·  Material de consulta: Manual de Impuestos para Administrativos en Argentina", {
    x: 0.7, y: 4.68, w: 8.6, h: 0.3, margin: 0, fontFace: BF, fontSize: 9.5, color: "8FA3B5",
  });
  s.addNotes(
    "Cierre. Recordar que el manual completo (40 puntos, glosario, FAQ y modelos de mensajes) queda disponible como material de consulta, y que es un documento vivo: cuando aparezca un caso nuevo, se actualiza."
  );
}

pres.writeFile({ fileName: process.argv[2] }).then((f) => console.log("OK:", f));

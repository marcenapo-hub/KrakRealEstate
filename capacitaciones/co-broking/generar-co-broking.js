/*
 * Capacitación de co-broking — Krak Real Estate.
 * Cómo se comparten los honorarios con colegas y cómo se asegura el cobro.
 *
 * Contenido: criterio de Marce (2026-10-03). Los repartos y formalidades son
 * usos del mercado y criterio de Krak, no una norma. Los números del ejemplo
 * son hipotéticos y están marcados como tales en la diapositiva.
 *
 * La marca (paleta, tipografía y layout) viene de ../krak.
 */
const K = require("../krak");
const { BLUE, SLATE, GRAYC, GREEN, RED, INK, MUTED, LIGHT, W, F, L, CW } = K;

const d = K.deck("Co-broking: compartir honorarios con colegas", __dirname);
const { pres, round, keyBar, bandHeader } = d;

const CORTE = "Criterio vigente al 03/10/2026";

/* Tarjeta de color con rótulo, título y cuerpo */
function card(s, o) {
  round(s, { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: o.fill } });
  s.addText(o.tag, {
    x: o.x + 0.24, y: o.y + 0.16, w: o.w - 0.48, h: 0.22, margin: 0, valign: "middle",
    fontFace: F, fontSize: 9, bold: true, color: W, charSpacing: 1.2,
  });
  s.addText(o.title, {
    x: o.x + 0.24, y: o.y + 0.42, w: o.w - 0.48, h: o.titleH || 0.62, margin: 0, valign: "top",
    fontFace: F, fontSize: o.titleSize || 16, bold: true, color: W, lineSpacing: (o.titleSize || 16) + 3,
  });
  s.addText(o.body, {
    x: o.x + 0.24, y: o.y + 0.42 + (o.titleH || 0.62) + 0.08, w: o.w - 0.48,
    h: o.h - (0.42 + (o.titleH || 0.62) + 0.08) - 0.14, margin: 0, valign: "top",
    fontFace: F, fontSize: o.bodySize || 10.5, color: "EAEFF5", lineSpacing: 14,
  });
}

/* ============================================================ 1. CARÁTULA */
{
  const s = d.cover(
    "Co-broking: compartir honorarios con colegas",
    "Cómo se reparte y cómo se asegura el cobro  ·  " + CORTE
  );
  s.addNotes(
    "Presentación. Objetivo: que todo el equipo, industrial y residencial, sepa qué formas de reparto existen, cuál se usa según el producto y, sobre todo, cómo dejar el acuerdo asegurado antes de operar. El mensaje que tiene que quedar: se pregunta primero y se deja por escrito. Los repartos que se muestran son usos del mercado, no una regla universal. Duración estimada: 30 minutos más el taller del final."
  );
}

/* ================================================== 2. POR QUÉ CO-BROKING */
{
  const s = d.slide(
    "Por qué trabajar con colegas",
    "Una operación puede necesitar algo que solo tiene otro corredor."
  );
  const cols = [
    { fill: BLUE, tag: "SITUACIÓN 1", title: "Tu cliente busca lo que no tenés", body: "Tenés un comprador con necesidad clara y la propiedad ideal está en la cartera de otro colega." },
    { fill: GRAYC, tag: "SITUACIÓN 2", title: "Tu propiedad necesita un comprador", body: "Tenés la autorización de venta y el comprador que encaja está en la base de otro colega." },
    { fill: BLUE, tag: "RESULTADO", title: "La operación se destraba", body: "Entre dos se cierra lo que uno solo no cerraba. Se reparte el honorario, pero se cobra." },
  ];
  cols.forEach((c, i) => card(s, { x: L + i * 3.03, y: 1.3, w: 2.78, h: 2.6, fill: c.fill, tag: c.tag, title: c.title, titleH: 0.85, body: c.body, bodySize: 11 }));
  keyBar(s, 4.2, "IDEA CENTRAL",
    "Compartir honorarios no es perder comisión: es cobrar una operación que solo no se cerraba.");
  s.addNotes(
    "Abrir con la pregunta: ¿cuántas veces tuvieron un cliente y la propiedad la tenía otro colega, o al revés? Co-broking es resolver eso entre dos corredores. No es una concesión: sin el colega, la operación no existía. Lo que sigue en la capacitación es cómo hacerlo ordenado para que nadie termine discutiendo un cobro."
  );
}

/* ====================================================== 3. TRES FORMAS */
{
  const s = d.slide(
    "Tres formas de compartir honorarios",
    "Se acuerdan entre colegas, caso por caso. Son prácticas del mercado."
  );
  const fm = [
    { fill: BLUE, tag: "FORMA 1", title: "La bolsa: 50 y 50", body: "Se suman todos los honorarios de la operación, vendedor y comprador, y se reparten por mitades." },
    { fill: GRAYC, tag: "FORMA 2 · LA MÁS HABITUAL", title: "La mitad del comprador", body: "Cada uno conserva el honorario de su cliente. Solo se divide por mitades el honorario del comprador." },
    { fill: BLUE, tag: "FORMA 3", title: "Un porcentaje fijo", body: "A veces se acuerda una participación puntual, por ejemplo el 1%, sobre el valor de la operación." },
  ];
  fm.forEach((c, i) => card(s, { x: L + i * 3.03, y: 1.3, w: 2.78, h: 2.55, fill: c.fill, tag: c.tag, title: c.title, body: c.body, bodySize: 11 }));
  keyBar(s, 4.15, "ATENCIÓN",
    "Los tres existen y los tres son válidos. Por eso nunca se asume cuál aplica: se pregunta y se acuerda.", SLATE);
  s.addNotes(
    "Marcar que 'la bolsa' es el nombre que se le da al 50 y 50 sobre el total de las comisiones. La mitad del comprador es lo más habitual en residencial. La tercera forma, un porcentaje fijo (por ejemplo el 1%), aparece a veces y se pacta puntualmente. Confirmar con Marce el alcance exacto de esta tercera forma antes de dictar: en el borrador quedó como 'a veces te comparten el uno'. La idea para el equipo: tres esquemas posibles, ninguno se da por supuesto."
  );
}

/* =========================================================== 4. POR PRODUCTO */
{
  const s = d.slide(
    "Cambia según el producto",
    "La costumbre del mercado no es la misma para todo."
  );
  const colW = 2.78;
  const cols = [
    { x: L, fill: BLUE, h: "TERRENOS", big: "La bolsa", d: "Se suele compartir la mitad de todo: honorarios del vendedor y del comprador, 50 y 50." },
    { x: L + 3.03, fill: GRAYC, h: "DEPARTAMENTOS", big: "Mitad del comprador", d: "Solo se comparte la mitad del honorario del comprador. Cada uno se queda con el de su cliente." },
    { x: L + 6.06, fill: SLATE, h: "OTROS PRODUCTOS", big: "Se acuerda", d: "Naves, locales, alquileres: no hay una costumbre fija. Se pregunta y se pacta en cada caso." },
  ];
  cols.forEach((c) => {
    bandHeader(s, c.x, 1.3, colW, c.h, c.fill);
    round(s, { x: c.x, y: 1.86, w: colW, h: 1.95, fill: { color: LIGHT } });
    s.addText(c.big, {
      x: c.x + 0.24, y: 1.98, w: colW - 0.48, h: 0.62, margin: 0, valign: "middle",
      fontFace: F, fontSize: 17, bold: true, color: BLUE, lineSpacing: 20,
    });
    s.addText(c.d, {
      x: c.x + 0.24, y: 2.66, w: colW - 0.48, h: 1.05, margin: 0, valign: "top",
      fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 14,
    });
  });
  keyBar(s, 4.1, "RECORDAR",
    "Es práctica habitual, no regla universal. Aun cuando exista una costumbre, el esquema se confirma con el colega antes de operar.");
  s.addNotes(
    "En terrenos lo habitual es compartir la mitad de todo. En departamentos residenciales, solo la mitad del honorario del comprador. Para el resto de los productos, incluido industrial, no se mostró una costumbre fija en el material fuente: la diapositiva dice 'se acuerda' y es el criterio prudente. Si el equipo industrial tiene un uso propio, agregarlo acá. Esta diapositiva no es una regla para aplicar sin preguntar: la costumbre orienta, el acuerdo manda."
  );
}

/* ====================================================== 5. EJEMPLO NUMÉRICO */
{
  const s = d.slide(
    "El mismo negocio, dos resultados",
    "Ejemplo hipotético: porcentajes ilustrativos, no son tarifa de Krak."
  );
  // Supuesto
  round(s, { x: L, y: 1.28, w: CW, h: 0.62, fill: { color: LIGHT } });
  s.addText(
    [
      { text: "Supuesto:  ", options: { bold: true, color: BLUE } },
      { text: "venta de USD 100.000. Honorario de ejemplo del 3% a cada parte: USD 3.000 del vendedor y USD 3.000 del comprador. El colega A tiene la propiedad y el colega B trae al comprador.", options: { color: INK } },
    ],
    { x: L + 0.24, y: 1.28, w: CW - 0.48, h: 0.62, margin: 0, valign: "middle", fontFace: F, fontSize: 10.5, lineSpacing: 13 }
  );
  const cols = [
    { x: L, fill: BLUE, h: "LA BOLSA · 50 Y 50", rows: [["Colega A", "USD 3.000"], ["Colega B", "USD 3.000"]], note: "Se suman USD 6.000 y se reparten por mitades." },
    { x: L + 4.52, fill: GRAYC, h: "MITAD DEL COMPRADOR", rows: [["Colega A", "USD 4.500"], ["Colega B", "USD 1.500"]], note: "A: USD 3.000 del vendedor + USD 1.500. B: USD 1.500." },
  ];
  cols.forEach((c) => {
    bandHeader(s, c.x, 2.08, 4.32, c.h, c.fill);
    c.rows.forEach((r, i) => {
      const y = 2.64 + i * 0.5;
      round(s, { x: c.x, y, w: 4.32, h: 0.44, fill: { color: LIGHT } });
      s.addText(r[0], { x: c.x + 0.24, y, w: 2, h: 0.44, margin: 0, valign: "middle", fontFace: F, fontSize: 11.5, bold: true, color: BLUE });
      s.addText(r[1], { x: c.x + 2.0, y, w: 2.08, h: 0.44, margin: 0, valign: "middle", align: "right", fontFace: F, fontSize: 13, bold: true, color: INK });
    });
    s.addText(c.note, { x: c.x, y: 3.68, w: 4.32, h: 0.4, margin: 0, valign: "top", fontFace: F, fontSize: 10, italic: true, color: MUTED, lineSpacing: 13 });
  });
  keyBar(s, 4.4, "LO QUE MUESTRA",
    "Para el colega B, la diferencia entre un esquema y otro es USD 1.500 sobre la misma operación. Por eso se pregunta antes de empezar.");
  s.addNotes(
    "Ejemplo hipotético, marcado así en la diapositiva. Los porcentajes del 3% son ilustrativos y no representan la tarifa de Krak. Bolsa: se suman USD 6.000 y cada colega se lleva 3.000. Mitad del comprador: el colega A, que tiene la propiedad, cobra USD 3.000 al vendedor y mitad del honorario del comprador (1.500), o sea 4.500; el colega B cobra 1.500. Confirmar que esta lectura de 'mitad del comprador' coincide con cómo se maneja en la práctica del equipo, es decir, quién retiene el honorario del vendedor. La moraleja: la diferencia entre esquemas puede ser de miles de dólares, y por eso nunca se asume."
  );
}

/* ====================================================== 6. PREGUNTAR PRIMERO */
{
  const s = d.slide(
    "Regla uno: preguntar primero",
    "Antes de pasar un dato, coordinar una visita o mostrar algo."
  );
  round(s, { x: L, y: 1.3, w: CW, h: 1.15, fill: { color: BLUE } });
  s.addText("No se debe pasar datos, coordinar una visita ni mostrar una propiedad sin haber acordado antes si se comparten honorarios y cuánto.", {
    x: L + 0.3, y: 1.3, w: CW - 0.6, h: 1.15, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W, lineSpacing: 21,
  });
  // dos preguntas
  const qs = [
    { n: "1", t: "¿Compartimos honorarios?" },
    { n: "2", t: "¿Cuánto y sobre qué base?" },
  ];
  qs.forEach((q, i) => {
    const x = L + i * 4.52;
    round(s, { x, y: 2.65, w: 4.32, h: 0.85, fill: { color: LIGHT } });
    round(s, { x: x + 0.24, y: 2.85, w: 0.45, h: 0.45, rectRadius: 0.5, fill: { color: BLUE } });
    s.addText(q.n, { x: x + 0.24, y: 2.85, w: 0.45, h: 0.45, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 13, bold: true, color: W });
    s.addText(q.t, { x: x + 0.86, y: 2.65, w: 3.3, h: 0.85, margin: 0, valign: "middle", fontFace: F, fontSize: 14, bold: true, color: BLUE });
  });
  // mensaje de ejemplo
  round(s, { x: L, y: 3.7, w: CW, h: 0.88, fill: { color: "E4E6E9" } });
  s.addText("MENSAJE TIPO", { x: L + 0.24, y: 3.76, w: 3, h: 0.22, margin: 0, valign: "middle", fontFace: F, fontSize: 9, bold: true, color: SLATE, charSpacing: 1.2 });
  s.addText("“Hola, tengo un cliente para tu propiedad. ¿Compartís honorarios? ¿Cómo lo manejás?”", {
    x: L + 0.24, y: 4.0, w: CW - 0.48, h: 0.5, margin: 0, valign: "middle", fontFace: F, fontSize: 12, italic: true, color: INK, lineSpacing: 15,
  });
  s.addNotes(
    "Es la regla más importante y la más barata de cumplir: una pregunta antes de empezar. Dos preguntas, siempre: si compartimos honorarios y cuánto (y sobre qué base: total o solo comprador). No importa si es un colega de confianza: se pregunta igual. El mensaje tipo es un ejemplo; cada uno lo adapta a su estilo. Silencio sugerido: dejar que el equipo piense cuántas veces mostró una propiedad sin haber preguntado esto."
  );
}

/* ================================================ 7. DOS FORMAS DE ASEGURARLO */
{
  const s = d.slide(
    "Dos formas de asegurar el cobro",
    "El objetivo es prever: que nunca haya que ejecutar un cobro."
  );
  const fm = [
    { fill: BLUE, tag: "FORMA A", title: "En la reserva", body: "La participación de cada colega queda escrita en el documento de la reserva, firmada por las partes." },
    { fill: GRAYC, tag: "FORMA B", title: "Convenio de honorarios", body: "Un acuerdo escrito y firmado solo entre los colegas, aparte de la reserva, con lo que cobra cada uno." },
  ];
  fm.forEach((c, i) => card(s, { x: L + i * 4.52, y: 1.3, w: 4.32, h: 2.35, fill: c.fill, tag: c.tag, title: c.title, titleH: 0.5, body: c.body, bodySize: 12, titleSize: 18 }));
  keyBar(s, 3.95, "PRINCIPIO",
    "Hay que dejarlo por escrito. El objetivo no es poder reclamar un cobro: es evitar que el malentendido exista.", SLATE);
  s.addNotes(
    "Dos caminos para asegurarse. A: poner la participación de cada uno en la reserva. B: firmar un convenio de honorarios con el colega. La diferencia entre ambos es quién ve el documento, y eso se explica en la próxima diapositiva. Lo que no cambia es el principio: por escrito. Y el objetivo real es la previsión: no llegar nunca a tener que ejecutar un cobro, sino evitar los malentendidos desde el principio."
  );
}

/* ========================================== 8. CUÁNDO CONVENIO Y NO RESERVA */
{
  const s = d.slide(
    "¿Reserva o convenio?",
    "Depende de quién tiene que ver el acuerdo."
  );
  const cols = [
    { x: L, fill: BLUE, h: "EN LA RESERVA", sub: "Visible para las partes de la operación", items: ["Sirve cuando no hay nada que proteger.", "Deja la participación de cada uno dentro del mismo documento.", "Es lo más simple de armar."] },
    { x: L + 4.52, fill: GRAYC, h: "EN UN CONVENIO", sub: "Privado entre los colegas", items: ["Protege la identidad de uno de los colegas cuando la operación lo requiere.", "No expone la relación entre las distintas marcas.", "Deja el reparto fuera de la reserva."] },
  ];
  cols.forEach((c) => {
    bandHeader(s, c.x, 1.3, 4.32, c.h, c.fill);
    round(s, { x: c.x, y: 1.86, w: 4.32, h: 2.15, fill: { color: LIGHT } });
    s.addText(c.sub, { x: c.x + 0.24, y: 1.96, w: 3.9, h: 0.3, margin: 0, valign: "middle", fontFace: F, fontSize: 11.5, bold: true, color: BLUE });
    s.addText(
      c.items.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < c.items.length - 1 } })),
      { x: c.x + 0.28, y: 2.34, w: 3.84, h: 1.55, margin: 0, valign: "top", fontFace: F, fontSize: 11, color: INK, paraSpaceAfter: 7 }
    );
  });
  keyBar(s, 4.3, "CRITERIO",
    "Si hay que proteger a alguien por el bien de la operación, se usa convenio. Si no, la reserva alcanza.");
  s.addNotes(
    "La razón de existir del convenio: a veces hay que proteger la identidad de uno de los colegas por el bien de la operación, y la reserva la ven las partes. En ese caso el reparto queda en un acuerdo privado entre colegas. Además, en ningún documento que ven terceros se habla de ninguna relación entre las distintas marcas del grupo. Para el equipo de la agencia: esto se aplica igual cuando el colega pertenece a otra de nuestras empresas."
  );
}

/* ================================================== 9. MAIL Y WHATSAPP */
{
  const s = d.slide(
    "Mail y WhatsApp también sirven",
    "Como respaldo: no reemplazan al documento, pero son prueba."
  );
  const steps = [
    { fill: BLUE, lbl: "LO MEJOR", t: "Reserva o convenio firmado", d: "El acuerdo queda en un documento con la firma de las partes." },
    { fill: GRAYC, lbl: "SIRVE COMO PRUEBA", t: "Mail o WhatsApp", d: "Escribir el acuerdo y pedir que el colega lo confirme por el mismo medio." },
    { fill: SLATE, lbl: "NO ALCANZA", t: "Acuerdo de palabra", d: "Un llamado o una charla en una visita no deja nada que mostrar si hay un malentendido." },
  ];
  steps.forEach((c, i) => card(s, { x: L + i * 3.03, y: 1.3, w: 2.78, h: 2.55, fill: c.fill, tag: c.lbl, title: c.t, body: c.d, bodySize: 11 }));
  keyBar(s, 4.15, "HÁBITO",
    "Si no hay documento a mano, se escribe el acuerdo por mail o WhatsApp y se pide la confirmación del colega.");
  s.addNotes(
    "El mail o el WhatsApp pueden usarse como prueba del acuerdo. Pero la jerarquía es clara: lo mejor es el documento firmado; un mensaje escrito y confirmado por el colega sirve como respaldo; el acuerdo de palabra no deja nada. Un hábito práctico: después de una llamada, escribir un mensaje resumiendo lo acordado y pedir un 'ok'."
  );
}

/* =================================================== 10. QUÉ DEBE QUEDAR ESCRITO */
{
  const s = d.slide(
    "Qué debe quedar escrito",
    "Ya sea en la reserva, en el convenio o en un mensaje."
  );
  d.defRows(s, 1.3, [
    ["Quiénes son las partes", "Los dos colegas y la empresa que representa cada uno."],
    ["Sobre qué operación", "La propiedad o el producto y, si ya existe, el cliente o la reserva."],
    ["Qué esquema se aplica", "La bolsa 50 y 50, la mitad del comprador o un porcentaje fijo."],
    ["Sobre qué base se calcula", "El total de los honorarios, solo el comprador o el valor de la operación."],
    ["Cuándo y cómo se paga", "Lo define cada pareja de colegas; lo importante es que no quede abierto."],
  ], { rowH: 0.62 });
  keyBar(s, 4.5, "REGLA",
    "Si algo del acuerdo se puede interpretar de dos maneras, se escribe de una sola.", SLATE);
  s.addNotes(
    "Checklist de contenido mínimo. Cinco elementos: quiénes, sobre qué operación, qué esquema, sobre qué base y cuándo y cómo se paga. El último no tiene una regla única del grupo: cada pareja de colegas lo define, pero tiene que quedar definido. Esta lista sirve igual para la reserva, el convenio o el mensaje de respaldo."
  );
}

/* ================================================== 11. CASOS HIPOTÉTICOS */
{
  const s = d.slide(
    "Tres casos para pensar",
    "Hipotéticos. En el taller los reemplazamos por los del equipo."
  );
  const casos = [
    { t: "El dato sin acuerdo", c: "Un colega pasa los datos de una propiedad y, después de la visita, el comprador quiere ofertar. Nadie habló de honorarios.", s: "Se debió preguntar primero." },
    { t: "El acuerdo de palabra", c: "Se acordó la mitad del comprador por teléfono. Al cierre, el colega dice que era la bolsa.", s: "Se debió dejar escrito." },
    { t: "Dos colegas, un comprador", c: "Dos colegas dicen haber traído al mismo comprador a la misma propiedad.", s: "Lo que quedó escrito antes de la visita define quién cobra." },
  ];
  casos.forEach((c, i) => {
    const x = L + i * 3.03;
    round(s, { x, y: 1.3, w: 2.78, h: 2.95, fill: { color: LIGHT } });
    round(s, { x, y: 1.3, w: 2.78, h: 0.5, fill: { color: i % 2 === 0 ? BLUE : GRAYC } });
    s.addText("CASO " + (i + 1), { x: x + 0.24, y: 1.3, w: 2.3, h: 0.5, margin: 0, valign: "middle", fontFace: F, fontSize: 11, bold: true, color: W, charSpacing: 1.2 });
    s.addText(c.t, { x: x + 0.24, y: 1.9, w: 2.3, h: 0.5, margin: 0, valign: "top", fontFace: F, fontSize: 13, bold: true, color: BLUE, lineSpacing: 16 });
    s.addText(c.c, { x: x + 0.24, y: 2.45, w: 2.3, h: 1.0, margin: 0, valign: "top", fontFace: F, fontSize: 10, color: INK, lineSpacing: 13 });
    s.addText(c.s, { x: x + 0.24, y: 3.5, w: 2.3, h: 0.65, margin: 0, valign: "top", fontFace: F, fontSize: 10.5, bold: true, color: RED, lineSpacing: 13 });
  });
  keyBar(s, 4.5, "PATRÓN",
    "En los tres casos el conflicto se evitaba con una pregunta y una línea escrita.");
  s.addNotes(
    "Casos hipotéticos armados para ilustrar. No son conflictos reales de la empresa. Leer cada caso, pedir al equipo que diga qué falló antes de mostrar la respuesta en rojo. Los tres tienen el mismo patrón: faltó preguntar o faltó escribir. Dejar abierta la puerta: los casos reales los traen los agentes en la próxima diapositiva."
  );
}

/* ========================================================== 12. TALLER */
{
  const s = d.slide(
    "Taller: sus casos",
    "Cada uno cuenta una operación con un colega, sin nombres."
  );
  d.defRows(s, 1.3, [
    ["¿Qué esquema se usó?", "Bolsa 50 y 50, mitad del comprador, porcentaje fijo o ninguno definido."],
    ["¿Qué quedó por escrito?", "Reserva, convenio, mensaje o nada."],
    ["¿Hubo un malentendido?", "Qué se entendió distinto y en qué momento apareció."],
    ["¿Qué lo habría evitado?", "Una pregunta antes, una línea escrita o un convenio."],
  ], { rowH: 0.7 });
  keyBar(s, 4.25, "SALIDA DEL TALLER",
    "Los casos reales que salgan se anotan sin nombres y se suman a la próxima versión de esta capacitación.", SLATE);
  s.addNotes(
    "Espacio para que los agentes cuenten sus propias experiencias. No hay casos de conflicto documentados por la empresa: el valor está en lo que el equipo ya vivió. Pedir que se cuenten sin nombres de colegas ni de clientes. Anotar los casos y las preguntas para reemplazar los hipotéticos de la diapositiva anterior en la próxima versión. Tiempo sugerido: 10 a 15 minutos."
  );
}

/* ======================================================= 13. CHECKLIST */
{
  const s = d.slide(
    "Antes de co-operar: cinco puntos",
    "Un repaso para tener a mano cada vez que hay un colega en la operación."
  );
  const pts = [
    ["1", "Preguntar", "Si se comparten honorarios y cuánto."],
    ["2", "Confirmar la base", "Sobre el total de los honorarios o solo sobre el comprador."],
    ["3", "Escribirlo", "En la reserva o en un convenio de honorarios."],
    ["4", "Evaluar la identidad", "Si hay que proteger a alguien, convenio privado."],
    ["5", "Guardar el respaldo", "Mails y mensajes que confirman lo acordado."],
  ];
  pts.forEach((p, i) => {
    const y = 1.3 + i * 0.64;
    round(s, { x: L, y, w: CW, h: 0.56, fill: { color: i % 2 === 0 ? LIGHT : "FFFFFF" } });
    round(s, { x: L + 0.2, y: y + 0.08, w: 0.4, h: 0.4, rectRadius: 0.5, fill: { color: BLUE } });
    s.addText(p[0], { x: L + 0.2, y: y + 0.08, w: 0.4, h: 0.4, align: "center", valign: "middle", margin: 0, fontFace: F, fontSize: 12, bold: true, color: W });
    s.addText(p[1], { x: L + 0.82, y, w: 2.6, h: 0.56, margin: 0, valign: "middle", fontFace: F, fontSize: 12.5, bold: true, color: BLUE });
    s.addText(p[2], { x: L + 3.5, y, w: 5.2, h: 0.56, margin: 0, valign: "middle", fontFace: F, fontSize: 11, color: INK });
  });
  keyBar(s, 4.6, "SI SOLO SE RECUERDA UNA COSA",
    "Preguntar primero y dejarlo por escrito.");
  s.addNotes(
    "Resumen operativo. Cinco puntos. Si el equipo se acuerda de uno solo, que sea el primero: preguntar. Esta diapositiva se puede imprimir o dejar fijada en el escritorio. Cerrar con el mensaje final."
  );
}

/* ========================================================== 14. CIERRE */
d.closing(
  "Preguntá primero.",
  "Dejalo por escrito.",
  "Co-broking · Capacitaciones Krak Real Estate · " + CORTE + " · Ejemplos numéricos hipotéticos"
).addNotes(
  "Cierre. Mensaje: preguntar primero y dejar por escrito. Recordar que los esquemas de reparto son usos del mercado, que los números del ejemplo son hipotéticos y que el criterio de Krak está vigente a la fecha indicada. Antes de volver a dictar la capacitación: confirmar el alcance de la tercera forma de reparto, la regla para otros productos como naves y locales, y sumar los casos reales del taller."
);

d.save(process.argv[2] || "Capacitacion-Co-broking.pptx");

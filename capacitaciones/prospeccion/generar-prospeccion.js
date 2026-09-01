/*
 * Capacitación "Prospección" — Krak Real Estate.
 * Mismo contenido que la versión original en Canva, rearmado con el sistema
 * visual nuevo (el de Home y Warehouse Staging).
 */
const K = require("./krak");
const { BLUE, BLUE2, SLATE, GRAYC, INK, MUTED, LIGHT, ONBLUE, ONGRAY, W, F, L, CW } = K;

const d = K.deck("Prospección");
const { pres, IMG, round, slide, keyBar, bandHeader, defRows, cover, closing } = d;

/* ============================================================ 1. CARÁTULA */
cover("Prospección", "El primer eslabón del proceso de captación.").addNotes(
  "Apertura. La prospección es el trabajo que alimenta todo lo demás: sin prospectos no hay tasaciones y sin tasaciones no hay captaciones."
);

/* =============================================== 2. PROCESO DE CAPTACIÓN */
{
  const s = slide("Proceso de captación", "Un embudo de tres pasos.");
  const pasos = [
    { t: "Prospección", x: L, w: 3.3, h: 2.1, y: 1.65, fill: BLUE, fs: 20 },
    { t: "Tasación", x: 4.2, w: 2.7, h: 1.7, y: 1.85, fill: GRAYC, fs: 18 },
    { t: "Captación\ny producción", x: 7.15, w: 2.35, h: 1.4, y: 2.0, fill: BLUE, fs: 14 },
  ];
  pasos.forEach((p) => {
    s.addShape(pres.ShapeType.rightArrow, {
      x: p.x, y: p.y, w: p.w, h: p.h,
      fill: { color: p.fill }, line: { color: p.fill, width: 0 },
    });
    s.addText(p.t, {
      x: p.x, y: p.y, w: p.w * 0.78, h: p.h, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: p.fs, bold: true, color: W, lineSpacing: p.fs + 4,
    });
  });
  keyBar(s, 4.42, "POR QUÉ IMPORTA EL ORDEN",
    "La prospección es el único eslabón que depende enteramente del agente. La tasación depende del mercado y la captación del cliente: prospectar depende solo de si se hizo o no.");
  s.addNotes(
    "El embudo ordena todo el trabajo comercial. Cada paso alimenta al siguiente y ninguno se puede saltear: una agenda sin prospección se queda sin tasaciones en dos meses, y sin tasaciones no hay nada para captar ni producir."
  );
}

/* ============================================== 3. PROSPECCIÓN: DOS TIPOS */
{
  const s = slide("Prospección: dos tipos", "Según el horizonte en que devuelve resultados.");

  bandHeader(s, L, 1.28, 5.55, "CORTO PLAZO", BLUE);
  const corto = [
    "Farming geográfico masivo", "Farming demográfico",
    "Farming geográfico personalizado", "Dueño vende",
    "Publicidad digital orgánica", "Participación en grupos de colegas",
  ];
  corto.forEach((t, i) => {
    const x = L + (i % 2) * 2.83;
    const y = 1.9 + Math.floor(i / 2) * 0.62;
    round(s, { x, y, w: 2.72, h: 0.54, fill: { color: LIGHT } });
    s.addText(t, {
      x: x + 0.16, y, w: 2.4, h: 0.54, margin: 0, valign: "middle",
      fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 12,
    });
  });
  round(s, { x: L, y: 3.76, w: 5.55, h: 0.54, fill: { color: LIGHT } });
  s.addText("Alianzas", {
    x: L + 0.16, y: 3.76, w: 1.2, h: 0.54, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10.5, bold: true, color: INK,
  });
  s.addText("Estratégicas  ·  Profesionales", {
    x: L + 1.4, y: 3.76, w: 4.0, h: 0.54, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10.5, color: MUTED,
  });

  bandHeader(s, 6.62, 1.28, 2.88, "LARGO PLAZO", GRAYC);
  ["Prensa", "Eventos", "Merch", "Contenido de valor en redes", "Publicidad tradicional"]
    .forEach((t, i) => {
      const y = 1.9 + i * 0.56;
      round(s, { x: 6.62, y, w: 2.88, h: 0.5, fill: { color: LIGHT } });
      s.addText(t, {
        x: 6.78, y, w: 2.56, h: 0.5, margin: 0, valign: "middle",
        fontFace: F, fontSize: 10.5, color: INK, lineSpacing: 12,
      });
    });

  keyBar(s, 4.74, "LA CLAVE", "Sistematizar el proceso.");
  s.addNotes(
    "El corto plazo paga este trimestre; el largo plazo paga el año que viene. Si se hace solo uno de los dos el embudo se corta: sin corto plazo no se llega a fin de mes, sin largo plazo no hay negocio en dos años. Y lo que sostiene a los dos es sistematizarlos, no la inspiración del día."
  );
}

/* ============================================ 4. ESTRATEGIAS (CORTO PLAZO) */
{
  const s = slide("Prospección: estrategias", "Qué es cada táctica de corto plazo, en una línea.");
  defRows(s, 1.28, [
    ["Farming geográfico masivo", "Repartir tarjetas, un brochure o una carta a los vecinos de la zona."],
    ["Farming geográfico personalizado", "Timbrear y presentarse personalmente."],
    ["Publicidad digital orgánica", "Comunicar por redes sociales, sin pauta."],
    ["Participación en grupos de colegas", "Foros, grupos de WhatsApp, LinkedIn."],
    ["Farming demográfico", "Por segmentación: amigos del colegio, del gimnasio, del club."],
    ["Dueño vende", "Aportar valor para que quien no va a ser tu cliente te recomiende. “Esta gente sabe”."],
    ["Alianzas", "Estratégicas: encargados, colegas, desarrolladores. Profesionales: abogados, contadores, escribanos."],
  ], { rowH: 0.6 });
  s.addNotes(
    "No hace falta leerlas todas en voz alta. Conviene detenerse en las dos que más rinden y menos se usan: dueño vende, porque convierte un “no” en una recomendación, y las alianzas profesionales, porque un escribano o un abogado de sucesiones ve la operación antes que nadie."
  );
}

/* ============================================== 5. ESTRATEGIAS DE CAMPO */
{
  const s = slide("Prospección: estrategias de campo", "El trabajo de relación que sostiene todo lo anterior.");
  const items = [
    { t: "Círculo de influencia", d: "Familiares y amigos cercanos son los primeros a quienes pedir referencias." },
    { t: "Conocer más gente", d: "Tomarse en serio la siembra de relaciones." },
    { t: "Marketing de contenido", d: "Puede ser personalizado: el valor crea una marca personal y, en consecuencia, un recuerdo." },
    { t: "Marketing digital", d: "Agregar valor en redes sociales." },
    { t: "Organizar eventos", d: "Invitar a comer, invitar a jugar un deporte." },
  ];
  items.forEach((it, i) => {
    const x = L + (i % 3) * 3.03;
    const y = 1.3 + Math.floor(i / 3) * 1.72;
    const fill = i % 2 === 0 ? BLUE : GRAYC;
    round(s, { x, y, w: 2.78, h: 1.6, fill: { color: fill } });
    s.addText(it.t, {
      x: x + 0.24, y: y + 0.18, w: 2.3, h: 0.44, margin: 0, valign: "top",
      fontFace: F, fontSize: 14, bold: true, color: W, lineSpacing: 17,
    });
    s.addText(it.d, {
      x: x + 0.24, y: y + 0.64, w: 2.32, h: 0.8, margin: 0,
      fontFace: F, fontSize: 10, color: i % 2 === 0 ? ONBLUE : ONGRAY, lineSpacing: 12,
    });
  });
  keyBar(s, 4.78, "LA DIFERENCIA",
    "La siembra no se mide en captaciones este mes: se mide en conversaciones nuevas por semana.");
  s.addNotes(
    "Estas cinco no dan resultado inmediato y por eso son las primeras que se abandonan cuando aparece una urgencia. Son, sin embargo, las que hacen que dentro de dos años haya negocio sin salir a buscarlo."
  );
}

/* ========================================== 6. ANTES DE PROSPECTAR (I) */
{
  const s = slide("Antes de prospectar", "Dos conceptos, y el primero es una pregunta.");
  s.addText("¿Cuál es el producto que vendemos?", {
    x: L, y: 1.3, w: CW, h: 0.5, margin: 0, align: "center", valign: "middle",
    fontFace: F, fontSize: 24, bold: true, color: BLUE,
  });
  // 888x473 -> 1.877 · 753x502 -> 1.500
  s.addImage({ path: IMG("a_living.png"), x: 1.35, y: 2.05, w: 3.9, h: 2.077 });
  s.addImage({ path: IMG("a_llaves.png"), x: 5.70, y: 2.05, w: 3.12, h: 2.08 });
  s.addText("¿La propiedad?", {
    x: 1.35, y: 4.2, w: 3.9, h: 0.3, margin: 0, align: "center", valign: "middle",
    fontFace: F, fontSize: 12.5, bold: true, color: MUTED,
  });
  s.addText("¿El servicio?", {
    x: 5.70, y: 4.2, w: 3.12, h: 0.3, margin: 0, align: "center", valign: "middle",
    fontFace: F, fontSize: 12.5, bold: true, color: MUTED,
  });
  s.addNotes(
    "Dejar la pregunta en el aire unos segundos y escuchar dos o tres respuestas de la sala antes de pasar a la siguiente. La respuesta pierde toda su fuerza si se muestra junto con la pregunta."
  );
}

/* ========================================= 7. ANTES DE PROSPECTAR (II) */
{
  const s = slide("Antes de prospectar", "La respuesta.");
  // 984x555 -> 1.773
  s.addImage({ path: IMG("a_apreton.png"), x: L, y: 1.3, w: 4.52, h: 2.549 });
  round(s, { x: 5.36, y: 1.3, w: 4.14, h: 2.55, fill: { color: BLUE } });
  s.addText("Nos vendemos a nosotros prestando el servicio que el cliente necesita.", {
    x: 5.62, y: 1.52, w: 3.66, h: 1.1, margin: 0, valign: "top",
    fontFace: F, fontSize: 17, bold: true, color: W, lineSpacing: 22,
  });
  s.addText("No es solamente el servicio: es la experiencia de usuario que le damos al cliente.", {
    x: 5.62, y: 2.78, w: 3.66, h: 0.9, margin: 0,
    fontFace: F, fontSize: 12, color: ONBLUE, lineSpacing: 16,
  });
  keyBar(s, 4.06, "LO QUE SE LLEVA EL CLIENTE",
    "La propiedad la puede ver en cualquier portal. Lo que no puede comparar es cómo lo trataron, cuánto tardaron en responderle y qué tan acompañado se sintió en la operación.");
  s.addNotes(
    "Este es el concepto que ordena toda la prospección: si el producto somos nosotros, entonces cada contacto —incluso el que no compra— es una muestra gratis del producto. De ahí se desprende directamente la diapositiva siguiente."
  );
}

/* ====================================================== 8. LA IMAGEN */
{
  const s = slide("La imagen lo es todo", "Pensar en la experiencia del usuario con el producto.");
  const bloques = [
    ["Vestimenta", "Traje o conjunto de saco y pantalón; con buen clima, camisa de calidad. Traje sastre, vestido formal o blusa con falda o pantalón. Zapatos limpios y en buen estado."],
    ["Higiene personal", "Cabello limpio y arreglado, uñas cuidadas, perfume o colonia en uso moderado."],
    ["Accesorios", "Relojes, joyas y bolsos discretos y de buena calidad. Conviene llevar un portafolio o una carpeta elegante para los documentos."],
    ["Estilo y actitud", "Apariencia ordenada y pulcra, sin estilos llamativos ni informales. Más allá del aspecto: seguridad, amabilidad y postura profesional."],
  ];
  bloques.forEach((b, i) => {
    const y = 1.28 + i * 0.86;
    round(s, { x: L, y, w: 6.05, h: 0.78, fill: { color: i % 2 === 0 ? LIGHT : W } });
    s.addText(b[0], {
      x: L + 0.24, y: y + 0.06, w: 5.6, h: 0.24, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: BLUE,
    });
    s.addText(b[1], {
      x: L + 0.24, y: y + 0.3, w: 5.6, h: 0.44, margin: 0,
      fontFace: F, fontSize: 9.5, color: INK, lineSpacing: 11,
    });
  });
  // 647x720 -> 0.899
  s.addImage({ path: IMG("a_perfil.png"), x: 7.05, y: 1.28, w: 2.2, h: 2.448 });
  round(s, { x: 6.9, y: 3.88, w: 2.6, h: 0.86, fill: { color: BLUE } });
  s.addText("Los perfiles en redes sociales también son nuestra imagen.", {
    x: 7.08, y: 3.88, w: 2.28, h: 0.86, margin: 0, valign: "middle",
    fontFace: F, fontSize: 10.5, bold: true, color: W, lineSpacing: 13,
  });
  s.addNotes(
    "Vale condensar y no leer la lista: el criterio es sobrio, cuidado y coherente con el cliente que se va a ver. La actitud pesa más que la ropa. Y el punto del recuadro azul es el que más incomoda: el cliente busca el nombre del agente en Instagram antes de la primera reunión."
  );
}

/* ============================================ 9. SISTEMATIZAR EL PROCESO */
{
  const s = slide("Sistematizar el proceso", "¿Cómo calificar a los contactos?");
  round(s, { x: L, y: 1.24, w: CW, h: 0.58, fill: { color: BLUE } });
  s.addText("No se puede mejorar ni escalar lo que no se puede medir.", {
    x: L + 0.26, y: 1.24, w: CW - 0.5, h: 0.58, margin: 0, valign: "middle",
    fontFace: F, fontSize: 15, bold: true, color: W,
  });
  // 4281x1080 -> 3.964
  s.addImage({ path: IMG("a_clasificador.png"), x: L, y: 1.98, w: CW, h: 2.23 });
  const notas = [
    ["Tipo", "Amigo es el valor base: todos arrancan ahí. Después, familiar, profesional y colega."],
    ["Relación de conocimiento", "Aprendiz o mentor. Comprende la relación de valor entre las partes."],
    ["¿Qué tan cercano?", "Define el tono de la comunicación y dónde hay que trabajar."],
    ["Probable acción", "Te recomienda siempre · solo si se lo pedís · aún no te recomendaría."],
  ];
  notas.forEach((n, i) => {
    const x = L + i * 2.26;
    round(s, { x, y: 4.3, w: 2.06, h: 1.12, fill: { color: LIGHT } });
    s.addText(n[0], {
      x: x + 0.18, y: 4.38, w: 1.75, h: 0.22, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9.5, bold: true, color: BLUE,
    });
    s.addText(n[1], {
      x: x + 0.18, y: 4.62, w: 1.78, h: 0.74, margin: 0,
      fontFace: F, fontSize: 8, color: INK, lineSpacing: 10,
    });
  });
  s.addNotes(
    "La planilla es el activo de esta capacitación: se comparte para hacer copia y se completa. Las dos columnas que más se usan son “¿qué tan cercano?”, que dice dónde invertir tiempo, y “último contacto”, que avisa a quién hay que retomar. Un clasificador con diez filas se sigue usando; uno vacío no se abre nunca más."
  );
}

/* ================================================== 10. CONCLUSIÓN FINAL */
{
  const s = slide("Conclusión final", "La importancia de la prospección.");
  round(s, { x: L, y: 1.4, w: CW, h: 1.5, fill: { color: BLUE } });
  s.addText("Si sistematizamos el proceso de venta y la propiedad está bien tasada, sin dudas se va a vender.", {
    x: L + 0.4, y: 1.4, w: CW - 0.8, h: 1.5, margin: 0, valign: "middle", align: "center",
    fontFace: F, fontSize: 19, bold: true, color: W, lineSpacing: 26,
  });
  round(s, { x: L, y: 3.08, w: CW, h: 1.6, fill: { color: GRAYC } });
  s.addText("El desafío es seguir alimentando ese proceso con prospecciones. Es lo que marca la diferencia entre los agentes buenos y los muy buenos.", {
    x: L + 0.4, y: 3.08, w: CW - 0.8, h: 1.6, margin: 0, valign: "middle", align: "center",
    fontFace: F, fontSize: 19, bold: true, color: W, lineSpacing: 26,
  });
  s.addNotes(
    "Cierre del contenido. El proceso posterior a la prospección ya está sistematizado en la agencia; el cuello de botella está siempre en la entrada del embudo. Por eso el desafío no es aprender a vender: es no dejar nunca de alimentar el proceso."
  );
}

/* =========================================================== 11. CIERRE */
closing(
  "Muchas gracias.",
  "Sin prospectos no hay oportunidades, y sin oportunidades no hay cierres.",
  "Capacitaciones Krak Real Estate"
).addNotes(
  "Recordar que el Clasificador de Relaciones queda disponible para hacer copia y que el compromiso mínimo es cargarlo con los primeros contactos esta misma semana."
);

d.save(process.argv[2] || "Prospeccion.pptx");

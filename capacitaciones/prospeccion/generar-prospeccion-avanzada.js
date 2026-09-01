/*
 * Capacitación "Técnicas Avanzadas de Prospección Inmobiliaria" — Krak Real Estate.
 * Mismo contenido que la versión original en Canva, rearmado con el sistema
 * visual nuevo (el de Home y Warehouse Staging).
 */
const K = require("./krak");
const { BLUE, BLUE2, SLATE, GRAYC, GREEN, RED, INK, MUTED, LIGHT, ONBLUE, ONGRAY, W, F, L, CW } = K;

const d = K.deck("Técnicas Avanzadas de Prospección Inmobiliaria");
const { pres, IMG, round, slide, keyBar, cover, closing } = d;

/* ============================================================ 1. CARÁTULA */
cover("Técnicas Avanzadas de Prospección Inmobiliaria",
  "Cómo encontrar, calificar y sostener prospectos de forma sistemática.").addNotes(
  "Apertura. Esta capacitación asume que el equipo ya conoce las tácticas de prospección: acá se trabaja el porqué, los canales y, sobre todo, cómo calificar a un prospecto antes de invertirle tiempo."
);

/* ================================================ 2. QUÉ ES LA PROSPECCIÓN */
{
  const s = slide("¿Qué es la prospección?", "El primer eslabón de toda la cadena comercial.");
  round(s, { x: L, y: 1.32, w: 4.32, h: 2.5, fill: { color: BLUE } });
  s.addText("Definición", {
    x: L + 0.28, y: 1.52, w: 3.7, h: 0.32, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W,
  });
  s.addText("Es el proceso sistemático de identificar personas que pueden convertirse en potenciales clientes. En el ámbito inmobiliario, detectar propietarios interesados en vender, alquilar o invertir.", {
    x: L + 0.28, y: 1.94, w: 3.78, h: 1.7, margin: 0,
    fontFace: F, fontSize: 12, color: ONBLUE, lineSpacing: 17,
  });

  round(s, { x: L + 4.52, y: 1.32, w: 4.32, h: 2.5, fill: { color: GRAYC } });
  s.addText("Por qué es estratégica", {
    x: L + 4.8, y: 1.52, w: 3.7, h: 0.32, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W,
  });
  s.addText("La prospección es el primer eslabón.\n\nSin prospectos no hay oportunidades, y sin oportunidades no hay cierres.", {
    x: L + 4.8, y: 1.94, w: 3.78, h: 1.7, margin: 0,
    fontFace: F, fontSize: 12, color: ONGRAY, lineSpacing: 17,
  });

  keyBar(s, 4.06, "LA ACTITUD DE FONDO",
    "Nunca se sabe dónde salta la coneja: hay que estar siempre atento a la oportunidad.");
  s.addNotes(
    "Lo importante de la definición son dos palabras: sistemático e identificar. Sistemático porque no se trata de tener suerte, y identificar porque prospectar no es vender: es detectar quién puede llegar a necesitar el servicio. La oportunidad aparece en cualquier lado y en cualquier momento, y por eso conviene estar siempre atento."
  );
}

/* ========================================== 3. QUÉ NEGOCIO SON LOS BIENES RAÍCES */
{
  const s = slide("¿Qué tipo de negocio son los bienes raíces?", "Una respuesta corta y una consecuencia larga.");
  round(s, { x: L, y: 1.3, w: 5.5, h: 0.72, fill: { color: BLUE } });
  s.addText("El negocio es hacer amigos.", {
    x: L + 0.28, y: 1.3, w: 5.0, h: 0.72, margin: 0, valign: "middle",
    fontFace: F, fontSize: 20, bold: true, color: W,
  });
  s.addText("Ahora bien, ¿todos los amigos son iguales? ¿Con todos vamos a comer una vez por semana? ¿Vamos a jugar a la pelota con todos?", {
    x: L + 0.04, y: 2.16, w: 5.4, h: 0.7, margin: 0,
    fontFace: F, fontSize: 12.5, color: INK, lineSpacing: 17,
  });
  round(s, { x: L, y: 2.98, w: 5.5, h: 0.72, fill: { color: LIGHT } });
  s.addText("Hay que redefinir el concepto de “amigo” cuando estamos trabajando.", {
    x: L + 0.26, y: 2.98, w: 5.0, h: 0.72, margin: 0, valign: "middle",
    fontFace: F, fontSize: 13, bold: true, color: BLUE, lineSpacing: 16,
  });
  round(s, { x: L, y: 3.84, w: 5.5, h: 0.6, fill: { color: GRAYC } });
  s.addText("Y, sobre todo, hay que sistematizarlo.", {
    x: L + 0.26, y: 3.84, w: 5.0, h: 0.6, margin: 0, valign: "middle",
    fontFace: F, fontSize: 13, bold: true, color: W,
  });
  // 612x408 -> 1.5
  s.addImage({ path: IMG("b_asado.png"), x: 6.48, y: 1.3, w: 3.02, h: 2.013 });
  round(s, { x: 6.48, y: 3.46, w: 3.02, h: 0.98, fill: { color: LIGHT } });
  s.addText("El resto de nuestro proceso ya está sistematizado. ¿Por qué prospectar no?", {
    x: 6.7, y: 3.46, w: 2.62, h: 0.98, margin: 0, valign: "middle",
    fontFace: F, fontSize: 11.5, italic: true, color: INK, lineSpacing: 14,
  });
  s.addNotes(
    "Redefinir “amigo” no significa fingir cercanía: significa aceptar que hay distintos niveles de relación y que a cada uno le corresponde un trato y una frecuencia distintos. El punto que más cuesta es el último: la tasación, la captación y la producción ya tienen un proceso escrito en la agencia. La prospección suele ser lo único que queda librado a la inspiración del día."
  );
}

/* ============================================================ 4. POR QUÉ MEDIR */
{
  const s = slide("¿Por qué medir?", "La respuesta cambia por completo el sentido del registro.");
  round(s, { x: L, y: 1.35, w: 4.32, h: 2.72, fill: { color: GRAYC } });
  s.addText("¿Para CONTROLAR?", {
    x: L + 0.3, y: 1.6, w: 3.7, h: 0.4, margin: 0, valign: "middle",
    fontFace: F, fontSize: 18, bold: true, color: W,
  });
  round(s, { x: L + 0.3, y: 2.1, w: 0.8, h: 0.44, fill: { color: RED } });
  s.addText("NO", {
    x: L + 0.3, y: 2.1, w: 0.8, h: 0.44, align: "center", valign: "middle", margin: 0,
    fontFace: F, fontSize: 14, bold: true, color: W,
  });
  s.addText("Los agentes son comisionistas: no sirve controlarlos, solo sirve potenciarlos.", {
    x: L + 0.3, y: 2.72, w: 3.74, h: 1.3, margin: 0,
    fontFace: F, fontSize: 13, color: ONGRAY, lineSpacing: 18,
  });

  round(s, { x: L + 4.52, y: 1.35, w: 4.32, h: 2.72, fill: { color: BLUE } });
  s.addText("¿Para CONCIENTIZAR?", {
    x: L + 4.82, y: 1.6, w: 3.7, h: 0.4, margin: 0, valign: "middle",
    fontFace: F, fontSize: 18, bold: true, color: W,
  });
  round(s, { x: L + 4.82, y: 2.1, w: 0.8, h: 0.44, fill: { color: GREEN } });
  s.addText("SÍ", {
    x: L + 4.82, y: 2.1, w: 0.8, h: 0.44, align: "center", valign: "middle", margin: 0,
    fontFace: F, fontSize: 14, bold: true, color: W,
  });
  s.addText("La conciencia es la perspectiva de nuestra realidad. A través de ella podemos orientar nuestras acciones y pensamientos para crear realidad.", {
    x: L + 4.82, y: 2.72, w: 3.74, h: 1.3, margin: 0,
    fontFace: F, fontSize: 13, color: ONBLUE, lineSpacing: 18,
  });
  s.addNotes(
    "Vale decirlo sin vueltas frente al equipo: los números no son para que la empresa controle a nadie. Un agente que no sabe cuántas conversaciones tuvo el mes pasado no puede saber por qué facturó lo que facturó, y por lo tanto tampoco puede mejorarlo. Medir es la única forma de ver la propia realidad con perspectiva."
  );
}

/* ============================================ 5. EL DESEO Y LA ACCIÓN */
{
  const s = slide("El deseo es equivalente a la acción", "El mundo está lleno de buenas intenciones.");
  ["“Este año me recibo”", "“Quiero estar en forma”", "“Voy a ser el mejor en X cosa”"]
    .forEach((t, i) => {
      const x = L + i * 3.03;
      round(s, { x, y: 1.34, w: 2.78, h: 0.9, fill: { color: LIGHT } });
      s.addText(t, {
        x: x + 0.2, y: 1.34, w: 2.4, h: 0.9, margin: 0, align: "center", valign: "middle",
        fontFace: F, fontSize: 13, italic: true, color: INK, lineSpacing: 16,
      });
    });
  round(s, { x: L, y: 2.5, w: CW, h: 1.5, fill: { color: BLUE } });
  s.addText("¿Estás entrenando lo suficiente? ¿Estás estudiando? ¿Estás comiendo como se debe? ¿Estás yendo todos los días al gimnasio?", {
    x: L + 0.5, y: 2.5, w: CW - 1.0, h: 1.5, margin: 0, align: "center", valign: "middle",
    fontFace: F, fontSize: 17, bold: true, color: W, lineSpacing: 24,
  });
  keyBar(s, 4.22, "LA REGLA",
    "El deseo se mide en acciones, no en intenciones. Lo mismo vale para la prospección: no importa cuánto quieras facturar, importa a cuánta gente contactaste esta semana.", GRAYC);
  s.addNotes(
    "Es el momento incómodo de la capacitación y conviene sostenerlo unos segundos. Todos declaramos objetivos que no acompañamos con conducta. En prospección pasa exactamente lo mismo: el objetivo de facturación se declara en enero y la agenda de la semana no lo refleja."
  );
}

/* ======================================================= 6. CANALES */
{
  const s = slide("Canales de prospección", "No comprás lo que no ves en la estantería.");
  const cols = [
    { x: L, fill: BLUE, t: "CANALES DIGITALES", on: ONBLUE,
      items: ["Publicaciones en Zonaprop y MercadoLibre", "Redes sociales: Facebook, Instagram, LinkedIn", "WhatsApp Business y grupos especializados"] },
    { x: L + 4.52, fill: GRAYC, t: "CANALES TRADICIONALES", on: ONGRAY,
      items: ["Carteles", "Recomendaciones", "Recorridas por zonas activas", "Visitas a vecinos o consorcios"] },
  ];
  cols.forEach((c) => {
    round(s, { x: c.x, y: 1.32, w: 4.32, h: 3.1, fill: { color: c.fill } });
    s.addText(c.t, {
      x: c.x + 0.3, y: 1.54, w: 3.7, h: 0.3, margin: 0, valign: "middle",
      fontFace: F, fontSize: 12, bold: true, color: W, charSpacing: 1,
    });
    c.items.forEach((t, i) => {
      const y = 2.0 + i * 0.58;
      round(s, { x: c.x + 0.3, y: y + 0.17, w: 0.16, h: 0.16, rectRadius: 0.5, fill: { color: W } });
      s.addText(t, {
        x: c.x + 0.6, y, w: 3.5, h: 0.5, margin: 0, valign: "middle",
        fontFace: F, fontSize: 12, color: c.on, lineSpacing: 15,
      });
    });
  });
  keyBar(s, 4.64, "EL CRITERIO",
    "Si no estás en la estantería, no te eligen. Estar presente en un canal es la condición mínima para que alguien pueda pensar en vos.");
  s.addNotes(
    "El punto de la frase de la estantería es que la prospección no es solo salir a buscar: también es estar disponible para que te encuentren. Los dos grupos de canales no compiten entre sí, se complementan; lo que no funciona es estar a medias en ocho canales."
  );
}

/* ==================================================== 7. MÁS CANALES */
{
  const s = slide("Más canales", "Dos que rinden mucho y se usan poco.");
  round(s, { x: L, y: 1.32, w: CW, h: 1.5, fill: { color: BLUE } });
  s.addText("Networking estratégico", {
    x: L + 0.3, y: 1.5, w: 4.0, h: 0.32, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W,
  });
  s.addText("Pedir referidos de manera profesional.", {
    x: L + 0.3, y: 1.86, w: 3.6, h: 0.3, margin: 0,
    fontFace: F, fontSize: 11.5, color: ONBLUE,
  });
  round(s, { x: L + 4.0, y: 1.56, w: 4.6, h: 1.02, fill: { color: BLUE2 } });
  s.addText("“Si conocés a alguien que está pensando en vender, ¿me conectarías con él?”", {
    x: L + 4.24, y: 1.56, w: 4.12, h: 1.02, margin: 0, valign: "middle",
    fontFace: F, fontSize: 12.5, italic: true, color: W, lineSpacing: 16,
  });

  round(s, { x: L, y: 3.0, w: CW, h: 1.5, fill: { color: GRAYC } });
  s.addText("Base de datos (barrido)", {
    x: L + 0.3, y: 3.18, w: 4.0, h: 0.32, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W,
  });
  s.addText("Contactos que alguna vez hablaron con la empresa y no avanzaron.", {
    x: L + 0.3, y: 3.54, w: 3.6, h: 0.5, margin: 0,
    fontFace: F, fontSize: 11.5, color: ONGRAY, lineSpacing: 14,
  });
  round(s, { x: L + 4.0, y: 3.24, w: 4.6, h: 1.02, fill: { color: SLATE } });
  s.addText("Retomarlos con inteligencia puede generar oportunidades. Es el canal más barato que existe: ya están en la planilla.", {
    x: L + 4.24, y: 3.24, w: 4.12, h: 1.02, margin: 0, valign: "middle",
    fontFace: F, fontSize: 12, color: W, lineSpacing: 15,
  });
  s.addNotes(
    "El networking estratégico falla cuando se pide de forma vaga: “si sabés de alguien, avisame” no genera nada. La pregunta concreta obliga a la otra persona a repasar mentalmente su círculo. El barrido de base es el canal de mayor retorno por hora invertida y casi nadie lo hace, porque no tiene la adrenalina de salir a la calle."
  );
}

/* ================================================== 8. NO ES OBSECUENCIA */
{
  const s = slide("El límite: no es obsecuencia", "Dónde termina la relación profesional y empieza otra cosa.");
  round(s, { x: L, y: 1.32, w: 5.0, h: 1.7, fill: { color: BLUE } });
  s.addText("Esto no tiene nada que ver con la obsecuencia, y no debemos caer en ella.", {
    x: L + 0.3, y: 1.32, w: 4.42, h: 1.7, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: W, lineSpacing: 22,
  });
  round(s, { x: L, y: 3.2, w: 5.0, h: 1.24, fill: { color: LIGHT } });
  s.addText("Tenemos que ser profesionales de las relaciones públicas.", {
    x: L + 0.3, y: 3.2, w: 4.42, h: 1.24, margin: 0, valign: "middle",
    fontFace: F, fontSize: 16, bold: true, color: BLUE, lineSpacing: 21,
  });
  // 980x528 -> 1.856
  s.addImage({ path: IMG("b_reunion.png"), x: 5.92, y: 1.72, w: 3.58, h: 1.929 });
  s.addNotes(
    "Es la contracara de “el negocio es hacer amigos”. La obsecuencia se nota y quema la relación: el cliente percibe rápido cuándo alguien le dice que sí a todo para caerle bien. Ser profesional de las relaciones públicas significa aportar valor real y también decir lo que el cliente no quiere escuchar cuando corresponde, por ejemplo sobre el precio."
  );
}

/* =================================================== 9 a 12. TÉCNICA PATI */
const LETRAS = ["P", "A", "T", "I"];
function pati(letra, nombre, preguntas, remate) {
  const s = slide("Calificación de los prospectos", "Técnica PATI: otra forma de medir para concientizar.");

  // Indicador de la serie: P · A · T · I
  LETRAS.forEach((l, i) => {
    const x = 7.62 + i * 0.5;
    const activo = l === letra;
    round(s, {
      x, y: 0.32, w: 0.42, h: 0.42, rectRadius: 0.1,
      fill: { color: activo ? BLUE : "DDE3EA" },
    });
    s.addText(l, {
      x, y: 0.32, w: 0.42, h: 0.42, align: "center", valign: "middle", margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: activo ? W : MUTED,
    });
  });

  round(s, { x: L, y: 1.3, w: 2.7, h: 2.95, fill: { color: BLUE } });
  s.addText(letra, {
    x: L, y: 1.5, w: 2.7, h: 1.3, align: "center", valign: "middle", margin: 0,
    fontFace: F, fontSize: 72, bold: true, color: W,
  });
  s.addText(nombre, {
    x: L + 0.2, y: 2.9, w: 2.3, h: 0.44, align: "center", valign: "middle", margin: 0,
    fontFace: F, fontSize: 19, bold: true, color: W,
  });
  s.addText("Preguntas para calificar", {
    x: L + 0.2, y: 3.4, w: 2.3, h: 0.5, align: "center", valign: "top", margin: 0,
    fontFace: F, fontSize: 10.5, color: ONBLUE, lineSpacing: 13,
  });

  const y0 = 1.3 + 2.95 / 2 - (preguntas.length * 0.56 - 0.06) / 2;
  preguntas.forEach((q, i) => {
    const y = y0 + i * 0.56;
    if (i % 2 === 0) round(s, { x: 3.66, y, w: 5.84, h: 0.5, fill: { color: LIGHT } });
    s.addText(q, {
      x: 3.9, y, w: 5.4, h: 0.5, margin: 0, valign: "middle",
      fontFace: F, fontSize: 12, color: INK, lineSpacing: 14,
    });
  });

  keyBar(s, 4.42, "LA PREGUNTA DE FONDO", remate);
  return s;
}

pati("P", "Presupuesto", [
  "¿Cuál es el valor esperado o aceptable para el cliente?",
  "¿Cuál es su idea de valores?",
  "¿Forma de pago?",
  "¿En qué precio te gustaría vender?",
  "¿Ese valor lo tasaste con alguien? ¿Cuándo?",
], "¿Este cliente es consciente, o es un delirante y estoy perdiendo el tiempo?").addNotes(
  "El presupuesto es el primer filtro y el más duro. Un propietario con una idea de precio muy alejada del mercado no es un prospecto: es una tasación que no se va a firmar y tres meses de trabajo perdidos. La pregunta por la forma de pago y por si ya tasó con alguien es la que más información devuelve."
);

pati("A", "Autoridad", [
  "¿Puede decidir o necesita consenso con otros?",
  "¿Vos tomás la decisión o lo conversás con alguien más?",
  "¿Están todos los herederos de acuerdo, o los copropietarios?",
], "¿Estoy hablando con la persona correcta para crear influencia ética positiva?").addNotes(
  "La pregunta por herederos y copropietarios evita el problema más frecuente del rubro: avanzar meses con quien no puede firmar. En una sucesión con varios herederos, la operación se define en una conversación en la que el agente no está presente."
);

pati("T", "Tiempo", [
  "¿Cuándo quiere concretar la operación?",
  "¿Hay alguna urgencia para vender?",
  "¿Te gustaría que esto se resuelva antes de que termine el año?",
], "La valoración del tiempo es un excelente indicador de las necesidades del cliente.").addNotes(
  "El tiempo es el indicador más honesto: quien tiene una urgencia real la menciona sin que se la pregunten dos veces. Quien contesta “no tengo apuro” no está mintiendo, está diciendo que hoy no es un prospecto de corto plazo — y eso también es información útil."
);

pati("I", "Interés", [
  "¿Qué tan real y prioritaria es su voluntad de avanzar?",
  "¿Qué te lleva a vender ahora?",
  "¿Lo ves como una opción concreta o lo estás tanteando?",
], "El interés declarado no alcanza: lo que confirma la intención es si ya hizo algo al respecto.").addNotes(
  "Interés no es lo mismo que curiosidad. La pregunta por el motivo —qué lo lleva a vender ahora— es la más reveladora de las cuatro letras: detrás siempre hay un hecho concreto (una mudanza, una sucesión, un cambio de trabajo) o no hay nada."
);

/* ============================================ 13. EL PRECIO DEL ÉXITO */
{
  const s = slide("Dejen de negociar el precio del éxito", "No caigan en el engaño.");
  round(s, { x: L, y: 1.3, w: CW, h: 1.32, fill: { color: BLUE } });
  s.addText("No es uno el que no quiere hacer lo que se debe: es la comodidad del cuerpo la que nos empuja a no hacerlo. El cuerpo es material, como un cigarrillo o una torta. ¿La materia te puede dominar?", {
    x: L + 0.4, y: 1.3, w: CW - 0.8, h: 1.32, margin: 0, valign: "middle", align: "center",
    fontFace: F, fontSize: 13.5, color: W, lineSpacing: 20,
  });
  round(s, { x: L, y: 2.78, w: CW, h: 1.32, fill: { color: GRAYC } });
  s.addText("Hasta que no encuentren el combustible que convierte sus deseos en acción, no va a haber curso, capacitación, carrera, profesor, socio, pareja ni colega que les haga el puente al éxito: la realización es personal, no compartida.", {
    x: L + 0.4, y: 2.78, w: CW - 0.8, h: 1.32, margin: 0, valign: "middle", align: "center",
    fontFace: F, fontSize: 13.5, color: W, lineSpacing: 20,
  });
  keyBar(s, 4.28, "EL CIERRE", "El camino del éxito comienza en la soledad.");
  s.addNotes(
    "Es el cierre conceptual de la capacitación y conviene decirlo despacio. La idea es que ninguna herramienta, ni siquiera esta capacitación, reemplaza la decisión personal de sostener la conducta cuando nadie mira. Conectar de vuelta con la diapositiva del deseo y la acción."
  );
}

/* =========================================================== 14. CIERRE */
closing(
  "Muchas gracias.",
  "Sin prospectos no hay oportunidades, y sin oportunidades no hay cierres.",
  "Capacitaciones Krak Real Estate · Técnicas Avanzadas de Prospección Inmobiliaria"
).addNotes(
  "Cierre. El entregable mínimo es que cada agente salga con las cuatro preguntas de PATI anotadas y las use en el próximo contacto real."
);

d.save(process.argv[2] || "Prospeccion-Tecnicas-Avanzadas.pptx");

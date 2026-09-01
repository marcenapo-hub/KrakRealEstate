/*
 * Sistema visual de las capacitaciones de Krak Real Estate.
 * Paleta y layout tomados del deck "Home y Warehouse Staging": rail izquierdo
 * con isotipo, tarjetas redondeadas azul/gris y ondas de marca de fondo.
 *
 * Se comparte entre los generadores para que todas las capacitaciones salgan
 * del mismo molde. Uso: const K = require("./krak"); const d = K.deck("Título");
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

// Paleta muestreada de los decks de referencia de Krak
const BLUE = "08407C"; // azul Krak: títulos, tarjetas, callouts
const BLUE2 = "0A5296"; // azul un tono más claro, para bloques dentro de una tarjeta azul
const SLATE = "4E586E"; // barra del rail
const GRAYC = "7C8594"; // tarjetas grises
const GREEN = "26AE60";
const RED = "E74B3C";
const INK = "2E4258"; // cuerpo sobre blanco
const MUTED = "6A7686";
const LIGHT = "F2F4F7"; // tarjetas claras sobre blanco
const ONBLUE = "DCE6F2"; // cuerpo sobre azul
const ONGRAY = "F0F2F5"; // cuerpo sobre gris
const W = "FFFFFF";
const F = "Arial";

const RAIL = 0.45; // ancho del rail izquierdo
const L = 0.66; // margen izquierdo del contenido
const CW = 8.84; // ancho útil (de 0.66 a 9.5)
const H = 5.625; // alto del slide

function deck(titulo) {
  const A = (f) => path.join(__dirname, "brand", f);
  const IMG = (f) => path.join(__dirname, "img", f);

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.author = "Krak Real Estate";
  pres.title = titulo;

  // Rectángulo redondeado sin contorno: la línea siempre iguala al relleno
  const round = (s, o) => {
    const fill = (o.fill && o.fill.color) || W;
    return s.addShape(pres.ShapeType.roundRect, {
      rectRadius: 0.09, ...o, line: { color: fill, width: 0 },
    });
  };

  const rect = (s, o) => {
    const fill = (o.fill && o.fill.color) || W;
    return s.addShape(pres.ShapeType.rect, {
      ...o, line: { color: fill, width: 0 },
    });
  };

  // Carátula: degradado de marca, logo y título
  function cover(titulo, bajada) {
    const s = pres.addSlide();
    s.background = { path: A("bg_cover.png") };
    s.addImage({ path: A("logo_white.png"), x: 0.72, y: 0.85, w: 2.02, h: 0.898 });
    s.addText("Capacitaciones Krak Real Estate", {
      x: 0.72, y: 2.32, w: 7.5, h: 0.34, margin: 0, valign: "middle",
      fontFace: F, fontSize: 15, color: W,
    });
    s.addText(titulo, {
      x: 0.7, y: 2.72, w: 8.7, h: 1.5, margin: 0, valign: "top",
      fontFace: F, fontSize: 40, bold: true, color: W, lineSpacing: 48,
    });
    if (bajada) {
      s.addText(bajada, {
        x: 0.72, y: 4.35, w: 7.6, h: 0.4, margin: 0, valign: "middle",
        fontFace: F, fontSize: 12.5, color: "D9E4F0",
      });
    }
    return s;
  }

  // Slide de contenido: ondas de fondo + rail con isotipo + título y bajada
  function slide(titulo, bajada) {
    const s = pres.addSlide();
    s.background = { path: A("bg_content.png") };
    rect(s, { x: 0, y: 0, w: RAIL, h: H, fill: { color: SLATE } });
    rect(s, { x: 0, y: 0, w: RAIL, h: 0.44, fill: { color: BLUE } });
    s.addImage({ path: A("iso_white.png"), x: 0.135, y: 0.075, w: 0.18, h: 0.238 });
    s.addText(titulo, {
      x: L, y: 0.28, w: CW, h: 0.52, margin: 0, valign: "middle",
      fontFace: F, fontSize: 26, bold: true, color: BLUE,
    });
    if (bajada) {
      s.addText(bajada, {
        x: L, y: 0.82, w: CW, h: 0.3, margin: 0, valign: "middle",
        fontFace: F, fontSize: 12, italic: true, color: MUTED,
      });
    }
    return s;
  }

  // Franja de cierre de slide, con rótulo en versalitas
  function keyBar(s, y, label, text, color) {
    const fill = color || BLUE;
    round(s, { x: L, y, w: CW, h: 0.72, fill: { color: fill } });
    s.addText(label, {
      x: L + 0.26, y: y + 0.05, w: CW - 0.5, h: 0.22, margin: 0, valign: "middle",
      fontFace: F, fontSize: 9, bold: true, color: W, charSpacing: 1.2,
    });
    s.addText(text, {
      x: L + 0.26, y: y + 0.27, w: CW - 0.52, h: 0.38, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11, color: W, lineSpacing: 14,
    });
  }

  // Encabezado de columna o bloque
  function bandHeader(s, x, y, w, text, fill) {
    round(s, { x, y, w, h: 0.5, fill: { color: fill || BLUE } });
    s.addText(text, {
      x: x + 0.24, y, w: w - 0.4, h: 0.5, margin: 0, valign: "middle",
      fontFace: F, fontSize: 11.5, bold: true, color: W, charSpacing: 1,
    });
  }

  // Filas de "término: definición", con fondo alternado
  function defRows(s, y0, items, opts) {
    const o = opts || {};
    const rowH = o.rowH || 0.62;
    const x = o.x !== undefined ? o.x : L;
    const w = o.w || CW;
    items.forEach((it, i) => {
      const y = y0 + i * rowH;
      if (i % 2 === 0) round(s, { x, y, w, h: rowH - 0.06, fill: { color: LIGHT } });
      s.addText(it[0], {
        x: x + 0.24, y: y + 0.03, w: w - 0.5, h: 0.24, margin: 0, valign: "middle",
        fontFace: F, fontSize: 11.5, bold: true, color: BLUE,
      });
      s.addText(it[1], {
        x: x + 0.24, y: y + 0.26, w: w - 0.5, h: rowH - 0.34, margin: 0,
        fontFace: F, fontSize: 10, color: INK, lineSpacing: 12,
      });
    });
  }

  // Cierre: campo de ondas, logo apilado y mensaje
  function closing(mensaje, bajada, pie) {
    const s = pres.addSlide();
    s.background = { path: A("bg_close.png") };
    s.addImage({ path: A("logo_stack.png"), x: 8.0, y: 0.45, w: 0.94, h: 1.6 });
    s.addText(mensaje, {
      x: 0.82, y: 2.05, w: 6.5, h: 0.72, margin: 0, valign: "middle",
      fontFace: F, fontSize: 38, bold: true, color: BLUE,
    });
    if (bajada) {
      s.addText(bajada, {
        x: 0.85, y: 2.85, w: 6.6, h: 0.36, margin: 0, valign: "middle",
        fontFace: F, fontSize: 15, color: SLATE,
      });
    }
    if (pie) {
      s.addText(pie, {
        x: 0.85, y: 4.62, w: 8.2, h: 0.3, margin: 0, valign: "middle",
        fontFace: F, fontSize: 9.5, color: MUTED,
      });
    }
    return s;
  }

  return {
    pres, A, IMG, round, rect, cover, slide, keyBar, bandHeader, defRows, closing,
    save: (f) => pres.writeFile({ fileName: f }).then((r) => console.log("OK:", r)),
  };
}

module.exports = {
  deck, BLUE, BLUE2, SLATE, GRAYC, GREEN, RED, INK, MUTED, LIGHT, ONBLUE, ONGRAY, W, F,
  RAIL, L, CW, H,
};

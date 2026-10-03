#!/usr/bin/env python3
"""
Convierte archivos Markdown del repo a PDF con la identidad visual de Krak.

    python3 herramientas/md-a-pdf.py memory/context/capacitaciones.md [...]
    python3 herramientas/md-a-pdf.py --salida ./pdfs  archivo.md

El PDF sale al lado del .md salvo que se indique --salida.

Por qué no basta con un render directo: Chromium headless no resuelve Google
Fonts en este entorno aunque curl sí lo haga, así que la tipografía se descarga
por HTTP y se incrusta como data URI antes de imprimir. De ese modo el PDF se
genera igual con o sin red disponible para el navegador.

Requiere:  pip install markdown playwright   ·   Chromium (PLAYWRIGHT_BROWSERS_PATH)
"""
import argparse, base64, glob, os, pathlib, re, sys, urllib.request

UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}
CACHE = pathlib.Path(os.environ.get("TMPDIR", "/tmp")) / "krak-fuentes"
FAMILIAS = {
    "Source Serif 4": "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap",
    "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
}


def _bajar(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()


def fuentes_incrustadas() -> str:
    """Devuelve un <style> con las caras latin de cada familia como data URI."""
    CACHE.mkdir(parents=True, exist_ok=True)
    caras = []
    for familia, css_url in FAMILIAS.items():
        clave = CACHE / (re.sub(r"\W+", "-", familia).lower() + ".css")
        try:
            css = clave.read_text() if clave.exists() else _bajar(css_url).decode()
            if not clave.exists():
                clave.write_text(css)
        except Exception as e:                       # sin red: se cae al stack del sistema
            print(f"  aviso: no se pudo traer {familia} ({e}); se usa la fuente del sistema")
            continue
        vistos = set()
        bloques = re.split(r"/\*\s*([a-z-]+)\s*\*/", css)
        for i in range(1, len(bloques) - 1, 2):
            if bloques[i] != "latin":
                continue
            url = re.search(r"url\((https://[^)]+\.woff2)\)", bloques[i + 1]).group(1)
            peso = re.search(r"font-weight:\s*([\d ]+)", bloques[i + 1]).group(1).strip()
            if url in vistos:                        # fuente variable: un archivo, varios pesos
                continue
            vistos.add(url)
            archivo = CACHE / (url.rsplit("/", 1)[-1])
            if not archivo.exists():
                archivo.write_bytes(_bajar(url))
            b64 = base64.b64encode(archivo.read_bytes()).decode()
            rango = peso if " " in peso else "300 700"
            caras.append(
                f"@font-face{{font-family:'{familia}';font-style:normal;font-weight:{rango};"
                f"font-display:block;src:url(data:font/woff2;base64,{b64}) format('woff2');}}"
            )
    return "<style>" + "".join(caras) + "</style>"


CSS = """<style>
  @page{size:A4 portrait;margin:15mm 16mm 14mm}
  :root{--tinta:#16222F;--suave:#4A5666;--azul:#08407C;--azul2:#396696;
        --pizarra:#4E586E;--borde:#D8DDE4;--gris:#F2F3F5;--ocre:#7E5A1E}
  *{box-sizing:border-box}
  body{margin:0;background:#fff;color:var(--tinta);font-family:Inter,system-ui,sans-serif;
       font-size:10pt;line-height:1.55;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .cab{border-bottom:1.5pt solid var(--azul);padding-bottom:3mm;margin-bottom:7mm}
  .cab .k{font-size:7.5pt;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
          color:var(--pizarra);margin:0 0 1.5mm}
  .cab .ruta{font-size:8.5pt;color:var(--suave);font-family:ui-monospace,monospace}
  h1{font-family:"Source Serif 4",Georgia,serif;font-weight:600;font-size:23pt;line-height:1.15;
     letter-spacing:-.015em;margin:0 0 5mm;color:var(--tinta)}
  h2{font-family:"Source Serif 4",Georgia,serif;font-weight:600;font-size:15pt;margin:8mm 0 3mm;
     color:var(--azul);page-break-after:avoid;border-bottom:.5pt solid var(--borde);padding-bottom:1.5mm}
  h3{font-size:11pt;font-weight:600;margin:6mm 0 2mm;color:var(--tinta);page-break-after:avoid}
  h4{font-size:9.5pt;font-weight:600;margin:4mm 0 1.5mm;color:var(--pizarra);
     letter-spacing:.03em;page-break-after:avoid}
  p{margin:0 0 3mm;orphans:2;widows:2}
  ul,ol{margin:0 0 3mm;padding-left:5.5mm}
  li{margin:0 0 1.6mm}
  li>ul,li>ol{margin-top:1.6mm}
  strong{font-weight:600;color:var(--tinta)}
  em{color:var(--suave)}
  code{font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:8.5pt;background:var(--gris);
       border:.5pt solid var(--borde);border-radius:1mm;padding:.3mm 1.2mm;color:var(--azul)}
  pre{background:var(--gris);border:.5pt solid var(--borde);border-radius:1.5mm;padding:3mm;
      overflow-x:auto;page-break-inside:avoid;margin:0 0 3mm}
  pre code{background:none;border:none;padding:0;font-size:8pt;color:var(--tinta)}
  blockquote{border-left:2pt solid var(--pizarra);background:var(--gris);margin:0 0 3mm;
             padding:2.5mm 3.5mm;color:var(--pizarra);font-size:9.5pt;page-break-inside:avoid}
  blockquote p:last-child{margin:0}
  table{border-collapse:collapse;width:100%;margin:0 0 4mm;font-size:9pt;page-break-inside:avoid}
  th{background:var(--azul);color:#fff;text-align:left;font-weight:600;padding:2mm 2.5mm;
     font-size:8.5pt;letter-spacing:.02em}
  td{border-bottom:.5pt solid var(--borde);padding:2mm 2.5mm;vertical-align:top}
  tr:nth-child(even) td{background:#FAFBFC}
  hr{border:none;border-top:.5pt solid var(--borde);margin:6mm 0}
  a{color:var(--azul);text-decoration:none}
</style>"""


def convertir(ruta_md: pathlib.Path, dir_salida: pathlib.Path | None) -> pathlib.Path:
    import markdown
    from playwright.sync_api import sync_playwright

    texto = ruta_md.read_text(encoding="utf-8")
    # el primer h1 pasa a ser el título de la portadilla
    m = re.match(r"#\s+(.+?)\n", texto)
    titulo = m.group(1).strip() if m else ruta_md.stem
    if m:
        texto = texto[m.end():]

    cuerpo = markdown.markdown(
        texto, extensions=["tables", "fenced_code", "sane_lists", "attr_list"]
    )
    cab = (f'<div class="cab"><p class="k">Krak Real Estate</p>'
           f'<span class="ruta">{ruta_md.as_posix()}</span></div><h1>{titulo}</h1>')
    html = (f"<title>{titulo}</title>{fuentes_incrustadas()}{CSS}{cab}{cuerpo}")

    tmp = ruta_md.with_suffix(".tmp.html")
    tmp.write_text(html, encoding="utf-8")
    destino = (dir_salida or ruta_md.parent) / (ruta_md.stem + ".pdf")
    destino.parent.mkdir(parents=True, exist_ok=True)

    pie = ('<div style="width:100%;font-family:Inter,sans-serif;font-size:7pt;color:#6A7686;'
           'padding:0 16mm;display:flex;justify-content:space-between;">'
           f'<span>Krak Real Estate &middot; {ruta_md.as_posix()}</span>'
           '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>')

    chrome = next(iter(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome")), None)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(**({"executable_path": chrome} if chrome else {}))
            pg = b.new_page()
            pg.goto(tmp.resolve().as_uri(), wait_until="load")
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(700)
            pg.emulate_media(media="print")
            pg.pdf(path=str(destino), format="A4", print_background=True,
                   display_header_footer=True, header_template="<div></div>",
                   footer_template=pie,
                   margin={"top": "15mm", "bottom": "14mm", "left": "16mm", "right": "16mm"})
            b.close()
    finally:
        tmp.unlink(missing_ok=True)
    return destino


def main() -> int:
    ap = argparse.ArgumentParser(description="Markdown a PDF con la identidad de Krak")
    ap.add_argument("archivos", nargs="+", help="archivos .md a convertir")
    ap.add_argument("--salida", help="carpeta de destino (por defecto, junto al .md)")
    a = ap.parse_args()
    dest = pathlib.Path(a.salida) if a.salida else None
    for f in a.archivos:
        ruta = pathlib.Path(f)
        if not ruta.exists():
            print(f"  no existe: {f}", file=sys.stderr)
            continue
        print(f"→ {convertir(ruta, dest)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

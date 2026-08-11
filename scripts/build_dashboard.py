#!/usr/bin/env python3
"""Genera dashboard.html a partir de data/ventas-reuniones.json.

Uso: python3 scripts/build_dashboard.py
Salida: dist/dashboard.html (publicar con la herramienta Artifact).
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, "data", "ventas-reuniones.json")
OUT_DIR = os.path.join(ROOT, "dist")
OUT_PATH = os.path.join(OUT_DIR, "dashboard.html")

TEMPLATE = """<title>Jornada de Ventas — Krak Real Estate</title>
<style>
:root {
  --bg: #eef1ef;
  --surface: #ffffff;
  --surface-2: #e3e8e5;
  --ink: #16241f;
  --ink-2: #4a5b54;
  --ink-3: #7c8b84;
  --border: #d3dbd6;
  --accent: #1b4d47;
  --accent-ink: #ffffff;
  --accent-soft: #dde8e4;
  --good: #2f7a4f;
  --good-soft: #e2f0e6;
  --warn: #a3701b;
  --warn-soft: #f6ecd8;
  --crit: #b23b3b;
  --crit-soft: #f7e2e0;
  --font-head: Iowan Old Style, Palatino Linotype, Palatino, ui-serif, Georgia, serif;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #101613;
    --surface: #182420;
    --surface-2: #1f2d27;
    --ink: #e7efe9;
    --ink-2: #aebdb5;
    --ink-3: #7e8f87;
    --border: #2b3a33;
    --accent: #6fae9f;
    --accent-ink: #0d1613;
    --accent-soft: #1f3630;
    --good: #6fbf8b;
    --good-soft: #1c3226;
    --warn: #d9ad5c;
    --warn-soft: #3a2f1a;
    --crit: #e08282;
    --crit-soft: #3a2320;
  }
}
:root[data-theme="dark"] {
  --bg: #101613;
  --surface: #182420;
  --surface-2: #1f2d27;
  --ink: #e7efe9;
  --ink-2: #aebdb5;
  --ink-3: #7e8f87;
  --border: #2b3a33;
  --accent: #6fae9f;
  --accent-ink: #0d1613;
  --accent-soft: #1f3630;
  --good: #6fbf8b;
  --good-soft: #1c3226;
  --warn: #d9ad5c;
  --warn-soft: #3a2f1a;
  --crit: #e08282;
  --crit-soft: #3a2320;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.45;
}
.wrap { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
header.page {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  margin-bottom: 28px;
}
header.page .eyebrow {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
header.page h1 {
  font-family: var(--font-head);
  font-size: 30px;
  font-weight: 600;
  margin: 4px 0 0;
  text-wrap: balance;
}
header.page .meta {
  font-size: 13px;
  color: var(--ink-3);
  text-align: right;
}
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 36px;
}
.stat {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 18px;
}
.stat .n {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 28px;
  font-weight: 600;
}
.stat .l {
  font-size: 12.5px;
  color: var(--ink-2);
  margin-top: 2px;
}
.stat.pendiente .n { color: var(--warn); }
.stat.vencido .n { color: var(--crit); }
.stat.cumplido .n { color: var(--good); }
section { margin-bottom: 40px; }
h2 {
  font-family: var(--font-head);
  font-size: 19px;
  font-weight: 600;
  margin: 0 0 14px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
@media (max-width: 780px) { .board { grid-template-columns: 1fr; } }
.col {
  background: var(--surface-2);
  border-radius: 12px;
  padding: 12px;
}
.col .col-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ink-2);
  padding: 4px 6px 10px;
}
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot.pendiente { background: var(--warn); }
.dot.vencido { background: var(--crit); }
.dot.cumplido { background: var(--good); }
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 12px 13px;
  margin-bottom: 8px;
}
.card .agente { font-weight: 600; font-size: 13.5px; }
.card .desc { font-size: 13.5px; color: var(--ink); margin: 4px 0 8px; }
.card .foot {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--ink-3);
  font-variant-numeric: tabular-nums;
}
.pill {
  display: inline-block;
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 600;
}
.pill.pendiente { background: var(--warn-soft); color: var(--warn); }
.pill.vencido { background: var(--crit-soft); color: var(--crit); }
.pill.cumplido { background: var(--good-soft); color: var(--good); }
.empty-col { font-size: 12.5px; color: var(--ink-3); padding: 10px 8px; }
.timeline { display: flex; flex-direction: column; gap: 10px; }
.meeting {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
}
.meeting .row1 {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
}
.meeting .fecha { font-weight: 600; font-family: var(--font-mono); }
.meeting .agentes { font-size: 12.5px; color: var(--ink-3); }
.meeting .counts { display: flex; gap: 14px; margin-top: 8px; font-size: 12.5px; color: var(--ink-2); }
.empty-state {
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  color: var(--ink-2);
}
.empty-state p { max-width: 480px; margin: 8px auto; font-size: 14px; }
.empty-state .big { font-family: var(--font-head); font-size: 18px; color: var(--ink); }
footer.page {
  margin-top: 48px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--ink-3);
}
</style>
<div class="wrap">
  <header class="page">
    <div>
      <div class="eyebrow">Krak Real Estate · Jornada de Ventas en Equipo</div>
      <h1>Seguimiento de compromisos</h1>
    </div>
    <div class="meta">__META__</div>
  </header>

  <div class="stats">
    <div class="stat pendiente"><div class="n" id="n-pendiente">0</div><div class="l">Compromisos pendientes</div></div>
    <div class="stat vencido"><div class="n" id="n-vencido">0</div><div class="l">Vencidos sin cumplir</div></div>
    <div class="stat cumplido"><div class="n" id="n-cumplido">0</div><div class="l">Cumplidos</div></div>
    <div class="stat"><div class="n" id="n-cruces">0</div><div class="l">Cruces activados</div></div>
    <div class="stat"><div class="n" id="n-reuniones">0</div><div class="l">Jornadas registradas</div></div>
  </div>

  <section>
    <h2>Compromisos por estado</h2>
    <div class="board" id="board"></div>
  </section>

  <section>
    <h2>Historial de jornadas</h2>
    <div class="timeline" id="timeline"></div>
  </section>

  <footer class="page">
    Se alimenta de las transcripciones de Gemini de cada Jornada de Ventas quincenal.
    Proceso documentado en <code>memory/context/ventas-dashboard.md</code>.
  </footer>
</div>

<script id="data" type="application/json">__DATA__</script>
<script>
const raw = JSON.parse(document.getElementById('data').textContent);
const reuniones = (raw.reuniones || []).slice().sort((a, b) => a.fecha < b.fecha ? 1 : -1);
const today = new Date().toISOString().slice(0, 10);

const compromisos = [];
reuniones.forEach(r => (r.compromisos || []).forEach(c => {
  let estado = c.estado || 'pendiente';
  if (estado === 'pendiente' && c.fecha_limite && c.fecha_limite < today) estado = 'vencido';
  compromisos.push(Object.assign({}, c, { estado, reunion_fecha: r.fecha }));
}));

const byEstado = { pendiente: [], vencido: [], cumplido: [] };
compromisos.forEach(c => { (byEstado[c.estado] || byEstado.pendiente).push(c); });

document.getElementById('n-pendiente').textContent = byEstado.pendiente.length;
document.getElementById('n-vencido').textContent = byEstado.vencido.length;
document.getElementById('n-cumplido').textContent = byEstado.cumplido.length;
document.getElementById('n-cruces').textContent = reuniones.reduce((s, r) => s + (r.cruces || []).filter(x => x.estado === 'activado').length, 0);
document.getElementById('n-reuniones').textContent = reuniones.length;

const board = document.getElementById('board');
const cols = [
  ['pendiente', 'Pendientes'],
  ['vencido', 'Vencidos'],
  ['cumplido', 'Cumplidos'],
];
if (compromisos.length === 0) {
  board.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1">
    <div class="big">Todavía no hay jornadas registradas</div>
    <p>Cuando llegue la transcripción de Gemini de la primera Jornada de Ventas en Equipo,
    se va a cargar acá con los compromisos que cada agente anunció en el cierre —
    quién, qué y para cuándo.</p>
  </div>`;
} else {
  cols.forEach(([key, label]) => {
    const items = byEstado[key];
    const col = document.createElement('div');
    col.className = 'col';
    const head = `<div class="col-head"><span class="dot ${key}"></span>${label} (${items.length})</div>`;
    const cards = items.length
      ? items.map(c => `<div class="card">
          <div class="agente">${esc(c.agente || 'Sin asignar')}</div>
          <div class="desc">${esc(c.descripcion || '')}</div>
          <div class="foot">
            <span>${c.fecha_limite ? esc(c.fecha_limite) : 'sin fecha'}</span>
            <span>${esc(c.reunion_fecha)}</span>
          </div>
        </div>`).join('')
      : '<div class="empty-col">Sin compromisos en este estado.</div>';
    col.innerHTML = head + cards;
    board.appendChild(col);
  });
}

const timeline = document.getElementById('timeline');
if (reuniones.length === 0) {
  timeline.innerHTML = '<div class="empty-state"><p>Sin jornadas cargadas todavía.</p></div>';
} else {
  reuniones.forEach(r => {
    const el = document.createElement('div');
    el.className = 'meeting';
    const cruces = (r.cruces || []).length;
    const mercado = (r.info_mercado || []).length;
    const trabadas = (r.operaciones_trabadas || []).length;
    const compr = (r.compromisos || []).length;
    el.innerHTML = `
      <div class="row1">
        <span class="fecha">${esc(r.fecha)}</span>
        <span class="agentes">${(r.agentes_presentes || []).map(esc).join(' · ')}</span>
      </div>
      <div class="counts">
        <span>${cruces} cruce${cruces === 1 ? '' : 's'}</span>
        <span>${mercado} dato${mercado === 1 ? '' : 's'} de mercado</span>
        <span>${trabadas} operación${trabadas === 1 ? '' : 'es'} trabada${trabadas === 1 ? '' : 's'}</span>
        <span>${compr} compromiso${compr === 1 ? '' : 's'}</span>
      </div>`;
    timeline.appendChild(el);
  });
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
</script>
"""


def main():
    with open(DATA_PATH, encoding="utf-8") as f:
        data = json.load(f)
    data_public = {"reuniones": data.get("reuniones", [])}
    from datetime import datetime, timezone
    meta = "Actualizado " + datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M")
    html = TEMPLATE.replace("__DATA__", json.dumps(data_public, ensure_ascii=False))
    html = html.replace("__META__", meta)
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write(html)
    print("Wrote", OUT_PATH)


if __name__ == "__main__":
    main()

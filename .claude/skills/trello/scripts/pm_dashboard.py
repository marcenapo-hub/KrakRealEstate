#!/usr/bin/env python3
"""Dashboard PM de Krak Studio: snapshot HTML y brief de texto.

Lee el tablero con las credenciales de trello.py (entorno o .env.trello) y:

  snapshot [tablero]   genera dashboard/out/<tablero>-<fecha>.html — un archivo
                       autocontenido, con los datos adentro, que se abre con
                       doble clic y no pide credenciales ni red.
  brief [tablero]      imprime el estado del tablero en texto (terminal, mail,
                       WhatsApp) — primero lo vencido y lo que vence pronto.

Ejemplos:
  python3 .claude/skills/trello/scripts/pm_dashboard.py snapshot
  python3 .claude/skills/trello/scripts/pm_dashboard.py brief "Krak Studio"

Solo lectura: nunca escribe en Trello.
"""
import json
import re
import sys
from collections import defaultdict
from datetime import date, datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import trello  # noqa: E402  (usa sus credenciales y su cliente HTTP)

RAIZ = Path(__file__).resolve().parents[4]
PLANTILLA = RAIZ / "dashboard" / "krak-studio-pm.html"
SALIDA = RAIZ / "dashboard" / "out"

# Mismas reglas que el dashboard HTML — si cambia una, cambiar la otra.
RX_DONE = re.compile(r"termin|done|hecho|complet|archiv|cerrad", re.I)
RX_REVISION = re.compile(r"revis|review|aprob", re.I)
RX_STANDBY = re.compile(r"stand ?by|pausad|espera|frenad|congelad", re.I)
RX_GENERALES = re.compile(r"general|organizativ|permanente|recurso|material|banco|plantilla", re.I)
FORMATOS = {"HISTORIAL KRAK", "Carrusel", "REEL", "POST", "LINKEDIN", "STORIES", "PAUTA META"}
DIAS_ESTANCADA = 14
WIP_ALERTA = 8


def tipo_lista(nombre):
    if RX_DONE.search(nombre):
        return "done"
    if RX_REVISION.search(nombre):
        return "revision"
    if RX_STANDBY.search(nombre):
        return "standby"
    if RX_GENERALES.search(nombre):
        return "generales"
    return "work"


def traer(nombre_tablero):
    board = trello.find_board(nombre_tablero)
    lists = trello.api(f"/boards/{board['id']}/lists", {"fields": "name,pos"})
    members = trello.api(f"/boards/{board['id']}/members", {"fields": "fullName,username,initials"})
    cards = trello.api(f"/boards/{board['id']}/cards", {
        "fields": "name,idList,due,dueComplete,labels,pos,idMembers,dateLastActivity,shortUrl",
        "limit": "1000",
    })
    return {
        "board": {"id": board["id"], "name": board["name"]},
        "lists": lists, "members": members, "cards": cards,
        "generado": datetime.now().astimezone().isoformat(),
    }


def normalizar(raw):
    listas = {l["id"]: l for l in raw["lists"]}
    miembros = {m["id"]: m.get("fullName") or m["username"] for m in raw["members"]}
    hoy = date.today()

    fichas = []
    cards = []
    for c in raw["cards"]:
        lista = listas.get(c["idList"], {"name": "(sin lista)", "pos": 0})
        tipo = tipo_lista(lista["name"])
        due = c["due"][:10] if c.get("due") else None
        # La lista manda: el check "fecha cumplida" está tildado en tarjetas sin
        # fecha, así que no alcanza para dar una tarjeta por terminada.
        cerrada = tipo == "done"
        etiquetas = [l["name"] for l in c.get("labels", []) if l.get("name")]
        act = (c.get("dateLastActivity") or "")[:10]
        item = {
            "nombre": c["name"], "lista": lista["name"], "tipo": tipo,
            "listaPos": lista.get("pos") or 0, "pos": c.get("pos") or 0,
            "due": due,
            "vencida": bool(due and due < hoy.isoformat() and not cerrada),
            "dias_vencida": (hoy - date.fromisoformat(due)).days if due else None,
            "clientes": [e for e in etiquetas if e not in FORMATOS],
            "responsables": [miembros[m] for m in c.get("idMembers", []) if m in miembros],
            "inactiva": (hoy - date.fromisoformat(act)).days if act else None,
            "ficha": tipo == "generales" and not due,
            "publicacion": tipo == "generales" and bool(due),
        }
        item["activa"] = not cerrada and not item["ficha"] and not item["publicacion"]
        (fichas if item["ficha"] else cards).append(item)

    cards.sort(key=lambda c: (c["listaPos"], c["pos"]))
    activas = [c for c in cards if c["activa"]]
    trabajo = [c for c in activas if c["tipo"] != "standby"]
    return {
        "board": raw["board"], "generado": raw["generado"],
        "total": len(raw["cards"]), "activas": activas, "trabajo": trabajo, "fichas": fichas,
        "revision": sorted([c for c in activas if c["tipo"] == "revision"],
                           key=lambda c: -(c["inactiva"] or 0)),
        "vencidas": sorted([c for c in activas if c["vencida"]], key=lambda c: -c["dias_vencida"]),
        "semana": sorted([c for c in activas if c["due"] and not c["vencida"]
                          and (date.fromisoformat(c["due"]) - hoy).days <= 7],
                         key=lambda c: c["due"]),
        "estancadas": sorted([c for c in activas if (c["inactiva"] or 0) > DIAS_ESTANCADA
                              and not c["vencida"]], key=lambda c: -(c["inactiva"] or 0)),
        "sin_fecha": [c for c in trabajo if not c["due"]],
        "huerfanas": [c for c in activas if not c["responsables"]],
        "publicaciones": sorted([c for c in cards if c["publicacion"] and c["vencida"]],
                                key=lambda c: -(c["dias_vencida"] or 0)),
    }


def linea(c):
    quien = "/".join(c["responsables"]) or "SIN RESPONSABLE"
    cli = f" [{', '.join(c['clientes'])}]" if c["clientes"] else ""
    if c["vencida"]:
        cuando = f" — venció hace {c['dias_vencida']} d"
    elif c["due"]:
        cuando = f" — vence {c['due']}"
    else:
        cuando = ""
    return f"- {c['nombre']}{cli} — {quien}{cuando}"


def brief(d):
    out = []
    cob_f = round(100 * (len(d["trabajo"]) - len(d["sin_fecha"])) / max(len(d["trabajo"]), 1))
    cob_r = round(100 * (len(d["activas"]) - len(d["huerfanas"])) / max(len(d["activas"]), 1))
    out.append(f"# {d['board']['name']} — estado al {date.today().isoformat()}")
    out.append(f"{len(d['activas'])} activas de {d['total']} tarjetas · "
               f"{len(d['vencidas'])} vencidas · {len(d['semana'])} vencen en 7 días · "
               f"{len(d['revision'])} esperando revisión de Marce")
    out.append(f"Cobertura: {cob_f}% con fecha · {cob_r}% con responsable\n")

    out.append(f"## Vencidas ({len(d['vencidas'])})")
    out += [linea(c) for c in d["vencidas"][:15]] or ["- Nada vencido."]

    out.append(f"\n## Vencen en 7 días ({len(d['semana'])})")
    out += [linea(c) for c in d["semana"][:12]] or ["- Nada con fecha esta semana."]

    out.append(f"\n## Esperan revisión de Marce ({len(d['revision'])})")
    out += [f"{linea(c)} — parada hace {c['inactiva']} d" for c in d["revision"]] or ["- Nada."]

    carga = defaultdict(list)
    for c in d["activas"]:
        for p in c["responsables"]:
            carga[p].append(c)
    out.append("\n## Carga por persona")
    for p, cs in sorted(carga.items(), key=lambda kv: -len(kv[1])):
        venc = sum(1 for c in cs if c["vencida"])
        extra = " — sobrecargado/a" if len(cs) > WIP_ALERTA else ""
        out.append(f"- {p}: {len(cs)} activas" + (f", {venc} vencidas" if venc else "") + extra)

    out.append("\n## Higiene del tablero")
    out.append(f"- {len(d['huerfanas'])} activas sin responsable")
    out.append(f"- {len(d['sin_fecha'])} tarjetas de trabajo sin fecha")
    out.append(f"- {len(d['estancadas'])} sin movimiento hace más de {DIAS_ESTANCADA} días")
    out.append(f"- {len(d['publicaciones'])} publicaciones propias figuran vencidas "
               f"(deuda de registro, no trabajo pendiente)")
    return "\n".join(out)


def snapshot(raw, nombre_tablero):
    if not PLANTILLA.is_file():
        sys.exit(f"No encontré la plantilla {PLANTILLA}")
    html = PLANTILLA.read_text()
    marca = '<script id="snapshot-data" type="application/json">null</script>'
    if marca not in html:
        sys.exit("La plantilla no tiene el bloque snapshot-data.")
    datos = json.dumps(raw, ensure_ascii=False).replace("</", "<\\/")
    html = html.replace(marca, f'<script id="snapshot-data" type="application/json">{datos}</script>')
    SALIDA.mkdir(parents=True, exist_ok=True)
    slug = re.sub(r"[^a-z0-9]+", "-", nombre_tablero.lower()).strip("-")
    destino = SALIDA / f"{slug}-{date.today().isoformat()}.html"
    destino.write_text(html)
    return destino


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    tablero = sys.argv[2] if len(sys.argv) > 2 else "Krak Studio"
    if cmd not in ("snapshot", "brief"):
        sys.exit(__doc__)
    raw = traer(tablero)
    if cmd == "brief":
        print(brief(normalizar(raw)))
    else:
        destino = snapshot(raw, tablero)
        d = normalizar(raw)
        print(f"Snapshot: {destino}")
        print(f"{len(d['activas'])} activas · {len(d['vencidas'])} vencidas · "
              f"{len(d['revision'])} en revisión. Abrilo con doble clic.")


if __name__ == "__main__":
    main()

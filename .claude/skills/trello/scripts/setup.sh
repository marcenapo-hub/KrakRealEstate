#!/usr/bin/env bash
# Configura las credenciales de Trello en .env.trello (gitignoreado).
#
# Uso:  bash .claude/skills/trello/scripts/setup.sh
#
# Pide la key y el token por entrada oculta: no se escriben en el historial
# de shell ni quedan en logs. El archivo se crea con permisos 600.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
ENV_FILE="$REPO_ROOT/.env.trello"

echo "Obtené la clave y el token en: https://trello.com/power-ups/admin"
echo "(sección \"Clave de API\"). No los pegues en el chat de Claude."
echo

if [ -f "$ENV_FILE" ]; then
  read -r -p "Ya existe $ENV_FILE. ¿Sobrescribir? [s/N] " ans
  case "$ans" in
    s|S|si|SI|Si) ;;
    *) echo "Cancelado."; exit 0 ;;
  esac
fi

read -r -s -p "TRELLO_API_KEY: " key; echo
read -r -s -p "TRELLO_TOKEN: "   tok; echo

if [ -z "$key" ] || [ -z "$tok" ]; then
  echo "ERROR: ambos valores son obligatorios." >&2
  exit 1
fi

umask 077
printf 'TRELLO_API_KEY=%s\nTRELLO_TOKEN=%s\n' "$key" "$tok" > "$ENV_FILE"
chmod 600 "$ENV_FILE"
echo "Escrito $ENV_FILE (permisos 600, ignorado por git)."
echo

echo "Verificando conexión..."
python3 "$REPO_ROOT/.claude/skills/trello/scripts/trello.py" whoami

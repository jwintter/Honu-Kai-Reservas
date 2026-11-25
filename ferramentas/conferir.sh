#!/usr/bin/env bash
# Abre cada página compilada num navegador de verdade, dentro da subpasta, antes de publicar.
set -euo pipefail
base="${NEXT_PUBLIC_BASE_PATH#/}"
rm -rf /tmp/serve && mkdir -p "/tmp/serve/$base" && cp -r out/. "/tmp/serve/$base/"
(cd /tmp/serve && python3 -m http.server 8080 >/tmp/serve.log 2>&1 &)
sleep 2
pip install -q playwright
BASE="http://localhost:8080/$base/" python3 ferramentas/conferir.py
if grep -rIlE "service_role|sb_secret_" out; then echo "FALHA: possível chave secreta"; exit 1; fi
echo "Tudo certo."

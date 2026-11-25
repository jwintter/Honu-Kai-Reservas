#!/usr/bin/env bash
# Abre cada página compilada num navegador de verdade, dentro da subpasta, antes de publicar.
set -euo pipefail
base="${NEXT_PUBLIC_BASE_PATH#/}"
rm -rf /tmp/serve && mkdir -p "/tmp/serve/$base" && cp -r out/. "/tmp/serve/$base/"
(cd /tmp/serve && python3 -m http.server 8080 >/tmp/serve.log 2>&1 &)
sleep 2
conferir() {
  html=$(google-chrome --headless=new --disable-gpu --no-sandbox --virtual-time-budget=15000 --dump-dom "http://localhost:8080/$base/$1" 2>/dev/null)
  if grep -qF "$2" <<<"$html"; then echo "OK    /$1 mostra: $2"; else echo "FALHA /$1 não mostra: $2"; exit 1; fi
}
conferir ""          "Sua próxima remada"
conferir ""          "Entrar para reservar"
conferir "planos/"   "R\$ 230,00"
conferir "empresas/" "Solicite uma sessão"
conferir "aluno/"    "Esqueci minha senha"
conferir "admin/"    "Esqueci minha senha"
if grep -E '" 404 ' /tmp/serve.log | grep -v favicon; then echo "FALHA: há arquivos não encontrados"; exit 1; fi
if grep -rIlE "service_role|sb_secret_" out; then echo "FALHA: possível chave secreta"; exit 1; fi
echo "Tudo certo."

"""Cada página precisa mostrar o conteúdo esperado, sem erro e sem arquivo faltando."""
import os, sys
from playwright.sync_api import sync_playwright

PAGINAS = [
    ("", ["Sua próxima remada", "Entrar para reservar", "R$ 230,00"]),
    ("planos/", ["R$ 230,00"]),
    ("empresas/", ["Solicite uma sessão"]),
    ("aluno/", ["Esqueci minha senha"]),
    ("admin/", ["Esqueci minha senha"]),
]
base, falhas = os.environ["BASE"], 0
with sync_playwright() as p:
    navegador = p.chromium.launch(channel="chrome")
    for caminho, textos in PAGINAS:
        pagina = navegador.new_page(viewport={"width": 390, "height": 800})
        problemas = []
        pagina.on("pageerror", lambda e: problemas.append(f"erro: {e}"))
        pagina.on("response", lambda r: problemas.append(f"{r.status} {r.url.split('?')[0]}")
                  if r.status >= 400 and "favicon" not in r.url else None)
        pagina.goto(base + caminho)
        for texto in textos:
            try:
                pagina.get_by_text(texto).first.wait_for(state="attached", timeout=25000)
                print(f"OK    /{caminho} mostra: {texto}")
            except Exception:
                falhas += 1
                print(f"FALHA /{caminho} não mostra: {texto}")
                print("DBG", " ".join(pagina.inner_text("body").split())[:600])
        pagina.wait_for_timeout(2000)
        for problema in problemas:
            print(f"DBG /{caminho} {problema}")
        falhas += sum(1 for x in problemas if x.startswith("erro:") or "/_next/" in x or "/images/" in x)
        pagina.close()
    navegador.close()
sys.exit(1 if falhas else 0)

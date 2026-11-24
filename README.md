# Honu Kai Va'a · App de reservas

Aplicativo web de reservas da escola de canoa havaiana Honu Kai Va'a.

- **Front-end:** `index.html` (página única, sem build), `logo.png` e `CocoBiker.ttf`.
- **Banco e login:** Supabase (projeto `honu-kai-vaa`). A chave usada no app é a publicável; os dados são protegidos por regras de acesso (RLS) no banco.
- **Regras:** reservas apenas para o dia seguinte; abrem às 07:00 (pacotes) e 09:00 (demais) e fecham às 20:00; cancelamento até as 20:00 devolve a remada ao saldo.

A fonte Coco Biker é a versão trial: confirme a licença antes de uso comercial.

# Honu Kai Va'a · App de reservas

Aplicativo web de reservas da escola de canoa havaiana Honu Kai Va'a.

- **Front-end:** `index.html` (página única, sem build), `logo.png` e `CocoBiker.ttf`.
- **Banco e login:** Supabase (projeto `honu-kai-vaa`). A chave usada no app é a publicável; os dados são protegidos por regras de acesso (RLS) no banco.
- **Regras:** reservas apenas para o dia seguinte; abrem às 07:00 (pacotes) e 09:00 (demais) e fecham às 23:30; cancelamento até as 21:00 devolve a remada ao saldo.

**Fonte:** Coco Biker (Studio Kmzero / Zetafonts), arquivo `CocoBiker.ttf`, em caixa alta. O arquivo atual é a versão trial: a licença web comercial deve ser adquirida em zetafonts.com.

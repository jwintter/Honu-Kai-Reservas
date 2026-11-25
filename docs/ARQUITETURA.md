# Honu Kai Va'a · Arquitetura (sem planilha)

Uma única fonte de dados: **Supabase** (projeto `honu-kai-vaa`). O Google Sheets não faz mais parte do sistema.

```
Aluno ──► App (GitHub Pages) ──► Supabase (login, regras, dados)
WhatsApp ─► n8n (bot) ───────────► Supabase  (via workflow "Supabase (API)", token em credencial do n8n)
Jhon ─────► Painel (no próprio app) ─► Supabase
```

## Dados (schema `public`)
| Tabela | Conteúdo |
|---|---|
| `perfis` | contas de login (e-mail, papel aluno/admin) |
| `alunos` | cadastro único de pessoas (telefone, nome, e-mail, dependentes via `responsavel_id`); independe de ter login |
| `pacotes` | pacotes comprados (total, validade, valor). O saldo é calculado, não armazenado |
| `grade`, `feriados`, `sessoes` | horários, feriados (`abre` = true só quando confirmado) e remadas geradas |
| `reservas` | status: confirmada, pagamento_pendente, espera, cancelada, falta, realizada |
| `pendencias` | fila do Jhon (financeiro, marketing, suporte, reservas) |
| `configuracao` | parâmetros; `publica = false` esconde do aluno |
| `mensagens_log` | log do WhatsApp (apagado após 90 dias) |
| `segredos` | hash do token do bot (nunca o token) |

## Regras (funções `core_*`, não expostas)
Reserva só para amanhã; abre 07:00 (pacote) / 09:00 (demais); fecha 23:30; cancelamento com devolução até 21:00. Criança de 2 a 7 anos vai no banco do responsável. Segunda remada no mesmo dia é provisória e cede a vaga à lista de espera. Avulsa fica `pagamento_pendente` até o Pix. Cancelar até 20:00 do dia anterior devolve a remada; depois disso a vaga é liberada e a remada continua descontada. Quando abre vaga, o primeiro da espera é chamado (não promovido sozinho).

## Acesso
- App/painel: funções `reservar`, `cancelar`, `listar_sessoes`, `meu_saldo`, `janela_reservas`, `completar_cadastro` e `admin_*`; todas conferem `auth.uid()`.
- Bot: funções `bot_*`; exigem o cabeçalho `x-bot-token`.
- Tabelas com RLS: aluno vê só o que é dele; admin vê tudo.

## Rotinas
- `pg_cron` 03:05 UTC: gera as remadas dos próximos 14 dias.
- `pg_cron` 03:30 UTC: apaga log de mensagens com mais de 90 dias.

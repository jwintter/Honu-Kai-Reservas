'use client'
import { useEffect, useState } from 'react'
import { useDados, exigir, Estado } from './comum'

const quando = t => new Date(t).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })

export default function Atendimento({ avisar }) {
  const [chave, setChave] = useState(null)
  const [texto, setTexto] = useState('')
  const lista = useDados(async sb => exigir(await sb.rpc('admin_conversas')), [], avisar)
  const conversa = useDados(async sb => chave ? exigir(await sb.rpc('admin_thread', { p_chave: chave })) : [], [chave], avisar)
  const sel = lista.dados?.find(c => c.chave === chave)

  useEffect(() => {
    const t = setInterval(() => { lista.carregar(); if (chave) conversa.carregar() }, 20000)
    return () => clearInterval(t)
  }, [lista.carregar, conversa.carregar, chave]) // eslint-disable-line react-hooks/exhaustive-deps

  async function enviar() {
    if (await conversa.acao(sb => sb.rpc('admin_enviar', { p_chave: chave, p_texto: texto }), 'Mensagem na fila de envio.')) { setTexto(''); lista.carregar() }
  }

  return (
    <>
      <h1 className="hk-titulo">Atendimento</h1>
      <Estado erro={lista.erro} dados={lista.dados}>
        <div className="hk-atendimento">
          <div className="hk-lista">
            {!lista.dados?.length && <p className="hk-vazio">Nenhuma conversa ainda.</p>}
            {(lista.dados || []).map(c => (
              <button key={c.chave} className="hk-cartao hk-conversa" onClick={() => { setChave(c.chave); setTexto('') }}>
                <b>{c.nome || c.telefone}{c.nao_lidas > 0 ? ` (${c.nao_lidas})` : ''}</b>
                <small>{c.ultima_msg}</small><small>{c.modo === 'humano' ? 'Você atende' : 'Bot'} · {quando(c.ultima_em)}</small>
              </button>
            ))}
          </div>
          {sel && (
            <div className="hk-cartao">
              <div className="hk-linha"><b>{sel.nome || sel.telefone}</b>
                <button className="btn btn-sm btn-outline" onClick={() => lista.acao(sb => sb.rpc('admin_modo', { p_chave: chave, p_humano: sel.modo !== 'humano' }), 'Atualizado.')}>{sel.modo === 'humano' ? 'Devolver ao bot' : 'Assumir conversa'}</button></div>
              <div className="hk-mensagens">{(conversa.dados || []).map((m, i) => <div key={i} className={m.direcao === 'recebida' ? '' : 'minha'}><p>{m.mensagem}</p><small>{m.direcao === 'falhou' ? 'Falhou · ' : ''}{quando(m.criado_em)}</small></div>)}</div>
              {sel.janela_aberta ? <><textarea className="inp" rows={2} value={texto} onChange={e => setTexto(e.target.value)} /><button className="btn btn-green" disabled={!texto.trim()} onClick={enviar}>Enviar</button></>
                : <p className="hk-msg">Passaram mais de 24 h desde a última mensagem. O WhatsApp só permite modelos aprovados nesse caso.</p>}
            </div>
          )}
        </div>
      </Estado>
    </>
  )
}

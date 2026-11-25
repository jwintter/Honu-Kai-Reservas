'use client'
import { raiz } from '@/lib/caminho'
import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'
import { dataBR, dataLonga, hora, inicioRemada, reais } from '@/lib/formato'
import { useToast } from '../Toast'
import Modal from '../Modal'

const ROTULO = { confirmada: 'Confirmada', pagamento_pendente: 'Falta o Pix', espera: 'Lista de espera', cancelada: 'Cancelada', falta: 'Falta', realizada: 'Realizada' }
const ATIVAS = ['confirmada', 'pagamento_pendente', 'espera']

export default function MinhaArea({ sessao, config }) {
  const [dados, setDados] = useState(null)
  const [aba, setAba] = useState('reservas')
  const [cancelando, setCancelando] = useState(null) // { reserva, liberar, mensagem }
  const [enviando, setEnviando] = useState(false)
  const [avisar, toast] = useToast()

  const carregar = useCallback(async () => {
    const sb = getSupabase()
    // meus_alunos = o próprio aluno e dependentes. O filtro importa quando quem entra é admin.
    const { data: ids, error } = await sb.rpc('meus_alunos')
    if (error) return avisar(textoErro(error), 'error')
    const lista = (ids || []).map(x => typeof x === 'string' ? x : x.meus_alunos)
    const [r, p, s] = await Promise.all([
      sb.from('reservas').select('id,status,pacote_id,nome_remador,banco_proprio,provisoria,posicao_espera,sessoes(data,hora,chegada)').in('aluno_id', lista).order('criado_em', { ascending: false }).limit(60),
      sb.from('pacotes').select('id,total,validade,valor_pago,criado_em').in('aluno_id', lista).order('criado_em', { ascending: false }).limit(12),
      sb.rpc('meu_saldo'),
    ])
    if (r.error || p.error || s.error) return avisar(textoErro(r.error || p.error || s.error), 'error')
    const todas = r.data.filter(x => x.sessoes).sort((a, b) => (b.sessoes.data + b.sessoes.hora).localeCompare(a.sessoes.data + a.sessoes.hora))
    const futura = x => ATIVAS.includes(x.status) && inicioRemada(x.sessoes.data, x.sessoes.hora) > new Date()
    setDados({ ativas: todas.filter(futura).reverse(), historico: todas.filter(x => !futura(x)), pacotes: p.data, saldo: s.data?.[0] || { saldo: 0 } })
  }, [avisar])
  useEffect(() => { carregar() }, [carregar])

  // O banco decide o prazo: se já passou, ele devolve "confirmar_liberacao" sem alterar nada.
  async function cancelar() {
    setEnviando(true)
    const { data, error } = await getSupabase().rpc('cancelar', { p_reserva: cancelando.reserva.id, p_liberar: !!cancelando.liberar })
    setEnviando(false)
    if (error) { setCancelando(null); return avisar(textoErro(error), 'error') }
    if (data.status === 'confirmar_liberacao') return setCancelando({ ...cancelando, liberar: true, mensagem: data.mensagem })
    setCancelando(null)
    avisar(data.mensagem, data.ok ? 'success' : 'error')
    carregar()
  }

  const cartao = (r, ativa) => (
    <div key={r.id} className="hk-cartao">
      <div className="hk-linha">
        <span><b className="hk-hora">{hora(r.sessoes.hora)}</b><br />{dataLonga(r.sessoes.data)}</span>
        <span className={r.status === 'confirmada' || r.status === 'realizada' ? 'badge-green' : 'badge-gray'}>{ROTULO[r.status]}</span>
      </div>
      <small>{r.nome_remador} · chegada {hora(r.sessoes.chegada)}
        {r.provisoria && ativa ? ' · 2ª remada provisória' : ''}{r.status === 'espera' && r.posicao_espera ? ` · ${r.posicao_espera}º na espera` : ''}</small>
      {ativa && <button className="btn btn-danger" onClick={() => setCancelando({ reserva: r })}>Cancelar</button>}
    </div>
  )

  if (!dados) return <p className="hk-vazio">Carregando...</p>
  return (
    <>
      <h1 className="hk-titulo">Olá, {sessao.nome}! 🐢</h1>
      <div className="hk-numeros">
        <div><b>{dados.ativas.length}</b><small>Ativas</small></div>
        <div><b>{dados.historico.filter(x => x.status === 'realizada').length}</b><small>Realizadas</small></div>
        <div><b>{dados.saldo.saldo}</b><small>{dados.saldo.validade ? `Saldo até ${dataBR(dados.saldo.validade)}` : 'Saldo'}</small></div>
      </div>
      <div className="hk-abas">
        {[['reservas', '🏄 Reservas'], ['pacotes', '🎫 Pacotes']].map(([k, t]) => <button key={k} className={aba === k ? 'on' : ''} onClick={() => setAba(k)}>{t}</button>)}
      </div>
      {aba === 'reservas' && (
        <div className="hk-lista">
          {dados.ativas.map(r => cartao(r, true))}
          {!dados.ativas.length && <p className="hk-vazio">Você não tem reservas ativas.</p>}
          <a className="btn btn-green hk-cheio" href={raiz('/#reservas')}>Reservar remada</a>
          {!!dados.historico.length && <h3>Histórico</h3>}
          {dados.historico.slice(0, 15).map(r => cartao(r, false))}
        </div>
      )}
      {aba === 'pacotes' && (
        <div className="hk-lista">
          {!dados.pacotes.length && <p className="hk-vazio">Você ainda não tem pacotes.</p>}
          {dados.pacotes.map(p => (
            <div key={p.id} className="hk-cartao"><b>🎫 Pacote de {p.total} remadas</b>
              <small>Comprado em {new Date(p.criado_em).toLocaleDateString('pt-BR')} · válido até {dataBR(p.validade)}{p.valor_pago != null ? ` · ${reais(p.valor_pago)}` : ''}</small></div>
          ))}
          <a className="btn btn-green hk-cheio" href={raiz('/planos/')}>Ver pacotes</a>
        </div>
      )}
      {cancelando && (
        <Modal titulo={cancelando.liberar ? 'Liberar a vaga?' : 'Cancelar reserva?'} onFechar={() => setCancelando(null)}>
          <p>{cancelando.mensagem || `Cancelando até as ${config.hora_limite_cancelamento} do dia anterior, a remada do pacote volta ao saldo.`}</p>
          <button className="btn btn-green hk-cheio" disabled={enviando} onClick={cancelar}>{cancelando.liberar ? 'Sim, liberar a vaga' : 'Sim, cancelar'}</button>
          <button className="btn btn-outline hk-cheio" onClick={() => setCancelando(null)}>Manter reserva</button>
        </Modal>
      )}
      {toast}
    </>
  )
}

'use client'
import { raiz } from '@/lib/caminho'
import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'
import { WHATSAPP } from '@/lib/conteudo'
import { dataBR, dataLonga, hora, reais, linkWhats } from '@/lib/formato'
import Modal from '../Modal'
import Parceiros from './Parceiros'
import Passeio from './Passeio'

const DIAS = ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Feriado']
const ESTADO = { confirmada: 'Sua remada ✓', pagamento_pendente: 'Falta o Pix', espera: 'Na espera' }

/** Todas as regras (janela, vagas, saldo, 2ª remada, espera) são decididas pelo banco. */
export default function Reservas({ sessao, site, avisar, pedirAcesso }) {
  const { config, grade, passeios } = site
  const logado = sessao.etapa === 'pronto' && !!sessao.alunoId
  const [semana, setSemana] = useState(null)
  const [janela, setJanela] = useState(null)
  const [saldo, setSaldo] = useState({ saldo: 0, validade: null })
  const [dia, setDia] = useState(null)
  const [escolhida, setEscolhida] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [falha, setFalha] = useState('')

  const carregar = useCallback(async () => {
    const sb = getSupabase()
    const [s, j, m] = await Promise.all([sb.rpc('listar_semana'), sb.rpc('janela_reservas'), sb.rpc('meu_saldo')])
    if (s.error || j.error || m.error) return setFalha(textoErro(s.error || j.error || m.error))
    setFalha(''); setSemana(s.data || []); setJanela(j.data); setSaldo(m.data?.[0] || { saldo: 0, validade: null })
    setDia(atual => atual || j.data?.data)
  }, [])
  useEffect(() => { if (logado) carregar(); else { setSemana(null); setDia(null) } }, [logado, carregar])

  async function confirmar() {
    setEnviando(true)
    const { data, error } = await getSupabase().rpc('reservar', { p_sessao: escolhida.id })
    setEnviando(false); setEscolhida(null)
    if (error) avisar(textoErro(error), 'error')
    else if (!data.ok) avisar(data.mensagem || 'Não foi possível reservar.', 'error')
    else setResultado(data)
    carregar()
  }

  const dias = [...new Set((semana || []).map(s => s.data))]
  const doDia = (semana || []).filter(s => s.data === dia)
  const comPacote = janela?.tem_pacote && saldo.saldo > 0

  return (
    <section id="reservas" style={{ padding: '40px 20px', background: 'var(--hk-bg2)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div className="reveal hk-etiqueta">Reservas</div>
        <h2 className="reveal d1 hk-titulo">Sua próxima remada</h2>
        <div className="reveal d2 divider" />
        <p className="hk-lead">As reservas são sempre para o dia seguinte. Abrem às {config.hora_abertura_mensalista} para quem tem pacote e às {config.hora_abertura_geral} para os demais, e fecham às {config.hora_fechamento_reservas}.</p>

        <div className="reservas-grid">
          <div>
            {!logado && (
              <div className="hk-cartao">
                <h3>Horários das remadas</h3>
                {DIAS.map(d => {
                  const hs = grade.filter(g => g.dia === d).map(g => g.hora)
                  return hs.length ? <div className="hk-linha" key={d}><span>{d}</span><b>{hs.join(' · ')}</b></div> : null
                })}
                <button className="btn btn-green hk-cheio" onClick={pedirAcesso}>{sessao.etapa === 'visitante' ? 'Entrar para reservar' : 'Continuar para reservar'}</button>
              </div>
            )}

            {logado && falha && <div className="hk-cartao"><p className="hk-msg erro">{falha}</p><button className="btn btn-outline" onClick={carregar}>Tentar de novo</button></div>}
            {logado && !semana && !falha && <p className="hk-vazio">Carregando remadas...</p>}

            {logado && semana && (
              <>
                <div className="hk-saldo">
                  <span>{saldo.saldo > 0 ? <><b>{saldo.saldo}</b> {saldo.saldo === 1 ? 'remada' : 'remadas'} · válidas até {dataBR(saldo.validade)}</> : 'Você não tem pacote ativo'}</span>
                  <a href={raiz('/aluno/')}>Minha área →</a>
                </div>
                {janela && !janela.aberta && <p className="hk-msg">As reservas não estão abertas para você agora. Para o seu perfil, abrem às {janela.abre_para_mim} e fecham às {janela.fecha}.</p>}
                <div className="hk-dias">
                  {dias.map(d => (
                    <button key={d} className={`${d === dia ? 'on' : ''} ${d === janela?.data ? 'aberto' : ''}`} onClick={() => setDia(d)}>
                      <span>{dataBR(d, { weekday: 'short' }).replace('.', '')}</span><b>{d.slice(8)}</b>
                    </button>
                  ))}
                </div>
                <div className="hk-lista">
                  {!doDia.length && <p className="hk-vazio">Sem remadas neste dia.</p>}
                  {doDia.map(s => {
                    const pode = s.reservavel && !s.fechada && !s.minha_status
                    return (
                      <div key={s.id} className={`turma-card ${s.minha_status ? 'reservada' : ''}`} style={{ cursor: 'default', opacity: pode || s.minha_status ? 1 : .6 }}>
                        <div style={{ flex: 1 }}>
                          <div className="hk-hora">{hora(s.hora)}</div>
                          <small>Chegada {hora(s.chegada)}</small>
                        </div>
                        <div className="hk-vagas"><b className={s.lotado ? 'lotado' : ''}>{s.fechada ? '—' : s.vagas}</b><small>{s.fechada ? 'fechada' : s.lotado ? 'lotado' : 'vagas'}</small></div>
                        {s.minha_status ? <span className="badge-green">{ESTADO[s.minha_status]}</span>
                          : pode ? <button className={`btn btn-sm ${s.lotado ? 'btn-outline' : 'btn-green'}`} disabled={!janela?.aberta} onClick={() => setEscolhida(s)}>{s.lotado ? 'Lista de espera' : 'Reservar'}</button>
                            : null}
                      </div>
                    )
                  })}
                </div>
                {dia !== janela?.data && <p className="hk-lead">Este dia aparece para você se programar. Só as remadas de {dataLonga(janela?.data)} podem ser reservadas agora.</p>}
              </>
            )}
          </div>
          <div className="hk-lista">
            <Parceiros config={config} />
            <Passeio passeio={passeios[0]} />
          </div>
        </div>
      </div>

      {escolhida && (
        <Modal sobre={escolhida.lotado ? 'Lista de espera' : 'Confirmar reserva'} titulo={`${dataLonga(escolhida.data)}, ${hora(escolhida.hora)}`} onFechar={() => setEscolhida(null)}>
          <p>{escolhida.lotado ? 'Horário lotado. Você entra na lista de espera e, se abrir vaga, a gente te chama.'
            : comPacote ? `Usa 1 remada do seu saldo (você tem ${saldo.saldo}). Cancelando até as ${janela.cancela_ate} do dia anterior, ela volta.`
              : `Remada avulsa: ${reais(config.valor_remada_avulsa)}, paga por Pix até as ${janela.pix_ate} de hoje.`}</p>
          <button className="btn btn-green hk-cheio" disabled={enviando} onClick={confirmar}>{enviando ? 'Aguarde...' : escolhida.lotado ? 'Entrar na lista de espera' : 'Confirmar'}</button>
        </Modal>
      )}

      {resultado && (
        <Modal titulo={resultado.status === 'espera' ? 'Você está na espera' : resultado.status === 'pagamento_pendente' ? 'Falta o Pix' : 'Remada confirmada'} onFechar={() => setResultado(null)}>
          {resultado.status === 'pagamento_pendente' ? (
            <>
              <p>Sua vaga das {resultado.hora} está guardada. Faça o Pix de {resultado.valor_cobrado} e envie o comprovante pelo WhatsApp. O Jhon confere e confirma.</p>
              {resultado.provisoria === 'sim' && <p>Esta é sua 2ª remada do dia e fica provisória: se alguém entrar na espera, a vaga passa para essa pessoa.</p>}
              <a className="btn btn-green hk-cheio" target="_blank" rel="noopener noreferrer" href={linkWhats(WHATSAPP, `Aloha! Reservei a remada de ${dataLonga(resultado.data)} às ${resultado.hora} e vou enviar o comprovante do Pix.`)}>Enviar comprovante</a>
            </>
          ) : <p style={{ whiteSpace: 'pre-line' }}>{resultado.mensagem}</p>}
          <button className="btn btn-outline hk-cheio" onClick={() => setResultado(null)}>Fechar</button>
        </Modal>
      )}
    </section>
  )
}

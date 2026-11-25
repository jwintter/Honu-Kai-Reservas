'use client'
import { useState } from 'react'
import { dataLonga, hora, hojeSP, somaDias, linkWhats } from '@/lib/formato'
import Modal from '../Modal'
import { useDados, exigir, Estado } from './comum'

const ROTULO = { confirmada: 'Confirmada', pagamento_pendente: 'Falta o Pix', espera: 'Espera', falta: 'Falta', realizada: 'Presente', reservada: 'Reservada', presente: 'Presente' }

export default function Sessoes({ avisar }) {
  const [dia, setDia] = useState(somaDias(hojeSP(), 1))
  const [plataforma, setPlataforma] = useState(null)
  const [cancelar, setCancelar] = useState(null)
  const [aviso, setAviso] = useState(null)
  const { dados, erro, acao } = useDados(async sb => exigir(await sb.from('sessoes')
    .select('id,data,hora,cota_app,cota_plataformas,status,reservas(id,status,pago,pacote_id,banco_proprio,provisoria,nome_remador,criado_em,alunos(telefone,responsavel_id)),reservas_plataforma(id,plataforma,nome,status,repor_ate)')
    .eq('data', dia).order('hora')), [dia], avisar)

  async function cancelarReserva(r) {
    if (!window.confirm(`Cancelar a reserva de ${r.nome_remador}?`)) return
    const res = await acao(sb => sb.rpc('admin_cancelar', { p_reserva: r.id, p_liberar: true }), 'Reserva cancelada.')
    if (res?.chamar_espera) setAviso({ titulo: 'Chamar o próximo da espera', pessoas: [res.chamar_espera], texto: res.chamar_espera.mensagem })
  }

  async function cancelarRemada() {
    const res = await acao(sb => sb.rpc('admin_cancelar_sessao', { p_sessao: cancelar.id }), 'Remada cancelada.')
    setCancelar(null)
    // Texto padrão da escola: nunca citar clima como motivo.
    if (res) setAviso({ titulo: `Avisar ${res.canceladas} reserva(s)`, pessoas: res.avisar, plataformas: res.plataformas,
      texto: `Aloha! A remada de ${dataLonga(res.data)} às ${res.hora} foi cancelada. Se você usou pacote, ela voltou para o seu saldo. 🌊` })
  }

  function linha(r) {
    const status = novo => acao(sb => sb.from('reservas').update({ status: novo }).eq('id', r.id), 'Registrado.')
    return (
      <div key={r.id} className="hk-pessoa">
        <div><b>{r.nome_remador}</b><small>{!r.banco_proprio ? 'criança no banco' : r.pacote_id ? 'pacote' : `avulsa${r.pago ? ' (paga)' : ''}`}{r.provisoria ? ' · provisória' : ''} · {ROTULO[r.status]}</small></div>
        <div className="hk-acoes">
          {r.status === 'pagamento_pendente' && <button onClick={() => acao(sb => sb.rpc('admin_marcar_pago', { p_reserva: r.id }), 'Pix registrado.')}>Pix recebido</button>}
          {r.status === 'espera' && r.banco_proprio && <button onClick={() => acao(sb => sb.rpc('admin_aceitar_espera', { p_reserva: r.id }), 'Vaga concedida.')}>Dar a vaga</button>}
          {r.status === 'confirmada' && <><button onClick={() => status('realizada')}>Presente</button><button onClick={() => status('falta')}>Falta</button></>}
          {['confirmada', 'pagamento_pendente', 'espera'].includes(r.status) && <button className="perigo" onClick={() => cancelarReserva(r)}>Cancelar</button>}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="hk-linha"><h1 className="hk-titulo">Sessões</h1><input type="date" className="inp" value={dia} onChange={e => e.target.value && setDia(e.target.value)} /></div>
      <Estado erro={erro} dados={dados}>
        {!dados?.length && <p className="hk-vazio">Sem remadas neste dia.</p>}
        <div className="hk-grade">
          {(dados || []).map(s => {
            const visiveis = s.reservas.filter(r => r.status !== 'cancelada').sort((a, b) => a.criado_em.localeCompare(b.criado_em))
            const espera = visiveis.filter(r => r.status === 'espera')
            const inscritos = visiveis.filter(r => r.status !== 'espera')
            const ocupam = inscritos.filter(r => r.banco_proprio && ['confirmada', 'pagamento_pendente'].includes(r.status)).length
            const plats = s.reservas_plataforma.filter(x => x.status !== 'cancelada')
            const fechada = s.status === 'cancelada'
            return (
              <div key={s.id} className="hk-cartao" style={{ opacity: fechada ? .6 : 1 }}>
                <div className="hk-linha"><b className="hk-hora">{hora(s.hora)}</b><b>{fechada ? 'CANCELADA' : `App ${ocupam}/${s.cota_app} · Plataformas ${plats.length}/${s.cota_plataformas}`}</b></div>
                {inscritos.map(linha)}
                {!inscritos.length && <small>Nenhuma reserva.</small>}
                {!!plats.length && <b>Wellhub / TotalPass</b>}
                {plats.map(x => (
                  <div key={x.id} className="hk-pessoa">
                    <div><b>{x.nome}</b><small>{x.plataforma} · {ROTULO[x.status]}{x.status === 'falta' && x.repor_ate ? ' · repor check-in' : ''}</small></div>
                    <div className="hk-acoes">
                      {x.status === 'reservada' && ['presente', 'falta'].map(n => <button key={n} onClick={() => acao(sb => sb.from('reservas_plataforma').update({ status: n }).eq('id', x.id), 'Registrado.')}>{ROTULO[n]}</button>)}
                      <button className="perigo" onClick={() => acao(sb => sb.from('reservas_plataforma').update({ status: 'cancelada' }).eq('id', x.id), 'Cancelada.')}>Cancelar</button>
                    </div>
                  </div>
                ))}
                {!!espera.length && <><b>Lista de espera</b>{espera.map(linha)}</>}
                {!fechada && <div className="hk-acoes" style={{ marginTop: 10 }}>
                  {plats.length < s.cota_plataformas && <button onClick={() => setPlataforma({ sessao_id: s.id, plataforma: 'totalpass', nome: '' })}>+ Plataforma</button>}
                  <button className="perigo" onClick={() => setCancelar(s)}>Cancelar remada</button>
                </div>}
              </div>
            )
          })}
        </div>
      </Estado>

      {plataforma && (
        <Modal titulo="Reserva de plataforma" onFechar={() => setPlataforma(null)}>
          <select className="inp" value={plataforma.plataforma} onChange={e => setPlataforma({ ...plataforma, plataforma: e.target.value })}><option value="totalpass">TotalPass</option><option value="wellhub">Wellhub</option></select>
          <input className="inp" placeholder="Nome e sobrenome" value={plataforma.nome} onChange={e => setPlataforma({ ...plataforma, nome: e.target.value })} />
          <button className="btn btn-green hk-cheio" disabled={plataforma.nome.trim().length < 3} onClick={async () => { if (await acao(sb => sb.from('reservas_plataforma').insert(plataforma), 'Lançada.')) setPlataforma(null) }}>Lançar</button>
        </Modal>
      )}
      {cancelar && (
        <Modal titulo={`Cancelar a remada das ${hora(cancelar.hora)}?`} onFechar={() => setCancelar(null)}>
          <p>Todas as reservas serão canceladas e as de pacote voltam ao saldo. Avulsas pagas viram uma pendência para você lançar o crédito. O aviso aos alunos não é automático.</p>
          <button className="btn btn-green hk-cheio" onClick={cancelarRemada}>Sim, cancelar a remada</button>
          <button className="btn btn-outline hk-cheio" onClick={() => setCancelar(null)}>Voltar</button>
        </Modal>
      )}
      {aviso && (
        <Modal titulo={aviso.titulo} onFechar={() => setAviso(null)}>
          <p>{aviso.texto}</p>
          {aviso.pessoas.map((p, i) => <div key={i} className="hk-linha"><span>{p.nome}</span>{p.telefone ? <a className="btn btn-sm btn-green" target="_blank" rel="noopener noreferrer" href={linkWhats(p.telefone, aviso.texto)}>WhatsApp</a> : <small>sem telefone</small>}</div>)}
          {!!aviso.plataformas?.length && <p>Avisar também pelo Tecnofit: {aviso.plataformas.map(x => x.nome).join(', ')}.</p>}
        </Modal>
      )}
    </>
  )
}

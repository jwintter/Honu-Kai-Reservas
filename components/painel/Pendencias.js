'use client'
import { linkWhats } from '@/lib/formato'
import { useDados, exigir, Estado } from './comum'

export default function Pendencias({ avisar }) {
  const { dados, erro, acao } = useDados(async sb => exigir(await sb.from('pendencias').select('*,alunos(nome,telefone)').neq('status', 'resolvida').order('criado_em')), [], avisar)
  const mudar = (p, status) => acao(sb => sb.from('pendencias').update({
    status, atualizada_em: new Date().toISOString(),
    ...(status === 'resolvida' ? { resolvido_em: new Date().toISOString() } : {}),
    ...(status === 'adiada' ? { proximo_lembrete: new Date(Date.now() + 2 * 3600e3).toISOString() } : {}),
  }).eq('id', p.id), 'Pendência atualizada.')
  return (
    <>
      <h1 className="hk-titulo">Pendências</h1>
      <Estado erro={erro} dados={dados}>
        {!dados?.length && <p className="hk-vazio">Nenhuma pendência em aberto.</p>}
        <div className="hk-grade">
          {(dados || []).map(p => {
            const tel = p.telefone || p.alunos?.telefone
            return (
              <div key={p.id} className="hk-cartao">
                <span className="badge-gray">{p.categoria}{p.status !== 'aberta' ? ` · ${p.status}` : ''}</span>
                <b>{p.assunto}</b><small>{p.nome || p.alunos?.nome || ''}</small>{p.detalhe && <p>{p.detalhe}</p>}
                <div className="hk-acoes">
                  {tel && <a target="_blank" rel="noopener noreferrer" href={linkWhats(tel)}>WhatsApp</a>}
                  <button onClick={() => mudar(p, 'resolvida')}>Resolver</button>
                  {p.status !== 'assumida' && <button onClick={() => mudar(p, 'assumida')}>Assumir</button>}
                  <button onClick={() => mudar(p, 'adiada')}>Depois</button>
                </div>
              </div>
            )
          })}
        </div>
      </Estado>
    </>
  )
}

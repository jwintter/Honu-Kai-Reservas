'use client'
import { linkWhats } from '@/lib/formato'
import { useDados, exigir, Estado } from './comum'

export default function Empresas({ avisar }) {
  const { dados, erro, acao } = useDados(async sb => exigir(await sb.from('site_contatos_empresa').select('*').order('criado_em', { ascending: false }).limit(100)), [], avisar)
  return (
    <>
      <h1 className="hk-titulo">Empresas</h1>
      <Estado erro={erro} dados={dados}>
        {!dados?.length && <p className="hk-vazio">Nenhuma solicitação ainda.</p>}
        <div className="hk-grade">{(dados || []).map(c => (
          <div key={c.id} className="hk-cartao" style={{ opacity: c.atendido ? .6 : 1 }}>
            <b>{c.nome}{c.empresa ? ` · ${c.empresa}` : ''}</b>
            <small>{c.email}{c.telefone ? ` · ${c.telefone}` : ''} · {c.pessoas} pessoas</small>
            {c.objetivo && <p>{c.objetivo}</p>}{c.dinamica && <p>{c.dinamica}</p>}
            <div className="hk-acoes">
              {c.telefone && <a target="_blank" rel="noopener noreferrer" href={linkWhats(c.telefone, `Olá ${c.nome}! Vi sua solicitação na Honu Kai.`)}>WhatsApp</a>}
              <a href={`mailto:${c.email}`}>E-mail</a>
              <button onClick={() => acao(sb => sb.from('site_contatos_empresa').update({ atendido: !c.atendido }).eq('id', c.id), 'Atualizado.')}>{c.atendido ? 'Reabrir' : 'Marcar atendido'}</button>
            </div>
          </div>
        ))}</div>
      </Estado>
    </>
  )
}

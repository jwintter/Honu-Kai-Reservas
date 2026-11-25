'use client'
import { useState } from 'react'
import { useSessao } from '@/lib/useSessao'
import { useSite } from '@/lib/useSite'
import { useToast } from '../Toast'
import Portao from '../conta/Portao'
import { Marca } from '../home/Nav'
import Sessoes from './Sessoes'
import Pendencias from './Pendencias'
import Atendimento from './Atendimento'
import Alunos from './Alunos'
import Pacotes from './Pacotes'
import Agenda from './Agenda'
import Conteudo from './Conteudo'
import Empresas from './Empresas'

const ABAS = [
  ['sessoes', '📅 Sessões', Sessoes], ['pendencias', '📌 Pendências', Pendencias], ['atendimento', '💬 Atendimento', Atendimento],
  ['alunos', '🏄 Alunos', Alunos], ['pacotes', '🎫 Pacotes', Pacotes], ['agenda', '⚙️ Agenda e preços', Agenda],
  ['conteudo', '🖼️ Site', Conteudo], ['empresas', '💼 Empresas', Empresas],
]

export default function Painel() {
  const sessao = useSessao()
  const { config } = useSite()
  const [aba, setAba] = useState('sessoes')
  const [avisar, toast] = useToast()
  const Aba = ABAS.find(a => a[0] === aba)[2]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hk-bg)' }}>
      <nav className="hk-nav escuro"><Marca />{sessao.user && <button className="btn btn-sm btn-green" onClick={sessao.sair}>Sair</button>}</nav>
      {sessao.etapa !== 'pronto' ? <main className="hk-estreito"><div className="hk-cartao"><Portao sessao={sessao} linkPrivacidade={config.link_privacidade} /></div></main>
        : !sessao.admin ? <main className="hk-estreito"><p className="hk-cartao">Esta conta não tem acesso ao painel.</p></main>
          : (
            <>
              <div className="hk-menu">{ABAS.map(([k, t]) => <button key={k} className={aba === k ? 'on' : ''} onClick={() => setAba(k)}>{t}</button>)}</div>
              <main className="hk-painel"><Aba avisar={avisar} /></main>
            </>
          )}
      {toast}
    </div>
  )
}

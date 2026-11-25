'use client'
import { raiz } from '@/lib/caminho'
import { useSessao } from '@/lib/useSessao'
import { useSite } from '@/lib/useSite'
import Portao from '@/components/conta/Portao'
import MinhaArea from '@/components/conta/MinhaArea'
import { Marca } from '@/components/home/Nav'

export default function AlunoPage() {
  const sessao = useSessao()
  const { config } = useSite()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hk-bg)' }}>
      <nav className="hk-nav">
        <Marca />
        <div style={{ display: 'flex', gap: 8 }}>
          {sessao.admin && <a className="btn btn-sm btn-outline-green" href={raiz('/admin/')}>Painel</a>}
          {sessao.user && <button className="btn btn-sm btn-outline" onClick={sessao.sair}>Sair</button>}
        </div>
      </nav>
      <main className="hk-estreito">
        {sessao.etapa !== 'pronto' ? <div className="hk-cartao"><Portao sessao={sessao} linkPrivacidade={config.link_privacidade} /></div>
          : sessao.alunoId ? <MinhaArea sessao={sessao} config={config} />
            : <p className="hk-cartao">Esta conta é de administração e não tem cadastro de aluno. <a href={raiz('/admin/')}><u>Ir para o painel</u></a></p>}
      </main>
    </div>
  )
}

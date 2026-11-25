import { raiz } from '@/lib/caminho'
const LINKS = [['#sobre', 'Sobre'], ['#galeria', 'Galeria'], ['#reservas', 'Reservar'], ['#passes', 'Passes'], ['#empresas', 'Empresas'], ['#contato', 'Contato']]

export function Marca() {
  return (
    <a href={raiz('/')} className="hk-marca">
      <img src={raiz('/images/logo_honukai_new.png')} alt="" />
      <span><b>HONU <i>KAI</i></b><small>Va&apos;a · Vitória</small></span>
    </a>
  )
}

export default function Nav({ sessao, aoEntrar }) {
  return (
    <nav className="hk-nav">
      <Marca />
      <div className="nav-links">{LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {sessao.user ? (
          <>
            {sessao.admin && <a className="btn btn-sm btn-outline-green" href={raiz('/admin/')}>Painel</a>}
            <a className="btn btn-sm btn-outline" href={raiz('/aluno/')}>Minha área</a>
          </>
        ) : <button className="btn btn-sm btn-green" onClick={aoEntrar}>Entrar</button>}
      </div>
    </nav>
  )
}

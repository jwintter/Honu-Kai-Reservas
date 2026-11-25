import { raiz } from '@/lib/caminho'
import { WHATSAPP } from '@/lib/conteudo'

export default function Parceiros({ config }) {
  const itens = [
    { img: raiz('/images/logo_wellhub.png'), t: 'Wellhub / Gympass', d: `A partir do ${config.wellhub_plano_minimo} · reserva pelo app`, url: 'https://links.wellhub.com/view/partners/honu-kai-va-a-enseada-do-sua' },
    { img: raiz('/images/logo_totalpass.png'), t: 'TotalPass', d: `A partir do ${config.totalpass_plano_minimo} · reserva pelo app`, url: 'https://totalpass.com/br/academias/honu-kai-va-a/' },
    { icon: '💬', t: 'WhatsApp', d: '(27) 99734-3759', url: `https://wa.me/${WHATSAPP}` },
  ]
  return (
    <div className="hk-cartao" style={{ padding: 0 }}>
      <div className="hk-etiqueta" style={{ padding: '12px 16px 0' }}>Também reserva por</div>
      {itens.map(r => (
        <div key={r.t} className="hk-parceiro">
          {r.img ? <img src={r.img} alt="" /> : <span>{r.icon}</span>}
          <div style={{ flex: 1 }}><b>{r.t}</b><small>{r.d}</small></div>
          <a className="btn btn-sm btn-outline-green" href={r.url} target="_blank" rel="noopener noreferrer">Abrir</a>
        </div>
      ))}
    </div>
  )
}

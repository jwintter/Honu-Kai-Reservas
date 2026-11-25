import { raiz } from '@/lib/caminho'
import Pacotes from '../Pacotes'

export default function Passes({ config }) {
  return (
    <section id="passes" style={{ padding: '40px 20px', background: 'var(--hk-dark)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', textAlign: 'center' }}>
        <span className="reveal hk-etiqueta" style={{ color: 'var(--hk-greenL)', display: 'block' }}>Passes Honu Kai</span>
        <h2 className="reveal d1 hk-titulo" style={{ color: '#f5f2eb' }}>Reme mais, <em style={{ color: 'var(--hk-greenL)' }}>pague menos.</em></h2>
        <p style={{ fontSize: 13, color: '#aaa', maxWidth: 440, margin: '0 auto 28px' }}>Pacotes válidos por {config.validade_pacote_meses} mês. As remadas não acumulam.</p>
        <Pacotes config={config} />
        <a href={raiz('/planos/')} className="hk-link" style={{ color: '#aaa' }}>Ver como funciona →</a>
      </div>
    </section>
  )
}

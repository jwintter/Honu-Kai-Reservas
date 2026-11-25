'use client'
import { raiz } from '@/lib/caminho'
import Pacotes from '@/components/Pacotes'
import { Marca } from '@/components/home/Nav'
import { useSite } from '@/lib/useSite'
import { reais } from '@/lib/formato'

export default function PlanosPage() {
  const { config } = useSite()
  const regras = [
    ['📅', `Válido por ${config.validade_pacote_meses} mês`, 'As remadas não acumulam: no fim da validade o saldo zera.'],
    ['💠', 'Pagamento por Pix', 'Você combina pelo WhatsApp e o pacote é lançado no seu saldo. Não há cobrança automática.'],
    ['↩️', `Cancele até as ${config.hora_limite_cancelamento}`, 'Cancelando até esse horário no dia anterior, a remada volta para o saldo.'],
    ['🛶', 'Sem pacote?', `A remada avulsa custa ${reais(config.valor_remada_avulsa)}.`],
  ]
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hk-bg)' }}>
      <nav className="hk-nav"><Marca /><a className="btn btn-sm btn-outline" href={raiz('/aluno/')}>Minha área</a></nav>
      <div style={{ background: 'var(--hk-dark)', padding: '40px 20px 56px', textAlign: 'center' }}>
        <span className="hk-etiqueta" style={{ color: 'var(--hk-greenL)', display: 'block' }}>Passes Honu Kai</span>
        <h1 className="hk-titulo" style={{ color: '#f5f2eb' }}>Reme mais,<br /><em style={{ color: 'var(--hk-greenL)' }}>pague menos.</em></h1>
        <Pacotes config={config} />
      </div>
      <div className="hk-regras">
        {regras.map(([i, t, d]) => <div key={t} className="hk-cartao"><span>{i}</span><b>{t}</b><p>{d}</p></div>)}
      </div>
    </div>
  )
}

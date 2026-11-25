import { PACOTES, WHATSAPP } from '@/lib/conteudo'
import { reais, linkWhats } from '@/lib/formato'

/** Pacote é pago por Pix e lançado pelo Jhon no painel. Não há cobrança automática. */
export default function Pacotes({ config }) {
  return (
    <div className="hk-pacotes">
      {PACOTES.map(p => {
        const valor = Number(config[`pacote_${p.total}_valor`])
        return (
          <div key={p.total} className={p.destaque ? 'hk-pacote destaque' : 'hk-pacote'}>
            {p.destaque && <em>Melhor escolha</em>}
            <strong>{p.total}</strong><small>remadas</small>
            <div className="preco">{reais(valor)}</div>
            <small>{reais(valor / p.total)} por remada</small>
            <p>{p.desc}</p>
            <a className="btn btn-sm btn-green" target="_blank" rel="noopener noreferrer"
              href={linkWhats(WHATSAPP, `Aloha! Quero o pacote de ${p.total} remadas.`)}>Comprar no WhatsApp</a>
          </div>
        )
      })}
    </div>
  )
}

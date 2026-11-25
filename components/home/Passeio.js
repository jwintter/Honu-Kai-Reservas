import { raiz } from '@/lib/caminho'
import { WHATSAPP } from '@/lib/conteudo'
import { dataLonga, linkWhats } from '@/lib/formato'

export default function Passeio({ passeio }) {
  const p = passeio || { titulo: 'Passeio', descricao: 'Passeios são combinados com o Jhon: escolha a data e o tamanho do grupo.' }
  return (
    <div className="hk-cartao hk-passeio">
      <img src={p.imagem_url || raiz('/images/foto5_ilha.jpeg')} alt={p.titulo} />
      <div>
        <b>🌿 {p.titulo}</b>
        {p.data && <small className="hk-data">📅 {dataLonga(p.data)}</small>}
        {p.destino && <small className="hk-destino">📍 {p.destino}</small>}
        {p.descricao && <p>{p.descricao}</p>}
        <a className="btn btn-sm btn-green" target="_blank" rel="noopener noreferrer" href={linkWhats(WHATSAPP, `Olá! Quero saber do passeio: ${p.titulo}`)}>Falar no WhatsApp</a>
      </div>
    </div>
  )
}

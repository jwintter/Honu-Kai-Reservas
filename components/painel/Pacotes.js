'use client'
import { dataBR, reais } from '@/lib/formato'
import { useDados, Estado } from './comum'
import { buscarPacotes } from './saldos'

export default function Pacotes({ avisar }) {
  const { dados, erro } = useDados(buscarPacotes, [], avisar)
  return (
    <>
      <h1 className="hk-titulo">Pacotes</h1><p>Para lançar um pacote, use a aba Alunos.</p>
      <Estado erro={erro} dados={dados}>
        <div className="hk-tabela"><table>
          <thead><tr><th>Aluno</th><th>Pacote</th><th>Restam</th><th>Validade</th><th>Valor</th></tr></thead>
          <tbody>{(dados || []).map(p => <tr key={p.id} style={{ opacity: p.ativo ? 1 : .55 }}><td>{p.alunos?.nome || '—'}</td><td>{p.total}</td><td>{p.restam}</td><td>{dataBR(p.validade)}</td><td>{p.valor_pago != null ? reais(p.valor_pago) : '–'}</td></tr>)}</tbody>
        </table></div>
      </Estado>
    </>
  )
}

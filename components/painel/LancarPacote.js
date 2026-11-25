'use client'
import { useState } from 'react'
import { PACOTES } from '@/lib/conteudo'
import { reais } from '@/lib/formato'
import Modal from '../Modal'

export default function LancarPacote({ aluno, config, onFechar, onConfirmar }) {
  const [total, setTotal] = useState(8)
  const [enviando, setEnviando] = useState(false)
  const valor = Number(config[`pacote_${total}_valor`]) || null
  return (
    <Modal titulo={`Lançar pacote para ${aluno.nome}`} onFechar={onFechar}>
      <select className="inp" value={total} onChange={e => setTotal(Number(e.target.value))}>
        {PACOTES.map(p => <option key={p.total} value={p.total}>{p.total} remadas · {reais(config[`pacote_${p.total}_valor`])}</option>)}
      </select>
      <p>Confirme só depois de receber o pagamento.</p>
      <button className="btn btn-green hk-cheio" disabled={enviando || !valor} onClick={async () => { setEnviando(true); await onConfirmar(total, valor); onFechar() }}>Confirmar lançamento</button>
    </Modal>
  )
}

import { hojeSP } from '@/lib/formato'
import { exigir } from './comum'

/** Mesma conta da função saldo_pacote do banco. */
export async function buscarPacotes(sb) {
  const [pac, res] = await Promise.all([
    sb.from('pacotes').select('id,aluno_id,total,validade,valor_pago,pago,criado_em,alunos(nome)').order('criado_em', { ascending: false }).limit(500),
    sb.from('reservas').select('pacote_id,status,consome_saldo').not('pacote_id', 'is', null).or('status.in.(confirmada,falta,realizada),and(status.eq.cancelada,consome_saldo.eq.true)').limit(10000),
  ])
  const usos = {}
  exigir(res).forEach(r => { usos[r.pacote_id] = (usos[r.pacote_id] || 0) + 1 })
  const hoje = hojeSP()
  return exigir(pac).map(p => {
    const restam = p.total - (usos[p.id] || 0)
    return { ...p, restam, ativo: p.pago && p.validade >= hoje && restam > 0 }
  })
}

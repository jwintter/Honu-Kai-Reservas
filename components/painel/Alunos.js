'use client'
import { useState } from 'react'
import { dataBR } from '@/lib/formato'
import { useDados, exigir, Estado } from './comum'
import { buscarPacotes } from './saldos'
import LancarPacote from './LancarPacote'

export default function Alunos({ avisar }) {
  const [busca, setBusca] = useState('')
  const [lancar, setLancar] = useState(null)
  const { dados, erro, acao } = useDados(async sb => {
    const [alunos, pacotes, perfis, precos] = await Promise.all([
      sb.from('alunos').select('id,nome,telefone,tipo,user_id,responsavel_id').order('nome').limit(1000), buscarPacotes(sb),
      sb.from('perfis').select('id,email,telefone'), sb.from('configuracao').select('chave,valor').like('chave', 'pacote\\_%'),
    ])
    return { alunos: exigir(alunos), pacotes, perfis: exigir(perfis), config: Object.fromEntries(exigir(precos).map(r => [r.chave, r.valor])) }
  }, [], avisar)
  const termo = busca.toLowerCase()
  const lista = (dados?.alunos || []).filter(a => !termo || a.nome.toLowerCase().includes(termo) || (a.telefone || '').includes(termo))
  const soDigitos = t => String(t || '').replace(/\D/g, '').slice(-8)

  return (
    <>
      <h1 className="hk-titulo">Alunos</h1>
      <input className="inp" placeholder="Buscar por nome ou telefone" value={busca} onChange={e => setBusca(e.target.value)} />
      <Estado erro={erro} dados={dados}>
        <div className="hk-tabela"><table>
          <thead><tr><th>Aluno</th><th>Telefone</th><th>Saldo</th><th>Validade</th><th>Ações</th></tr></thead>
          <tbody>{lista.map(a => {
            const ativos = (dados?.pacotes || []).filter(p => p.aluno_id === a.id && p.ativo)
            // Conta do site/app que informou o mesmo telefone e ainda espera a confirmação do Jhon.
            const conta = !a.user_id && a.telefone && dados.perfis.find(p => soDigitos(p.telefone) === soDigitos(a.telefone) && !dados.alunos.some(x => x.user_id === p.id))
            return (
              <tr key={a.id}>
                <td><b>{a.nome}</b><small>{a.responsavel_id ? 'dependente' : a.user_id ? 'tem conta' : 'sem conta'}</small></td>
                <td>{a.telefone || '–'}</td>
                <td><b>{ativos.reduce((s, p) => s + p.restam, 0)}</b></td>
                <td>{dataBR(ativos.map(p => p.validade).sort()[0])}</td>
                <td className="hk-acoes">
                  <button onClick={() => setLancar(a)}>Lançar pacote</button>
                  {conta && <button onClick={() => window.confirm(`Vincular a conta ${conta.email} a ${a.nome}? Confirme que é a mesma pessoa.`) && acao(sb => sb.rpc('admin_vincular_conta', { p_aluno: a.id, p_perfil: conta.id }), 'Conta vinculada.')}>Vincular {conta.email}</button>}
                </td>
              </tr>
            )
          })}</tbody>
        </table></div>
      </Estado>
      {lancar && <LancarPacote aluno={lancar} config={dados?.config || {}} onFechar={() => setLancar(null)}
        onConfirmar={(total, valor) => acao(sb => sb.rpc('admin_lancar_pacote', { p_aluno: lancar.id, p_total: total, p_valor: valor }), 'Pacote lançado.')} />}
    </>
  )
}

'use client'
import { useState } from 'react'
import { dataBR, hora, hojeSP, somaDias, reais } from '@/lib/formato'
import { useDados, exigir, Estado } from './comum'

const CAMPOS = [
  ['valor_remada_avulsa', 'Remada avulsa (R$)'], ['pacote_4_valor', 'Pacote 4 (R$)'], ['pacote_8_valor', 'Pacote 8 (R$)'],
  ['pacote_12_valor', 'Pacote 12 (R$)'], ['pacote_16_valor', 'Pacote 16 (R$)'], ['chave_pix', 'Chave Pix'], ['titular_pix', 'Titular do Pix'],
]
const DIAS = ['Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo', 'Feriado']

export default function Agenda({ avisar }) {
  const [edicao, setEdicao] = useState({})
  const { dados, erro, acao } = useDados(async sb => {
    const [cfg, grade, feriados] = await Promise.all([
      sb.from('configuracao').select('chave,valor').in('chave', CAMPOS.map(c => c[0])),
      sb.from('grade').select('id_horario,dia_semana,hora,ativa').order('hora'),
      sb.from('feriados').select('data,nome,abre').gte('data', hojeSP()).order('data'),
    ])
    return { cfg: Object.fromEntries(exigir(cfg).map(r => [r.chave, r.valor])), grade: exigir(grade), feriados: exigir(feriados) }
  }, [], avisar)

  async function salvar() {
    const mudancas = Object.entries(edicao)
    for (const [chave, valor] of mudancas) {
      if (chave.endsWith('_valor') || chave === 'valor_remada_avulsa') {
        if (!(Number(valor) > 0)) return avisar('Preço deve ser um número maior que zero (use ponto para centavos).', 'error')
      }
    }
    if (!window.confirm('Salvar? O site, o app e o bot passam a usar estes valores.')) return
    for (const [chave, valor] of mudancas) {
      if (!await acao(sb => sb.from('configuracao').update({ valor: valor.trim() }).eq('chave', chave))) return
      const n = chave.match(/^pacote_(\d+)_valor$/)?.[1] // o bot lê o preço por remada daqui
      if (n && !await acao(sb => sb.from('configuracao').update({ valor: reais(valor / n) }).eq('chave', `por_remada_${n}`))) return
    }
    setEdicao({}); avisar('Valores salvos.')
  }

  return (
    <>
      <h1 className="hk-titulo">Agenda e preços</h1>
      <Estado erro={erro} dados={dados}>
        <div className="hk-grade">
          <div className="hk-cartao">
            <b>Preços e Pix</b>
            {dados && !dados.cfg.chave_pix && <p className="hk-msg erro">A chave Pix está vazia: o bot não envia lembretes de pagamento.</p>}
            {CAMPOS.map(([k, t]) => <label key={k}>{t}<input className="inp" value={edicao[k] ?? dados?.cfg[k] ?? ''} onChange={e => setEdicao({ ...edicao, [k]: e.target.value })} /></label>)}
            <button className="btn btn-green" disabled={!Object.keys(edicao).length} onClick={salvar}>Salvar</button>
          </div>
          <div className="hk-cartao">
            <b>Horários semanais</b><small>Mudanças valem para remadas ainda não geradas. Para um dia já aberto, use “Cancelar remada” em Sessões.</small>
            {DIAS.map(d => <div key={d} className="hk-linha"><span>{d}</span><div className="hk-acoes">
              {(dados?.grade || []).filter(g => g.dia_semana === d).map(g => <button key={g.id_horario} style={{ opacity: g.ativa ? 1 : .4 }}
                onClick={() => window.confirm(`${g.ativa ? 'Desativar' : 'Ativar'} ${d} ${hora(g.hora)}?`) && acao(sb => sb.from('grade').update({ ativa: !g.ativa }).eq('id_horario', g.id_horario), 'Grade atualizada.')}>{hora(g.hora)} {g.ativa ? '✓' : '✕'}</button>)}
            </div></div>)}
            <button className="btn btn-outline" onClick={() => acao(sb => sb.rpc('admin_gerar_sessoes', { p_ini: hojeSP(), p_fim: somaDias(hojeSP(), 14) }), 'Remadas dos próximos 14 dias conferidas.')}>Gerar remadas (14 dias)</button>
          </div>
          <div className="hk-cartao">
            <b>Feriados</b><small>Só há remada no feriado marcado como “abre”.</small>
            {(dados?.feriados || []).map(f => <div key={f.data} className="hk-linha"><span>{dataBR(f.data)} · {f.nome}</span>
              <button className={`btn btn-sm ${f.abre ? 'btn-green' : 'btn-outline'}`} onClick={() => window.confirm(`${f.abre ? 'Fechar' : 'Abrir'} em ${dataBR(f.data)}? Confira depois as remadas desse dia em Sessões.`) && acao(sb => sb.from('feriados').update({ abre: !f.abre }).eq('data', f.data), 'Feriado atualizado.')}>{f.abre ? 'Abre' : 'Fechado'}</button></div>)}
          </div>
        </div>
      </Estado>
    </>
  )
}

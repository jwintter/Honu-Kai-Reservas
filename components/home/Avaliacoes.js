'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'

export default function Avaliacoes({ sessao, avaliacoes, avisar, pedirAcesso }) {
  const [nota, setNota] = useState(0)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const media = avaliacoes.length ? (avaliacoes.reduce((a, x) => a + x.nota, 0) / avaliacoes.length).toFixed(1) : null

  async function publicar() {
    if (sessao.etapa !== 'pronto') return pedirAcesso()
    if (!nota) return avisar('Selecione uma nota.', 'error')
    setEnviando(true)
    const { error } = await getSupabase().rpc('site_publicar_avaliacao', { p_nota: nota, p_texto: texto })
    setEnviando(false)
    if (error) return avisar(textoErro(error), 'error')
    setNota(0); setTexto(''); avisar('Obrigado! Sua avaliação aparece depois de aprovada. ⭐')
  }

  return (
    <section id="avaliacoes" style={{ padding: '40px 20px', background: 'var(--hk-bg)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div className="reveal hk-etiqueta">Avaliações</div>
        <h2 className="reveal d1 hk-titulo">Quem rema, conta</h2>
        <div className="reveal d2 divider" />
        <div className="aval-grid">
          <div className="hk-cartao">
            <b>Deixe sua avaliação</b>
            <div style={{ display: 'flex', gap: 6, margin: '10px 0' }}>
              {[1, 2, 3, 4, 5].map(v => <button key={v} aria-label={`${v} estrelas`} onClick={() => setNota(v)} className={`star-btn${nota >= v ? ' on' : ''}`}>★</button>)}
            </div>
            <textarea className="inp" rows={4} maxLength={600} style={{ width: '100%' }} value={texto} onChange={e => setTexto(e.target.value)} placeholder="Conte como foi sua experiência..." />
            <button className="btn btn-green" disabled={enviando} onClick={publicar}>{sessao.etapa === 'pronto' ? 'Enviar avaliação' : 'Entrar para avaliar'}</button>
          </div>
          <div className="hk-lista">
            {media && <div className="hk-cartao hk-media"><strong>{media}</strong><span>{avaliacoes.length} {avaliacoes.length === 1 ? 'avaliação' : 'avaliações'}</span></div>}
            {!avaliacoes.length && <p className="hk-vazio">Ainda não há avaliações.</p>}
            {avaliacoes.slice(0, 5).map((a, i) => (
              <div key={i} className="hk-cartao"><b>{a.nome}</b><div style={{ color: '#f5a623' }}>{'★'.repeat(a.nota)}{'☆'.repeat(5 - a.nota)}</div><p>{a.texto}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

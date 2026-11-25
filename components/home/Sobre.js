export default function Sobre() {
  return (
    <>
      <section id="sobre" style={{ padding:'40px 20px', background:'var(--hk-bg2)' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <div className="sobre-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
            <div>
              <div className="reveal" style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:'uppercase', color:'var(--hk-green)', marginBottom:8 }}>Sobre a base</div>
              <h2 className="reveal d1" style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--hk-dark)', lineHeight:1.1, marginBottom:10 }}>Mais do que remar</h2>
              <div className="reveal d2 divider"/>
              <p className="reveal d2" style={{ fontSize:13, color:'var(--hk-body)', marginBottom:12, lineHeight:1.7 }}>A Honu Kai Va'a fica na Praia do Canto, em Vitória/ES. Um espaço onde o oceano e as pessoas se conectam de forma genuína.</p>
              <p className="reveal d3" style={{ fontSize:13, color:'var(--hk-body)', marginBottom:12, lineHeight:1.7 }}>Nos paddlings, o instrutor chega com café. Paramos em ilhas, mergulhamos no mar, compartilhamos silêncio e conversa.</p>
              <p className="reveal d4" style={{ fontSize:13, color:'var(--hk-body)' }}><em>Honu</em> é a tartaruga — símbolo de navegação. <em>Kai</em> é o mar.</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[['☕','Café no paddling','O instrutor sempre leva café. A gente para, conversa e segue remando.'],['🏝️','Paradas em ilhas','Alguns paddlings terminam na areia com mergulho.'],['🐢','Todos os níveis','Não precisa de experiência. O vaa recebe qualquer pessoa.'],['🌊','Conexão real','Quem entra na canoa uma vez quase sempre volta.']].map(([ico,t,d],i) => (
                <div key={t} className={`reveal d${i+1}`} style={{ background:'var(--hk-card)', border:'1px solid var(--hk-border)', borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'flex-start', gap:12 }}>
                  <span style={{ fontSize:22, flexShrink:0 }}>{ico}</span>
                  <div>
                    <div style={{ fontWeight:700, color:'var(--hk-dark)', fontSize:14, marginBottom:2 }}>{t}</div>
                    <div style={{ fontSize:12, color:'var(--hk-muted)', lineHeight:1.55 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

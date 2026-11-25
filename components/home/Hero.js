import { raiz } from '@/lib/caminho'
export default function Hero({ parallaxY }) {
  return (
    <>
      <section id="inicio" style={{ background:'var(--hk-bg)' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', padding:'60px 28px' }}>
            <div>
              <div className="reveal" style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:'uppercase', color:'var(--hk-green)', marginBottom:10 }}>Vitória · ES · Va'a</div>
              <h1 className="reveal d1" style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2.4rem,5vw,4rem)', lineHeight:1.05, color:'var(--hk-dark)', fontWeight:700, marginBottom:14, letterSpacing:-.5 }}>
                Remar,<br/>respirar,<br/><em style={{ color:'var(--hk-green)', fontStyle:'italic' }}>pertencer.</em>
              </h1>
              <p className="reveal d2" style={{ fontSize:14, color:'var(--hk-muted)', fontStyle:'italic', marginBottom:20, lineHeight:1.55, maxWidth:420 }}>
                Na Honu Kai, o mar não é só o destino. É o lugar onde a gente se encontra.
              </p>
              <div className="reveal d3" style={{ display:'flex', flexDirection:'column', gap:10, maxWidth:280 }}>
                <a href="#reservas" style={{ background:'var(--hk-green)', color:'#fff', border:'none', padding:'14px 24px', borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:'uppercase', cursor:'pointer', textDecoration:'none', boxShadow:'0 6px 20px rgba(78,140,26,.25)', textAlign:'center' }}>Reserve sua vaga</a>
                <a href="#sobre" style={{ background:'transparent', color:'var(--hk-dark)', border:'1.5px solid var(--hk-border)', padding:'13px 24px', borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:'uppercase', textDecoration:'none', textAlign:'center' }}>Conhecer a base</a>
              </div>
            </div>
            <div className="hero-logo-wrap" style={{ display:'flex', justifyContent:'center' }}>
              <div className="hero-logo" style={{ position:'relative', width:'clamp(200px,28vw,340px)', height:'clamp(200px,28vw,340px)', transform:`translateY(${parallaxY}px)` }}>
                <div style={{ position:'absolute', inset:-14, borderRadius:'50%', border:'1.5px solid rgba(78,140,26,.25)', animation:'hkSpin 24s linear infinite' }}/>
                <div style={{ position:'absolute', inset:-28, borderRadius:'50%', border:'1px dashed rgba(78,140,26,.14)', animation:'hkSpin 50s linear infinite reverse' }}/>
                <div style={{ position:'absolute', inset:-14, animation:'hkSpin 18s linear infinite', pointerEvents:'none' }}>
                  <div style={{ position:'absolute', top:-4, left:'50%', width:8, height:8, borderRadius:'50%', background:'var(--hk-green)', boxShadow:'0 0 10px var(--hk-green)' }}/>
                </div>
                <div style={{ width:'100%', height:'100%', borderRadius:'50%', background:'radial-gradient(circle at 35% 30%, #ffffff 0%, #fafaf4 45%, #f0ecdf 100%)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 40px rgba(0,0,0,.08), inset 0 0 40px rgba(78,140,26,.06)', border:'1px solid rgba(78,140,26,.12)', animation:'hkFloat 6s ease-in-out infinite', overflow:'hidden' }}>
                  <img src={raiz('/images/logo_honukai_new.png')} alt="logo" style={{ width:'78%', height:'78%', objectFit:'contain', animation:'hkBreathe 4s ease-in-out infinite', display:'block' }}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

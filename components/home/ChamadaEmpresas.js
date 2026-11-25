import { raiz } from '@/lib/caminho'
export default function ChamadaEmpresas() {
  return (
    <>
      <section id="empresas" style={{ padding:'40px 20px', background:'var(--hk-dark)' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <div style={{ background:'rgba(78,140,26,.08)', border:'1px solid rgba(78,140,26,.2)', borderRadius:24, padding:'32px 28px', display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:200 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:'uppercase', color:'var(--hk-greenL)', marginBottom:8, display:'block' }}>Para sua empresa</span>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.4rem,3vw,2rem)', color:'#f5f2eb', lineHeight:1.1, marginBottom:10 }}>
                Times que remam juntos<br/><em style={{ color:'var(--hk-greenL)' }}>crescem juntos.</em>
              </h2>
              <p style={{ fontSize:13, color:'#888', lineHeight:1.7, maxWidth:480 }}>Liderança, team building e integração de equipes na água. Uma experiência que conecta como poucas coisas.</p>
            </div>
            <a href={raiz('/empresas/')} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--hk-green)', color:'#fff', borderRadius:100, padding:'14px 24px', fontSize:12, fontWeight:700, letterSpacing:1, textTransform:'uppercase', textDecoration:'none', flexShrink:0, boxShadow:'0 6px 20px rgba(78,140,26,.3)' }}>
              Saber mais →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

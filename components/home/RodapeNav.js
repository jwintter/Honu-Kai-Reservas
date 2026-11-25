export default function RodapeNav() {
  return (
    <>
      <nav className="bottom-nav">
        {[['#inicio','🏠','Início'],['#reservas','📅','Reservar'],['#passes','🎫','Passes'],['#empresas','🏢','Empresas']].map(([h,ico,l]) => (
          <a key={h} href={h} className="bottom-nav-item" style={{ textDecoration:'none' }}>
            <span style={{ fontSize:20 }}>{ico}</span>
            <span>{l}</span>
          </a>
        ))}
      </nav>
      <div className="bottom-nav-spacer"/>

      {/* ── FOOTER com contatos ── */}
      <footer id="contato" style={{ background:'var(--hk-dark)', borderTop:'1px solid #2a2a2a', padding:'40px 20px 28px' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', gap:20, textAlign:'center' }}>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.6rem', letterSpacing:3, color:'#f0ede6' }}>HONU <span style={{ color:'var(--hk-greenL)' }}>KAI</span> VA'A</div>
          <p style={{ fontSize:12, color:'#555', maxWidth:320, lineHeight:1.6 }}>Va'a · Vitória, ES · Praia do Canto</p>

          {/* Ícones de contato */}
          <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', justifyContent:'center' }}>
            {[
              {ico:'💬', label:'WhatsApp', href:'https://wa.me/5527997343759'},
              {ico:'📷', label:'Instagram', href:'https://www.instagram.com/honukaivaa/'},
              {ico:'✉️', label:'E-mail', href:'mailto:contato@honukaivaa.com.br'},
              {ico:'📍', label:'Localização', href:'https://maps.google.com/?q=Praia+do+Canto+Vitoria+ES'},
            ].map(({ico,label,href}) => (
              <a key={label} href={href} target="_blank" title={label}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, textDecoration:'none' }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, transition:'background .2s' }}>
                  {ico}
                </div>
                <span style={{ fontSize:9, fontWeight:700, letterSpacing:1, textTransform:'uppercase', color:'#555' }}>{label}</span>
              </a>
            ))}
          </div>

          <div style={{ width:'100%', height:1, background:'rgba(255,255,255,.06)' }}/>

          <div className="footer-links" style={{ display:'flex', gap:18, flexWrap:'wrap', justifyContent:'center' }}>
            {[['#sobre','Sobre'],['#galeria','Galeria'],['#reservas','Reservar'],['#passes','Passes'],['#empresas','Empresas']].map(([h,l]) => (
              <a key={h} href={h} style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', color:'#555', textDecoration:'none' }}>{l}</a>
            ))}
          </div>
          <p style={{ fontSize:11, color:'#444' }}>© 2026 Honu Kai Va'a · Vitória, Espírito Santo · <a href="https://jwintter.github.io/Honu-Kai-Reservas/privacidade.html" target="_blank" rel="noopener noreferrer"><u>Privacidade</u></a></p>
        </div>
      </footer>
    </>
  )
}

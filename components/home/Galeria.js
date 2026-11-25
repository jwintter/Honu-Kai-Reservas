export default function Galeria({ galeria }) {
  return (
    <>
      <section id="galeria" style={{ padding:'40px 0', background:'var(--hk-bg)', overflow:'hidden' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 20px' }}>
          <div className="reveal" style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:'uppercase', color:'var(--hk-green)', marginBottom:8 }}>Galeria</div>
          <h2 className="reveal d1" style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.6rem,3vw,2.4rem)', color:'var(--hk-dark)', lineHeight:1.1, marginBottom:10 }}>A água em movimento</h2>
          <div className="reveal d2 divider"/>
        </div>
        {/* Carrossel automático com loop */}
        {galeria.length > 0 && (
          <div style={{ position:'relative', width:'100%', overflow:'hidden', marginTop:4 }}>
            <style>{`
              @keyframes hkSlide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .galeria-track {
                display: flex;
                gap: 12px;
                width: max-content;
                animation: hkSlide ${galeria.length * 8}s linear infinite;
              }
              .galeria-track:hover { animation-play-state: paused; }
              .galeria-foto {
                flex-shrink: 0;
                width: 300px;
                aspect-ratio: 4/3;
                border-radius: 14px;
                overflow: hidden;
                border: 1px solid var(--hk-border);
              }
              @media (max-width: 768px) {
                .galeria-foto { width: 220px; }
              }
              .galeria-foto img {
                width: 100%; height: 100%; object-fit: cover;
                transition: transform .5s ease;
              }
              .galeria-foto:hover img { transform: scale(1.06); }
            `}</style>
            <div className="galeria-track">
              {/* Duplica as fotos para criar loop infinito */}
              {[...galeria, ...galeria].map((src, i) => (
                <div key={i} className="galeria-foto">
                  <img src={src} alt="Honu Kai"/>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

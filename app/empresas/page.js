'use client'
import { raiz } from '@/lib/caminho'
import EmpresaForm from '@/components/EmpresaForm'

export default function EmpresasPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--hk-dark)', fontFamily:"'DM Sans', system-ui, sans-serif", color:'var(--hk-body)' }}>

      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(26,26,22,.97)', backdropFilter:'blur(14px)', borderBottom:'1px solid rgba(255,255,255,.08)', padding:'10px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <a href={raiz('/')} style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
          <img src={raiz('/images/logo_honukai_new.png')} alt="logo" style={{ width:32, height:32, borderRadius:'50%', objectFit:'contain', background:'var(--hk-greenBg)', padding:2 }}/>
          <div>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:15, fontWeight:700, color:'#f5f2eb', letterSpacing:1, lineHeight:1 }}>HONU <span style={{ color:'var(--hk-greenL)' }}>KAI</span></div>
            <div style={{ fontSize:8, color:'#555', letterSpacing:1.5, textTransform:'uppercase', marginTop:2 }}>Va'a · Vitória</div>
          </div>
        </a>
        <a href={raiz('/')} style={{ fontSize:10, fontWeight:700, color:'#888', letterSpacing:1, textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(255,255,255,.1)', borderRadius:100, padding:'6px 14px' }}>← Voltar</a>
      </nav>

      {/* HERO */}
      <div style={{ padding:'52px 20px 48px', textAlign:'center', borderBottom:'1px solid rgba(255,255,255,.06)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(78,140,26,.08) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(78,140,26,.05) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, textTransform:'uppercase', color:'var(--hk-greenL)', marginBottom:12, display:'block' }}>Para sua empresa</span>
        <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(2rem,5vw,3.2rem)', color:'#f5f2eb', lineHeight:1.05, marginBottom:16, fontWeight:700 }}>
          Times que remam juntos<br/><em style={{ color:'var(--hk-greenL)' }}>crescem juntos.</em>
        </h1>
        <div style={{ width:40, height:3, background:'var(--hk-greenL)', margin:'0 auto 20px', borderRadius:2 }}/>
        <p style={{ fontSize:14, color:'#888', maxWidth:640, margin:'0 auto', lineHeight:1.85 }}>
          Na canoa havaiana, o destino é alcançado quando todos remam em um só ritmo. Diferente de outros esportes, aqui a força individual isolada não supera a potência do coletivo. É essa filosofia milenar que trazemos para esta interação: a compreensão de que uma equipe, assim como uma embarcação, depende da sincronia e alinhamento entre seus membros para navegar com eficiência.
        </p>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'48px 20px 60px' }}>

        {/* Competências */}
        <div style={{ marginBottom:52 }}>
          <p style={{ fontSize:13, color:'#777', textAlign:'center', marginBottom:24, lineHeight:1.8 }}>
            Ao sair do escritório e entrar na água, sua equipe desenvolve competências vitais:
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
            {[
              { ico:'🎯', titulo:'Sincronia e Alinhamento', desc:'A percepção prática de que o sucesso nos resultados e projetos dependem de um ritmo compartilhado.' },
              { ico:'🗣️', titulo:'Comunicação Eficiente', desc:'No mar, o ruído é substituído pela escuta ativa e comandos precisos. Práticas vitais para a alta performance.' },
              { ico:'🌊', titulo:'Resiliência e Adaptação', desc:'Superar ventos e marés ensina o time a lidar com as instabilidades e mudanças repentinas dos cenários.' },
            ].map(({ ico, titulo, desc }) => (
              <div key={titulo} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:22 }}>
                <div style={{ fontSize:'1.8rem', marginBottom:12 }}>{ico}</div>
                <div style={{ fontWeight:700, color:'#f0ede6', fontSize:14, marginBottom:8 }}>{titulo}</div>
                <div style={{ fontSize:12, color:'#777', lineHeight:1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Soluções */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(1.4rem,3vw,2rem)', color:'#f5f2eb', textAlign:'center', marginBottom:8 }}>Nossas Soluções</h2>
          <div style={{ width:32, height:2, background:'var(--hk-greenL)', margin:'0 auto 28px', borderRadius:2 }}/>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            {/* Solução 1 */}
            <div style={{ background:'rgba(78,140,26,.06)', border:'1px solid rgba(78,140,26,.18)', borderRadius:20, padding:24 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'rgba(78,140,26,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0 }}>🚣</div>
                <div style={{ fontWeight:700, color:'var(--hk-greenL)', fontSize:15 }}>1. Liderança e Gestão</div>
              </div>
              <p style={{ fontSize:13, color:'#888', lineHeight:1.75, marginBottom:16 }}>
                Um líder exemplar não é quem rema mais forte, mas quem mantém a direção e a harmonia do grupo sob pressão. Aqui, exploramos os papéis estratégicos da canoa aplicados à gestão:
              </p>
              {[
                ['🎶', 'O Voga (Ritmo)', 'A liderança que dá o exemplo e estabelece a cadência.'],
                ['💪', 'Os Bancos de Força (Suporte)', 'Como sustentar o crescimento e garantir estabilidade operacional.'],
                ['🧭', 'O Leme (Direção)', 'Tomada de decisão estratégica e visão de longo prazo em cenários mutáveis.'],
              ].map(([ico, t, d]) => (
                <div key={t} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <span style={{ flexShrink:0, fontSize:'1rem' }}>{ico}</span>
                  <div><span style={{ fontWeight:700, color:'#ccc', fontSize:12 }}>{t}: </span><span style={{ fontSize:12, color:'#777' }}>{d}</span></div>
                </div>
              ))}
            </div>

            {/* Solução 2 */}
            <div style={{ background:'rgba(78,140,26,.06)', border:'1px solid rgba(78,140,26,.18)', borderRadius:20, padding:24 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'rgba(78,140,26,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0 }}>🤝</div>
                <div style={{ fontWeight:700, color:'var(--hk-greenL)', fontSize:15 }}>2. Team Building e Integração</div>
              </div>
              <p style={{ fontSize:13, color:'#888', lineHeight:1.75, marginBottom:16 }}>
                Ideal para confraternizações, fortalecer laços, integrar talentos e reduzir o estresse:
              </p>
              {[
                ['🔗', 'Integração', 'Atividade lúdica e cooperativa para conectar pessoas.'],
                ['🌱', 'Cultura de Apoio', 'Vivência do trabalho em equipe e a arte de corrigir rumos e evoluir juntos.'],
                ['🧘', 'Bem-estar', 'Promoção de saúde mental e foco através do contato direto com a natureza.'],
              ].map(([ico, t, d]) => (
                <div key={t} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <span style={{ flexShrink:0, fontSize:'1rem' }}>{ico}</span>
                  <div><span style={{ fontWeight:700, color:'#ccc', fontSize:12 }}>{t}: </span><span style={{ fontSize:12, color:'#777' }}>{d}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* O que está incluso */}
        <div style={{ marginBottom:52 }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.4rem', color:'#f5f2eb', textAlign:'center', marginBottom:20 }}>O que está incluso</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
            {[
              ['🏝️', 'Sessão exclusiva para o time'],
              ['☕', 'Café e paradas inclusas'],
              ['🏄', 'Instrutor dedicado ao grupo'],
              ['👥', 'Até 13 participantes por sessão'],
            ].map(([ico, label]) => (
              <div key={label} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:'16px 14px', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{ico}</span>
                <span style={{ fontSize:12, color:'#aaa', lineHeight:1.4 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário */}
        <div style={{ maxWidth:520, margin:'0 auto' }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.6rem', color:'#f5f2eb', marginBottom:8, textAlign:'center' }}>Solicite uma sessão</h2>
          <p style={{ fontSize:13, color:'#777', lineHeight:1.75, marginBottom:24, textAlign:'center' }}>Preencha abaixo e entraremos em contato para montar a experiência ideal para o seu time.</p>
          <EmpresaForm/>
        </div>
      </div>
    </div>
  )
}
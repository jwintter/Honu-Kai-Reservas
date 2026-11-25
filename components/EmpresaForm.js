'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'
import { WHATSAPP } from '@/lib/conteudo'

export default function EmpresaForm() {
  const [form, setForm] = useState({ nome:'', empresa:'', email:'', tel:'', vagas:7, objetivo:'', dinamica:'' })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  const inpStyle = { width:'100%', padding:'11px 14px', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, fontSize:13, fontFamily:'DM Sans, sans-serif', background:'rgba(255,255,255,.06)', color:'#f5f2eb', outline:'none', resize:'vertical', boxSizing:'border-box' }

  async function enviar() {
    if (!form.nome || !form.email) { setErro('Preencha nome e e-mail.'); return }
    setLoading(true); setErro('')
    const { error } = await getSupabase().rpc('site_contato_empresa', { p: { nome:form.nome, empresa:form.empresa, email:form.email, telefone:form.tel, pessoas:form.vagas, objetivo:form.objetivo, dinamica:form.dinamica } })
    // Dado inválido: corrige na tela. Outra falha: segue pelo WhatsApp para não perder o contato.
    if (error && ['nome_invalido','email_invalido','pessoas_invalido','muitos_envios'].includes(error.message)) { setErro(textoErro(error)); setLoading(false); return }
    const msg = encodeURIComponent(`Olá! Sou ${form.nome}${form.empresa?` da ${form.empresa}`:''} e gostaria de organizar um paddling corporativo para ${form.vagas} pessoas.${form.objetivo?`\n\nObjetivo: ${form.objetivo}`:''}${form.dinamica?`\nDinâmica: ${form.dinamica}`:''}\\n\\nEmail: ${form.email}${form.tel?`\nTel: ${form.tel}`:''}`)
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank', 'noopener')
    setLoading(false); setEnviado(true)
  }

  if (enviado) return (
    <div style={{ background:'rgba(78,140,26,.15)', border:'1px solid rgba(78,140,26,.35)', borderRadius:20, padding:40, textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🌊</div>
      <h4 style={{ fontFamily:'Playfair Display, serif', color:'#f5f2eb', fontSize:'1.4rem', marginBottom:8 }}>Falta só um passo</h4>
      <p style={{ color:'#aaa', fontSize:14 }}>Abrimos o WhatsApp: envie a mensagem para finalizar.</p>
    </div>
  )

  return (
    <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', borderRadius:20, padding:28 }}>
      <p style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#7dc842', marginBottom:20 }}>Solicite uma sessão</p>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <input value={form.nome} onChange={e=>set('nome',e.target.value)} placeholder="Seu nome *" style={inpStyle}/>
        <input value={form.empresa} onChange={e=>set('empresa',e.target.value)} placeholder="Empresa (opcional)" style={inpStyle}/>
        <input value={form.email} onChange={e=>set('email',e.target.value)} placeholder="E-mail *" type="email" style={inpStyle}/>
        <input value={form.tel} onChange={e=>set('tel',e.target.value)} placeholder="WhatsApp (opcional)" style={inpStyle}/>
        <textarea value={form.objetivo} onChange={e=>set('objetivo',e.target.value)} placeholder="O que vocês esperam da remada? (integração, relaxamento, desafio em equipe...)" style={{ ...inpStyle, minHeight:80 }}/>
        <textarea value={form.dinamica} onChange={e=>set('dinamica',e.target.value)} placeholder="Tem alguma dinâmica ou tema específico em mente? (opcional)" style={{ ...inpStyle, minHeight:70 }}/>
        <div style={{ paddingTop:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ fontSize:13, color:'#aaa' }}>Quantas pessoas?</span>
            <span style={{ fontFamily:'Playfair Display, serif', fontSize:'2rem', color:'#7dc842', lineHeight:1 }}>{form.vagas}</span>
          </div>
          <input type="range" min={2} max={13} value={form.vagas} onChange={e=>set('vagas',Number(e.target.value))} style={{ width:'100%', accentColor:'#7dc842' }}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#555', marginTop:4 }}>
            <span>2 pessoas</span><span>13 pessoas (máx. por canoa)</span>
          </div>
        </div>
        {erro && <p style={{ fontSize:12, color:'#f5a623' }}>{erro}</p>}
        <button onClick={enviar} disabled={loading} style={{ background:'var(--hk-green)', color:'#fff', border:'none', padding:'13px 0', borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:1, textTransform:'uppercase', cursor:'pointer', fontFamily:'DM Sans, sans-serif', opacity:loading?0.7:1 }}>
          {loading ? 'Enviando...' : '💬 Solicitar via WhatsApp'}
        </button>
      </div>
    </div>
  )
}

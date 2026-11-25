'use client'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'

export function Cadastro({ sessao, linkPrivacidade }) {
  const [f, setF] = useState({ nome: '', tel: '', priv: false, mkt: false })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  async function enviar(e) {
    e.preventDefault()
    if (!f.priv) return setErro('É preciso concordar com o aviso de privacidade.')
    setEnviando(true); setErro('')
    const { error } = await getSupabase().rpc('completar_cadastro', { p_nome: f.nome, p_telefone: f.tel, p_quer_marketing: f.mkt })
    setEnviando(false)
    if (error) setErro(textoErro(error)); else sessao.recarregar()
  }
  return (
    <form onSubmit={enviar} className="hk-form">
      <h3>Quase lá</h3><p>É com o seu WhatsApp que a escola reconhece você.</p>
      <label>Nome completo<input className="inp" autoComplete="name" value={f.nome} onChange={e => setF({ ...f, nome: e.target.value })} /></label>
      <label>Telefone (WhatsApp)<input className="inp" type="tel" placeholder="(27) 99999-0000" value={f.tel} onChange={e => setF({ ...f, tel: e.target.value })} /></label>
      <label className="hk-check"><input type="checkbox" checked={f.priv} onChange={e => setF({ ...f, priv: e.target.checked })} /><span>Li e concordo com o <a href={linkPrivacidade} target="_blank" rel="noopener noreferrer"><u>aviso de privacidade</u></a>.</span></label>
      <label className="hk-check"><input type="checkbox" checked={f.mkt} onChange={e => setF({ ...f, mkt: e.target.checked })} /><span>Quero receber novidades (opcional).</span></label>
      {erro && <p className="hk-msg erro" role="alert">{erro}</p>}
      <button className="btn btn-green hk-cheio" disabled={enviando}>{enviando ? 'Salvando...' : 'Concluir cadastro'}</button>
    </form>
  )
}

export function Vinculo() {
  return <div className="hk-form"><h3>Quase pronto</h3><p>Seu telefone já consta no cadastro da escola. Para proteger seu saldo, o Jhon precisa confirmar que é você. Assim que ele liberar, é só entrar de novo.</p></div>
}

export function NovaSenha({ aoSalvar }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  async function enviar(e) {
    e.preventDefault()
    if (senha.length < 8) return setErro('A senha precisa ter pelo menos 8 caracteres.')
    const { error } = await getSupabase().auth.updateUser({ password: senha })
    if (error) setErro(textoErro(error)); else aoSalvar()
  }
  return (
    <form onSubmit={enviar} className="hk-form"><h3>Nova senha</h3>
      <label>Senha<input className="inp" type="password" autoComplete="new-password" value={senha} onChange={e => setSenha(e.target.value)} /></label>
      {erro && <p className="hk-msg erro">{erro}</p>}
      <button className="btn btn-green hk-cheio">Salvar senha</button>
    </form>
  )
}

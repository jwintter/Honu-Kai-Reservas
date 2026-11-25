'use client'
import { raiz } from '@/lib/caminho'
import { useState } from 'react'
import { getSupabase } from '@/lib/supabase'
import { textoErro } from '@/lib/erros'

const emailOk = v => /^\S+@\S+\.\S+$/.test(v)

/** Entrar, criar conta e recuperar senha. É o mesmo acesso do app de reservas. */
export default function Acesso() {
  const [modo, setModo] = useState('entrar')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    if (!emailOk(email.trim())) return setMsg({ erro: true, t: 'Informe um e-mail válido.' })
    if (senha.length < (modo === 'criar' ? 8 : 1)) return setMsg({ erro: true, t: modo === 'criar' ? 'A senha precisa ter pelo menos 8 caracteres.' : 'Informe a senha.' })
    setEnviando(true); setMsg(null)
    const sb = getSupabase()
    const cred = { email: email.trim(), password: senha }
    const { data, error } = modo === 'criar'
      ? await sb.auth.signUp({ ...cred, options: { emailRedirectTo: window.location.origin + raiz('/aluno/') } })
      : await sb.auth.signInWithPassword(cred)
    setEnviando(false)
    if (error) setMsg({ erro: true, t: textoErro(error) })
    else if (modo === 'criar' && !data.session) setMsg({ t: 'Enviamos um link de confirmação para o seu e-mail. Confirme e volte para entrar.' })
  }

  async function esqueci() {
    if (!emailOk(email.trim())) return setMsg({ erro: true, t: 'Digite seu e-mail no campo acima e toque de novo.' })
    const { error } = await getSupabase().auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin + raiz('/aluno/') })
    setMsg(error ? { erro: true, t: textoErro(error) } : { t: 'Se esse e-mail tiver conta, enviamos um link para criar nova senha.' })
  }

  return (
    <form onSubmit={enviar} className="hk-form" noValidate>
      <div className="hk-abas">
        {[['entrar', 'Entrar'], ['criar', 'Criar conta']].map(([k, t]) =>
          <button type="button" key={k} className={modo === k ? 'on' : ''} onClick={() => { setModo(k); setMsg(null) }}>{t}</button>)}
      </div>
      <label>E-mail<input className="inp" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Senha<input className="inp" type="password" autoComplete={modo === 'criar' ? 'new-password' : 'current-password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder={modo === 'criar' ? 'Mínimo de 8 caracteres' : ''} /></label>
      {msg && <p className={msg.erro ? 'hk-msg erro' : 'hk-msg'} role="alert">{msg.t}</p>}
      <button className="btn btn-green hk-cheio" disabled={enviando}>{enviando ? 'Aguarde...' : modo === 'criar' ? 'Criar conta' : 'Entrar'}</button>
      {modo === 'entrar' && <button type="button" className="hk-link" onClick={esqueci}>Esqueci minha senha</button>}
    </form>
  )
}

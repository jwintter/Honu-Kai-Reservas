import { raiz } from './caminho'
import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from './supabase'

/**
 * Quem está usando o site. `etapa`:
 * carregando | visitante | recuperar | cadastro | vinculo | pronto | erro
 * Esconder telas é só conveniência: quem protege os dados são as regras do banco.
 */
export function useSessao() {
  const [estado, setEstado] = useState({ etapa: 'carregando', user: null, perfil: null, alunoId: null })

  const carregar = useCallback(async (user) => {
    if (!user) return setEstado({ etapa: 'visitante', user: null, perfil: null, alunoId: null })
    const sb = getSupabase()
    const { data: perfil, error } = await sb.from('perfis').select('id,email,nome,telefone,papel').eq('id', user.id).maybeSingle()
    if (error) return setEstado({ etapa: 'erro', user, perfil: null, alunoId: null })
    if (!perfil?.nome || !perfil?.telefone) return setEstado({ etapa: 'cadastro', user, perfil, alunoId: null })
    const { data: alunoId } = await sb.rpc('meu_aluno')
    setEstado({ etapa: alunoId || perfil.papel === 'admin' ? 'pronto' : 'vinculo', user, perfil, alunoId: alunoId || null })
  }, [])

  useEffect(() => {
    const sb = getSupabase()
    let recuperando = window.location.hash.includes('type=recovery')
    sb.auth.getSession().then(({ data }) => {
      if (recuperando && data.session) setEstado(e => ({ ...e, etapa: 'recuperar', user: data.session.user }))
      else carregar(data.session?.user)
    })
    const { data: ouvinte } = sb.auth.onAuthStateChange((evento, sessao) => {
      if (evento === 'PASSWORD_RECOVERY') { recuperando = true; setEstado(e => ({ ...e, etapa: 'recuperar', user: sessao.user })) }
      // setTimeout: o Supabase não permite outra chamada dentro deste aviso.
      else if (!recuperando && (evento === 'SIGNED_IN' || evento === 'SIGNED_OUT')) setTimeout(() => carregar(sessao?.user), 0)
    })
    return () => ouvinte.subscription.unsubscribe()
  }, [carregar])

  const recarregar = useCallback(async () => {
    const { data } = await getSupabase().auth.getSession()
    await carregar(data.session?.user)
  }, [carregar])

  return {
    ...estado,
    admin: estado.perfil?.papel === 'admin',
    nome: (estado.perfil?.nome || '').trim().split(/\s+/)[0] || '',
    recarregar,
    sair: async () => { await getSupabase().auth.signOut(); window.location.href = raiz('/') },
  }
}

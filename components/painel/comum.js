'use client'
import { useCallback, useEffect, useState } from 'react'
import { textoErro } from '@/lib/erros'
import { getSupabase } from '@/lib/supabase'

/** Carrega dados de uma aba do painel e oferece `acao` para gravar e recarregar. */
export function useDados(buscar, deps, avisar) {
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')
  const carregar = useCallback(async () => {
    try { setDados(await buscar(getSupabase())); setErro('') } catch (e) { setErro(textoErro(e)) }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setDados(null); carregar() }, [carregar])

  const acao = async (chamada, sucesso) => {
    const { data, error } = await chamada(getSupabase())
    if (error) { avisar(textoErro(error), 'error'); return null }
    if (data && data.ok === false) { avisar(data.mensagem || 'Não foi possível concluir.', 'error'); return null }
    if (sucesso) avisar(sucesso)
    await carregar()
    return data ?? true
  }
  return { dados, erro, carregar, acao }
}

/** Resultado de uma consulta, ou erro. */
export const exigir = ({ data, error }) => { if (error) throw error; return data || [] }

export function Estado({ erro, dados, children }) {
  if (erro) return <p className="hk-msg erro">{erro}</p>
  if (dados === null) return <p className="hk-vazio">Carregando...</p>
  return children
}

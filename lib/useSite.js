import { useEffect, useState } from 'react'
import { getSupabase } from './supabase'
import { CONFIG_PADRAO, GRADE_PADRAO, FOTOS_PADRAO } from './conteudo'

const PADRAO = { config: CONFIG_PADRAO, grade: GRADE_PADRAO, avaliacoes: [], galeria: FOTOS_PADRAO, passeios: [] }

/** Conteúdo público do site (função site_publico do banco). */
export function useSite() {
  const [site, setSite] = useState(PADRAO)
  useEffect(() => {
    getSupabase().rpc('site_publico').then(({ data, error }) => {
      if (error || !data) return
      setSite({
        config: { ...CONFIG_PADRAO, ...data.config },
        grade: data.grade?.length ? data.grade : GRADE_PADRAO,
        avaliacoes: data.avaliacoes || [],
        galeria: data.galeria?.length ? data.galeria : FOTOS_PADRAO,
        passeios: data.passeios || [],
      })
    })
  }, [])
  return site
}

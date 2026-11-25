'use client'
import { raiz } from '@/lib/caminho'
import Acesso from './Acesso'
import { Cadastro, Vinculo, NovaSenha } from './Etapas'

/** Mostra a etapa que falta antes de liberar a área logada. */
export default function Portao({ sessao, linkPrivacidade }) {
  const { etapa } = sessao
  if (etapa === 'carregando') return <p className="hk-vazio">Carregando...</p>
  if (etapa === 'visitante') return <Acesso />
  if (etapa === 'cadastro') return <Cadastro sessao={sessao} linkPrivacidade={linkPrivacidade} />
  if (etapa === 'recuperar') return <NovaSenha aoSalvar={() => { window.location.href = raiz('/aluno/') }} />
  if (etapa === 'vinculo') return <><Vinculo /><button className="btn btn-outline hk-cheio" onClick={sessao.sair}>Sair</button></>
  return <div className="hk-form"><p className="hk-msg erro">Não foi possível carregar sua conta.</p><button className="btn btn-outline" onClick={sessao.recarregar}>Tentar de novo</button></div>
}

const MENSAGENS = {
  nao_autenticado: 'Sua sessão expirou. Entre novamente.',
  vinculo_pendente: 'Sua conta ainda está sendo vinculada ao seu cadastro. O Jhon vai liberar em breve.',
  telefone_ja_cadastrado: 'Este telefone já está cadastrado em outra conta.',
  telefone_invalido: 'Informe o telefone com DDD, por exemplo (27) 99999-0000.',
  nome_invalido: 'Informe seu nome completo.',
  email_invalido: 'Informe um e-mail válido.',
  pessoas_invalido: 'Escolha de 2 a 13 pessoas.',
  muitos_envios: 'Recebemos muitos envios agora. Fale com a gente pelo WhatsApp.',
  nota_invalida: 'Selecione uma nota.',
  texto_invalido: 'Escreva um comentário de até 600 caracteres.',
  ja_avaliou: 'Você já enviou uma avaliação.',
  somente_admin: 'Apenas o administrador pode fazer isso.',
  plataformas_lotadas: 'As vagas de plataforma dessa remada já estão ocupadas.',
  sessao_ja_cancelada: 'Essa remada já está cancelada.',
  remada_ja_aconteceu: 'Essa remada já começou ou já passou.',
  conta_ja_vinculada: 'Essa conta já está vinculada a outro cadastro.',
}

export function textoErro(e) {
  const m = (e && e.message) || ''
  if (MENSAGENS[m]) return MENSAGENS[m]
  if (/invalid login/i.test(m)) return 'E-mail ou senha incorretos.'
  if (/not confirmed/i.test(m)) return 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
  if (/already (been )?registered/i.test(m)) return 'Este e-mail já tem conta. Use a opção Entrar.'
  if (/password.*(least|weak|short)/i.test(m)) return 'Escolha uma senha com pelo menos 8 caracteres.'
  if (/rate limit|too many/i.test(m)) return 'Muitas tentativas. Aguarde alguns minutos.'
  if (/could not find the function|schema cache/i.test(m)) return 'Este recurso ainda não foi ativado no banco de dados.'
  if (/fetch|network/i.test(m)) return 'Sem conexão. Verifique a internet e tente de novo.'
  return 'Algo deu errado. Tente de novo.'
}

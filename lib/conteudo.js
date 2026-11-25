import { raiz } from './caminho'
// Valores usados só quando o banco não responde ao visitante
// (antes da migração 27 ou sem internet). Copiados do banco em 25/11/2026.
export const WHATSAPP = '5527997343759'

export const CONFIG_PADRAO = {
  valor_remada_avulsa: '60', pacote_4_valor: '140', pacote_8_valor: '200', pacote_12_valor: '230', pacote_16_valor: '250',
  validade_pacote_meses: '1', hora_abertura_mensalista: '07:00', hora_abertura_geral: '09:00',
  hora_fechamento_reservas: '23:30', hora_limite_cancelamento: '21:00', hora_limite_pix: '20:00',
  endereco: 'Av. Saturnino de Brito, Praia do Canto, Vitória – ES, 29055-095',
  referencia: 'Próximo ao estacionamento do Iate Clube',
  link_mapa: 'https://share.google/5oNa5h7vRRPFCh5G4',
  instagram: 'https://www.instagram.com/honukaivaa/',
  link_privacidade: 'https://jwintter.github.io/Honu-Kai-Reservas/privacidade.html',
  wellhub_plano_minimo: 'Silver', totalpass_plano_minimo: 'TP2+',
}

const FIM_DE_SEMANA = ['04:40', '06:10', '07:20', '08:30']
export const GRADE_PADRAO = [
  ...['Terça', 'Quarta', 'Quinta', 'Sexta'].flatMap(dia => ['04:40', '06:10', '16:30'].map(hora => ({ dia, hora }))),
  ...['Sábado', 'Domingo', 'Feriado'].flatMap(dia => FIM_DE_SEMANA.map(hora => ({ dia, hora }))),
]

export const FOTOS_PADRAO = ['foto3_selfie_galera', 'foto1_remada_galera', 'foto4_por_do_sol', 'foto2_turma_remando', 'foto5_ilha']
  .map(n => raiz(`/images/${n}.jpeg`))

export const PACOTES = [
  { total: 4, desc: 'Para começar' },
  { total: 8, desc: 'Regular' },
  { total: 12, desc: 'Melhor custo-benefício', destaque: true },
  { total: 16, desc: 'Para os dedicados' },
]

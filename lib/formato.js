// Datas sempre no horário de Brasília, qualquer que seja o relógio do aparelho.
export const hojeSP = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date())
export const somaDias = (iso, n) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10) }
export const dataBR = (iso, opcoes) => iso ? new Date(iso + 'T12:00:00').toLocaleDateString('pt-BR', opcoes) : '–'
export const dataLonga = iso => dataBR(iso, { weekday: 'long', day: '2-digit', month: '2-digit' })
export const hora = t => String(t || '').slice(0, 5)
export const reais = n => 'R$ ' + Number(n || 0).toFixed(2).replace('.', ',')
export const inicioRemada = (data, h) => new Date(`${data}T${hora(h)}:00-03:00`)
export const linkWhats = (telefone, texto) => {
  let d = String(telefone || '').replace(/\D/g, '')
  if (d && !(d.startsWith('55') && d.length >= 12)) d = '55' + d
  return `https://wa.me/${d}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
}

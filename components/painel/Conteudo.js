'use client'
import { useState } from 'react'
import { dataBR } from '@/lib/formato'
import { getSupabase } from '@/lib/supabase'
import { useDados, exigir, Estado } from './comum'

const VAZIO = { data: '', titulo: 'Passeio de Domingo', destino: '', descricao: '', imagem_url: '' }

async function enviarFoto(arquivo, avisar) {
  const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[arquivo.type]
  if (!ext || arquivo.size > 5 * 1024 * 1024) { avisar('Use JPG, PNG ou WEBP de até 5 MB.', 'error'); return null }
  const armazem = getSupabase().storage.from('site')
  const caminho = `${crypto.randomUUID()}.${ext}`
  const { error } = await armazem.upload(caminho, arquivo)
  if (error) { avisar('Não foi possível enviar a foto.', 'error'); return null }
  return armazem.getPublicUrl(caminho).data.publicUrl
}

export default function Conteudo({ avisar }) {
  const [passeio, setPasseio] = useState(VAZIO)
  const { dados, erro, acao } = useDados(async sb => {
    const [g, a, p] = await Promise.all([
      sb.from('site_galeria').select('*').order('posicao'),
      sb.from('site_avaliacoes').select('*').order('criado_em', { ascending: false }).limit(100),
      sb.from('site_passeios').select('*').order('data', { ascending: false }).limit(20),
    ])
    return { galeria: exigir(g), avaliacoes: exigir(a), passeios: exigir(p) }
  }, [], avisar)

  async function trocarFoto(posicao, arquivo) {
    const url = arquivo && await enviarFoto(arquivo, avisar)
    if (url) await acao(sb => sb.from('site_galeria').upsert({ posicao, url }), 'Foto atualizada.')
  }

  return (
    <>
      <h1 className="hk-titulo">Conteúdo do site</h1>
      <Estado erro={erro} dados={dados}>
        <div className="hk-grade">
          <div className="hk-cartao">
            <b>Galeria</b><small>Enquanto estiver vazia, o site usa as fotos originais. Ao enviar a primeira, passa a mostrar só as enviadas.</small>
            {[1, 2, 3, 4, 5].map(n => {
              const f = dados?.galeria.find(x => x.posicao === n)
              return <div key={n} className="hk-linha">{f ? <img src={f.url} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} /> : <span>Foto {n}</span>}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => trocarFoto(n, e.target.files[0])} />
                {f && <button className="btn btn-danger" onClick={() => acao(sb => sb.from('site_galeria').delete().eq('posicao', n), 'Removida.')}>Remover</button>}</div>
            })}
          </div>
          <div className="hk-cartao">
            <b>Passeios</b>
            <input className="inp" type="date" value={passeio.data} onChange={e => setPasseio({ ...passeio, data: e.target.value })} />
            {[['titulo', 'Título'], ['destino', 'Destino'], ['descricao', 'Descrição']].map(([k, t]) => <input key={k} className="inp" placeholder={t} value={passeio[k] || ''} onChange={e => setPasseio({ ...passeio, [k]: e.target.value })} />)}
            <label>Imagem<input type="file" accept="image/jpeg,image/png,image/webp" onChange={async e => { const url = e.target.files[0] && await enviarFoto(e.target.files[0], avisar); if (url) setPasseio(p => ({ ...p, imagem_url: url })) }} /></label>
            <button className="btn btn-green" disabled={!passeio.data || !passeio.titulo} onClick={async () => { if (await acao(sb => sb.from('site_passeios').upsert({ ...passeio, ativo: true }, { onConflict: 'data' }), 'Passeio salvo.')) setPasseio(VAZIO) }}>Salvar passeio</button>
            {dados?.passeios.map(p => <div key={p.id} className="hk-linha"><span>{dataBR(p.data)} · {p.titulo}{p.ativo ? '' : ' (oculto)'}</span><div className="hk-acoes">
              <button onClick={() => setPasseio({ data: p.data, titulo: p.titulo, destino: p.destino || '', descricao: p.descricao || '', imagem_url: p.imagem_url || '' })}>Editar</button>
              <button onClick={() => acao(sb => sb.from('site_passeios').update({ ativo: !p.ativo }).eq('id', p.id), 'Atualizado.')}>{p.ativo ? 'Ocultar' : 'Mostrar'}</button></div></div>)}
          </div>
          <div className="hk-cartao">
            <b>Avaliações</b>
            {!dados?.avaliacoes.length && <small>Nenhuma avaliação.</small>}
            {dados?.avaliacoes.map(a => <div key={a.id} className="hk-pessoa"><div><b>{a.nome} · {'★'.repeat(a.nota)}</b><small>{a.texto}</small></div><div className="hk-acoes">
              <button onClick={() => acao(sb => sb.from('site_avaliacoes').update({ publicada: !a.publicada }).eq('id', a.id), 'Atualizado.')}>{a.publicada ? 'Ocultar' : 'Publicar'}</button></div></div>)}
          </div>
        </div>
      </Estado>
    </>
  )
}

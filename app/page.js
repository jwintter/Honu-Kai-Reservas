'use client'
import { useEffect, useState } from 'react'
import { useSessao } from '@/lib/useSessao'
import { useSite } from '@/lib/useSite'
import { useToast } from '@/components/Toast'
import Modal from '@/components/Modal'
import Portao from '@/components/conta/Portao'
import Nav from '@/components/home/Nav'
import Hero from '@/components/home/Hero'
import Sobre from '@/components/home/Sobre'
import Galeria from '@/components/home/Galeria'
import Reservas from '@/components/home/Reservas'
import Passes from '@/components/home/Passes'
import ChamadaEmpresas from '@/components/home/ChamadaEmpresas'
import Avaliacoes from '@/components/home/Avaliacoes'
import RodapeNav from '@/components/home/RodapeNav'

export default function Home() {
  const sessao = useSessao()
  const site = useSite()
  const [avisar, toast] = useToast()
  const [acesso, setAcesso] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const revelar = () => {
      setParallaxY(-(window.scrollY * 0.12))
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('visible')
      })
    }
    window.addEventListener('scroll', revelar, { passive: true })
    const timers = [100, 500, 1200].map(t => setTimeout(revelar, t))
    return () => { window.removeEventListener('scroll', revelar); timers.forEach(clearTimeout) }
  }, [])

  useEffect(() => { if (sessao.etapa === 'pronto') setAcesso(false) }, [sessao.etapa])
  const pedirAcesso = () => setAcesso(true)

  return (
    <div style={{ background: 'var(--hk-bg)' }}>
      <Nav sessao={sessao} aoEntrar={pedirAcesso} />
      <Hero parallaxY={parallaxY} />
      <Sobre />
      <Galeria galeria={site.galeria} />
      <Reservas sessao={sessao} site={site} avisar={avisar} pedirAcesso={pedirAcesso} />
      <Passes config={site.config} />
      <ChamadaEmpresas />
      <Avaliacoes sessao={sessao} avaliacoes={site.avaliacoes} avisar={avisar} pedirAcesso={pedirAcesso} />
      <RodapeNav />
      {acesso && <Modal titulo="Bem-vindo!" onFechar={() => setAcesso(false)}><Portao sessao={sessao} linkPrivacidade={site.config.link_privacidade} /></Modal>}
      {toast}
    </div>
  )
}

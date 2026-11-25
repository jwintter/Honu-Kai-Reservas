import './globals.css'

export const metadata = {
  title: "Honu Kai Va'a | Canoa Havaiana em Vitória/ES",
  description: 'Base de canoa havaiana na Praia do Canto, Vitória/ES.',
  // A versão de teste não deve aparecer em buscadores.
  ...(process.env.NEXT_PUBLIC_BASE_PATH?.endsWith('/novo') ? { robots: { index: false, follow: false } } : {}),
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  )
}

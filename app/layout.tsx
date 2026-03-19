import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/cookie-banner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: 'TEM ONDA - Previsao de Surf',
  description: 'Previsao de ondas e condicoes de surf em tempo real para as melhores praias do litoral brasileiro.',
  keywords: ['surf', 'previsao', 'ondas', 'praia', 'litoral', 'brasil', 'swell', 'vento', 'mare'],
  authors: [{ name: 'Tem Onda' }],
  openGraph: {
    title: 'TEM ONDA - Previsao de Surf',
    description: 'Previsao de ondas e condicoes de surf em tempo real para as melhores praias do litoral brasileiro.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Tem Onda',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEM ONDA - Previsao de Surf',
    description: 'Previsao de ondas e condicoes de surf em tempo real.',
  },
}

export const viewport: Viewport = {
  themeColor: '#121214',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <CookieBanner />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

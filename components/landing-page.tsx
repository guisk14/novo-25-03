"use client"

import Link from "next/link"
import { Waves, ChevronRight, MapPin, Bell, Users, BarChart3 } from "lucide-react"

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Aurora/Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top right glow */}
        <div 
          className="absolute -top-[300px] -right-[200px] w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(163,230,53,0.4) 0%, rgba(163,230,53,0.1) 40%, transparent 70%)",
          }}
        />
        {/* Bottom left glow */}
        <div 
          className="absolute -bottom-[400px] -left-[200px] w-[900px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, rgba(163,230,53,0.3) 0%, rgba(163,230,53,0.05) 50%, transparent 70%)",
          }}
        />
        {/* Curved lines */}
        <svg className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20" viewBox="0 0 600 600">
          <path d="M600,100 Q400,150 350,400 T200,600" stroke="rgba(163,230,53,0.5)" strokeWidth="1" fill="none" />
          <path d="M600,150 Q420,200 380,420 T250,600" stroke="rgba(163,230,53,0.3)" strokeWidth="1" fill="none" />
          <path d="M600,200 Q440,250 410,440 T300,600" stroke="rgba(163,230,53,0.2)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#a3e635] bg-[#a3e635]/10">
            <Waves className="h-5 w-5 text-[#a3e635]" />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
            Inicio
          </Link>
          <Link href="/previsao" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Previsao
          </Link>
          <Link href="/comunidade" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Comunidade
          </Link>
          <Link href="/contato" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Contato
          </Link>
        </nav>

        {/* Sign In */}
        <button className="px-5 py-2 text-sm font-semibold text-[#0a0a0f] bg-white rounded-full hover:bg-white/90 transition-colors">
          Entrar
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-8 lg:px-16 pt-16 lg:pt-24 pb-32">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            {/* Tagline */}
            <p className="text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Surfe mais inteligente, nao mais dificil
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8">
              Encontre a{" "}
              <span className="text-[#a3e635]">onda perfeita</span>{" "}
              antes de sair de casa
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Previsoes precisas em tempo real para mais de 50 praias do litoral brasileiro. 
              Dados de ondulacao, vento, mare e muito mais na palma da sua mao.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/previsao"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0a0a0f] bg-white rounded-full hover:bg-white/90 transition-all group"
              >
                Ver Previsao
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/comunidade"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-all"
              >
                Comunidade
              </Link>
            </div>
          </div>

          {/* Right Content - Browser Mockup */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              {/* Browser Frame */}
              <div className="bg-[#1a1a1f] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0f0f12]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28ca41]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1 bg-white/5 rounded-md">
                      <div className="w-3 h-3 rounded-full bg-[#a3e635]/50" />
                      <span className="text-[10px] text-white/40">temonda.com</span>
                    </div>
                  </div>
                </div>

                {/* Browser Content */}
                <div className="relative aspect-[16/10] bg-[#12121a] flex items-center justify-center">
                  {/* Preview Content */}
                  <div className="absolute inset-4 rounded-lg bg-gradient-to-br from-[#1a1a25] to-[#0f0f15] border border-white/5 p-6">
                    {/* Mini Cards Preview */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 border-t-2 border-[#a3e635]">
                        <p className="text-[8px] text-white/40 uppercase tracking-wider mb-1">Altura</p>
                        <p className="text-lg font-bold text-white">1.2<span className="text-xs text-white/50 ml-0.5">m</span></p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border-t-2 border-cyan-400">
                        <p className="text-[8px] text-white/40 uppercase tracking-wider mb-1">Periodo</p>
                        <p className="text-lg font-bold text-white">12<span className="text-xs text-white/50 ml-0.5">s</span></p>
                      </div>
                    </div>
                    {/* Mini Chart */}
                    <div className="bg-white/5 rounded-lg p-3 h-20 flex items-end gap-1">
                      {[40, 60, 45, 80, 65, 90, 70, 55, 75, 85, 60, 50].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#a3e635] to-[#a3e635]/30 rounded-sm"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-white/20 text-sm">Previsao ao vivo</span>
                </div>
              </div>

              {/* Glow behind mockup */}
              <div 
                className="absolute -inset-8 -z-10 opacity-50 blur-3xl"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(163,230,53,0.2) 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 px-8 lg:px-16 py-24 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#a3e635] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Por que usar o Tem Onda?
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Tudo que voce precisa para surfar melhor
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Ferramentas poderosas e dados precisos para voce nao perder nenhuma sessao
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Previsao Precisa"
              description="Dados atualizados em tempo real com alta precisao"
            />
            <FeatureCard
              icon={<MapPin className="h-6 w-6" />}
              title="50+ Praias"
              description="Cobertura completa do litoral brasileiro"
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Alertas"
              description="Receba notificacoes quando as condicoes estiverem ideais"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Comunidade"
              description="Conecte-se com outros surfistas da regiao"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 lg:px-16 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            Pronto para encontrar sua{" "}
            <span className="text-[#a3e635]">proxima onda</span>?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Junte-se a milhares de surfistas que ja usam o Tem Onda para planejar suas sessoes
          </p>
          <Link
            href="/previsao"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-[#0a0a0f] bg-[#a3e635] rounded-full hover:bg-[#b4f044] transition-all shadow-[0_0_40px_rgba(163,230,53,0.3)] group"
          >
            Comecar Agora
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 lg:px-16 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a3e635]/50 bg-[#a3e635]/10">
              <Waves className="h-4 w-4 text-[#a3e635]" />
            </div>
            <span className="text-sm font-bold text-white">TEM ONDA</span>
          </div>
          <p className="text-xs text-white/40">
            2024 Tem Onda. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a3e635]/30 hover:bg-white/[0.07] transition-all">
      <div className="w-12 h-12 rounded-xl bg-[#a3e635]/10 flex items-center justify-center text-[#a3e635] mb-4 group-hover:bg-[#a3e635]/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50">{description}</p>
    </div>
  )
}

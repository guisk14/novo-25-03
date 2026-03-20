"use client"

import { useEffect, useState, useRef } from "react"
import { Waves, MapPin, Bell, Users, ArrowRight, Play, Zap, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

const FEATURES = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Tempo Real",
    description: "Dados atualizados a cada hora com precisao meteorologica.",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Previsao 7 Dias",
    description: "Planeje sua semana com antecedencia e nao perca nenhuma sessao.",
  },
  {
    icon: <Bell className="h-5 w-5" />,
    title: "Alertas Smart",
    description: "Notificacoes personalizadas quando as condicoes estao perfeitas.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "98% Precisao",
    description: "Algoritmos avancados para previsoes confiaveis.",
  },
]

const TESTIMONIALS = [
  {
    name: "Lucas Medeiros",
    role: "Surfista Pro",
    quote: "Melhor app de previsao que ja usei. As notificacoes salvam minhas sessoes.",
    avatar: "LM",
  },
  {
    name: "Marina Costa",
    role: "Instrutora de Surf",
    quote: "Uso diariamente para planejar as aulas. Precisao incrivel.",
    avatar: "MC",
  },
  {
    name: "Pedro Santos",
    role: "Weekend Warrior",
    quote: "Finalmente consigo aproveitar meus fins de semana com ondas boas.",
    avatar: "PS",
  },
]

const BEACHES = [
  { name: "Maresias", condition: "Epic", height: "1.8m", period: "12s" },
  { name: "Itamambuca", condition: "Good", height: "1.2m", period: "10s" },
  { name: "Praia do Rosa", condition: "Epic", height: "2.1m", period: "14s" },
  { name: "Joaquina", condition: "Fair", height: "0.9m", period: "8s" },
]

export function LandingPage() {
  const [activeBeach, setActiveBeach] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBeach((prev) => (prev + 1) % BEACHES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Full viewport immersive */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Primary gradient orb */}
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px]"
            style={{ transform: `translate(-50%, ${scrollY * 0.1}px)` }}
          />
          {/* Secondary accent */}
          <div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px]"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm pl-1.5 pr-5 py-1.5">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-[10px] font-black text-black">
                  NEW
                </span>
                <span className="text-sm font-medium text-foreground">Previsao atualizada em tempo real</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95]">
                <span className="text-foreground">Surf</span>
                <br />
                <span className="text-foreground">smarter,</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
                  not harder.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Previsao de ondas precisa para mais de 50 praias do Brasil. 
                Planeje suas sessoes com confianca.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Link
                  href="/previsao"
                  className="group relative flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-base font-bold text-background transition-all hover:scale-105"
                >
                  <span>Ver Previsao</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </Link>
                <button className="flex items-center gap-3 rounded-full border border-border bg-card/50 backdrop-blur-sm px-6 py-4 text-base font-medium text-foreground transition-all hover:bg-card hover:border-primary/30">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                    <Play className="h-3 w-3 text-primary ml-0.5" fill="currentColor" />
                  </div>
                  Ver como funciona
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-8 border-t border-border/50">
                <div className="flex -space-x-3">
                  {["LM", "MC", "PS", "JR"].map((initials, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary/80 to-cyan-500/80 text-xs font-bold text-black"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">10.000+ surfistas</p>
                  <p className="text-xs text-muted-foreground">confiam no Tem Onda</p>
                </div>
              </div>
            </div>

            {/* Right - Live preview card */}
            <div className="relative">
              {/* Main card */}
              <div className="relative rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl p-8 shadow-2xl">
                {/* Card header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Waves className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">{BEACHES[activeBeach].name}</p>
                      <p className="text-sm text-muted-foreground">Litoral Brasileiro</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    BEACHES[activeBeach].condition === "Epic" 
                      ? "bg-green-500/10 text-green-500" 
                      : BEACHES[activeBeach].condition === "Good"
                        ? "bg-primary/10 text-primary"
                        : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {BEACHES[activeBeach].condition}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Altura</p>
                    <p className="text-4xl font-black text-foreground">{BEACHES[activeBeach].height}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Periodo</p>
                    <p className="text-4xl font-black text-foreground">{BEACHES[activeBeach].period}</p>
                  </div>
                </div>

                {/* Wave visualization */}
                <div className="h-32 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent overflow-hidden relative">
                  <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                    <path
                      d="M0,60 Q50,40 100,60 T200,60 T300,60 T400,60 L400,80 L0,80 Z"
                      fill="url(#waveGradient)"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Beach selector dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {BEACHES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveBeach(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === activeBeach ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 opacity-80 blur-sm -z-10" />
              <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 opacity-60 blur-sm -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="relative py-8 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 lg:gap-4">
            {[
              { value: "50+", label: "Praias" },
              { value: "24/7", label: "Monitoramento" },
              { value: "10k+", label: "Usuarios" },
              { value: "98%", label: "Precisao" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-black text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                <span className="text-foreground">Tudo para sua</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  proxima sessao.
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                Ferramentas profissionais de previsao em uma interface simples. 
                Dados confiaveis para decisoes melhores.
              </p>
              <Link
                href="/previsao"
                className="mt-8 inline-flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all"
              >
                Explorar recursos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Right - Feature cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:bg-card"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground">
              Amado por surfistas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Veja o que nossa comunidade diz sobre o Tem Onda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8"
              >
                <p className="text-lg text-foreground leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-500 text-sm font-bold text-black">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            <span className="text-foreground">Pronto para a</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              onda perfeita?
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Junte-se a milhares de surfistas que ja usam o Tem Onda para planejar suas sessoes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/previsao"
              className="group relative flex items-center gap-3 rounded-full bg-foreground px-10 py-5 text-lg font-bold text-background transition-all hover:scale-105"
            >
              <span>Comecar Agora</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </Link>
            <Link
              href="/comunidade"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Explorar comunidade
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { ChevronDown, Waves, Wind, Clock, Droplets } from "lucide-react"

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth"
    })
  }

  const features = [
    { icon: Waves, label: "Altura", value: "Tempo real" },
    { icon: Clock, label: "Periodo", value: "Precisao" },
    { icon: Wind, label: "Vento", value: "Direcao" },
    { icon: Droplets, label: "Mare", value: "Tabuas" },
  ]

  return (
    <section className="relative flex min-h-[45vh] md:min-h-[50vh] flex-col items-center justify-center overflow-hidden px-4 py-10 md:py-14">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.07] blur-[100px] bg-sky-500" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.05] blur-[80px] bg-cyan-400" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs font-medium text-sky-400 uppercase tracking-wider">Litoral Paulista</span>
        </div>

        {/* Main headline */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
          Previsao de ondas
          <br />
          <span className="text-sky-400">em tempo real</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-lg text-sm md:text-base text-muted-foreground/70 leading-relaxed mb-8">
          Dados meteorologicos e oceanograficos atualizados para surfistas do litoral de Sao Paulo
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8">
          {features.map((feature) => (
            <div 
              key={feature.label}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-sky-500/30 transition-colors"
            >
              <feature.icon className="h-4 w-4 text-sky-400" />
              <span className="text-xs font-medium text-foreground/80">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToContent}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-medium text-sm transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
        >
          <span>Ver Previsao</span>
          <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </section>
  )
}

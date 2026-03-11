"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  currentHeight?: number
  currentPeriod?: number
  currentWind?: number
}

export function HeroSection({ currentHeight, currentPeriod, currentWind }: HeroSectionProps) {
  const scrollToContent = () => {
    const element = document.getElementById("forecast-content")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({
        top: window.innerHeight - 80,
        behavior: "smooth"
      })
    }
  }

  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ocean.jpg"
          alt="Ocean wave"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Dark Overlay Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(10, 10, 12, 0.4) 0%,
              rgba(10, 10, 12, 0.5) 40%,
              rgba(10, 10, 12, 0.7) 70%,
              rgba(18, 18, 20, 0.95) 100%
            )
          `
        }}
      />

      {/* Side gradient for text readability */}
      <div 
        className="absolute inset-0 hidden md:block"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(10, 10, 12, 0.6) 0%,
              rgba(10, 10, 12, 0.3) 40%,
              transparent 70%
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-sky-400"></span>
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Previsao de Ondas
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-[32px] md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 text-balance"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
          >
            Veja quando as melhores ondas vao chegar
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-lg">
            Dados atualizados de swell, vento e mare para acompanhar as condicoes do seu pico.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToContent}
            className="group inline-flex items-center gap-2 px-6 py-3.5 mt-6 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm md:text-base transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:shadow-xl"
          >
            <span>Ver previsao</span>
            <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Quick Stats - Mini Cards */}
          <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-0.5">Altura</span>
                <span className="text-xl md:text-2xl font-bold text-white">
                  {currentHeight?.toFixed(1) ?? "—"}
                  <span className="text-sm font-medium text-white/50 ml-0.5">m</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-0.5">Periodo</span>
                <span className="text-xl md:text-2xl font-bold text-white">
                  {currentPeriod?.toFixed(0) ?? "—"}
                  <span className="text-sm font-medium text-white/50 ml-0.5">s</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium mb-0.5">Vento</span>
                <span className="text-xl md:text-2xl font-bold text-white">
                  {currentWind?.toFixed(0) ?? "—"}
                  <span className="text-sm font-medium text-white/50 ml-0.5">km/h</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </section>
  )
}

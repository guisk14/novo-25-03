"use client"

import { formatNum, degToCompass } from "@/lib/surf-utils"
import type { ForecastData } from "@/lib/surf-utils"

interface ForecastCardsProps {
  data: ForecastData | null
  loading: boolean
}

function WaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

function TimerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3L2 6" />
      <path d="M22 6l-3-3" />
    </svg>
  )
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  )
}

function CompassIcon({ className, rotation }: { className?: string; rotation: number }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s ease-out' }}>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m15 9-6 6" />
      <path d="M9 9l0 6 6 0" />
    </svg>
  )
}

const CARD_THEMES = {
  altura: { accent: "#a3e635", label: "Altura", glow: "rgba(163, 230, 53, 0.15)" },
  periodo: { accent: "#22d3ee", label: "Periodo", glow: "rgba(34, 211, 238, 0.15)" },
  direcao: { accent: "#f472b6", label: "Dir. Onda", glow: "rgba(244, 114, 182, 0.15)" },
  vento: { accent: "#fbbf24", label: "Vento", glow: "rgba(251, 191, 36, 0.15)" },
}

function CardSkeleton() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl bg-[#0d0d15] border border-white/10 p-6 min-h-[180px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="h-10 w-10 rounded-xl bg-white/10 animate-pulse mb-4" />
      <div className="h-3 w-20 rounded-full bg-white/10 animate-pulse mb-3" />
      <div className="h-12 w-28 rounded-lg bg-white/10 animate-pulse mb-2" />
      <div className="h-2 w-16 rounded-full bg-white/10 animate-pulse" />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  subtitle?: string
  subtitle2?: string
  subtitle2Color?: string
  accentColor: string
  glowColor: string
}

function MetricCard({ icon, label, value, unit, subtitle, subtitle2, subtitle2Color, accentColor, glowColor }: MetricCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0d0d15] border border-white/10 p-4 sm:p-6 min-h-[160px] sm:min-h-[180px] transition-all duration-500 hover:border-[#a3e635]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a3e635]/5">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
      
      {/* Hover glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${glowColor}, transparent 70%)`,
        }}
      />
      
      {/* Top accent line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 rounded-b-full transition-all duration-300 group-hover:w-24"
        style={{ backgroundColor: accentColor }}
      />

      {/* Icon */}
      <div 
        className="relative mb-3 p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
      >
        {icon}
      </div>

      {/* Label */}
      <span className="relative text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-2">
        {label}
      </span>

      {/* Value */}
      <div className="relative flex items-baseline gap-1">
        <span
          className="text-4xl sm:text-5xl font-black leading-none text-white transition-all duration-300 group-hover:scale-105"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-lg sm:text-xl font-bold text-white/30">
            {unit}
          </span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <span className="relative mt-2 text-xs font-medium text-white/40">
          {subtitle}
        </span>
      )}

      {/* Subtitle 2 - Badge */}
      {subtitle2 && (
        <span 
          className="relative mt-2 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider"
          style={{ 
            color: subtitle2Color || accentColor,
            backgroundColor: `${subtitle2Color || accentColor}15`,
          }}
        >
          {subtitle2}
        </span>
      )}
    </div>
  )
}

export function ForecastCards({ data, loading }: ForecastCardsProps) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  const windDir = degToCompass(data.currentWindDir)

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard
        icon={<WaveIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
        label={CARD_THEMES.altura.label}
        value={formatNum(data.currentHeight, 1)}
        unit="m"
        accentColor={CARD_THEMES.altura.accent}
        glowColor={CARD_THEMES.altura.glow}
      />

      <MetricCard
        icon={<TimerIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
        label={CARD_THEMES.periodo.label}
        value={formatNum(data.currentPeriod, 0)}
        unit="s"
        accentColor={CARD_THEMES.periodo.accent}
        glowColor={CARD_THEMES.periodo.glow}
      />

      <MetricCard
        icon={<CompassIcon className="h-6 w-6 sm:h-7 sm:w-7" rotation={data.currentDirection} />}
        label={CARD_THEMES.direcao.label}
        value={data.currentDirectionCompass}
        accentColor={CARD_THEMES.direcao.accent}
        glowColor={CARD_THEMES.direcao.glow}
      />

      <MetricCard
        icon={<WindIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
        label={CARD_THEMES.vento.label}
        value={`${Math.round(data.currentWindSpeed)}`}
        unit="km/h"
        subtitle={`${windDir} · Raj. ${Math.round(data.currentWindGust)} km`}
        subtitle2={`${data.currentWindType} ${data.currentWindIntensity}`}
        subtitle2Color={data.currentWindColor}
        accentColor={data.currentWindColor}
        glowColor={`${data.currentWindColor}25`}
      />
    </div>
  )
}

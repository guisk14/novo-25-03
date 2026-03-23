"use client"

import { formatNum, degToCompass } from "@/lib/surf-utils"
import type { ForecastData } from "@/lib/surf-utils"
import { Waves, Clock, Wind, Compass } from "lucide-react"

interface ForecastCardsProps {
  data: ForecastData | null
  loading: boolean
}

function CardSkeleton() {
  return (
    <div className="flex flex-col items-start rounded-2xl bg-card/50 border border-border/30 p-6 min-h-[200px] animate-pulse">
      <div className="h-10 w-10 rounded-lg bg-muted mb-4" />
      <div className="h-2 w-20 rounded bg-muted mb-6" />
      <div className="h-12 w-32 rounded bg-muted mb-2" />
      <div className="h-2 w-48 rounded bg-muted" />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  description: string
  badge?: string
  badgeColor?: string
  accentColor: string
  iconBgColor: string
}

function MetricCard({ icon, label, value, unit, description, badge, badgeColor, accentColor, iconBgColor }: MetricCardProps) {
  return (
    <div className="flex flex-col items-start justify-between rounded-2xl border border-border/40 bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm p-6 min-h-[220px] hover:border-border/60 transition-all duration-300 group">
      {/* Icon + Label row */}
      <div className="w-full flex flex-col items-start gap-3">
        {/* Icon in rounded square */}
        <div 
          className="flex items-center justify-center rounded-xl p-3 transition-all group-hover:scale-110"
          style={{ backgroundColor: iconBgColor }}
        >
          <div style={{ color: accentColor }} className="w-6 h-6">
            {icon}
          </div>
        </div>

        {/* Label */}
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-muted-foreground/70">
          {label}
        </span>
      </div>

      {/* Value section - center */}
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black text-foreground leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-semibold text-muted-foreground opacity-60">
            {unit}
          </span>
        )}
      </div>

      {/* Bottom section - description + badge */}
      <div className="w-full flex flex-col items-start gap-2">
        <p className="text-xs font-medium text-muted-foreground/80 leading-tight max-w-xs">
          {description}
        </p>

        {badge && (
          <div 
            className="px-3 py-1.5 rounded-full border text-[0.65rem] font-bold uppercase tracking-wide"
            style={{ 
              borderColor: badgeColor,
              color: badgeColor,
              backgroundColor: `${badgeColor}10`
            }}
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  )
}

export function ForecastCards({ data, loading }: ForecastCardsProps) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  const windIntensityColor = 
    data.currentWindIntensity === "MUITO FORTE" ? "#ef4444" :
    data.currentWindIntensity === "FORTE" ? "#f59e0b" :
    data.currentWindIntensity === "MODERADO" ? "#f59e0b" :
    "#22c55e"

  const waveQualityColor =
    data.currentHeight >= 3 ? "#ef4444" :
    data.currentHeight >= 2 ? "#f59e0b" :
    data.currentHeight >= 1 ? "#22c55e" :
    "#38bdf8"

  const waveQualityBadge =
    data.currentHeight >= 3 ? "EXCELENTE" :
    data.currentHeight >= 2 ? "BOM" :
    data.currentHeight >= 1 ? "PEQUENO" :
    "MUITO PEQUENO"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Onda Card */}
      <MetricCard
        icon={<Waves className="w-full h-full" strokeWidth={1.5} />}
        label="Onda"
        value={formatNum(data.currentHeight, 1)}
        unit="m"
        description="Altura da onda no pico agora."
        badge={waveQualityBadge}
        badgeColor={waveQualityColor}
        accentColor="#38bdf8"
        iconBgColor="rgba(56, 189, 248, 0.15)"
      />

      {/* Período Card */}
      <MetricCard
        icon={<Clock className="w-full h-full" strokeWidth={1.5} />}
        label="Período"
        value={formatNum(data.currentPeriod, 0)}
        unit="s"
        description="Tempo entre séries e energia."
        badge=""
        accentColor="#60a5fa"
        iconBgColor="rgba(96, 165, 250, 0.15)"
      />

      {/* Direção Card */}
      <MetricCard
        icon={<Compass className="w-full h-full" strokeWidth={1.5} />}
        label="Direção"
        value={data.currentDirectionCompass || "N/A"}
        description="Entrada principal da ondulação."
        badge=""
        accentColor="#22d3ee"
        iconBgColor="rgba(34, 211, 238, 0.15)"
      />

      {/* Vento Card */}
      <MetricCard
        icon={<Wind className="w-full h-full" strokeWidth={1.5} />}
        label="Vento"
        value={`${Math.round(data.currentWindSpeed)}`}
        unit="km/h"
        description={`${degToCompass(data.currentWindDir)} - Raj. ${Math.round(data.currentWindGust)} km`}
        badge={data.currentWindIntensity}
        badgeColor={windIntensityColor}
        accentColor={windIntensityColor}
        iconBgColor={`${windIntensityColor}15`}
      />
    </div>
  )
}

"use client"

import { degToCompass, formatNum } from "@/lib/surf-utils"
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rotation}deg)` }}>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m15 9-6 6" />
      <path d="M9 9l0 6 6 0" />
    </svg>
  )
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative min-h-[146px] overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(19,23,19,0.96),rgba(10,13,10,0.98))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[188px] sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)]" />
      <div className="pointer-events-none absolute right-[-20%] top-[-20%] h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  subtitle,
  badge,
  badgeColor,
  accentColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  unit?: string
  subtitle?: string
  badge?: string
  badgeColor?: string
  accentColor: string
}) {
  return (
    <CardShell>
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="rounded-2xl border border-white/8 bg-white/4 p-3" style={{ color: accentColor }}>
          {icon}
        </div>
        <span className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/48">
          {label}
        </span>
      </div>

      <div className="flex items-end gap-1">
        <span className="font-display text-4xl font-bold leading-none text-white sm:text-[3.25rem]" style={{ fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
        {unit && <span className="pb-1 text-base font-semibold text-white/38 sm:text-lg">{unit}</span>}
      </div>

      {subtitle && <p className="mt-4 text-sm leading-6 text-white/54">{subtitle}</p>}

      {badge && (
        <div className="mt-4">
          <span
            className="inline-flex rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: badgeColor || accentColor }}
          >
            {badge}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent 72%)` }} />
    </CardShell>
  )
}

function CardSkeleton() {
  return (
    <CardShell>
      <div className="mb-6 h-12 w-12 animate-pulse rounded-2xl bg-white/8" />
      <div className="mb-3 h-3 w-20 animate-pulse rounded bg-white/8" />
      <div className="mb-3 h-12 w-24 animate-pulse rounded bg-white/8" />
      <div className="h-2 w-32 animate-pulse rounded bg-white/8" />
    </CardShell>
  )
}

export function ForecastCards({ data, loading }: ForecastCardsProps) {
  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  const windDir = degToCompass(data.currentWindDir)

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <MetricCard
        icon={<WaveIcon className="h-5 w-5 sm:h-7 sm:w-7" />}
        label="Onda"
        value={formatNum(data.currentHeight, 1)}
        unit="m"
        subtitle="Altura da onda no pico agora."
        accentColor="#5ed7ff"
      />

      <MetricCard
        icon={<TimerIcon className="h-5 w-5 sm:h-7 sm:w-7" />}
        label="Periodo"
        value={formatNum(data.currentPeriod, 0)}
        unit="s"
        subtitle="Tempo entre series e energia."
        accentColor="#e9ffb5"
      />

      <MetricCard
        icon={<CompassIcon className="h-5 w-5 sm:h-7 sm:w-7" rotation={data.currentDirection} />}
        label="Direcao"
        value={data.currentDirectionCompass}
        subtitle="Entrada principal da ondulacao."
        accentColor="#5ed7ff"
      />

      <MetricCard
        icon={<WindIcon className="h-5 w-5 sm:h-7 sm:w-7" />}
        label="Vento"
        value={String(Math.round(data.currentWindSpeed))}
        unit="km/h"
        subtitle={`${windDir} - Raj. ${Math.round(data.currentWindGust)} km`}
        badge={`${data.currentWindType} ${data.currentWindIntensity}`}
        badgeColor={data.currentWindColor}
        accentColor={data.currentWindColor}
      />
    </div>
  )
}

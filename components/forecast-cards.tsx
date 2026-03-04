"use client"

import { formatNum, degToCompass } from "@/lib/surf-utils"
import type { ForecastData } from "@/lib/surf-utils"

interface ForecastCardsProps {
  data: ForecastData | null
  loading: boolean
}

export function ForecastCards({ data, loading }: ForecastCardsProps) {
  const isHighWave = data && data.currentHeight > 0.8

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* Altura Onda */}
      <div
        className="group flex flex-col justify-center rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        style={{ borderTopWidth: 4, borderTopColor: isHighWave ? "#38bdf8" : "rgba(255,255,255,0.08)" }}
      >
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
          Altura Onda (Praia)
        </span>
        <span
          className={`mt-2 text-3xl font-extrabold leading-none transition-colors ${
            isHighWave ? "text-primary" : "text-foreground"
          } ${loading ? "animate-pulse" : ""}`}
          style={isHighWave ? { textShadow: "0 0 15px rgba(56, 189, 248, 0.4)" } : undefined}
        >
          {loading ? "--" : formatNum(data?.currentHeight ?? null, 1)}
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">m</span>
      </div>

      {/* Periodo */}
      <div className="group flex flex-col justify-center rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]" style={{ borderTopWidth: 4, borderTopColor: "rgba(255,255,255,0.08)" }}>
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
          Periodo (Pico)
        </span>
        <span className={`mt-2 text-3xl font-extrabold leading-none text-foreground ${loading ? "animate-pulse" : ""}`}>
          {loading ? "--" : formatNum(data?.currentPeriod ?? null, 1)}
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">s</span>
      </div>

      {/* Direcao */}
      <div className="group flex flex-col justify-center rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]" style={{ borderTopWidth: 4, borderTopColor: "rgba(255,255,255,0.08)" }}>
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
          Direcao (Pico)
        </span>
        <span className={`mt-2 text-3xl font-extrabold leading-none text-foreground ${loading ? "animate-pulse" : ""}`}>
          {loading ? "--" : `${formatNum(data?.currentDirection ?? null, 0)}°`}
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">
          {loading ? "" : data?.currentDirectionCompass}
        </span>
      </div>

      {/* Vento */}
      <div
        className="group flex flex-col justify-center rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        style={{ borderTopWidth: 4, borderTopColor: data?.currentWindColor ?? "rgba(255,255,255,0.08)" }}
      >
        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
          Vento
        </span>
        <span
          className={`mt-2 text-3xl font-extrabold leading-none ${loading ? "animate-pulse text-foreground" : ""}`}
          style={data ? { color: data.currentWindColor } : undefined}
        >
          {loading ? "-- km/h" : `${Math.round(data?.currentWindSpeed ?? 0)} km/h`}
        </span>
        <span className="mt-1 text-sm font-semibold text-muted-foreground">
          {loading ? "--" : degToCompass(data?.currentWindDir ?? NaN)}
        </span>
        <span className="text-xs text-muted-foreground">
          {loading ? "Rajada: -- km/h" : `Rajada: ${Math.round(data?.currentWindGust ?? 0)} km/h`}
        </span>
        <span
          className="mt-0.5 text-xs font-bold"
          style={data ? { color: data.currentWindColor } : undefined}
        >
          {loading ? "--" : `${data?.currentWindType} ${data?.currentWindIntensity}`}
        </span>
      </div>
    </div>
  )
}

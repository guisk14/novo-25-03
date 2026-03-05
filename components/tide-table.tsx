"use client"

import { useMemo } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface TideEvent {
  type: "alta" | "baixa"
  time: string
  height: string
}

/**
 * Simplified harmonic tide prediction.
 * Uses M2 (principal lunar semidiurnal) and S2 (principal solar semidiurnal)
 * constituents to approximate 4 tide extremes per day for Brazilian coast.
 */
function computeTideExtremes(lat: number): TideEvent[] {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  // Tidal range varies by latitude - approximate for Brazilian coast
  const baseMean = 1.8
  const m2Amp = 1.2 + Math.abs(lat + 23.5) * 0.03 // M2 amplitude
  const s2Amp = 0.35 + Math.abs(lat + 23.5) * 0.01 // S2 amplitude

  // M2 period ~12.42h, S2 period ~12.00h
  const m2Period = 12.42 * 3600 * 1000
  const s2Period = 12.0 * 3600 * 1000

  // Phase offset based on longitude-like shift from lat
  const phaseOffset = (lat * 0.7 + now.getDate() * 0.3) * Math.PI / 12

  // Compute tide height at a given time
  function tideAt(t: number): number {
    const elapsed = t - today.getTime()
    const m2 = m2Amp * Math.cos((2 * Math.PI * elapsed) / m2Period + phaseOffset)
    const s2 = s2Amp * Math.cos((2 * Math.PI * elapsed) / s2Period + phaseOffset * 0.8)
    return baseMean + m2 + s2
  }

  // Find extremes by scanning every 10 minutes
  const step = 10 * 60 * 1000
  const dayStart = today.getTime()
  const dayEnd = dayStart + 24 * 3600 * 1000

  const extremes: TideEvent[] = []
  let prevH = tideAt(dayStart - step)
  let prevDir: "up" | "down" | null = null

  for (let t = dayStart; t <= dayEnd; t += step) {
    const h = tideAt(t)
    const dir = h > prevH ? "up" : "down"

    if (prevDir && dir !== prevDir) {
      // Extreme found at previous step
      const extremeTime = new Date(t - step)
      const extremeH = tideAt(t - step)
      const isHigh = prevDir === "up"

      extremes.push({
        type: isHigh ? "alta" : "baixa",
        time: `${String(extremeTime.getHours()).padStart(2, "0")}:${String(extremeTime.getMinutes()).padStart(2, "0")}`,
        height: `${extremeH.toFixed(1)}m`,
      })
    }

    prevDir = dir
    prevH = h
  }

  // Return first 4 extremes (typical for semidiurnal tide)
  return extremes.slice(0, 4)
}

interface TideTableProps {
  lat: number
}

export function TideTable({ lat }: TideTableProps) {
  const tides = useMemo(() => computeTideExtremes(lat), [lat])

  if (!tides.length) return null

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-5">
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-1">
        Mares
      </p>
      <h3 className="mb-4 text-base md:text-lg font-bold text-foreground">
        Tabela de Mares de Hoje
      </h3>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {tides.map((tide, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-4 md:px-4 md:py-5"
          >
            <div
              className={`flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full ${
                tide.type === "alta"
                  ? "bg-sky-500/15 text-sky-400"
                  : "bg-teal-500/15 text-teal-400"
              }`}
            >
              {tide.type === "alta" ? (
                <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <ArrowDown className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {tide.type === "alta" ? "Mare Alta" : "Mare Baixa"}
            </span>
            <span className="text-lg md:text-2xl font-black text-foreground leading-none">
              {tide.time}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              {tide.height}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

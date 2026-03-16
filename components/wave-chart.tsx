"use client"

import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { safeParseDate, formatNum, degToCompass } from "@/lib/surf-utils"
import type { ChartDataPoint } from "@/lib/surf-utils"

interface WaveChartProps {
  data: ChartDataPoint[]
}

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

function dayKey(iso: string) {
  return String(iso).slice(0, 10)
}

function dayLabel(iso: string) {
  const d = safeParseDate(iso)
  return `${DIAS_SEMANA[d.getDay()]} ${d.getDate()}`
}

function hourOnly(iso: string) {
  const d = safeParseDate(iso)
  return `${d.getHours()}h`
}

interface DayGroup {
  key: string
  label: string
  startIdx: number
  endIdx: number
}

function groupByDay(data: ChartDataPoint[]): DayGroup[] {
  const groups: DayGroup[] = []
  if (!data.length) return groups
  let curKey = dayKey(data[0].time)
  let start = 0
  for (let i = 1; i < data.length; i++) {
    const k = dayKey(data[i].time)
    if (k !== curKey) {
      groups.push({ key: curKey, label: dayLabel(data[start].time), startIdx: start, endIdx: i - 1 })
      curKey = k
      start = i
    }
  }
  groups.push({ key: curKey, label: dayLabel(data[start].time), startIdx: start, endIdx: data.length - 1 })
  return groups
}

function findNowIndex(data: ChartDataPoint[]): number {
  const now = Date.now()
  let best = 0
  let diff = Infinity
  for (let i = 0; i < data.length; i++) {
    const d = Math.abs(safeParseDate(data[i].time).getTime() - now)
    if (d < diff) { diff = d; best = i }
  }
  return best
}

/* ── smooth bezier helpers ── */

function buildAreaPath(
  points: { x: number; y: number }[],
  baseY: number
): string {
  if (points.length < 2) return ""
  let d = `M${points[0].x},${baseY}`
  d += ` L${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const cpx1 = prev.x + (cur.x - prev.x) * 0.4
    const cpx2 = prev.x + (cur.x - prev.x) * 0.6
    d += ` C${cpx1},${prev.y} ${cpx2},${cur.y} ${cur.x},${cur.y}`
  }
  d += ` L${points[points.length - 1].x},${baseY} Z`
  return d
}

function buildLinePath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return ""
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const cpx1 = prev.x + (cur.x - prev.x) * 0.4
    const cpx2 = prev.x + (cur.x - prev.x) * 0.6
    d += ` C${cpx1},${prev.y} ${cpx2},${cur.y} ${cur.x},${cur.y}`
  }
  return d
}

function interpY(points: { x: number; y: number }[], xPos: number): number {
  if (!points.length) return 0
  if (xPos <= points[0].x) return points[0].y
  if (xPos >= points[points.length - 1].x) return points[points.length - 1].y
  for (let i = 1; i < points.length; i++) {
    if (xPos <= points[i].x) {
      const t = (xPos - points[i - 1].x) / (points[i].x - points[i - 1].x)
      return points[i - 1].y + t * (points[i].y - points[i - 1].y)
    }
  }
  return points[points.length - 1].y
}

export function WaveChart({ data }: WaveChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [dims, setDims] = useState({ width: 800, height: 200 })

  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        setDims({ width: w, height: Math.max(160, Math.min(220, w * 0.28)) })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const dayGroups = useMemo(() => groupByDay(data), [data])
  const nowIdx = useMemo(() => findNowIndex(data), [data])

  useEffect(() => {
    if (dayGroups.length && selectedDay === null) {
      const idx = dayGroups.findIndex(g => nowIdx >= g.startIdx && nowIdx <= g.endIdx)
      setSelectedDay(idx >= 0 ? idx : 0)
    }
  }, [dayGroups, nowIdx, selectedDay])

  const activeIdx = hoveredIdx ?? nowIdx

  const maxWave = useMemo(() => {
    let m = 0
    for (const d of data) if (d.waveHeight > m) m = d.waveHeight
    return Math.max(m, 0.5)
  }, [data])

  const maxWind = useMemo(() => {
    let m = 0
    for (const d of data) if (d.windSpeed > m) m = d.windSpeed
    return Math.max(m, 5)
  }, [data])

  const maxPeriod = useMemo(() => {
    let m = 0
    for (const d of data) if (d.wavePeriod > m) m = d.wavePeriod
    return Math.max(m, 5)
  }, [data])

  const { width: W, height: H } = dims
  const PAD_T = 12
  const PAD_B = 6
  const chartH = H - PAD_T - PAD_B
  const baseY = PAD_T + chartH

  const step = data.length > 1 ? W / (data.length - 1) : W

  // Compute points for each series
  const windPoints = useMemo(() => data.map((d, i) => ({
    x: i * step,
    y: baseY - (d.windSpeed / maxWind) * chartH * 0.65,
  })), [data, step, baseY, maxWind, chartH])

  // Wave layer (smoothed for depth effect)
  const wavePoints2 = useMemo(() => data.map((d, i) => {
    const next = data[Math.min(i + 2, data.length - 1)]
    const avg = (d.waveHeight + next.waveHeight) / 2 * 0.85
    return {
      x: i * step,
      y: baseY - (avg / maxWave) * chartH * 0.8,
    }
  }), [data, step, baseY, maxWave, chartH])

  const periodPoints = useMemo(() => data.map((d, i) => ({
    x: i * step,
    y: PAD_T + chartH * 0.15 - (d.wavePeriod / maxPeriod) * chartH * 0.55 + chartH * 0.45,
  })), [data, step, maxPeriod, chartH])

  // SVG paths
  const windAreaPath = useMemo(() => buildAreaPath(windPoints, baseY), [windPoints, baseY])
  const waveAreaPath2 = useMemo(() => buildAreaPath(wavePoints2, baseY), [wavePoints2, baseY])
  const waveLinePath = useMemo(() => buildLinePath(wavePoints2), [wavePoints2])
  const periodLinePath = useMemo(() => buildLinePath(periodPoints), [periodPoints])

  const nowX = nowIdx * step
  const activeX = activeIdx * step

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current || !data.length) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const idx = Math.round((x / rect.width) * (data.length - 1))
    setHoveredIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }, [data.length])

  const onMouseMove = useCallback((e: React.MouseEvent) => handlePointer(e.clientX), [handlePointer])
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    handlePointer(e.touches[0].clientX)
  }, [handlePointer])
  const onPointerLeave = useCallback(() => setHoveredIdx(null), [])

  if (!data.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
        Carregando grafico...
      </div>
    )
  }

  const point = data[activeIdx]

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Title */}
      <div className="px-4 pt-4 pb-2 md:px-5 md:pt-5 text-center md:text-left">
        <h3 className="text-[18px] font-semibold tracking-wide text-foreground flex items-center justify-center md:justify-start gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" className="text-sky-400">
            <path d="M2 12c2-3 4-4 6-4s4 1 6 4 4 4 6 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M2 18c2-3 4-4 6-4s4 1 6 4 4 4 6 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
          </svg>
          Condição das Ondas
        </h3>
        <p className="text-[12px] text-muted-foreground/[0.65] mt-1">
          Deslize ou mova o mouse no grafico para ver os detalhes
        </p>
      </div>

      {/* SVG chart with integrated day headers */}
      <div ref={containerRef} className="relative touch-none bg-[#1a1a1f]">
        {/* Day headers inline */}
        <div className="absolute top-0 left-0 right-0 flex z-10 border-b border-[rgba(255,255,255,0.08)]" style={{ height: '32px' }}>
          {dayGroups.map((g, i) => {
            const startX = (g.startIdx / (data.length - 1)) * 100
            const endX = ((g.endIdx + 1) / (data.length - 1)) * 100
            const width = endX - startX
            return (
              <div
                key={g.key}
                className="flex items-center justify-center text-[11px] md:text-xs font-bold text-gray-300 uppercase tracking-wide border-r border-[rgba(255,255,255,0.08)] last:border-r-0 bg-[#252529]"
                style={{ width: `${width}%` }}
              >
                {g.label.toUpperCase()}
              </div>
            )
          })}
        </div>

        {/* Tooltip showing time near cursor - pill style */}
        {hoveredIdx !== null && point && (
          <div 
            className="absolute px-2 py-0.5 rounded bg-[#5ec8e8] text-[10px] md:text-[11px] font-bold text-[#1a1a1f] pointer-events-none z-20 whitespace-nowrap"
            style={{ 
              left: `${Math.min(Math.max(activeX, 25), W - 25)}px`,
              top: '48px',
              transform: 'translateX(-50%)'
            }}
          >
            {hourOnly(point.time)}
          </div>
        )}
        <svg
          ref={svgRef}
          width={W}
          height={H + 32}
          viewBox={`0 0 ${W} ${H + 32}`}
          className="w-full cursor-crosshair select-none"
          onMouseMove={onMouseMove}
          onMouseLeave={onPointerLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onPointerLeave}
          preserveAspectRatio="none"
          style={{ marginTop: '0' }}
        >
          {/* Gradient definition for wave */}
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(94,200,232,0.35)" />
              <stop offset="50%" stopColor="rgba(94,200,232,0.12)" />
              <stop offset="100%" stopColor="rgba(94,200,232,0.01)" />
            </linearGradient>
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(94,200,232,0.5)" />
            </filter>
          </defs>

          {/* Offset for header */}
          <g transform="translate(0, 32)">
            {/* Day separator lines */}
            {dayGroups.slice(1).map((g, i) => (
              <line
                key={`sep-${i}`}
                x1={g.startIdx * step}
                y1={0}
                x2={g.startIdx * step}
                y2={H}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}

            {/* Wave layer - subtle gradient fill */}
            <path d={waveAreaPath2} fill="url(#waveGradient)" />

            {/* Wave top line - bright cyan with glow */}
            <path d={waveLinePath} fill="none" stroke="#5ec8e8" strokeWidth={2.5} filter="url(#lineGlow)" />

          {/* Interactive hover line */}
            {hoveredIdx !== null && (
              <line
                x1={activeX}
                y1={0}
                x2={activeX}
                y2={H}
                stroke="#5ec8e8"
                strokeWidth={1.5}
              />
            )}
          </g>
        </svg>
      </div>

      

      {/* Bottom metrics */}
      <div className="flex items-center justify-between border-t border-border px-1 py-2 gap-0.5 md:px-2 md:py-3 md:gap-1">
        <MetricItem
          label="ALTURA"
          value={`${formatNum(point?.waveHeight, 1)} m`}
          color="text-sky-400"
          icon={
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-sky-400 md:w-4 md:h-4">
              <path d="M2 12c2-3 4-4 6-4s4 1 6 4 4 4 6 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M2 18c2-3 4-4 6-4s4 1 6 4 4 4 6 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
            </svg>
          }
        />
        <MetricItem
          label="PERIODO"
          value={`${formatNum(point?.wavePeriod, 1)} s`}
          color="text-sky-400"
          icon={
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-sky-400 md:w-4 md:h-4">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <MetricItem
          label="DIRECAO"
          value={degToCompass(point?.waveDirDeg)}
          color="text-sky-400"
          showArrow
          arrowDeg={point?.waveDirDeg}
        />
        <div className="flex flex-col items-center text-center min-w-0 flex-1">
          <span className="text-[7px] md:text-[9px] font-bold uppercase tracking-wide text-muted-foreground leading-tight">
            VENTO
          </span>
          <div className="flex items-center gap-0.5 mt-0.5">
            {typeof point?.windDirDeg === "number" && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                className="text-gray-400 shrink-0 md:w-3.5 md:h-3.5"
                style={{ transform: `rotate(${point.windDirDeg}deg)` }}
              >
                <path d="M12 2l0 20M12 2l-5 5M12 2l5 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className="text-[11px] md:text-base font-extrabold text-foreground leading-none">
              {Math.round(point?.windSpeed ?? 0)}
            </span>
            <span className="text-[11px] md:text-lg font-black text-gray-300 leading-none">
              {degToCompass(point?.windDirDeg)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricItem({
  label,
  value,
  color,
  showArrow,
  arrowDeg,
  icon,
}: {
  label: string
  value: string
  color: string
  showArrow?: boolean
  arrowDeg?: number
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center min-w-0 flex-1">
      <div className="flex items-center gap-1">
        {icon && <span className="shrink-0">{icon}</span>}
        <span className={`text-[7px] md:text-[9px] font-bold uppercase tracking-wide ${color} leading-tight`}>
          {label}
        </span>
      </div>
      <div className="flex items-center gap-0.5 mt-0.5">
        {showArrow && typeof arrowDeg === "number" && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            className={`${color} shrink-0 md:w-3 md:h-3`}
            style={{ transform: `rotate(${arrowDeg}deg)` }}
          >
            <path d="M12 2l0 20M12 2l-5 5M12 2l5 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="text-[11px] md:text-base font-extrabold text-foreground leading-none">{value}</span>
      </div>
    </div>
  )
}

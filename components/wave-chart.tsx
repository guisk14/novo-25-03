"use client"

import { useMemo, useState, useCallback, useRef, useEffect } from "react"
import { safeParseDate, formatNum, degToCompass } from "@/lib/surf-utils"
import type { ChartDataPoint } from "@/lib/surf-utils"

interface WaveChartProps {
  data: ChartDataPoint[]
}

/* ── helpers ── */

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

function dayKey(iso: string) {
  return String(iso).slice(0, 10)
}

function dayLabel(iso: string) {
  const d = safeParseDate(iso)
  return `${DIAS_SEMANA[d.getDay()]} (${d.getDate()})`
}

function hourOnly(iso: string) {
  const d = safeParseDate(iso)
  return `${String(d.getHours()).padStart(2, "0")} horas`
}

/* group data points by day */
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

/* find the closest point to now */
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

/* ── SVG Wave Chart ── */

export function WaveChart({ data }: WaveChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 200 })

  // Responsive sizing
  useEffect(() => {
    function update() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        setDimensions({ width: w, height: Math.max(160, Math.min(220, w * 0.28)) })
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const dayGroups = useMemo(() => groupByDay(data), [data])
  const nowIdx = useMemo(() => findNowIndex(data), [data])

  // Set initial selected day to the day containing now
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

  const maxPeriod = useMemo(() => {
    let m = 0
    for (const d of data) if (d.wavePeriod > m) m = d.wavePeriod
    return Math.max(m, 5)
  }, [data])

  const { width: W, height: H } = dimensions
  const PADDING_TOP = 10
  const PADDING_BOTTOM = 10
  const chartH = H - PADDING_TOP - PADDING_BOTTOM

  // Generate wave-like path (smooth area with "wave bumps")
  const buildWavePath = useCallback((values: number[], maxVal: number, scale: number) => {
    if (!values.length) return ""
    const step = W / Math.max(values.length - 1, 1)
    const points: [number, number][] = values.map((v, i) => [
      i * step,
      PADDING_TOP + chartH - (v / maxVal) * chartH * scale,
    ])

    // Build smooth curve
    let d = `M${points[0][0]},${points[0][1]}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const cur = points[i]
      const cpx1 = prev[0] + (cur[0] - prev[0]) * 0.4
      const cpx2 = prev[0] + (cur[0] - prev[0]) * 0.6
      d += ` C${cpx1},${prev[1]} ${cpx2},${cur[1]} ${cur[0]},${cur[1]}`
    }
    // Close the area
    d += ` L${points[points.length - 1][0]},${PADDING_TOP + chartH} L${points[0][0]},${PADDING_TOP + chartH} Z`
    return d
  }, [W, chartH])

  // Generate smooth line (for period)
  const buildLinePath = useCallback((values: number[], maxVal: number, scale: number) => {
    if (!values.length) return ""
    const step = W / Math.max(values.length - 1, 1)
    const points: [number, number][] = values.map((v, i) => [
      i * step,
      PADDING_TOP + chartH - (v / maxVal) * chartH * scale,
    ])

    let d = `M${points[0][0]},${points[0][1]}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const cur = points[i]
      const cpx1 = prev[0] + (cur[0] - prev[0]) * 0.4
      const cpx2 = prev[0] + (cur[0] - prev[0]) * 0.6
      d += ` C${cpx1},${prev[1]} ${cpx2},${cur[1]} ${cur[0]},${cur[1]}`
    }
    return d
  }, [W, chartH])

  const waveValues = useMemo(() => data.map(d => d.waveHeight), [data])
  const periodValues = useMemo(() => data.map(d => d.wavePeriod), [data])

  // Two wave layers with different opacity
  const wavePathMain = useMemo(() => buildWavePath(waveValues, maxWave, 0.85), [buildWavePath, waveValues, maxWave])
  const wavePathSecondary = useMemo(() => {
    // Slightly offset values for secondary wave layer effect
    const shifted = waveValues.map((v, i) => {
      const next = waveValues[Math.min(i + 2, waveValues.length - 1)]
      return (v + next) / 2 * 0.9
    })
    return buildWavePath(shifted, maxWave, 0.85)
  }, [buildWavePath, waveValues, maxWave])

  const periodLine = useMemo(() => buildLinePath(periodValues, maxPeriod, 0.7), [buildLinePath, periodValues, maxPeriod])

  // x position for now marker
  const step = W / Math.max(data.length - 1, 1)
  const nowX = nowIdx * step

  // Day boundary x positions
  const dayBoundaryXs = useMemo(() => {
    return dayGroups.map(g => ({
      x: g.startIdx * step,
      xEnd: (g.endIdx + 1) * step,
      label: g.label,
    }))
  }, [dayGroups, step])

  // Active point x position
  const activeX = activeIdx * step

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || !data.length) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const idx = Math.round((x / W) * (data.length - 1))
    setHoveredIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }, [data.length, W])

  const handleMouseLeave = useCallback(() => {
    setHoveredIdx(null)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current || !data.length) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const idx = Math.round((x / W) * (data.length - 1))
    setHoveredIdx(Math.max(0, Math.min(data.length - 1, idx)))
  }, [data.length, W])

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
      {/* Day tabs header */}
      <div className="flex border-b border-border overflow-x-auto">
        {dayGroups.map((g, i) => {
          const isToday = nowIdx >= g.startIdx && nowIdx <= g.endIdx
          const isSelected = selectedDay === i
          return (
            <button
              key={g.key}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 min-w-0 px-2 py-2.5 text-xs font-bold text-center whitespace-nowrap transition-colors border-b-2 ${
                isSelected
                  ? "border-red-500 text-foreground bg-[rgba(255,255,255,0.03)]"
                  : isToday
                    ? "border-red-500/50 text-foreground/80"
                    : "border-transparent text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {g.label}
            </button>
          )
        })}
      </div>

      {/* Selected day + hour label */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-sm text-muted-foreground">
          {point ? `${dayLabel(point.time)} - ${hourOnly(point.time)}` : ""}
        </p>
      </div>

      {/* Chart area */}
      <div ref={containerRef} className="px-2 pb-2">
        <svg
          ref={svgRef}
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          preserveAspectRatio="none"
        >
          {/* Background wave area - lighter blue */}
          <path
            d={wavePathSecondary}
            fill="#7ec8e3"
            opacity={0.5}
          />

          {/* Main wave area - darker blue */}
          <path
            d={wavePathMain}
            fill="#3b9fc9"
            opacity={0.7}
          />

          {/* Period line - red */}
          <path
            d={periodLine}
            fill="none"
            stroke="#dc2626"
            strokeWidth={2}
            opacity={0.85}
          />

          {/* Day boundary separator lines */}
          {dayGroups.slice(1).map(g => {
            const x = g.startIdx * step
            return (
              <line
                key={g.key}
                x1={x}
                y1={0}
                x2={x}
                y2={H}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1}
              />
            )
          })}

          {/* Now marker - vertical red line */}
          <line
            x1={nowX}
            y1={0}
            x2={nowX}
            y2={H}
            stroke="#dc2626"
            strokeWidth={2}
          />

          {/* Hover/active indicator */}
          {hoveredIdx !== null && (
            <>
              <line
                x1={activeX}
                y1={0}
                x2={activeX}
                y2={H}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <circle
                cx={activeX}
                cy={PADDING_TOP + chartH - (data[activeIdx].waveHeight / maxWave) * chartH * 0.85}
                r={4}
                fill="#3b9fc9"
                stroke="#fff"
                strokeWidth={2}
              />
              <circle
                cx={activeX}
                cy={PADDING_TOP + chartH - (data[activeIdx].wavePeriod / maxPeriod) * chartH * 0.7}
                r={3}
                fill="#dc2626"
                stroke="#fff"
                strokeWidth={1.5}
              />
            </>
          )}
        </svg>
      </div>

      {/* Bottom metrics bar */}
      <div className="flex items-center justify-between border-t border-border px-2 py-3 gap-1">
        <MetricItem
          label="ALTURA SIGNIFICATIVA"
          value={`${formatNum(point?.waveHeight, 1)} m`}
          color="text-sky-400"
        />
        <MetricItem
          label="PERIODO DE PICO"
          value={`${formatNum(point?.wavePeriod, 1)} s`}
          color="text-red-400"
        />
        <MetricItem
          label="DIRECAO DE PICO"
          value={degToCompass(point?.waveDirDeg)}
          color="text-sky-400"
          showArrow
          arrowDeg={point?.waveDirDeg}
        />
        <MetricItem
          label="VENTO"
          value={`${Math.round(point?.windSpeed ?? 0)} km/h`}
          color="text-muted-foreground"
          showArrow
          arrowDeg={point?.windDirDeg}
        />
        <MetricItem
          label="DIRECAO"
          value={degToCompass(point?.windDirDeg)}
          color="text-muted-foreground"
          showArrow
          arrowDeg={point?.windDirDeg}
        />
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
}: {
  label: string
  value: string
  color: string
  showArrow?: boolean
  arrowDeg?: number
}) {
  return (
    <div className="flex flex-col items-center text-center min-w-0 flex-1">
      <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wide ${color} leading-tight`}>
        {label}
      </span>
      <div className="flex items-center gap-0.5 mt-0.5">
        {showArrow && typeof arrowDeg === "number" && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className={`${color} shrink-0`}
            style={{ transform: `rotate(${arrowDeg}deg)` }}
          >
            <path d="M12 2l0 20M12 2l-5 5M12 2l5 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="text-sm sm:text-base font-extrabold text-foreground leading-none">{value}</span>
      </div>
    </div>
  )
}

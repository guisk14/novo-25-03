"use client"

import { useMemo, useState, useCallback } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { safeParseDate, formatNum, degToCompass } from "@/lib/surf-utils"
import type { ChartDataPoint } from "@/lib/surf-utils"

interface WaveChartProps {
  data: ChartDataPoint[]
}

function dayKey(iso: string) {
  return String(iso).slice(0, 10)
}

function dayLabelFull(iso: string) {
  const d = safeParseDate(iso)
  const dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
  return `${dias[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}`
}

function dayLabelShort(iso: string) {
  const d = safeParseDate(iso)
  const dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]
  return dias[d.getDay()]
}

function dayNumber(iso: string) {
  const d = safeParseDate(iso)
  return String(d.getDate()).padStart(2, "0")
}

function hourOnly(iso: string) {
  const d = safeParseDate(iso)
  return `${String(d.getHours()).padStart(2, "0")}h`
}

interface DaySegment {
  key: string
  label: string
  startIdx: number
  endIdx: number
}

function computeDaySegments(data: ChartDataPoint[]): DaySegment[] {
  if (!data.length) return []
  const segs: DaySegment[] = []
  let start = 0
  let curKey = dayKey(data[0].time)
  for (let i = 1; i < data.length; i++) {
    const k = dayKey(data[i].time)
    if (k !== curKey) {
      segs.push({ key: curKey, label: dayLabelFull(data[start].time), shortLabel: dayLabelShort(data[start].time), number: dayNumber(data[start].time), startIdx: start, endIdx: i - 1 })
      start = i
      curKey = k
    }
  }
  segs.push({ key: curKey, label: dayLabelFull(data[start].time), shortLabel: dayLabelShort(data[start].time), number: dayNumber(data[start].time), startIdx: start, endIdx: data.length - 1 })
  return segs
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataPoint }> }) {
  if (!active || !payload?.length) return null
  const point = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-[rgba(24,24,27,0.95)] px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="mb-1 text-xs font-bold uppercase text-primary">
        {hourOnly(point.time)}
      </p>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-foreground">
          <span className="font-bold">{formatNum(point.waveHeight, 1)}m</span>{" "}
          <span className="text-muted-foreground">altura</span>
        </span>
        <span className="text-sm text-foreground">
          <span className="font-bold">{formatNum(point.wavePeriod, 1)}s</span>{" "}
          <span className="text-muted-foreground">periodo</span>
        </span>
        <span className="text-sm text-foreground">
          <span className="font-bold">{degToCompass(point.waveDirDeg)}</span>{" "}
          <span className="text-muted-foreground">direcao</span>
        </span>
        <span className="text-sm text-foreground">
          <span className="font-bold">{Math.round(point.windSpeed)} km/h</span>{" "}
          <span className="text-muted-foreground">vento</span>
        </span>
      </div>
    </div>
  )
}

export function WaveChart({ data }: WaveChartProps) {
  const [activePoint, setActivePoint] = useState<ChartDataPoint | null>(null)

  const segments = useMemo(() => computeDaySegments(data), [data])

  const chartData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        index: i,
        label: hourOnly(d.time),
      })),
    [data]
  )

  const handleMouseMove = useCallback(
    (state: { activePayload?: Array<{ payload: ChartDataPoint }> }) => {
      if (state?.activePayload?.length) {
        setActivePoint(state.activePayload[0].payload)
      }
    },
    []
  )

  if (!data.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
        Carregando grafico...
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Day header */}
      <div className="mb-4 grid gap-1" style={{ gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))` }}>
        {segments.map((seg, idx) => (
          <span
            key={seg.key}
            className={`flex flex-col items-center justify-center rounded-md px-1 py-1.5 text-center font-extrabold uppercase ${
              idx === 0
                ? "bg-primary/20 text-primary"
                : "bg-[rgba(255,255,255,0.04)] text-muted-foreground"
            }`}
          >
            <span className="text-[0.6rem] sm:text-xs leading-none">{seg.shortLabel}</span>
            <span className="text-[0.55rem] sm:text-[0.6rem] leading-none mt-0.5 opacity-70">{seg.number}</span>
          </span>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} onMouseMove={handleMouseMove}>
          <defs>
            <linearGradient id="seaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="label" hide />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 6 }}
            axisLine={false}
            tickLine={false}
            width={14}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="waveHeight"
            stroke="#38bdf8"
            strokeWidth={3}
            fill="url(#seaGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#38bdf8", strokeWidth: 2, stroke: "#121214" }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Active point metrics */}
      {activePoint && (
        <div className="mt-3 flex items-center justify-between gap-1 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-2 py-2 sm:px-4 sm:py-2.5">
          <MetricChip label="ALT" value={`${formatNum(activePoint.waveHeight, 1)}m`} accent />
          <Divider />
          <MetricChip label="PER" value={`${formatNum(activePoint.wavePeriod, 1)}s`} />
          <Divider />
          <MetricChip label="DIR" value={degToCompass(activePoint.waveDirDeg)} />
          <Divider />
          <MetricChip label="VNT" value={`${Math.round(activePoint.windSpeed)} ${degToCompass(activePoint.windDirDeg)}`} />
        </div>
      )}
    </div>
  )
}

function Divider() {
  return <div className="h-6 w-px bg-[rgba(255,255,255,0.06)]" />
}

function MetricChip({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-0">
      <span className="text-[0.5rem] sm:text-[0.55rem] font-medium uppercase tracking-wider text-[#64748B]">
        {label}
      </span>
      <span
        className={`text-xs sm:text-sm font-semibold leading-none truncate ${accent ? "text-primary" : "text-[#E2E8F0]"}`}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </span>
    </div>
  )
}

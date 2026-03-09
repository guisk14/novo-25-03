"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface TideEvent {
  hora: string
  altura: number
  type: "MARE ALTA" | "MARE BAIXA"
}

interface TideData {
  fonte: string
  porto: string
  mares: Record<string, Array<{ hora: string; altura: number }>>
}

export function TideTable() {
  const [tideData, setTideData] = useState<TideEvent[]>([])
  const [nextTide, setNextTide] = useState<TideEvent | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const fetchTideData = async () => {
      try {
        const response = await fetch("/mare-santos-2026.json")
        const data: TideData = await response.json()
        
        const today = new Date()
        const dateKey = today.toISOString().split("T")[0]
        
        const todayTides = data.mares[dateKey] || []
        const events: TideEvent[] = []
        
        // Organize tides by alternating between high and low
        let isHigh = true
        for (const tide of todayTides) {
          events.push({
            hora: tide.hora,
            altura: tide.altura,
            type: isHigh ? "MARE ALTA" : "MARE BAIXA",
          })
          isHigh = !isHigh
        }
        
        setTideData(events)
        
        // Find next tide
        const now = new Date()
        const currentHour = now.getHours() + now.getMinutes() / 60
        const nextEvent = events.find(e => {
          const [hours, minutes] = e.hora.split(":").map(Number)
          const eventHour = hours + minutes / 60
          return eventHour > currentHour
        })
        setNextTide(nextEvent || null)
        setMounted(true)
      } catch (error) {
        console.error("[v0] Error fetching tide data:", error)
        setMounted(true)
      }
    }
    
    fetchTideData()
  }, [])

  if (!mounted || tideData.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Mares</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Tabela de Mares de Hoje</h2>
        
        {nextTide && (
          <p className="text-sm text-muted-foreground">
            Próxima {nextTide.type.toLowerCase()}: <span className="font-semibold text-foreground">{nextTide.hora}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {tideData.map((tide, i) => {
          const isNext = mounted && tide === nextTide
          const isHigh = tide.type === "MARE ALTA"

          return (
            <div
              key={i}
              className={`relative group rounded-xl border transition-all ${
                isNext
                  ? "border-primary/60 bg-gradient-to-br from-primary/20 to-primary/5 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.15)]"
              }`}
            >
              {isNext && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-black text-[10px] font-bold rounded-full whitespace-nowrap">
                  Próxima
                </div>
              )}
              
              <div className="p-3 md:p-4 flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 ${
                    isHigh
                      ? "bg-sky-400/20 text-sky-400"
                      : "bg-teal-400/20 text-teal-400"
                  }`}
                >
                  {isHigh ? (
                    <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <ArrowDown className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </div>

                <p className="text-[10px] md:text-xs font-semibold uppercase text-muted-foreground mb-1 leading-tight">
                  {isHigh ? "Mare Alta" : "Mare Baixa"}
                </p>

                <p className="text-lg md:text-xl font-bold text-foreground mb-1">
                  {tide.hora}
                </p>

                <p className={`text-xs md:text-sm font-semibold ${
                  isHigh ? "text-sky-400" : "text-teal-400"
                }`}>
                  {tide.altura.toFixed(2)}m
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

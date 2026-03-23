"use client"

import { useState, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import useSWR from "swr"
import { BEACH_DATA } from "@/lib/beach-data"
import type { Beach } from "@/lib/beach-data"
import { fetchForecast, type ForecastData } from "@/lib/surf-utils"
import { BeachSelector } from "@/components/beach-selector"
import { ForecastCards } from "@/components/forecast-cards"
import { WaveChart } from "@/components/wave-chart"
import { ForecastTables } from "@/components/forecast-tables"
import { SurfMap } from "@/components/surf-map"
import { Waves, Loader2, ArrowLeft, Bell, RefreshCw, Calendar, Clock, Zap } from "lucide-react"

const TideTable = dynamic(() => import("@/components/tide-table").then(mod => ({ default: mod.TideTable })), { 
  ssr: false,
  loading: () => <div className="h-64 rounded-2xl border border-[#a3e635]/20 bg-[#0d0d15] animate-pulse" />
})

function getBeach(cityId: string, beachId: string): Beach {
  const city = BEACH_DATA.find((c) => c.cityId === cityId) ?? BEACH_DATA[0]
  return city.beaches.find((b) => b.id === beachId) ?? city.beaches[0]
}

function getCityName(cityId: string): string {
  const city = BEACH_DATA.find((c) => c.cityId === cityId) ?? BEACH_DATA[0]
  return city.cityName
}

export default function PrevisaoPage() {
  const [cityId, setCityId] = useState(BEACH_DATA[0].cityId)
  const [beachId, setBeachId] = useState(BEACH_DATA[0].beaches[0].id)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const beach = useMemo(() => getBeach(cityId, beachId), [cityId, beachId])
  const cityName = useMemo(() => getCityName(cityId), [cityId])

  const fetcher = useCallback(() => fetchForecast(beach), [beach])

  const { data, isLoading, error, mutate } = useSWR<ForecastData>(
    `forecast-${beach.id}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await mutate()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleCityChange = useCallback(
    (newCityId: string) => {
      setCityId(newCityId)
      const city = BEACH_DATA.find((c) => c.cityId === newCityId) ?? BEACH_DATA[0]
      setBeachId(city.beaches[0].id)
    },
    []
  )

  const handleBeachChange = useCallback((newBeachId: string) => {
    setBeachId(newBeachId)
  }, [])

  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const currentDate = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-left aurora */}
        <div 
          className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full opacity-30 blur-[120px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.4) 0%, rgba(163, 230, 53, 0.1) 40%, transparent 70%)',
          }}
        />
        {/* Bottom-right aurora */}
        <div 
          className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full opacity-25 blur-[100px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.3) 0%, rgba(34, 211, 238, 0.1) 50%, transparent 70%)',
          }}
        />
        {/* Center subtle glow */}
        <div 
          className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.5) 0%, transparent 60%)',
          }}
        />
        {/* Animated floating orbs */}
        <div className="absolute top-[10%] right-[15%] w-2 h-2 rounded-full bg-[#a3e635] opacity-60 animate-pulse" />
        <div className="absolute top-[30%] right-[25%] w-1 h-1 rounded-full bg-[#a3e635] opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#a3e635] opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Voltar</span>
              </Link>
              <div className="h-6 w-px bg-white/10" />
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#a3e635]/30 bg-[#a3e635]/10">
                  <Waves className="h-5 w-5 text-[#a3e635]" />
                </div>
                <span className="text-lg font-bold">
                  <span className="text-white">TEM</span>
                  <span className="text-[#a3e635]"> ONDA</span>
                </span>
              </Link>
            </div>

            {/* Center: Date/Time */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <Calendar className="h-4 w-4" />
                <span className="capitalize">{currentDate}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Clock className="h-4 w-4" />
                <span>{currentTime}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
              <button className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <Bell className="h-4 w-4 text-white/80" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#a3e635] text-[9px] font-bold text-black">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title Section */}
      <section className="relative z-10 border-b border-white/5">
        <div className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 px-3 py-1 text-xs font-semibold text-[#a3e635]">
                  <Zap className="h-3 w-3" />
                  TEMPO REAL
                </span>
                {data && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-white/60">
                    Atualizado agora
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Previsao de Ondas
              </h1>
              <p className="mt-2 text-white/50 max-w-lg">
                Dados em tempo real de altura, periodo, direcao e vento para as melhores praias do Brasil.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-white">{BEACH_DATA.length}</span>
                <span className="text-xs text-white/50">Cidades</span>
              </div>
              <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-[#a3e635]">50+</span>
                <span className="text-xs text-white/50">Praias</span>
              </div>
              <div className="flex flex-col items-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl font-black text-white">24/7</span>
                <span className="text-xs text-white/50">Monitoramento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="mx-auto max-w-[1600px] px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel */}
            <div className="flex flex-1 flex-col gap-6 lg:max-w-[60%]">
              {/* Beach Selector Card */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d15]/80 backdrop-blur-sm p-6 hover:border-[#a3e635]/30 transition-colors">
                <BeachSelector
                  selectedCityId={cityId}
                  selectedBeachId={beachId}
                  onCityChange={handleCityChange}
                  onBeachChange={handleBeachChange}
                />
              </div>

              {/* Forecast Cards */}
              <ForecastCards data={data ?? null} loading={isLoading} />

              {/* Error State */}
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm font-semibold text-red-400 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                    <span className="text-red-400">!</span>
                  </div>
                  Erro ao carregar dados. Verifique sua conexao e tente novamente.
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center gap-3 py-6 text-sm text-[#a3e635]">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Buscando dados em tempo real...</span>
                </div>
              )}

              {/* Wave Chart */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d15]/80 backdrop-blur-sm p-6 hover:border-[#a3e635]/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Grafico de Ondas</h3>
                  <span className="text-xs text-[#a3e635]">Ultimas 24h</span>
                </div>
                <WaveChart data={data?.chartData ?? []} />
              </div>

              {/* Forecast Tables */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d15]/80 backdrop-blur-sm p-6 hover:border-[#a3e635]/30 transition-colors">
                <ForecastTables
                  data={data ?? null}
                  beachName={beach.name}
                  loading={isLoading}
                />
              </div>

              {/* Tide Table */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d15]/80 backdrop-blur-sm p-6 hover:border-[#a3e635]/30 transition-colors">
                <TideTable lat={beach.lat} />
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-center gap-2 py-4">
                <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : data ? 'bg-[#a3e635]' : 'bg-white/30'}`} />
                <p className="text-sm font-medium text-white/50">
                  {isLoading ? "Sincronizando dados..." : data ? "Dados sincronizados" : "Aguardando conexao..."}
                </p>
              </div>
            </div>

            {/* Right Panel - Map */}
            <div className="flex-1 lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
              <div className="h-full rounded-2xl border border-white/10 bg-[#0d0d15]/80 backdrop-blur-sm overflow-hidden hover:border-[#a3e635]/30 transition-colors">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Mapa Interativo</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635]/10 px-2.5 py-1 text-xs font-semibold text-[#a3e635]">
                    {beach.name}
                  </span>
                </div>
                <div className="h-[calc(100%-60px)]">
                  <SurfMap beach={beach} cityName={cityName} data={data ?? null} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>2024 Tem Onda. Dados fornecidos por Open-Meteo.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-[#a3e635] transition-colors">Inicio</Link>
              <Link href="/comunidade" className="hover:text-[#a3e635] transition-colors">Comunidade</Link>
              <Link href="/contato" className="hover:text-[#a3e635] transition-colors">Contato</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import type { Beach } from "@/lib/beach-data"
import type { ForecastData } from "@/lib/surf-utils"
import { formatNum, normDeg, classifyWind, classifyIntensity, windColor } from "@/lib/surf-utils"

interface SurfMapProps {
  beach: Beach
  cityName: string
  data: ForecastData | null
}

export function SurfMap({ beach, cityName, data }: SurfMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    let L: typeof import("leaflet")

    async function initMap() {
      L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }

      if (!mapRef.current) return

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(map)

      L.control.zoom({ position: "bottomright" }).addTo(map)

      map.setView([beach.lat, beach.lon], beach.zoom)
      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markerRef.current = null
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.setView([beach.lat, beach.lon], beach.zoom)
  }, [beach.lat, beach.lon, beach.zoom])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    async function updateMarker() {
      const L = (await import("leaflet")).default

      const map = mapInstanceRef.current
      if (!map) return

      if (markerRef.current) {
        map.removeLayer(markerRef.current)
        markerRef.current = null
      }

      const title = `${cityName} — ${beach.name}`
      const hTxt = data ? formatNum(data.currentHeight, 1) : "--"
      const pTxt = data ? formatNum(data.currentPeriod, 1) : "--"
      const waveDeg = data?.currentDirection ?? 0

      let windInfo = ""
      if (data) {
        const type = classifyWind(data.currentWindDir, beach.inletRanges || [])
        const intensity = classifyIntensity(data.currentWindSpeed)
        const color = windColor(type, intensity)
        const windDirNorm = normDeg(data.currentWindDir)
        const rot = normDeg(windDirNorm - 90)
        windInfo = `
          <div style="position:absolute;left:75px;top:75px;width:0;height:0;z-index:4;transform:rotate(${rot}deg);">
            <div style="position:absolute;left:0;top:0;transform:translate(25px,-50%);">
              <div style="display:flex;align-items:center;">
                <svg width="10" height="18" viewBox="0 0 16 28"><path d="M 16 0 L 0 14 L 16 28 Z" fill="${color}"/></svg>
                <div style="background:${color};color:#18181b;padding:2px 8px 2px 4px;border-radius:0 10px 10px 0;font-weight:800;white-space:nowrap;height:18px;display:flex;align-items:center;font-size:0.7em;">${Math.round(data.currentWindSpeed)} km/h <span style="font-size:0.6em;margin-left:4px;opacity:0.9;">${type}</span></div>
              </div>
            </div>
          </div>
        `
      }

      const swellRot = normDeg(waveDeg - 90)
      const htmlContent = `
        <div style="position:relative;width:150px;height:150px;font-family:'Inter',sans-serif;">
          <div style="position:absolute;top:8px;left:50%;transform:translateX(-50%);background:rgba(24,24,27,0.8);backdrop-filter:blur(4px);padding:3px 8px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);color:#e4e4e7;font-weight:700;font-size:0.55em;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;z-index:10;">${title}</div>
          <div style="position:absolute;top:75px;left:75px;width:10px;height:10px;background:#38bdf8;border-radius:50%;transform:translate(-50%,-50%);z-index:9;animation:pulse-ring 2s infinite ease-out;"></div>
          <div style="position:absolute;top:75px;left:75px;width:10px;height:10px;background:#ffffff;border:2px solid #18181b;border-radius:50%;transform:translate(-50%,-50%);z-index:10;"></div>
          <div style="position:absolute;top:75px;left:75px;width:60px;height:60px;border:1px solid rgba(255,255,255,0.3);border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;"></div>
          <div style="position:absolute;left:75px;top:75px;width:0;height:0;z-index:5;transform:rotate(${swellRot}deg);">
            <div style="position:absolute;left:0;top:0;transform:translate(25px,-50%);">
              <div style="display:flex;align-items:center;">
                <svg width="10" height="18" viewBox="0 0 16 28"><path d="M 16 0 L 0 14 L 16 28 Z" fill="#38bdf8"/></svg>
                <div style="background:#38bdf8;color:#18181b;padding:2px 8px 2px 4px;border-radius:0 10px 10px 0;font-weight:800;white-space:nowrap;height:18px;display:flex;align-items:center;font-size:0.7em;">${hTxt}m, ${pTxt}s <span style="font-size:0.6em;margin-left:4px;opacity:0.9;">SWELL</span></div>
              </div>
            </div>
          </div>
          ${windInfo}
        </div>
      `

      const icon = L.divIcon({
        className: "",
        html: htmlContent,
        iconSize: [150, 150],
        iconAnchor: [75, 75],
      })

      markerRef.current = L.marker([beach.lat, beach.lon], { icon }).addTo(map)
    }

    updateMarker()
  }, [beach, cityName, data])

  return (
    <div className="flex flex-col rounded-xl border border-border overflow-hidden bg-[#18181b] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className="px-5 py-3 bg-card border-b border-border">
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
          Visao do Pico (Satelite)
        </h3>
      </div>
      <div ref={mapRef} className="h-[400px] lg:h-full min-h-[400px]" />
      <style jsx global>{`
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

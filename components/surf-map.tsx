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

function createCapsule(
  typeLabel: string,
  mainText: string,
  degFrom: number,
  color: string,
  offset: number,
  zIndex: number
): string {
  degFrom = normDeg(degFrom)
  const rot = normDeg(degFrom - 90)
  const isLeftHalf = degFrom > 180 && degFrom < 360
  const textColor = color === "#ef4444" ? "#ffffff" : "#18181b"

  const arrowRight = `<svg width="16" height="28" viewBox="0 0 16 28" style="margin-right:-1px; z-index:2; filter: drop-shadow(-2px 2px 3px rgba(0,0,0,0.5));"><path d="M 16 0 L 0 14 L 16 28 Z" fill="${color}"/></svg><div style="background: ${color}; color: ${textColor}; padding: 4px 12px 4px 6px; border-radius: 0 14px 14px 0; font-weight: 800; white-space: nowrap; height: 28px; display: flex; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4); font-size: 1.05em;">${mainText} <span style="font-size: 0.65em; margin-left: 6px; opacity: 0.9;">${typeLabel}</span></div>`

  const arrowLeft = `<div style="background: ${color}; color: ${textColor}; padding: 4px 6px 4px 12px; border-radius: 14px 0 0 14px; font-weight: 800; white-space: nowrap; height: 28px; display: flex; align-items: center; box-shadow: 0 -4px 10px rgba(0,0,0,0.4); font-size: 1.05em;">${mainText} <span style="font-size: 0.65em; margin-right: 6px; opacity: 0.9;">${typeLabel}</span></div><svg width="16" height="28" viewBox="0 0 16 28" style="margin-left:-1px; z-index:2; filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.5));"><path d="M 0 0 L 16 14 L 0 28 Z" fill="${color}"/></svg>`

  const content = !isLeftHalf ? arrowRight : arrowLeft

  return `<div style="position: absolute; left: 150px; top: 150px; width: 0; height: 0; z-index: ${zIndex}; transform: rotate(${rot}deg);"><div style="position: absolute; left: 0; top: 0; transform: translate(${offset}px, -50%);"><div style="display: flex; align-items: center; ${isLeftHalf ? "transform: rotate(180deg);" : ""}">${content}</div></div></div>`
}

export function SurfMap({ beach, cityName, data }: SurfMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    async function initMap() {
      const L = (await import("leaflet")).default
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

      // Swell capsule
      const waveCapsule = createCapsule("SWELL", `${hTxt}m, ${pTxt}s`, waveDeg, "#38bdf8", 35, 5)

      // Wind capsule
      let windCapsule = ""
      let windDirNorm: number | null = null
      if (data) {
        const type = classifyWind(data.currentWindDir, beach.inletRanges || [])
        const intensity = classifyIntensity(data.currentWindSpeed)
        windDirNorm = normDeg(data.currentWindDir)
        windCapsule = createCapsule(
          type,
          `${Math.round(data.currentWindSpeed)} km/h`,
          windDirNorm,
          windColor(type, intensity),
          35,
          4
        )
      }

      // Position title label between the two capsules
      let titleAngle = normDeg(waveDeg + 180)
      if (data && windDirNorm !== null) {
        let a1 = normDeg(waveDeg)
        let a2 = windDirNorm
        if (a1 > a2) {
          const t = a1
          a1 = a2
          a2 = t
        }
        titleAngle =
          a2 - a1 >= 180
            ? normDeg(a1 + (a2 - a1) / 2)
            : normDeg(a2 + (360 - (a2 - a1)) / 2)
      }

      const titleRad = (normDeg(titleAngle - 90) * Math.PI) / 180
      const titleX = 150 + 105 * Math.cos(titleRad)
      const titleY = 150 + 105 * Math.sin(titleRad)

      const htmlContent = `
        <div style="position: relative; width: 300px; height: 300px; font-family: 'Inter', sans-serif;">
          <div style="position: absolute; top: ${titleY}px; left: ${titleX}px; transform: translate(-50%, -50%); background: rgba(24, 24, 27, 0.75); backdrop-filter: blur(4px); padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); color: #e4e4e7; font-weight: 700; font-size: 0.7em; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; z-index: 10; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">${title}</div>
          <div style="position: absolute; top: 150px; left: 150px; width: 14px; height: 14px; background: #38bdf8; border-radius: 50%; transform: translate(-50%, -50%); animation: pulse-ring 2s infinite ease-out; z-index: 9;"></div>
          <div style="position: absolute; top: 150px; left: 150px; width: 14px; height: 14px; background: #ffffff; border: 3px solid #18181b; border-radius: 50%; transform: translate(-50%, -50%); z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.5);"></div>
          <div style="position: absolute; top: 150px; left: 150px; width: 100px; height: 100px; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none;"></div>
          <div style="position: absolute; top: 150px; left: 150px; width: 200px; height: 200px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none;"></div>
          ${waveCapsule}${windCapsule}
        </div>
      `

      const icon = L.divIcon({
        className: "",
        html: htmlContent,
        iconSize: [300, 300],
        iconAnchor: [150, 150],
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

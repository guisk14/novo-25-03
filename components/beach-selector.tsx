"use client"

import { useState, useRef, useEffect } from "react"
import { BEACH_DATA } from "@/lib/beach-data"
import type { City, Beach } from "@/lib/beach-data"
import { MapPin, ChevronDown, Check, Navigation } from "lucide-react"

interface BeachSelectorProps {
  selectedCityId: string
  selectedBeachId: string
  onCityChange: (cityId: string) => void
  onBeachChange: (beachId: string) => void
}

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  placeholder,
  icon: Icon
}: { 
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  icon?: React.ElementType
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  const selectedOption = options.find(o => o.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 md:px-4 md:py-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-sky-500/30 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 group"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="h-4 w-4 text-sky-400 shrink-0" />}
          <span className="text-sm font-medium text-foreground truncate">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-1 rounded-xl bg-[#1a1a1d] border border-[rgba(255,255,255,0.1)] shadow-xl shadow-black/40 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                  option.value === value 
                    ? 'bg-sky-500/15 text-sky-400' 
                    : 'text-foreground/80 hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground'
                }`}
              >
                <span className="font-medium">{option.label}</span>
                {option.value === value && (
                  <Check className="h-4 w-4 text-sky-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function BeachSelector({
  selectedCityId,
  selectedBeachId,
  onCityChange,
  onBeachChange,
}: BeachSelectorProps) {
  const selectedCity = BEACH_DATA.find((c) => c.cityId === selectedCityId) ?? BEACH_DATA[0]
  const selectedBeach = selectedCity.beaches.find((b) => b.id === selectedBeachId)

  const cityOptions = BEACH_DATA.map((city) => ({
    value: city.cityId,
    label: city.cityName
  }))

  const beachOptions = selectedCity.beaches.map((beach) => ({
    value: beach.id,
    label: beach.name
  }))

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20">
          <MapPin className="h-4 w-4 text-sky-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Selecionar Pico
          </h2>
          <p className="text-[10px] text-muted-foreground/60">
            Escolha a cidade e a praia
          </p>
        </div>
      </div>

      {/* Selects */}
      <div className="flex gap-2 md:gap-3">
        <CustomSelect
          value={selectedCityId}
          onChange={onCityChange}
          options={cityOptions}
          placeholder="Cidade"
          icon={Navigation}
        />
        <CustomSelect
          value={selectedBeachId}
          onChange={onBeachChange}
          options={beachOptions}
          placeholder="Praia"
        />
      </div>

      {/* Selected beach indicator */}
      {selectedBeach && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/5 border border-sky-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-xs text-muted-foreground">
            Previsao para <span className="font-semibold text-sky-400">{selectedBeach.name}</span>
          </span>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { BEACH_DATA } from "@/lib/beach-data"
import { Search, MapPin } from "lucide-react"

interface BeachSelectorProps {
  selectedCityId: string
  selectedBeachId: string
  onCityChange: (cityId: string) => void
  onBeachChange: (beachId: string) => void
}

// Flatten all beaches with city info for search
const allBeaches = BEACH_DATA.flatMap((city) =>
  city.beaches.map((beach) => ({
    ...beach,
    cityId: city.cityId,
    cityName: city.cityName,
    stateAbbr: city.cityId.toUpperCase().slice(0, 2) === "SA" ? "SP" : "SP", // Simplificado para SP
    fullName: `${beach.name}, ${city.cityName}`,
  }))
)

export function BeachSelector({
  selectedCityId,
  selectedBeachId,
  onCityChange,
  onBeachChange,
}: BeachSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Get current selected beach for display
  const selectedBeach = allBeaches.find(
    (b) => b.id === selectedBeachId && b.cityId === selectedCityId
  )

  // Get current city
  const selectedCity = BEACH_DATA.find((c) => c.cityId === selectedCityId)

  // Filter beaches based on search query
  const filteredBeaches = searchQuery.trim()
    ? allBeaches.filter(
        (beach) =>
          beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beach.cityName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allBeaches

  // Handle beach selection
  const handleSelect = (beach: typeof allBeaches[0]) => {
    onCityChange(beach.cityId)
    onBeachChange(beach.id)
    setSearchQuery("")
    setIsOpen(false)
    inputRef.current?.blur()
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredBeaches.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredBeaches.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (filteredBeaches[highlightedIndex]) {
          handleSelect(filteredBeaches[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSearchQuery("")
        break
    }
  }

  // Reset highlighted index when filtered results change
  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="rounded-2xl bg-[#1a1a1f] border border-white/5 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#c8ff00]" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">
            Seletor de Pico
          </span>
        </div>
        
        {/* City Badge */}
        {selectedCity && (
          <span className="px-3 py-1.5 rounded-full bg-[#c8ff00] text-[11px] font-black uppercase tracking-wide text-black">
            {selectedCity.cityName} (SP)
          </span>
        )}
      </div>
      
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedBeach ? `${selectedBeach.name}, ${selectedBeach.cityName} (SP)` : "Pesquisar praia..."}
            className="w-full rounded-xl bg-[#0f0f12] border border-white/8 pl-11 pr-4 py-3.5 text-sm font-medium text-white placeholder:text-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#c8ff00]/30 focus:border-[#c8ff00]/50"
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul
            ref={listRef}
            className="absolute z-50 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-white/10 bg-[#1a1a1f] shadow-2xl"
          >
            {filteredBeaches.length > 0 ? (
              filteredBeaches.map((beach, index) => (
                <li
                  key={`${beach.cityId}-${beach.id}`}
                  onClick={() => handleSelect(beach)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    index === highlightedIndex
                      ? "bg-[#c8ff00]/10"
                      : "hover:bg-white/5"
                  } ${
                    beach.id === selectedBeachId && beach.cityId === selectedCityId
                      ? "border-l-2 border-l-[#c8ff00]"
                      : ""
                  }`}
                >
                  <MapPin className={`h-4 w-4 shrink-0 ${
                    index === highlightedIndex ? "text-[#c8ff00]" : "text-white/40"
                  }`} />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{beach.name}</span>
                    <span className="text-xs text-white/50">{beach.cityName} (SP)</span>
                  </div>
                  {beach.id === selectedBeachId && beach.cityId === selectedCityId && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-[#c8ff00]">
                      Selecionado
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-sm text-white/50 text-center">
                Nenhuma praia encontrada
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

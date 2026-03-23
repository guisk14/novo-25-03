"use client"

import { useState, useRef, useEffect } from "react"
import { BEACH_DATA } from "@/lib/beach-data"
import { Search, MapPin, ChevronDown } from "lucide-react"

interface BeachSelectorProps {
  selectedCityId: string
  selectedBeachId: string
  onCityChange: (cityId: string) => void
  onBeachChange: (beachId: string) => void
}

const allBeaches = BEACH_DATA.flatMap((city) =>
  city.beaches.map((beach) => ({
    ...beach,
    cityId: city.cityId,
    cityName: city.cityName,
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

  const selectedCity = BEACH_DATA.find(c => c.cityId === selectedCityId)
  const selectedBeach = allBeaches.find(
    (b) => b.id === selectedBeachId && b.cityId === selectedCityId
  )

  const filteredBeaches = searchQuery.trim()
    ? allBeaches.filter(
        (beach) =>
          beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beach.cityName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allBeaches

  const handleSelect = (beach: typeof allBeaches[0]) => {
    onCityChange(beach.cityId)
    onBeachChange(beach.id)
    setSearchQuery("")
    setIsOpen(false)
    inputRef.current?.blur()
  }

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

  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchQuery])

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
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#a3e635]" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Seletor de Pico
          </h2>
        </div>
        {selectedCity && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
            {selectedCity.cityName}
          </span>
        )}
      </div>
      
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
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
            placeholder={selectedBeach ? selectedBeach.fullName : "Pesquisar praia..."}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d15] pl-11 pr-12 py-3.5 text-sm font-medium text-white placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#a3e635]/50 focus:ring-2 focus:ring-[#a3e635]/20 hover:border-white/20"
          />
          <ChevronDown 
            className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <ul
            ref={listRef}
            className="absolute z-50 mt-2 w-full max-h-72 overflow-auto rounded-xl border border-white/10 bg-[#0d0d15] shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            {filteredBeaches.length > 0 ? (
              filteredBeaches.map((beach, index) => (
                <li
                  key={`${beach.cityId}-${beach.id}`}
                  onClick={() => handleSelect(beach)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all duration-200 ${
                    index === highlightedIndex
                      ? "bg-[#a3e635]/10 text-white"
                      : "text-white/70 hover:bg-white/5"
                  } ${
                    beach.id === selectedBeachId && beach.cityId === selectedCityId
                      ? "border-l-2 border-l-[#a3e635]"
                      : ""
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    index === highlightedIndex ? 'bg-[#a3e635]/20' : 'bg-white/5'
                  }`}>
                    <MapPin className={`h-4 w-4 ${index === highlightedIndex ? 'text-[#a3e635]' : 'text-white/40'}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{beach.name}</span>
                    <span className="text-xs text-white/40">{beach.cityName}</span>
                  </div>
                  {beach.id === selectedBeachId && beach.cityId === selectedCityId && (
                    <span className="ml-auto text-xs font-medium text-[#a3e635]">Selecionado</span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-sm text-white/40 text-center">
                Nenhuma praia encontrada
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export interface Beach {
  id: string
  name: string
  lat: number
  lon: number
  zoom: number
  factor: number
  inletRanges: [number, number][]
}

export interface City {
  cityId: string
  cityName: string
  beaches: Beach[]
}

export const BEACH_DATA: City[] = [
  {
    cityId: "guaruja",
    cityName: "Guaruja (SP)",
    beaches: [
      { id: "pitangueiras", name: "Pitangueiras", lat: -24.008139, lon: -46.251667, zoom: 14, factor: 0.55, inletRanges: [[120, 190]] },
      { id: "asturias", name: "Asturias", lat: -24.008111, lon: -46.265111, zoom: 14, factor: 0.55, inletRanges: [[120, 200]] },
      { id: "tombo", name: "Tombo", lat: -24.021917, lon: -46.268639, zoom: 14, factor: 0.54, inletRanges: [[120, 235]] },
      { id: "enseada", name: "Enseada", lat: -24.005556, lon: -46.226528, zoom: 13, factor: 0.50, inletRanges: [[120, 180]] },
      { id: "pernambuco", name: "Pernambuco", lat: -23.966361, lon: -46.180444, zoom: 14, factor: 0.54, inletRanges: [[100, 250]] },
    ],
  },
  {
    cityId: "santos",
    cityName: "Santos (SP)",
    beaches: [
      { id: "boqueirao", name: "Boqueirao", lat: -23.975722, lon: -46.326639, zoom: 14, factor: 0.70, inletRanges: [[160, 240]] },
      { id: "gonzaga", name: "Gonzaga", lat: -23.9675, lon: -46.3303, zoom: 14, factor: 0.70, inletRanges: [[160, 240]] },
      { id: "pompeia", name: "Pompeia", lat: -23.9739, lon: -46.3165, zoom: 14, factor: 0.70, inletRanges: [[160, 240]] },
    ],
  },
  {
    cityId: "bertioga",
    cityName: "Bertioga (SP)",
    beaches: [
      { id: "enseada_bertioga", name: "Enseada", lat: -23.845278, lon: -46.114472, zoom: 14, factor: 0.75, inletRanges: [[120, 210]] },
      { id: "itaguare", name: "Itaguare", lat: -23.797389, lon: -45.982833, zoom: 14, factor: 0.51, inletRanges: [[100, 255]] },
      { id: "riviera", name: "Riviera de Sao Lourenco", lat: -23.804944, lon: -46.005861, zoom: 14, factor: 0.80, inletRanges: [[110, 245]] },
      { id: "pier_riviera", name: "Pier da Riviera", lat: -23.815139, lon: -46.032167, zoom: 15, factor: 0.80, inletRanges: [[115, 240]] },
    ],
  },
  {
    cityId: "rio_de_janeiro",
    cityName: "Rio de Janeiro (RJ)",
    beaches: [
      { id: "arpoador", name: "Arpoador", lat: -22.9888, lon: -43.1918, zoom: 15, factor: 0.60, inletRanges: [[130, 210]] },
      { id: "barra_tijuca", name: "Barra da Tijuca", lat: -23.0125, lon: -43.3242, zoom: 13, factor: 0.75, inletRanges: [[140, 220]] },
      { id: "macumba", name: "Praia da Macumba", lat: -23.0336, lon: -43.4688, zoom: 14, factor: 0.85, inletRanges: [[150, 230]] },
    ],
  },
]

export function buildMarineUrl(lat: number, lon: number): string {
  return `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,wave_direction,swell_wave_height,swell_wave_period,swell_wave_direction&timezone=America/Sao_Paulo&forecast_days=6`
}

export function buildWindUrl(lat: number, lon: number): string {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kmh&timezone=America/Sao_Paulo&forecast_days=6`
}

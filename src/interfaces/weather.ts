export interface Weather {
  main: string
  description?: string
  icon: string
}

export interface AirPollution {
  list: Array<{
    main: {
      aqi: number
    }
  }>
}

export interface Current {
  dt: number
  time: string
  date: string
  description?: string
  icon: string
  temp: number
  weather: Array<Weather>
  humidity: number
  wind_speed: number
  wind_deg: number
  air_pollution: string | null
}

export interface Detail {
  current: Current
  daily: Array<Day>
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface Location {
  name: string
  lat: number
  lon: number
  country?: string
  state?: string
}

export interface Day {
  dt: number
  temp: {
    day: number
    min: number
    max: number
  }
  weather: Array<Weather>
  humidity: number
  wind_speed: number
  wind_deg: number
}

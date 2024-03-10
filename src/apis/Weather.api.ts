import { Coordinates, Detail, Location, AirPollution } from 'interfaces'
import httpClient from './HttpClient'
import { ApiConfig } from './ApiConfig'

export const weatherApi = {
  getDetail(params: Coordinates): Promise<Detail> {
    const url = `/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&units=metric&exclude=hourly,minutely&appid=${ApiConfig.API_KEY}`
    return httpClient.get(url)
  },
  getAirPollution(params: Coordinates): Promise<AirPollution> {
    const url = `/data/2.5/air_pollution?lat=${params.lat}&lon=${params.lon}&appid=${ApiConfig.API_KEY}`
    return httpClient.get(url)
  },
  getCoordinates(location: string): Promise<Array<Location>> {
    const url = `/geo/1.0/direct?q=${location}&appid=${ApiConfig.API_KEY}`
    return httpClient.get(url)
  }
}

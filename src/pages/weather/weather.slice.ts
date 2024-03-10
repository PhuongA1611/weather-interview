import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { weatherApi } from 'apis'
import { AIR_LEVEL, DATE_UNIT } from 'constant'
import { AirPollution, Coordinates, Current, Day, Location, Weather } from 'interfaces'

interface WeatherState {
  current?: Current
  detail: Current | null
  location: Location | null
  daily?: Array<Day>
  status?: Weather
  air?: AirPollution
}

const initialState: WeatherState = {
  location: {
    lat: 21.0294498,
    lon: 105.8544441,
    name: 'Hanoi',
    country: 'VN'
  },
  detail: null
}

export const getDetail = createAsyncThunk(
  'weather/getDetail',
  async (params: Coordinates) => await weatherApi.getDetail(params)
)
export const getAirPollution = createAsyncThunk(
  'weather/getAirPollution',
  async (params: Coordinates) => await weatherApi.getAirPollution(params)
)

export const getCoordinates = createAsyncThunk(
  'weather/getCoordinates',
  async (location: string) => await weatherApi.getCoordinates(location)
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setDetail: (state, action: PayloadAction<Day>) => {
      if (state.current && state.detail && state.status) {
        const current = new Date(state.current.dt * DATE_UNIT)
        const dayLoad = new Date(action.payload.dt * DATE_UNIT)
        if (
          current.getDate() === dayLoad.getDate() &&
          current.getMonth() === dayLoad.getMonth() &&
          current.getFullYear() === dayLoad.getFullYear()
        ) {
          state.detail = state.current || null
        } else {
          state.detail.temp = action.payload.temp.max
          state.detail.dt = action.payload.dt
          state.detail.wind_speed = action.payload.wind_speed
          state.detail.wind_deg = action.payload.wind_deg
          state.detail.humidity = action.payload.humidity
          state.status.icon = action.payload.weather[0].icon
          state.status.description = action.payload.weather[0].description
          state.detail.air_pollution = null
        }
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(getDetail.fulfilled, (state, action) => {
      state.detail = action.payload.current || null
      state.current = action.payload.current || null
      state.daily = action.payload.daily || null
      if (action.payload.current.weather) {
        state.status = action.payload.current.weather[0]
      }
    })

    builder.addCase(getDetail.rejected, (state, action) => {})
    builder.addCase(getCoordinates.fulfilled, (state, action) => {
      if (action.payload.length) {
        action.meta.arg === action.payload[0].name ? (state.location = action.payload[0]) : (state.location = null)
      } else {
        state.location = null
      }
    })
    builder.addCase(getCoordinates.rejected, (state, action) => {
      state.location = null
    })
    builder.addCase(getAirPollution.fulfilled, (state, action) => {
      if (state.detail && state.current) {
        state.detail.air_pollution = AIR_LEVEL[action.payload.list[0].main.aqi]
        state.current.air_pollution = AIR_LEVEL[action.payload.list[0].main.aqi]
      }
    })
    builder.addCase(getAirPollution.rejected, (state, action) => {})
  }
})
export const { setDetail } = weatherSlice.actions

const { reducer: weatherReducer } = weatherSlice
export default weatherReducer

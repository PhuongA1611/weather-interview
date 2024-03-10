import { Days, Details, NotFound } from 'components'
import { useEffect } from 'react'
import { getAirPollution, getDetail } from './weather.slice'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import SearchBox from './SearchBox'

import './weather.scss'

export interface IWeatherProps {}

export default function Weather(props: IWeatherProps) {
  const dispatch = useAppDispatch()
  const location = useAppSelector((state) => state.weather.location)
  const detail = useAppSelector((state) => state.weather.detail)
  const days = useAppSelector((state) => state.weather.daily)
  const status = useAppSelector((state) => state.weather.status)

  useEffect(() => {
    if (location) {
      dispatch(
        getDetail({
          lat: location.lat,
          lon: location.lon
        })
      ).then(() => {
        dispatch(
          getAirPollution({
            lat: location.lat,
            lon: location.lon
          })
        )
      })
    }
  }, [location])

  return (
    <div className='weather'>
      <SearchBox />
      <div className='weather__container'>
        {location && detail && status && days ? (
          <>
            <Details location={location} detail={detail} status={status} />
            <Days days={days} />
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  )
}

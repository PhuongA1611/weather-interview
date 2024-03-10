import IconWeather from 'components/iconWeather/IconWeather'
import { DATE_UNIT, DAY_OF_WEEK, DIRECTIONS } from 'constant'
import { Current, Location, Weather } from 'interfaces'
import { useState } from 'react'

import './details.scss'

export interface IDetailsProps {
  location?: Location
  detail: Current
  status: Weather
}

export default function Details({ location, detail, status }: IDetailsProps) {
  const [isFahrenheit, setIsFahrenheit] = useState(false)

  const handleFahrenheitClick = () => {
    setIsFahrenheit(true)
  }

  const handleCelsiusClick = () => {
    setIsFahrenheit(false)
  }

  const convertTemperature = (temp: number) => (isFahrenheit ? Math.round((temp * 9) / 5 + 32) : Math.round(temp))

  const convertWindSpeed = (speed: number) =>
    isFahrenheit ? Math.round(speed * 2.23694) + ' MPH' : Math.round(speed * 3.6) + 'KPH'

  const convertWindDirection = (degrees: number) => {
    const index = Math.round(degrees / 22.5) % 16
    return DIRECTIONS[index]
  }

  const date = new Date(detail.dt * DATE_UNIT)

  return (
    <div className='detail'>
      <h1>
        {location?.name}, {location?.country}
      </h1>{' '}
      <h3>
        {DAY_OF_WEEK[date.getDay()]} {date.toLocaleTimeString([], { hour: 'numeric', hour12: true })} <span>•</span>{' '}
        {status.description}
      </h3>
      <div className='detail__row'>
        <div className='detail__temp'>
          <IconWeather iconName={status.icon} />
          <h2>{convertTemperature(detail.temp)}°</h2>
          <div className='detail__temp__units'>
            <button onClick={handleFahrenheitClick} className={isFahrenheit ? 'active' : ''}>
              F
            </button>
            <span>/</span>
            <button onClick={handleCelsiusClick} className={!isFahrenheit ? 'active' : ''}>
              C
            </button>
          </div>
        </div>
        <div className='detail__info'>
          <p>Humidity: {detail.humidity}%</p>
          <p>
            Wind: {convertWindSpeed(detail.wind_speed)} {convertWindDirection(detail.wind_deg)}
          </p>
          {detail.air_pollution && <p>Air Quality: {detail.air_pollution}</p>}
        </div>
      </div>
    </div>
  )
}

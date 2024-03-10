import { DATE_UNIT, DAY_OF_WEEK_SHORT } from 'constant'
import { Day } from 'interfaces'
import './days.scss'
import IconWeather from 'components/iconWeather/IconWeather'

export interface IDaysItemProps {
  day: Day
  isActive: boolean
  onClick: () => void
}

export default function DaysItem({ day, isActive, onClick }: IDaysItemProps) {
  return (
    <div className={`days__item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <h3>{DAY_OF_WEEK_SHORT[new Date(day.dt * DATE_UNIT).getDay()]}</h3>
      <IconWeather iconName={day.weather[0].icon} />
      <h5 className='days__item__temp days__item__temp-max'>{Math.round(day.temp.max)}°</h5>
      <h5 className='days__item__temp days__item__temp-min'>{Math.round(day.temp.min)}°</h5>
    </div>
  )
}

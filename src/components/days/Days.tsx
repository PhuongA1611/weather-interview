import DaysItem from './DaysItem'
import { Day } from 'interfaces'
import './days.scss'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { setDetail } from 'pages/weather/weather.slice'

export interface IDaysProps {
  days: Array<Day>
}

export default function Days({ days }: IDaysProps) {
  const [activeItem, setActiveItem] = useState<number>(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setActiveItem(0)
  }, [days])

  const handleItemClick = (index: number) => {
    setActiveItem(index)
    dispatch(setDetail(days[index]))
  }

  return (
    <div className='days'>
      {days?.map((day, index) => (
        <DaysItem key={index} day={day} isActive={index === activeItem} onClick={() => handleItemClick(index)} />
      ))}
    </div>
  )
}

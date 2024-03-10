import { ApiConfig } from 'apis/ApiConfig'

export interface IconWeatherProps {
  iconName: string
}

export default function IconWeather({ iconName }: IconWeatherProps) {
  return (
    <div className='icon'>
      <img src={`${ApiConfig.API_IMAGE}${iconName}@2x.png`} alt='icon' />
    </div>
  )
}

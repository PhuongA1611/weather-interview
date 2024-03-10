import './notFound.scss'

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <div className='notfound'>
      <div className='notfound__img'>
        <img src='./notfound.png' alt='notfound' title='notfound' />
      </div>
      <h2>We could not find weather information for the location above</h2>
    </div>
  )
}

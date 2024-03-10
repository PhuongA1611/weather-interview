import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import * as React from 'react'
import { Resolver, useForm } from 'react-hook-form'
import { getCoordinates } from './weather.slice'

export interface ISearchBoxProps {}

type FormValues = {
  location: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.location ? values : {},
    errors: !values.location
      ? {
          location: {
            type: 'required',
            message: 'This is required.'
          }
        }
      : {}
  }
}

export default function SearchBox(props: ISearchBoxProps) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({ resolver })

  const onSubmit = handleSubmit((data) => {
    try {
      dispatch(getCoordinates(data.location))
    } catch (error) {}
  })

  return (
    <form onSubmit={onSubmit} className='weather__searchbox'>
      <input {...register('location')} placeholder='Location...' />
      <button className='clear-input' type='button' onClick={() => reset()}>
        <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <line x1='0.353553' y1='0.646447' x2='13.3536' y2='13.6464' stroke='black' />
          <line x1='0.646447' y1='13.6464' x2='13.6464' y2='0.646446' stroke='black' />
        </svg>
      </button>
      {errors?.location && <p>{errors.location.message}</p>}
    </form>
  )
}

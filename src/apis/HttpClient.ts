import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ApiConfig } from './ApiConfig'

const httpClient = axios.create({
  baseURL: ApiConfig.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const customHeaders = {}

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers // but you can override for some requests
    }
  } as InternalAxiosRequestConfig<any>
})

const handleSuccessResponse = (response: AxiosResponse) => {
  return response.data
}

const handleErrorResponse = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response

    switch (status) {
      case 400:
        console.error('Bad Request:', error.response.data)
        break

      case 401:
        console.error('Unauthorized:', error.response.data)
        break

      case 404:
        console.error('Not Found:', error.response.data)
        break

      case 500:
        console.error('Internal Server Error:', error.response.data)
        break

      default:
        console.error('Unhandled Error:', error.response.data)
    }
  } else {
    console.error('Network Error:', error.message)
  }

  throw error
}

httpClient.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

export default httpClient

import axios from 'axios'

export const setHeader = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

export const getHeader = () => {
  return axios.defaults.headers.common['Authorization']
}

export const removeHeader = () => {
  delete axios.defaults.headers.common['Authorization']
}

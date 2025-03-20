// src/apis/authApi.ts
import { axiosInstance } from './axiosInstance'
import { User } from '@/stores/useAuthStore'
import { getRefreshToken } from '@/utils/mmkv'

export const loginApi = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/auth/login', { email, password })
  return data
}

export const registerApi = async (name: string, email: string, password: string) => {
  const { data } = await axiosInstance.post('/auth/register', { name, email, password })
  return data
}

export const refreshTokenApi = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.')
  }

  const { data } = await axiosInstance.post('/auth/refresh', { refreshToken })
  return data
}

export const logoutApi = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return

  const { data } = await axiosInstance.post('/auth/logout', { refreshToken })
  return data
}

export const getMeApi = async (): Promise<User> => {
  const { data } = await axiosInstance.get('/auth/me')
  return data
}

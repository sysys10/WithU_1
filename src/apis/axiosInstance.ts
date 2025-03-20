// src/apis/axiosInstance.ts
import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from '@/utils/mmkv'
import { setHeader, removeHeader } from '@/utils/axiosHeader'
import useAuthStore from '@/stores/useAuthStore'

export const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    console.log(error, 'error')
    const originalRequest = error.config

    // 엑세스 토큰 만료 에러(401)이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()

        if (!refreshToken) {
          // 리프레시 토큰이 없으면 로그아웃 처리
          useAuthStore.getState().logout()
          return Promise.reject(error)
        }

        // 토큰 갱신 시도
        const response = await axios.post(`${axiosInstance.defaults.baseURL}/auth/refresh`, { refreshToken })

        const { accessToken } = response.data

        // 새로운 액세스 토큰 저장
        setAccessToken(accessToken)
        setHeader(accessToken)

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // 리프레시 토큰 만료 또는 갱신 실패 - 로그아웃 처리
        useAuthStore.getState().logout()
        removeHeader()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

// src/stores/useAuthStore.ts
import { create } from 'zustand'

export interface User {
  id: string
  email: string
  name?: string
  profile_image?: string
  // 다른 필요한 사용자 정보 필드
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  isLoading: boolean

  // 액션
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: User | null) => void
  setIsLoading: (isLoading: boolean) => void
  logout: () => void
}

const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,
  isLoading: true,

  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  setUser: user => set({ user }),
  setIsLoading: isLoading => set({ isLoading }),
  logout: () => set({ isLoggedIn: false, user: null }),
}))

export default useAuthStore

import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Alert } from 'react-native'
import { loginApi, refreshTokenApi, registerApi, logoutApi, getMeApi } from '@/apis/authApi'
import useAuthStore, { User } from '@/stores/useAuthStore'
import { setHeader, removeHeader } from '@/utils/axiosHeader'
import { getRefreshToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from '@/utils/mmkv'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '@/navigations/AuthStackNavigator'

export function useLogin() {
  const { setIsLoggedIn, setUser } = useAuthStore()

  return useMutation<
    { accessToken: string; refreshToken: string; user: User },
    Error,
    {
      email: string
      password: string
    }
  >({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: data => {
      // 토큰 저장
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)

      // 헤더 설정
      setHeader(data.accessToken)

      // 상태 업데이트
      setIsLoggedIn(true)
      setUser(data.user)
    },
    onError: (error: any) => {
      Alert.alert('로그인 실패', error.response?.data?.message || '로그인 중 오류가 발생했습니다.')
    },
  })
}

// 회원가입 Hook
export function useRegister() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>()
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      registerApi(name, email, password),
    onSuccess: () => {
      Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.')
      navigation.navigate('AuthScreen')
    },
    onError: (error: any) => {
      Alert.alert('회원가입 실패', error.response?.data?.message || '회원가입 중 오류가 발생했습니다.')
    },
  })
}

export function useRefreshToken() {
  const { setIsLoggedIn, setIsLoading } = useAuthStore()

  const mutation = useMutation({
    mutationFn: refreshTokenApi,
    onSuccess: data => {
      setAccessToken(data.accessToken)
      setHeader(data.accessToken)
      setIsLoggedIn(true)
      console.log('로그인 성공', data)
    },
    onError: () => {
      setIsLoggedIn(false)
      removeAccessToken()
      removeRefreshToken()
      removeHeader()
      console.log('로그인 실패')
    },
    onSettled: () => {
      // 로딩 상태 종료
      setIsLoading(false)
    },
  })

  // 컴포넌트 마운트 시 토큰 갱신 시도
  useEffect(() => {
    const refreshToken = getRefreshToken()
    console.log('refreshToken', refreshToken)
    if (refreshToken) {
      // 리프레시 토큰이 있으면 갱신 시도
      mutation.mutate()
    } else {
      // 리프레시 토큰이 없으면 로딩 상태만 종료
      setIsLoading(false)
    }
  }, [])

  return mutation
}

// 로그아웃 Hook
export function useLogout() {
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout()
      removeAccessToken()
      removeRefreshToken()
      removeHeader()
    },
    onError: () => {
      logout()
      removeAccessToken()
      removeRefreshToken()
      removeHeader()
    },
  })
}

export function useMe() {
  const { setUser } = useAuthStore()
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: getMeApi,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5분
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  return { data }
}

// 전체 인증 상태 관리 Hook
export function useAuth() {
  const { isLoggedIn, isLoading } = useAuthStore()

  // 앱 시작 시 토큰 갱신 시도
  const { isPending: isRefreshing } = useRefreshToken()

  return {
    isLoggedIn,
    isLoading: isLoading || isRefreshing,
  }
}

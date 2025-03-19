import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '@/screens/HomeScreen'
import SplashScreen from 'react-native-splash-screen'
import CourseAddScreen from '@/screens/CourseAddScreen'

export type RootStackParamList = {
  Home: undefined
  CourseAdd: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  }, [])

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      handleUrl(event.url)
    }

    const getInitialURL = async () => {
      const url = await Linking.getInitialURL()
      if (url) {
        handleUrl(url)
      }
    }

    const handleUrl = (url: string) => {
      if (url.includes('course/add')) {
        if (navigationRef.current) {
          navigationRef.current.navigate('CourseAdd')
        }
      }
    }

    // 딥링크 이벤트 리스너 등록
    Linking.addEventListener('url', handleDeepLink)
    getInitialURL()

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      // React Native 0.65 이상에서는 removeEventListener를 사용할 필요가 없음
    }
  }, [])

  // 네비게이션 참조 생성 (React Navigation v5 이상)
  const navigationRef = React.useRef<any>(null)

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen
          options={{
            title: '코스 추가',
            headerBackTitle: '뒤로',
          }}
          name="CourseAdd"
          component={CourseAddScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

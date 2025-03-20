import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigations/RootNavigator'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './apis/queryClient'

import SplashScreen from 'react-native-splash-screen'
export type RootStackParamList = {
  Home: undefined
  CourseAdd: undefined
}

const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App

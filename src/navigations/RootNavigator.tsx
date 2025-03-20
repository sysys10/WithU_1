import StackNavigator from './StackNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useAuth } from '@/hooks/query/useAuth'
import SplashScreen from '@/screens/SplashScreen'
export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth()
  if (isLoading) {
    return <SplashScreen />
  }

  return isLoggedIn ? <StackNavigator /> : <AuthStackNavigator />
}

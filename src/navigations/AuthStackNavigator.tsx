import FindIdScreen from '@/screens/auth/FindIdScreen'
import FindPasswordScreen from '@/screens/auth/FindPasswordScreen'
import RegisterScreen from '@/screens/auth/RegisterScreen'
import AuthScreen from '@/screens/auth/AuthScreen'
import { createStackNavigator } from '@react-navigation/stack'

const AUTH_STACK_CONSTANTS = {
  AuthScreen: 'AuthScreen',
  RegisterScreen: 'RegisterScreen',
  FindIdScreen: 'FindIdScreen',
  FindPasswordScreen: 'FindPasswordScreen',
} as const

export type AuthStackParamList = {
  [AUTH_STACK_CONSTANTS.AuthScreen]: undefined
  [AUTH_STACK_CONSTANTS.RegisterScreen]: undefined
  [AUTH_STACK_CONSTANTS.FindIdScreen]: undefined
  [AUTH_STACK_CONSTANTS.FindPasswordScreen]: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name={AUTH_STACK_CONSTANTS.AuthScreen} component={AuthScreen} />
      <Stack.Screen
        name={AUTH_STACK_CONSTANTS.RegisterScreen}
        component={RegisterScreen}
        options={{
          cardStyle: { backgroundColor: 'white' },
          title: '회원가입',
          headerBackTitle: '',
          headerTintColor: 'black',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={AUTH_STACK_CONSTANTS.FindIdScreen}
        component={FindIdScreen}
        options={{
          cardStyle: { backgroundColor: 'white' },
          title: '아이디 찾기',
          headerBackTitle: '',
          headerTintColor: 'black',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={AUTH_STACK_CONSTANTS.FindPasswordScreen}
        component={FindPasswordScreen}
        options={{
          cardStyle: { backgroundColor: 'white' },
          title: '비밀번호 찾기',
          headerBackTitle: '',
          headerTintColor: 'black',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

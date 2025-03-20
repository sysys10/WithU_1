import ProfileScreen from '@/screens/main/ProfileScreen'
import { createStackNavigator } from '@react-navigation/stack'

const PROFILE_STACK_CONSTANTS = {
  Profile: 'Profile',
  ProfileEdit: 'ProfileEdit',
} as const

export type ProfileStackParamList = {
  [PROFILE_STACK_CONSTANTS.Profile]: undefined
  [PROFILE_STACK_CONSTANTS.ProfileEdit]: undefined
}

const Stack = createStackNavigator<ProfileStackParamList>()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={PROFILE_STACK_CONSTANTS.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  )
}

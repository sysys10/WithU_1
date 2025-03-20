import BottomTabNavigator from '@/navigations/BottomTabNavigator'
import AlarmScreen from '@/screens/main/AlarmScreen'
import DetailScreen from '@/screens/course/DetailScreen'
import PlaceDetailScreen from '@/screens/course/PlaceDetailScreen'
import { createStackNavigator } from '@react-navigation/stack'

const STACK_CONSTANTS = {
  HomeStack: 'HomeStack',
  AlarmStack: 'AlarmStack',
  DetailScreen: 'DetailScreen',
  PlaceDetailScreen: 'PlaceDetailScreen',
} as const

export type StackParamList = {
  [STACK_CONSTANTS.HomeStack]: undefined
  [STACK_CONSTANTS.AlarmStack]: undefined
  [STACK_CONSTANTS.DetailScreen]: { courseId: string }
  [STACK_CONSTANTS.PlaceDetailScreen]: { placeId: string }
}
const Stack = createStackNavigator<StackParamList>()

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name={STACK_CONSTANTS.HomeStack} component={BottomTabNavigator} />
      <Stack.Screen name={STACK_CONSTANTS.AlarmStack} component={AlarmScreen} />
      <Stack.Screen options={{ headerShown: false }} name={STACK_CONSTANTS.DetailScreen} component={DetailScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name={STACK_CONSTANTS.PlaceDetailScreen}
        component={PlaceDetailScreen}
      />
    </Stack.Navigator>
  )
}

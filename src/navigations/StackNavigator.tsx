import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '@/screens/HomeScreen'
import CourseAddScreen from '@/screens/CourseAddScreen'
const Stack = createStackNavigator()

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen name="CourseAdd" component={CourseAddScreen} />
    </Stack.Navigator>
  )
}

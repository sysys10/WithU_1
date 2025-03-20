import CustomIcon from '@/components/common/CustomIcon'
import HomeScreen from '@/screens/main/HomeScreen'
import LikeScreen from '@/screens/main/LikeScreen'
import ProfileScreen from '@/screens/main/ProfileScreen'
import SearchScreen from '@/screens/main/SearchScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddCourseScreen from '@/screens/add/AddCourseScreen'

const BOTTOM_TAB_CONSTANTS = {
  HomeScreen: 'HomeScreen',
  SearchScreen: 'SearchScreen',
  AddScreen: 'AddScreen',
  LikeScreen: 'LikeScreen',
  ProfileScreen: 'ProfileScreen',
} as const

export type BottomTabParamList = {
  [BOTTOM_TAB_CONSTANTS.HomeScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.SearchScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.AddScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.LikeScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.ProfileScreen]: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const homeIcon = CustomIcon('home-outline')
const homeIconFocused = CustomIcon('home')
const searchIcon = CustomIcon('search-outline')
const searchIconFocused = CustomIcon('search')
const addIcon = CustomIcon('add-circle-outline')
const addIconFocused = CustomIcon('add-circle')
const likeIcon = CustomIcon('heart-outline')
const likeIconFocused = CustomIcon('heart')
const profileIcon = CustomIcon('person-outline')
const profileIconFocused = CustomIcon('person')

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? homeIconFocused() : homeIcon()),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.SearchScreen}
        options={{ tabBarIcon: ({ focused }) => (focused ? searchIconFocused() : searchIcon()) }}
        component={SearchScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.AddScreen}
        options={{
          animation: 'shift',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (focused ? addIconFocused() : addIcon()),
        }}
        component={AddCourseScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.LikeScreen}
        options={{ tabBarIcon: ({ focused }) => (focused ? likeIconFocused() : likeIcon()) }}
        component={LikeScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => (focused ? profileIconFocused() : profileIcon()) }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  )
}

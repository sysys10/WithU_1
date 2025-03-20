import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

// Define a more robust typing for icon names
type IconName =
  | 'home'
  | 'home-outline'
  | 'search'
  | 'search-outline'
  | 'add-circle'
  | 'add-circle-outline'
  | 'heart'
  | 'heart-outline'
  | 'person'
  | 'person-outline'

// Custom icon component with improved type safety and default values
const CustomIcon = (name: IconName) => () => <Ionicons name={name as any} color={'black'} size={24} />

export default CustomIcon

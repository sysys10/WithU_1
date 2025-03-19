import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

const CustomIcon =
  (name: any) =>
  ({ color = 'black' }: { color?: string }) =>
    <Ionicons name={name} color={color} size={24} />

export default CustomIcon

import { Place } from '@/types/course.type'
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map'
import { useState } from 'react'
import { Text, View } from 'react-native'

export default function CustomMapMarker({ place }: { place: Place }) {
  const [isTapped, setIsTapped] = useState(false)

  return (
    <NaverMapMarkerOverlay
      onTap={() => setIsTapped(!isTapped)}
      key={place.id}
      latitude={place.latitude}
      longitude={place.longitude}>
      {isTapped ? (
        <View style={{ zIndex: 1000, width: 100, height: 100, backgroundColor: 'blue' }}>
          <Text>Hello</Text>
        </View>
      ) : null}
    </NaverMapMarkerOverlay>
  )
}

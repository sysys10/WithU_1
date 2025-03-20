import React, { useMemo, useRef, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useCourseDetail } from '@/hooks/query/useDateCourse'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from '@/navigations/StackNavigator'
import BottomSheet from '@gorhom/bottom-sheet'
import { NaverMapViewRef } from '@mj-studio/react-native-naver-map'
import { Place } from '@/types/course.type'
import CourseDetailHeader from '@/components/course/CourseDetail/Header'
import CourseDetailBody from '@/components/course/CourseDetail/Body'
import CourseDetailFooter from '@/components/course/CourseDetail/Footer'

type DetailScreenProps = {
  navigation: StackNavigationProp<StackParamList>
  route: {
    params: {
      courseId: string
    }
  }
}

export default function DetailScreen({ navigation, route }: DetailScreenProps) {
  const { courseId } = route.params
  const { courseDetail, isLoading } = useCourseDetail(courseId)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const mapRef = useRef<NaverMapViewRef>(null)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0)
  const snapPoints = useMemo(() => ['20%', '40%', '60%', '80%'], [])
  const iconSnapPoints = useMemo(() => ['20%', '40%', '60%', '80%'], [])

  const handlePlacePress = (place: Place) => {
    mapRef.current?.animateCameraTo({
      latitude: place.latitude - 0.0015,
      longitude: place.longitude,
      duration: 1000,
      zoom: 15,
    })
    bottomSheetRef.current?.snapToIndex(1)
  }

  const handlePlaceDetailPress = (place: Place) => {
    navigation.navigate('PlaceDetailScreen', { placeId: place.id })
  }

  return (
    <View style={{ flex: 1 }}>
      <CourseDetailHeader navigation={navigation} courseId={courseId} />

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        courseDetail && (
          <>
            <CourseDetailBody
              courseDetail={courseDetail}
              mapRef={mapRef}
              iconSnapPoints={iconSnapPoints}
              bottomSheetIndex={bottomSheetIndex}
            />

            <CourseDetailFooter
              courseDetail={courseDetail}
              bottomSheetRef={bottomSheetRef}
              snapPoints={snapPoints}
              setBottomSheetIndex={setBottomSheetIndex}
              handlePlacePress={handlePlacePress}
              handlePlaceDetailPress={handlePlaceDetailPress}
            />
          </>
        )
      )}
    </View>
  )
}

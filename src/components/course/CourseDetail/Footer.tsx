import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import MyButton from '@/components/common/Button'
import { Place } from '@/types/course.type'

type Props = {
  courseDetail: {
    name: string
    description: string
    places: Place[]
  }
  bottomSheetRef: React.RefObject<BottomSheet>
  snapPoints: string[]
  setBottomSheetIndex: (index: number) => void
  handlePlacePress: (place: Place) => void
  handlePlaceDetailPress: (place: Place) => void
}

export default function CourseDetailFooter({
  courseDetail,
  bottomSheetRef,
  snapPoints,
  setBottomSheetIndex,
  handlePlacePress,
  handlePlaceDetailPress,
}: Props) {
  return (
    <BottomSheet
      onChange={index => {
        setBottomSheetIndex(index)
      }}
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing>
      <BottomSheetView style={styles.bottomSheetContainer}>
        <Text style={styles.title}>{courseDetail?.name}</Text>
        <Text style={styles.description}>{courseDetail?.description}</Text>
        <ScrollView>
          {courseDetail?.places
            .sort((a, b) => (a.visit_order ?? 0) - (b.visit_order ?? 0))
            .map(place => (
              <TouchableOpacity onPress={() => handlePlacePress(place)} key={place.id} style={styles.placeContainer}>
                <View style={styles.placeOrder}>
                  <Text style={styles.placeOrderText}>{place.visit_order}</Text>
                </View>
                <Image source={{ uri: place.image_url[0] }} style={styles.placeContainerImage} />
                <View style={{ flex: 1, padding: 4 }}>
                  <Text style={styles.placeContainerTitle}>{place.name}</Text>
                  <Text style={styles.placeContainerDescription}>{place.address}</Text>
                </View>
                <TouchableOpacity onPress={() => handlePlaceDetailPress(place)}>
                  <Text>자세히보기</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <MyButton onPress={() => {}} size="large">
          코스 추가하기
        </MyButton>
      </BottomSheetView>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  placeOrder: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'blue',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  placeContainer: {
    flexDirection: 'row',
    gap: 6,
    padding: 4,
    marginBottom: 5,
  },
  placeContainerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeContainerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeContainerDescription: {
    fontSize: 14,
    color: 'gray',
  },
})

import React from 'react'
import { StyleSheet, TouchableOpacity, View, DimensionValue } from 'react-native'
import { NaverMapPolylineOverlay, NaverMapView, NaverMapViewRef } from '@mj-studio/react-native-naver-map'
import Icon from '@react-native-vector-icons/ionicons'
import { Place } from '@/types/course.type'
import CustomMapMarker from './CustomMapMarker'

type Props = {
  courseDetail: {
    places: Place[]
  }
  mapRef: React.RefObject<NaverMapViewRef>
  iconSnapPoints: string[]
  bottomSheetIndex: number
}

export default function CourseDetailBody({ courseDetail, mapRef, iconSnapPoints, bottomSheetIndex }: Props) {
  return (
    <View style={styles.mapContainer}>
      <NaverMapView
        isShowZoomControls={false}
        isShowLocationButton={false}
        isLiteModeEnabled={true}
        ref={mapRef}
        initialCamera={{
          latitude: courseDetail.places[0].latitude - 0.0015,
          longitude: courseDetail.places[0].longitude,
          zoom: 15,
        }}
        style={{ flex: 1 }}>
        {courseDetail.places.map(place => (
          <CustomMapMarker place={place} key={place.id} />
        ))}
        {courseDetail.places.length > 1 && (
          <NaverMapPolylineOverlay
            coords={courseDetail.places.map(place => ({
              latitude: place.latitude,
              longitude: place.longitude,
            }))}
            color="red"
            width={3}
          />
        )}
      </NaverMapView>

      {/* 현재 위치 버튼 */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          padding: 10,
          right: 10,
          borderRadius: 100,
          marginBottom: 10,
          bottom: iconSnapPoints[bottomSheetIndex] ? (iconSnapPoints[bottomSheetIndex] as DimensionValue) : '80%',
        }}
        onPress={() => {
          mapRef.current?.setLocationTrackingMode('Follow')
        }}>
        <Icon name="locate-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
})

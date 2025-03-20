import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from '@react-native-vector-icons/ionicons'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from '@/navigations/StackNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCourseLike } from '@/hooks/query/useDateCourse'
type Props = {
  navigation: StackNavigationProp<StackParamList>
  courseId: string
}

export default function CourseDetailHeader({ navigation, courseId }: Props) {
  const safeAreaInsets = useSafeAreaInsets()
  const { likeCourse, isUserLiked } = useCourseLike(courseId)

  const handleLikePress = () => {
    likeCourse()
  }

  const handleBookmarkPress = () => {
    console.log(courseId)
  }

  return (
    <View style={[styles.detailHeader, { paddingTop: safeAreaInsets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.rightButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleLikePress}>
          <Icon name={isUserLiked ? 'heart' : 'heart-outline'} size={24} color={isUserLiked ? 'red' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleBookmarkPress}>
          <Icon name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailHeader: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  rightButtonContainer: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    gap: 10,
  },
  backButton: {
    zIndex: 1000,
    backgroundColor: 'white',
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rightButton: {
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  rightButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  right2Button: {
    zIndex: 1000,
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
})

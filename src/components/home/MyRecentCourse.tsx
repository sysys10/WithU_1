import React from 'react'
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { axiosInstance } from '@/apis/axiosInstance'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { RecommendCourseType } from './RecommendCourse'
import { colors } from '@/constants/color.constant'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from '@/navigations/StackNavigator'

const { width: screenWidth } = Dimensions.get('window')

async function getRecentCourseApi() {
  const response = await axiosInstance.get('/course/myrecent')
  return response.data
}

function useRecentCourse() {
  const [recentCourse, setRecentCourse] = useState<RecommendCourseType[]>([])
  const { mutate, isPending } = useMutation({
    mutationFn: getRecentCourseApi,
    onSuccess: data => {
      setRecentCourse(data.courses)
    },
    onError: error => {
      console.error('내 최근 코스 조회 실패', error)
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return { recentCourse, isPending }
}

export default function RecommendCourse() {
  const { recentCourse, isPending } = useRecentCourse()
  const navigation = useNavigation<StackNavigationProp<StackParamList>>()
  const renderCourseCard = ({ item }: { item: RecommendCourseType }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', { courseId: item.id })}
      style={styles.cardContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.tagContainer}>
            {item.tags.slice(0, 2).map((tag, index) => (
              <Text key={index} style={styles.tagText}>
                #{tag}
              </Text>
            ))}
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {item.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.blue[500]} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>내 최근 데이트 코스</Text>
      <FlatList
        data={recentCourse}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth * 0.7 + 10} // width of card + margin
        decelerationRate="fast"
        contentContainerStyle={styles.flatlistContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  flatlistContainer: {
    paddingHorizontal: 15,
  },
  cardContainer: {
    width: screenWidth * 0.6,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetails: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    color: 'gray',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  tagText: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'gold',
    fontWeight: 'bold',
  },
})

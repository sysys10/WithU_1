import React from 'react'
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import Topbar from '@/components/layout/Topbar'
import RecommendCourse from '@/components/home/RecommendCourse'
import MyRecentCourse from '@/components/home/MyRecentCourse'

const CAROUSEL_ITEMS = [
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/9b46a65717a646b08965d01a371dd448',
    id: '1',
    href: '/',
  },
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b5c0c875eafd45309c7ebb6394df1c0a',
    id: '2',
    href: '/',
  },
  {
    image: 'https://d2ba33ltwyhxsm.cloudfront.net/common_img/comm_252615244369729.webp',
    id: '3',
    href: '/',
  },
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b5c0c875eafd45309c7ebb6394df1c0a',
    id: '4',
    href: '/',
  },
  {
    image: 'https://ugc-images.catchtable.co.kr/admin/marketing/banner/images/b5c0c875eafd45309c7ebb6394df1c0a',
    id: '5',
    href: '/',
  },
]

// src/components/constants/home.constants.ts
const HOME_CATEGORIES = [
  {
    id: 1,
    title: '실내',
    color: '#93c5fd',
    imgSrc: '/WithU_Home.png',
    href: '/search/?tag=inside',
    hasNew: true,
  },
  {
    id: 2,
    title: '실외',
    color: '#86efac',
    imgSrc: '/WithU_Home.png',
    href: '/search/?tag=outside',
    hasNew: false,
  },
  {
    id: 3,
    title: '맛집',
    color: '#fde047',
    imgSrc: '/WithU_Home.png',
    href: '/search/?tag=food',
    hasNew: false,
  },
  {
    id: 4,
    title: '카페',
    color: '#d8b4fe',
    imgSrc: '/WithU_Home.png',
    href: '/search/?tag=cafe',
    hasNew: true,
  },
  {
    id: 5,
    title: '전시',
    color: '#fca5a5',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=exhibition',
    hasNew: false,
  },
  {
    id: 6,
    title: '액티비티',
    color: '#fdba74',
    imgSrc: '/WithU_Home.png',

    href: '/search/?tag=activity',
    hasNew: false,
  },
]

export { HOME_CATEGORIES }

const { width: screenWidth } = Dimensions.get('window')
const ITEM_WIDTH = screenWidth // 85% of screen width
const ITEM_HEIGHT = ITEM_WIDTH / 1.6 // Aspect ratio 1.6:1

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Topbar />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <Carousel
            width={ITEM_WIDTH}
            height={ITEM_HEIGHT}
            autoPlayInterval={6000}
            data={CAROUSEL_ITEMS}
            snapEnabled={true}
            scrollAnimationDuration={500}
            autoPlay={true}
            style={{ width: screenWidth }}
            windowSize={2}
            renderItem={({ item }: { item: (typeof CAROUSEL_ITEMS)[number] }) => (
              <View style={styles.carouselItemContainer}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} resizeMode="cover" />
              </View>
            )}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            pagingEnabled={true}
          />
        </View>
        <View style={styles.categoryContainer}>
          {HOME_CATEGORIES.map(category => (
            <View style={styles.categoryItemContainer} key={category.id}>
              {category.hasNew && (
                <View style={styles.newBadge}>
                  <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>N</Text>
                </View>
              )}
              <View style={[styles.categoryItem, { backgroundColor: category.color + '60' }]} key={category.id} />
              <Text>{category.title}</Text>
            </View>
          ))}
        </View>
        <RecommendCourse />
        <MyRecentCourse />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  carouselContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  categoryContainer: {
    height: 80,
    backgroundColor: '#f5f0e6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 100,
    width: 20,
    height: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemContainer: {
    justifyContent: 'center',
    gap: 4,
    alignItems: 'center',
  },
  categoryItem: {
    width: 48,
    height: 48,
    borderRadius: '100%',
  },
})

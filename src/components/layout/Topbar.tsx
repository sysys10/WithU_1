import { Image, StyleSheet, View } from 'react-native'
import Icon from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackParamList } from '@/navigations/StackNavigator'
import { StackNavigationProp } from '@react-navigation/stack'

export default function Topbar() {
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>()
  const stackNavigation = useNavigation<StackNavigationProp<StackParamList>>()

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/WithU_Logo.png')} style={styles.logo} />
      <View style={styles.rightContainer}>
        <Icon name="search-outline" size={22} color="#666666" onPress={() => navigation.navigate('SearchScreen')} />
        <Icon name="bookmark-outline" size={22} color="#666666" onPress={() => navigation.navigate('LikeScreen')} />
        <Icon
          name="notifications-outline"
          size={22}
          color="#666666"
          onPress={() => stackNavigation.navigate('AlarmStack')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    paddingVertical: 4,
  },
  logo: {
    width: 100,
    height: '100%',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})

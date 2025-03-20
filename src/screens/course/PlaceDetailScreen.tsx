import Icon from '@react-native-vector-icons/ionicons'
import { Text, View, TouchableOpacity } from 'react-native'

export default function PlaceDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const { placeId } = route.params
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text>{placeId}</Text>
    </View>
  )
}

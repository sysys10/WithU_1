import { Image, View } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image source={require('@/assets/images/WithU_Logo.png')} style={{ width: 200, height: 60 }} />
    </View>
  )
}

import WebView from 'react-native-webview'
import type { WebViewMessageEvent } from 'react-native-webview'
import { SafeAreaView } from 'react-native'
import { useRef } from 'react'
// import NavigationBar from '@/components/layout/NavigationBar'

interface HomeScreenProps {
  navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const webViewRef = useRef<WebView | null>(null)

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)

      if (data.type === 'OPEN_COURSE_ADD') {
        navigation.navigate('CourseAdd')
      }
    } catch (error) {
      console.error('메시지 처리 오류:', error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView ref={webViewRef} source={{ uri: 'https://withu.vercel.app/home' }} onMessage={handleWebViewMessage} />
    </SafeAreaView>
  )
}

export default HomeScreen

import { SafeAreaView } from 'react-native'
import WebView from 'react-native-webview'

export default function SearchScreen({ route }: { route: any }): React.JSX.Element {
  const { screen } = route.params
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: `https://withu.vercel.app/search?tag=${screen}` }} />
    </SafeAreaView>
  )
}

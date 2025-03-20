import SearchHeader from '@/components/search/SearchHeader'
import { SearchItem } from '@/types/search.type'
import { useState } from 'react'
import { SafeAreaView } from 'react-native'

export default function SearchScreen() {
  const [_, setSelected] = useState<SearchItem | null>(null)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <SearchHeader onSelectLocation={setSelected} />
    </SafeAreaView>
  )
}

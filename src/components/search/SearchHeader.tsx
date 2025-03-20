import { naverSearchApi } from '@/apis/searchApi'
import { SearchItem } from '@/types/search.type'
import Icon from '@react-native-vector-icons/ionicons'
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, Dimensions, Keyboard } from 'react-native'

// HTML 태그 제거 함수
const removeHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, '')
}

// 검색 결과 타입 정의

const useDebounceSearch = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

const useNaverSearch = () => {
  const [result, setResult] = useState<SearchItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useMutation({
    mutationFn: naverSearchApi,
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: data => {
      setResult(data.items || [])
      setIsLoading(false)
    },
    onError: error => {
      console.log('검색 오류:', error)
      setIsLoading(false)
    },
  })

  return { result, isLoading, mutate }
}

export default function SearchHeader({ onSelectLocation }: { onSelectLocation?: (item: SearchItem) => void }) {
  const { result, isLoading, mutate } = useNaverSearch()
  const [search, setSearch] = useState('')
  const [showResults, setShowResults] = useState(false)
  const debouncedSearch = useDebounceSearch(search, 500)
  const windowWidth = Dimensions.get('window').width

  // 검색어가 변경될 때 API 호출
  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      mutate(debouncedSearch)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [debouncedSearch])

  // 검색결과 항목 선택 핸들러
  const handleSelectItem = (item: SearchItem) => {
    if (onSelectLocation) {
      onSelectLocation(item)
    }
    setSearch(removeHtmlTags(item.title))
    setShowResults(false)
    Keyboard.dismiss()
  }

  // 검색 결과 아이템 렌더링
  const renderItem = ({ item }: { item: SearchItem }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleSelectItem(item)}>
      <View style={styles.resultItemContent}>
        <Text style={styles.resultItemTitle}>{removeHtmlTags(item.title)}</Text>
        <Text style={styles.resultItemCategory}>{item.category}</Text>
        <Text style={styles.resultItemAddress}>{item.roadAddress}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={24} color="#666" />
          <TextInput
            onChangeText={setSearch}
            value={search}
            style={styles.input}
            placeholder="장소를 검색하세요"
            placeholderTextColor="gray"
            onFocus={() => {
              if (search.trim() !== '') {
                setShowResults(true)
              }
            }}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showResults && (
        <View style={[styles.resultContainer, { width: windowWidth - 20 }]}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text>검색 중...</Text>
            </View>
          ) : result.length > 0 ? (
            <FlatList
              data={result}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              style={styles.resultList}
              showsVerticalScrollIndicator={false}
            />
          ) : debouncedSearch.trim() !== '' ? (
            <View style={styles.noResultContainer}>
              <Text>검색 결과가 없습니다.</Text>
            </View>
          ) : null}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  searchRow: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 40,
    marginRight: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    color: '#333',
  },
  resultContainer: {
    position: 'absolute',
    top: 56,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  resultList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultItemContent: {
    flex: 1,
    paddingRight: 10,
  },
  resultItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  resultItemCategory: {
    fontSize: 12,
    color: '#008fd3',
    marginBottom: 4,
  },
  resultItemAddress: {
    fontSize: 13,
    color: '#666',
  },
  resultCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

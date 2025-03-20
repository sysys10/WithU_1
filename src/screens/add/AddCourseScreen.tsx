import { colors } from '@/constants/color.constant'
import Icon from '@react-native-vector-icons/ionicons'
import { useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { SearchItem } from '@/types/search.type'
import { useImagePicker } from '@/hooks/useImagePicker'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

type PlaceItemProps = {
  place: SearchItem
  index: number
  onRemove: (place: SearchItem) => void
}

const PlaceItem = ({ place, index, onRemove }: PlaceItemProps) => {
  return (
    <View style={styles.placeItem}>
      <View style={styles.placeNumberContainer}>
        <Text style={styles.placeNumber}>{index + 1}</Text>
      </View>
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{place.title}</Text>
        <Text style={styles.placeAddress}>{place.address}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(place)}>
        <Icon name="close-circle" size={24} color={colors.blue[500]} />
      </TouchableOpacity>
    </View>
  )
}

export default function AddCourseScreen({ navigation }: { navigation: BottomTabNavigationProp<BottomTabParamList> }) {
  const [courseName, setCourseName] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [places, setPlaces] = useState<SearchItem[]>([])
  const [images, setImages] = useState<string[]>([])
  const [showImagePreview, setShowImagePreview] = useState(false)

  // 이미지 선택 및 업로드 기능 사용
  const { selectedImages, uploading, pickImages, clearImages, removeImage, uploadImages } = useImagePicker()

  // 이미지 선택 및 업로드 처리 함수
  function handleCancel() {
    if (places.length > 0 || images.length > 0 || courseName || courseDescription) {
      Alert.alert('취소', '등록을 취소하시겠습니까? 작성한 내용은 저장되지 않습니다.', [
        { text: '취소', onPress: () => {}, style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            clearImages()
            navigation.goBack()
          },
        },
      ])
    } else {
      navigation.goBack()
    }
  }

  const handleEditImages = () => {
    setShowImagePreview(true)
  }

  // 이미지 업로드 실행
  const handleUploadImages = async () => {
    const imageUrls = await uploadImages()

    if (imageUrls) {
      setImages(imageUrls)
      setShowImagePreview(false)
      Alert.alert('성공', '이미지가 성공적으로 업로드되었습니다.')
    }
  }

  // 이미지 선택 취소
  const handleCancelImageSelection = () => {
    setShowImagePreview(false)
  }

  const handleRemovePlace = (place: SearchItem) => {
    setPlaces(prev => prev.filter(p => p !== place))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>코스 등록</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="데이트 코스 이름"
            value={courseName}
            onChangeText={setCourseName}
            style={styles.input}
          />

          <TextInput
            placeholder="코스 설명"
            value={courseDescription}
            onChangeText={setCourseDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.Container}>
          <View style={styles.ImageAddContainer}>
            {images.length > 0 ? (
              <>
                <ScrollView horizontal={true} style={{ width: '100%', flexDirection: 'row' }}>
                  <View style={styles.imagePreviewRow}>
                    {images.map((imageUrl, index) => (
                      <Image key={index} source={{ uri: imageUrl }} style={styles.thumbnailImage} />
                    ))}
                  </View>
                </ScrollView>
                <Pressable style={styles.ImageAddButton} onPress={handleEditImages}>
                  <Icon name="create-outline" size={20} color={colors.blue[500]} />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>사진/영상을 추가해 주세요</Text>
                <Pressable style={styles.ImageAddButton} onPress={handleEditImages}>
                  <Icon name="add" size={24} color={colors.blue[500]} />
                </Pressable>
              </>
            )}
          </View>

          <View style={styles.placesSection}>
            <Text style={styles.sectionTitle}>가셨던 장소를 추가해 주세요!</Text>

            <View style={styles.PlaceAddContainer}>
              <FlatList
                data={places}
                keyExtractor={item => item.title}
                renderItem={({ item, index }) => <PlaceItem place={item} index={index} onRemove={handleRemovePlace} />}
                ListEmptyComponent={<Text style={styles.emptyText}>아직 추가된 장소가 없습니다.</Text>}
                ListFooterComponent={
                  <TouchableOpacity style={styles.addPlaceButton} onPress={() => navigation.navigate('AddPlaceScreen')}>
                    <Icon name="add-circle" size={20} color={colors.blue[500]} />
                    <Text style={styles.addPlaceText}>장소 추가하기</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        </View>
      </View>

      {/* 이미지 선택 모달 */}
      <Modal visible={showImagePreview} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>이미지 선택</Text>
              <TouchableOpacity onPress={handleCancelImageSelection}>
                <Icon name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {uploading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.blue[500]} />
                <Text style={styles.loadingText}>이미지 업로드 중...</Text>
              </View>
            ) : (
              <>
                <FlatList
                  data={selectedImages}
                  renderItem={({ item, index }) => (
                    <View style={styles.selectedImageContainer}>
                      <Image source={{ uri: item.uri }} style={styles.selectedImage} />
                      <TouchableOpacity style={styles.removeImageButton} onPress={() => removeImage(index)}>
                        <Icon name="close-circle" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={2}
                  contentContainerStyle={styles.imageGrid}
                  ListEmptyComponent={
                    <View style={styles.emptyImageContainer}>
                      <Text style={styles.emptyImageText}>선택된 이미지가 없습니다.</Text>
                      <TouchableOpacity style={styles.selectMoreButton} onPress={pickImages}>
                        <Text style={styles.selectMoreButtonText}>이미지 선택</Text>
                      </TouchableOpacity>
                    </View>
                  }
                />

                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.selectMoreButton} onPress={pickImages}>
                    <Icon name="image-outline" size={20} color={colors.blue[500]} />
                    <Text style={styles.selectMoreButtonText}>추가 선택</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.uploadButton, selectedImages.length === 0 && styles.disabledButton]}
                    disabled={selectedImages.length === 0}
                    onPress={handleUploadImages}>
                    <Text style={styles.uploadButtonText}>저장</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    color: colors.blue[500],
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  Container: {
    padding: 16,
  },
  ImageAddContainer: {
    width: '100%',
    gap: 6,
    padding: 8,
    height: 240,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ImageAddButton: {
    width: 48,
    height: 48,
    position: 'absolute',
    bottom: 8,
    right: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.blue[50],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  placesSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  PlaceAddContainer: {
    gap: 10,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  placeNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.blue[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  placeAddress: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    padding: 4,
  },
  addPlaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.blue[200],
    borderRadius: 8,
    borderStyle: 'dashed',
    backgroundColor: colors.blue[50],
  },
  addPlaceText: {
    color: colors.blue[500],
    marginLeft: 8,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    padding: 20,
  },
  imageCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagePreviewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  thumbnailImage: {
    width: 180,
    height: 240,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageGrid: {
    padding: 8,
  },
  selectedImageContainer: {
    width: '50%',
    padding: 4,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  emptyImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: 300,
  },
  emptyImageText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  selectMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue[50],
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectMoreButtonText: {
    color: colors.blue[500],
    marginLeft: 8,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: colors.blue[500],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.blue[500],
  },
})

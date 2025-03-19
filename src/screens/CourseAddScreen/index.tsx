// CourseAddScreen.tsx
import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from '@react-native-vector-icons/ionicons'

// 네비게이션 타입 정의
type RootStackParamList = {
  Home: undefined
  CourseAdd: undefined
}

type CourseAddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourseAdd'>

interface CourseAddScreenProps {
  navigation: CourseAddScreenNavigationProp
}

interface ImageAsset {
  uri: string
  fileName?: string
  type?: string
  width?: number
  height?: number
}

const CourseAddScreen: React.FC<CourseAddScreenProps> = ({ navigation }) => {
  const [images, setImages] = useState<ImageAsset[]>([])
  const [courseName, setCourseName] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const requestAndroidPermission = async (): Promise<boolean> => {
    try {
      const permissionName =
        (Platform.Version as number) >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

      const granted = await PermissionsAndroid.request(permissionName, {
        title: '사진첩 접근 권한',
        message: '앱에서 사진첩에 접근하려면 권한이 필요합니다.',
        buttonNeutral: '나중에 묻기',
        buttonNegative: '취소',
        buttonPositive: '확인',
      })
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  // 사진첩 접근 권한 요청 및 이미지 선택
  const requestImageSelection = async (): Promise<void> => {
    try {
      // Android인 경우 권한 요청
      if (Platform.OS === 'android') {
        const hasPermission = await requestAndroidPermission()
        if (!hasPermission) {
          Alert.alert('권한 필요', '사진첩 접근 권한이 필요합니다.')
          return
        }
      }

      // 이미지 선택 실행
      const options = {
        mediaType: 'photo' as const,
        selectionLimit: 0, // 여러 장 선택 가능
        includeBase64: false,
        maxHeight: 1200,
        maxWidth: 1200,
        quality: 0.8,
      }

      launchImageLibrary(options as ImageLibraryOptions, response => {
        if (response.didCancel) {
          console.log('사용자가 이미지 선택을 취소했습니다')
        } else if (response.errorCode) {
          console.log('ImagePicker 오류: ', response.errorMessage)
          Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.')
        } else if (response.assets && response.assets.length > 0) {
          // 선택한 이미지 추가
          setImages(prevImages => [
            ...prevImages,
            ...(response.assets || []).map(asset => ({
              uri: asset.uri || '',
              fileName: asset.fileName,
              type: asset.type,
            })),
          ])
        }
      })
    } catch (error) {
      console.error('이미지 선택 중 오류 발생:', error)
      Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.')
    }
  }

  // 이미지 삭제
  const removeImage = (index: number): void => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  // 코스 추가 처리
  const handleSubmit = async (): Promise<void> => {
    if (images.length === 0) {
      Alert.alert('알림', '최소 한 개 이상의 이미지를 추가해주세요.')
      return
    }

    try {
      setIsSubmitting(true)

      // 여기에 실제 API 호출 코드 추가
      // 예: 이미지 업로드 및 코스 데이터 전송

      // 성공 시
      Alert.alert('성공', '코스가 성공적으로 추가되었습니다.', [{ text: '확인', onPress: () => navigation.goBack() }])
    } catch (error) {
      console.error('코스 추가 중 오류 발생:', error)
      Alert.alert('오류', '코스를 추가하는 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>코스 추가</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>사진을 추가해주세요</Text>

          {images.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imagePreviewWrapper}>
                  <Image source={{ uri: image.uri }} style={styles.imagePreview} resizeMode="cover" />
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                    <Icon name="close" size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* 이미지 추가 버튼 */}
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={requestImageSelection}>
              <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* 코스 입력 필드 */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>코스 이름</Text>
            <TextInput
              style={styles.textInput}
              placeholder="코스 이름을 입력하세요"
              value={courseName}
              onChangeText={setCourseName}
            />

            {/* 여기에 필요한 추가 입력 필드 구현 */}
          </View>
        </View>
      </ScrollView>

      {/* 제출 버튼 */}
      {images.length > 0 && (
        <View style={styles.submitButtonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>코스 추가하기</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imagePreviewWrapper: {
    width: '31%',
    aspectRatio: 1,
    margin: '1%',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  submitButtonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#93C5FD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
})

export default CourseAddScreen

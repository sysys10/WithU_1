import { useState } from 'react'
import { Alert } from 'react-native'
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker'
import { imageApi } from '@/apis/imageApi'
import { useMutation } from '@tanstack/react-query'

export interface ImageFile {
  uri: string
  fileName?: string | null
  type?: string | null
}

export const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([])

  // TanStack React Query를 사용한 이미지 업로드 뮤테이션
  const uploadMutation = useMutation({
    mutationFn: imageApi.uploadImages,
    onError: error => {
      console.error('이미지 업로드 실패:', error)
      Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.')
    },
  })

  /**
   * 이미지 선택 기능
   */
  const pickImages = () => {
    const options = {
      mediaType: 'photo' as const,
      selectionLimit: 0,
      includeBase64: false,
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.7,
    }

    return new Promise<void>(resolve => {
      launchImageLibrary(options as ImageLibraryOptions, (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('사용자가 이미지 선택을 취소했습니다')
          resolve()
        } else if (response.errorCode) {
          console.log('이미지 선택 오류:', response.errorMessage)
          Alert.alert('오류', '이미지 선택 중 오류가 발생했습니다.')
          resolve()
        } else if (response.assets && response.assets.length > 0) {
          // 선택한 이미지들 추가
          const newImages = response.assets.map(asset => ({
            uri: asset.uri || '',
            fileName: asset.fileName,
            type: asset.type,
          }))

          setSelectedImages(prev => [...prev, ...newImages])
          resolve()
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * 선택한 이미지 제거
   */
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  /**
   * 이미지 업로드 기능 - React Query 사용
   */
  const uploadImages = async (): Promise<string[] | null> => {
    if (selectedImages.length === 0) {
      Alert.alert('알림', '선택된 이미지가 없습니다.')
      return null
    }

    try {
      const response = await uploadMutation.mutateAsync(selectedImages)
      console.log('업로드 성공:', response)

      if (response.imageUrls && response.imageUrls.length > 0) {
        return response.imageUrls
      }
      return null
    } catch (error) {
      // 에러 처리는 mutation의 onError에서 처리됨
      return null
    }
  }

  /**
   * 선택한 이미지 초기화
   */
  const clearImages = () => {
    setSelectedImages([])
  }

  return {
    selectedImages,
    uploading: uploadMutation.isPending,
    isSuccess: uploadMutation.isSuccess,
    pickImages,
    removeImage,
    uploadImages,
    clearImages,
  }
}

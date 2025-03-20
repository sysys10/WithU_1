import { axiosInstance } from '@/apis/axiosInstance'

export interface UploadImageResponse {
  message: string
  imageUrls: string[]
}

export const imageApi = {
  /**
   * 이미지 업로드 API
   * @param images 업로드할 이미지 파일 배열
   * @returns 업로드된 이미지 URL 목록
   */
  uploadImages: async (
    images: Array<{
      uri: string
      fileName?: string | null
      type?: string | null
    }>,
  ): Promise<UploadImageResponse> => {
    const formData = new FormData()

    // FormData에 이미지 파일 추가
    images.forEach((image, index) => {
      formData.append('image', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `image-${index}.jpg`,
      } as any)
    })

    // API 호출하여 이미지 업로드
    const response = await axiosInstance.post<UploadImageResponse>('/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  },
}

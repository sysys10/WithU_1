import { axiosInstance } from './axiosInstance'

export const naverSearchApi = async (search: string) => {
  const { data } = await axiosInstance.get(`/naver/search/${search}`)
  return data
}

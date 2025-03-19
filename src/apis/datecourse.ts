import { DateCourse } from '@/types/contents.type'
import { axiosInstance } from './axiosInstance'

async function postMyDateCourse(data: DateCourse) {
  const response = await axiosInstance.post('/datecourse', data)
  return response.data
}

export { postMyDateCourse }

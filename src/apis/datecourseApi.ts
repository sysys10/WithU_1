import { DateCourse } from '@/types/course.type'
import { axiosInstance } from './axiosInstance'

async function postMyDateCourse(data: DateCourse) {
  const response = await axiosInstance.post('/datecourse', data)
  return response.data
}
const getCourseDetailApi = async (courseId: string) => {
  const response = await axiosInstance.get(`/course/detail/${courseId}`)
  return response.data
}
const likeCourseApi = async (courseId: string) => {
  const response = await axiosInstance.post(`/course/like/${courseId}`)
  return response.data
}

const didUserLike = async (courseId: string) => {
  const response = await axiosInstance.get(`/course/didUserLike/${courseId}`)
  return response.data
}

export { postMyDateCourse, getCourseDetailApi, likeCourseApi, didUserLike }

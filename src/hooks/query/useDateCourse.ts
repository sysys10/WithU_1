import { didUserLike, getCourseDetailApi, likeCourseApi, postMyDateCourse } from '@/apis/datecourseApi'
import queryClient from '@/apis/queryClient'
import { DateCourse } from '@/types/course.type'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function useAddMyDateCourseMutation() {
  return useMutation({
    mutationFn: postMyDateCourse,
  })
}
function useAddDateCourse() {
  const {
    mutate: mutateAddMyDateCourse,
    isPending: isAddMyDateCoursePending,
    isSuccess: isAddMyDateCourseSuccess,
  } = useAddMyDateCourseMutation()
  function handleAddMyDateCourse(data: DateCourse) {
    mutateAddMyDateCourse(data)
  }
  return { handleAddMyDateCourse, isAddMyDateCoursePending, isAddMyDateCourseSuccess }
}

const useCourseDetail = (courseId: string) => {
  const [courseDetail, setCourseDetail] = useState<DateCourse | null>(null)
  const { mutate: getCourseDetail, isPending: isLoading } = useMutation({
    mutationFn: getCourseDetailApi,
    onSuccess: data => {
      queryClient.setQueryData(['courseDetail', courseId], data)
      console.log('data', data)
      setCourseDetail(data)
    },
  })

  useEffect(() => {
    getCourseDetail(courseId)
  }, [getCourseDetail, courseId])

  return { courseDetail, isLoading }
}

const useCourseLike = (courseId: string) => {
  const [isUserLiked, setIsUserLiked] = useState(false)

  const { mutate: getIsUserLike } = useMutation({
    mutationFn: didUserLike,
    onSuccess: data => {
      setIsUserLiked(data.isLiked)
    },
  })

  const { mutate: likeCourse } = useMutation({
    mutationFn: () => likeCourseApi(courseId),
    onSuccess: data => {
      setIsUserLiked(data.isLiked)
      queryClient.invalidateQueries({ queryKey: ['courseDetail', courseId] })
    },
  })
  useEffect(() => {
    getIsUserLike(courseId)
  }, [getIsUserLike, courseId])

  return { likeCourse, isUserLiked }
}

export { useAddDateCourse, useCourseDetail, useCourseLike }

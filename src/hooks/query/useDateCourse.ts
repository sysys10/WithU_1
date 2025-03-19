import { postMyDateCourse } from '@/apis/datecourse'
import { DateCourse } from '@/types/contents.type'
import { useMutation } from '@tanstack/react-query'

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

export { useAddDateCourse }

interface DateCourse {
  title: string
  desc: string
  DateCourseDetail: DateCourseDetail[] | DateCourseDetail
  tags: string[]
  rate: number
  dateCourseDetail: DateCourseDetail[]
}

interface DateCourseDetail {
  name: string
  ImgUrl: string
  orderNum: number
  rate: number
  desc: string
  address: string
  category: string
}

export type { DateCourse, DateCourseDetail }

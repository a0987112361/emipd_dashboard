
export default {
  getCourseList: (now_page, page_size, search, order) => `/api/course/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
  getCourseInfo: (id) => `/api/course/dashboard?id=${id}`,
  createCourse: () => '/api/course',
  updateCourse: () => '/api/course',
  deleteCourse: () => '/api/course',

};
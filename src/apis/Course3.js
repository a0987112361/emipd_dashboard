
export default {
  getCourse3List: (now_page, page_size, search, order) => `/api/course3/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
  getCourse3Info: (id) => `/api/course3/dashboard?id=${id}`,
  createCourse3: () => '/api/course3',
  updateCourse3: () => '/api/course3',
  deleteCourse3: () => '/api/course3',

};
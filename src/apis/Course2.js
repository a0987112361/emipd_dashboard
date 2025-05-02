
export default {
  getCourse2List: (now_page, page_size, search, order) => `/api/course2/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
  getCourse2Info: (id) => `/api/course2/dashboard?id=${id}`,
  createCourse2: () => '/api/course2',
  updateCourse2: () => '/api/course2',
  deleteCourse2: () => '/api/course2',

};
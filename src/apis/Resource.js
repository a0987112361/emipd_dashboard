
export default {
  getResourceList: (now_page, page_size, search, order) => `/api/resource/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}`,
  getResourceInfo: (id) => `/api/resource/dashboard?id=${id}`,
  createResource: () => '/api/resource',
  updateResource: () => '/api/resource',
  deleteResource: () => '/api/resource',

};
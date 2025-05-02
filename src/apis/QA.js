// const prefix = 'api/client';

export default {
  getQATypeList: (search, now_page, page_size) => `/api/qaType/getAll?now_page=${now_page}&page_size=${page_size}&search=${search}`,
  getQAType: (id) => `/api/qaType?qa_type_id=${id}`,
  createQAType: () => '/api/qaType',
  updateQAType: () => '/api/qaType',
  deleteQAType: () => '/api/qaType',
  sortQAType: (id, change) => `/api/qaType/changeOrder?qa_type_id=${id}&change=${change}`,
  getLowestType: () => '/api/qaType/getLowestLevel',

  getQAList: (id, search, now_page, page_size) => `/api/qa/getAll?now_page=${now_page}&page_size=${page_size}${search == '' ? `&search=${search}` : ''}${id == '' ? `&qa_type_id=${id}` : ''}`,
  getQA: (id) => `/api/qa?qa_id=${id}`,
  createQA: () => '/api/qa',
  updateQA: () => '/api/qa',
  deleteQA: () => '/api/qa',

};

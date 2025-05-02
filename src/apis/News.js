// const prefix = 'api/client';

export default {
  getNewsList: (now_page, page_size, search, order) => `/api/news/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
  getNewsInfo: (newsId) => `/api/news/dashboard?id=${newsId}`,
  createNews: () => '/api/news',
  updateNews: () => '/api/news',
  deleteNews: () => '/api/news',
  // createImg: () => '/api/news/upload',

  getNewsTypeList: () => '/api/newsType/getAll',
};

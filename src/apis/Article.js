// const prefix = 'api/client';

export default {
    getArticleDetail: (id) => `/api/news?news_id=${id}`,
    getArticleList: (paging) => `/api/news/getAll?now_page=${paging.now_page}&page_size=${paging.page_size}`,
    createArticle: () => '/api/news',
    updateArticle: () => '/api/news',
    deleteArticle: () => '/api/news',
    createImg: () => '/api/news/upload',
};
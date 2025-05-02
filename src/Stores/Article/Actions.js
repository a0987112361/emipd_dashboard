import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getArticleDetail: ['id', 'callback'],
    getArticleDetailSuccess: ['payload'],
    getArticleList: ['callback', 'paging'],
    getArticleListSuccess: ['payload', 'paging'],
    createArticle: ['file', 'payload', 'callback', 'paging'],
    updateArticle: ['file', 'payload', 'callback', 'paging'],
    deleteArticle: ['id', 'callback', 'paging'],
    resetArticleDetail: [''],
    createImg: ['id', 'file', 'callback', 'paging']

});

export const ArticleTypes = Types;
export default Creators;

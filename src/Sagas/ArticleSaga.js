import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import { ArticleActions, } from 'src/Stores';
import { Handler, Article } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getArticleDetail({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Article.getArticleDetail(id),
        );

        if (res.success) {
            yield put(ArticleActions.getArticleDetailSuccess(res.data));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getArticleList({ callback, paging = { now_page: 1, page_size: 10 } }) {
    try {
        const token = yield select((state) => state.user.Token);

        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Article.getArticleList(paging),
        );

        if (res.success) {
            yield put(ArticleActions.getArticleListSuccess(res.data.list, res.paging));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* createArticle({ file, payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
            Article.createArticle(),
        );

        if (res.success) {
            yield put(ArticleActions.getArticleList(callback));
            showMessage({ content: '新增成功' });
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* createImg({ id, file, callback }) {
    try {
        const token = yield select((state) => state.user.Token);

        let formData = new FormData();
        formData.append('id', id);
        formData.append('file', file);

        const { data: res } = yield call(
            Handler.post({ data: formData, Authorization: token, ContentType: 'multipart/form-data' }),
            Article.createImg(),
        );

        if (res.success) {
            yield put(ArticleActions.getArticleList(callback));
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* updateArticle({ file, payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);

        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
            Article.updateArticle(),
        );

        if (res.success) {
            yield put(ArticleActions.getArticleList(callback));
            showMessage({ content: '修改成功' });
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* deleteArticle({ id, callback, paging }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: id, Authorization: token }),
            Article.deleteArticle(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' });
            if (callback) { callback() }
            yield put(ArticleActions.getArticleList(callback, paging));
        }
    } catch (err) {
        console.log('err', err);
    }
}
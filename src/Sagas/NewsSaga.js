import { put, call, select } from 'redux-saga/effects';

import { NewsActions, } from 'src/Stores';
import { Handler, News } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getNewsList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      News.getNewsList(payload.now_page, payload.page_size, payload.search, payload.order),
    );

    if (res.success) {
      yield put(NewsActions.getNewsListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* getNewsInfo({ newsId, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      News.getNewsInfo(newsId),
    );

    if (res.success) {
      yield put(NewsActions.getNewsInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* createNews({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      News.createNews(),
    );
    if (res.success) {
      yield put(NewsActions.getNewsList(queryPayload, callback, errorCallback));
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* updateNews({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      News.updateNews(),
    );
    if (res.success) {
      yield put(NewsActions.getNewsList(queryPayload, callback, errorCallback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* deleteNews({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      News.deleteNews(),
    );
    if (res.success) {
      yield put(NewsActions.getNewsList(queryPayload, callback, errorCallback));
      showMessage({ content: '刪除成功' });
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

import { put, call, select } from 'redux-saga/effects';

import { ResourceActions, } from 'src/Stores';
import { Handler, Resource } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getResourceList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Resource.getResourceList(payload.now_page, payload.page_size, payload.search, payload.order),
    )

    if (res.success) {
      yield put(ResourceActions.getResourceListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getResourceInfo({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Resource.getResourceInfo(id),
    )
    if (res.success) {
      yield put(ResourceActions.getResourceInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createResource({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Resource.createResource(),
    );
    if (res.success) {
      yield put(ResourceActions.getResourceList(queryPayload, callback, errorCallback));
      showMessage({ content: '新增成功' });
      if (callback) { callback() }
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateResource({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Resource.updateResource(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(ResourceActions.getResourceList(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
  }
  finally {
      if (callback) { callback() }
  }
}

export function* deleteResource({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Resource.deleteResource(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(ResourceActions.getResourceList(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}
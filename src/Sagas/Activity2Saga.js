import { put, call, select } from 'redux-saga/effects';

import { Activity2Actions, } from 'src/Stores';
import { Handler, Activity2 } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getActivity2List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity2.getActivity2List(payload.now_page, payload.page_size, payload.search, payload.order),
    )

    if (res.success) {
      yield put(Activity2Actions.getActivity2ListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getActivity2PicList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity2.getActivity2PicList(payload.now_page, payload.page_size, payload.id),
    )

    if (res.success) {
      yield put(Activity2Actions.getActivity2PicListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getActivity2Info({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity2.getActivity2Info(id),
    )
    if (res.success) {
      yield put(Activity2Actions.getActivity2InfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createActivity2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Activity2.createActivity2(),
    );
    if (res.success) {
      yield put(Activity2Actions.getActivity2List(queryPayload, callback, errorCallback));
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

export function* updateActivity2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Activity2.updateActivity2(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(Activity2Actions.getActivity2List(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
  }
  finally {
      if (callback) { callback() }
  }
}

export function* deleteActivity2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Activity2.deleteActivity2(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(Activity2Actions.getActivity2List(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}
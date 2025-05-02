import { put, call, select } from 'redux-saga/effects';

import { Course2Actions, } from 'src/Stores';
import { Handler, Course2 } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getCourse2List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course2.getCourse2List(payload.now_page, payload.page_size, payload.search, payload.order),
    )

    if (res.success) {
      yield put(Course2Actions.getCourse2ListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getCourse2Info({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course2.getCourse2Info(id),
    )
    if (res.success) {
      yield put(Course2Actions.getCourse2InfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createCourse2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course2.createCourse2(),
    );
    if (res.success) {
      yield put(Course2Actions.getCourse2List(queryPayload, callback, errorCallback));
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

export function* updateCourse2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course2.updateCourse2(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(Course2Actions.getCourse2List(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
      if (errorCallback) { errorCallback() }
  }
  finally {
  }
}

export function* deleteCourse2({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Course2.deleteCourse2(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(Course2Actions.getCourse2List(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}
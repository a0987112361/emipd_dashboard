import { put, call, select } from 'redux-saga/effects';

import { Course3Actions, } from 'src/Stores';
import { Handler, Course3 } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getCourse3List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course3.getCourse3List(payload.now_page, payload.page_size, payload.search, payload.order),
    )

    if (res.success) {
      yield put(Course3Actions.getCourse3ListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getCourse3Info({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course3.getCourse3Info(id),
    )
    if (res.success) {
      yield put(Course3Actions.getCourse3InfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createCourse3({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course3.createCourse3(),
    );
    if (res.success) {
      yield put(Course3Actions.getCourse3List(queryPayload, callback, errorCallback));
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

export function* updateCourse3({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course3.updateCourse3(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(Course3Actions.getCourse3List(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
      if (errorCallback) { errorCallback() }
  }
  finally {
  }
}

export function* deleteCourse3({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Course3.deleteCourse3(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(Course3Actions.getCourse3List(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}
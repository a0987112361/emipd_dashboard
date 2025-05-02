import { put, call, select } from 'redux-saga/effects';

import { CourseActions, } from 'src/Stores';
import { Handler, Course } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getCourseList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course.getCourseList(payload.now_page, payload.page_size, payload.search, payload.order),
    )

    if (res.success) {
      yield put(CourseActions.getCourseListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getCourseInfo({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Course.getCourseInfo(id),
    )
    if (res.success) {
      yield put(CourseActions.getCourseInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createCourse({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course.createCourse(),
    );
    if (res.success) {
      yield put(CourseActions.getCourseList(queryPayload, callback, errorCallback));
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

export function* updateCourse({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Course.updateCourse(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(CourseActions.getCourseList(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
      if (errorCallback) { errorCallback() }
  }
  finally {
  }
}

export function* deleteCourse({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Course.deleteCourse(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(CourseActions.getCourseList(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }
  finally {
    if (errorCallback) { errorCallback() }
  }
}
import { put, call, select } from 'redux-saga/effects';

import {
    StoreActions,
} from 'src/Stores';
import { Handler, Store } from 'src/apis';
import { showMessage } from 'src/utils/message';

/*
 * 關於中心-中心簡介
*/
export function* getStore({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store.getStore(),
    );

    if (res.success) {
      yield put(StoreActions.getStoreSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateStore({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store.updateStore(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      // if (callback) { callback() }
      yield put(StoreActions.getStoreSuccess(res.data));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

/*
 * 關於中心-團隊成員
*/
export function* getTeamList({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store.getTeamList(),
    );

    if (res.success) {
      yield put(StoreActions.getTeamListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeamList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store.updateTeamList(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(StoreActions.getTeamListSuccess(res.data));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

/*
 * 關於中心-師資陣容
*/
export function* getTeacherList({ searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store.getTeacherList(searchValue),
    );

    if (res.success) {
      yield put(StoreActions.getTeacherListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getTeacherInfo({ teacherId, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store.getTeacherInfo(teacherId),
    );

    if (res.success) {
      yield put(StoreActions.getTeacherInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createTeacher({ payload, callback, errorCallback, searchValue = '' }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token , ContentType: 'multipart/form-data'}),
      Store.createTeacher(),
    );
    if (res.success) {
      showMessage({ content: '新增成功' });
      if (callback) { callback() }
      yield put(StoreActions.getTeacherList(searchValue, callback, errorCallback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacher({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store.updateTeacher(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(StoreActions.getTeacherList(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* deleteTeacher({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Store.deleteTeacher(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' });
      if (callback) { callback() }
      yield put(StoreActions.getTeacherList(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacherOrder({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store.updateTeacherOrder(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(StoreActions.getTeacherList(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}
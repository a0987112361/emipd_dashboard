import { put, call, select } from 'redux-saga/effects';

import {
    Store3Actions,
} from 'src/Stores';
import { Handler, Store3 } from 'src/apis';
import { showMessage } from 'src/utils/message';

/*
 * 關於中心-中心簡介
*/
export function* getStore3({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store3.getStore3(),
    );

    if (res.success) {
      yield put(Store3Actions.getStore3Success(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateStore3({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store3.updateStore3(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      // if (callback) { callback() }
      yield put(Store3Actions.getStore3Success(res.data));
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
export function* getTeam3List({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store3.getTeam3List(),
    );

    if (res.success) {
      yield put(Store3Actions.getTeam3ListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeam3List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store3.updateTeam3List(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store3Actions.getTeam3ListSuccess(res.data));
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
export function* getTeacher3List({ searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store3.getTeacher3List(searchValue),
    );

    if (res.success) {
      yield put(Store3Actions.getTeacher3ListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getTeacher3Info({ teacherId, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store3.getTeacher3Info(teacherId),
    );

    if (res.success) {
      yield put(Store3Actions.getTeacher3InfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createTeacher3({ payload, callback, errorCallback, searchValue = '' }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token , ContentType: 'multipart/form-data'}),
      Store3.createTeacher3(),
    );
    if (res.success) {
      showMessage({ content: '新增成功' });
      if (callback) { callback() }
      yield put(Store3Actions.getTeacher3List(searchValue, callback, errorCallback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacher3({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store3.updateTeacher3(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store3Actions.getTeacher3List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* deleteTeacher3({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Store3.deleteTeacher3(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' });
      if (callback) { callback() }
      yield put(Store3Actions.getTeacher3List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacher3Order({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store3.updateTeacher3Order(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store3Actions.getTeacher3List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}
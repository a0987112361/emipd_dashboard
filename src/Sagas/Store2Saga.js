import { put, call, select } from 'redux-saga/effects';

import {
    Store2Actions,
} from 'src/Stores';
import { Handler, Store2 } from 'src/apis';
import { showMessage } from 'src/utils/message';

/*
 * 關於中心-中心簡介
*/
export function* getStore2({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store2.getStore2(),
    );

    if (res.success) {
      yield put(Store2Actions.getStore2Success(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateStore2({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store2.updateStore2(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      // if (callback) { callback() }
      yield put(Store2Actions.getStore2Success(res.data));
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
export function* getTeam2List({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store2.getTeam2List(),
    );

    if (res.success) {
      yield put(Store2Actions.getTeam2ListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeam2List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store2.updateTeam2List(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store2Actions.getTeam2ListSuccess(res.data));
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
export function* getTeacher2List({ searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store2.getTeacher2List(searchValue),
    );

    if (res.success) {
      yield put(Store2Actions.getTeacher2ListSuccess(res.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getTeacher2Info({ teacherId, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Store2.getTeacher2Info(teacherId),
    );

    if (res.success) {
      yield put(Store2Actions.getTeacher2InfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createTeacher2({ payload, callback, errorCallback, searchValue = '' }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token , ContentType: 'multipart/form-data'}),
      Store2.createTeacher2(),
    );
    if (res.success) {
      showMessage({ content: '新增成功' });
      if (callback) { callback() }
      yield put(Store2Actions.getTeacher2List(searchValue, callback, errorCallback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacher2({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Store2.updateTeacher2(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store2Actions.getTeacher2List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* deleteTeacher2({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Store2.deleteTeacher2(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' });
      if (callback) { callback() }
      yield put(Store2Actions.getTeacher2List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* updateTeacher2Order({ payload, searchValue, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Store2.updateTeacher2Order(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      if (callback) { callback() }
      yield put(Store2Actions.getTeacher2List(searchValue, callback));
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}
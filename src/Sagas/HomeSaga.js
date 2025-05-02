import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';

import { HomeActions, } from 'src/Stores';
import { Handler, Home } from 'src/apis';
import { showMessage } from 'src/utils/message';
import _ from 'lodash';

export function* getHomeInfo({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
        Handler.get({ Authorization: token }),
        Home.getHomeInfo(),
    )
    if (res.success) {
        yield put(HomeActions.getHomeInfoSuccess(res.data));
        if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* updateHomeInfo({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
        Handler.put({ data: payload, Authorization: token }),
        Home.updateHomeInfo(),
    );

    if (res.success) {
      if(callback) { callback() }
      yield put(HomeActions.getHomeInfoSuccess(res.data));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* getAboutInfo({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
        Handler.get({ Authorization: token }),
        Home.getAboutInfo(),
    )
    if (res.success) {
        yield put(HomeActions.getAboutInfoSuccess(res.data));
        if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}

export function* updateAboutInfo({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
        Handler.put({ data: payload, Authorization: token }),
        Home.updateAboutInfo(),
    );

    if (res.success) {
      if(callback) { callback() }
      yield put(HomeActions.getAboutInfoSuccess(res.data));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if(errorCallback) { errorCallback() }
  }
}
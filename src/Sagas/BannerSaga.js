import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';

import { BannerActions, } from 'src/Stores';
import { Handler, Banner } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getBannerList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Banner.getBannerList(payload.now_page, payload.page_size),
    )

    if (res.success) {
      yield put(BannerActions.getBannerListSuccess(res.data.list, res.paging));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getBannerInfo({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Banner.getBannerInfo(id),
    )
    if (res.success) {
      yield put(BannerActions.getBannerInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* createBanner({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Banner.createBanner(),
    );
    if (res.success) {
      yield put(BannerActions.getBannerList(queryPayload, callback, errorCallback));
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

export function* updateBanner({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Banner.updateBanner(),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(BannerActions.getBannerList(queryPayload, callback, errorCallback));
      if (callback) { callback() }
    }
  } catch (err) {
      console.log('err', err);
  }
  finally {
      if (callback) { callback() }
  }
}

export function* deleteBanner({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Banner.deleteBanner(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(BannerActions.getBannerList(queryPayload, callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* changeBannerStatus({ id, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
        Handler.put({ Authorization: token }),
        Banner.changeBannerStatus(id),
    );
    if (res.success) {
        showMessage({ content: '上架狀態修改成功' });
        yield put(BannerActions.getBannerList(queryPayload, callback, errorCallback));
    }
  } catch (err) {
    console.log('err', err);
  }finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* sortBanner({ id, action, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Banner.sortBanner(id, action),
    );
    if (res.success) {
      showMessage({ content: '順序修改成功' });
      yield put(BannerActions.getBannerList(queryPayload, callback, errorCallback));
    }
  } catch (err) {
    console.log('err', err);
  }finally {
    if (errorCallback) { errorCallback() }
  }
}
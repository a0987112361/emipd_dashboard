import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import {
  ContactActions,
} from 'src/Stores';
import { Handler, Contact } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getContactList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Contact.getContactList(payload.now_page, payload.page_size, errorCallback),
    );
    if (res.success) {
      yield put(ContactActions.getContactListSuccess(res.data.list, res.paging, errorCallback));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  } finally {
    if (errorCallback) { errorCallback() }
  }
}

export function* getContactInfo({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Contact.getContactInfo(id),
    );

    if (res.success) {
      yield put(ContactActions.getContactInfoSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* updateContact({ payload, queryPayload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Contact.updateContact(),
    );
    if (res.success) {
      yield put(ContactActions.getContactList(queryPayload, callback, errorCallback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* deleteContact({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Contact.deleteContact(),
    );
    if (res.success) {
      showMessage({ content: '刪除成功' }, 10);
      yield put(ContactActions.getContactList(callback, errorCallback));
      if (callback) { callback()}
    }
  } catch (err) {
    console.log('err', err);
  }finally {
    if (errorCallback) { errorCallback() }
  }
}
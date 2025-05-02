import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import {
  StatusActions,
} from 'src/Stores';
import { Handler, Status } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getStatusDetail({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Status.getStatusDetail(id),
    );

    if (res.success) {
      yield put(StatusActions.getStatusDetailSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getStatusList({ is_inquiry = 0, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    let res;
    res = yield call(
      Handler.get({ Authorization: token }),
      Status.getStatusList(is_inquiry),
    );
    if (res.data.success) {
      yield put(StatusActions.getStatusListSuccess(res.data.data.list));
      if (callback) { callback(res.data.data.list) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* createStatus({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token }),
      Status.createStatus(),
    );
    if (res.success) {
      yield put(StatusActions.getStatusList('', callback));
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* updateStatus({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Status.updateStatus(),
    );
    if (res.success) {
      yield put(StatusActions.getStatusList('', callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* deleteStatus({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: id, Authorization: token }),
      Status.deleteStatus(),
    );
    if (res.success) {
      yield put(StatusActions.getStatusList('', callback));
      showMessage({ content: '刪除成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

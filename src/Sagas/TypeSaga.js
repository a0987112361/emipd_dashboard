import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import {
  TypeActions,
} from 'src/Stores';
import { Handler, Type } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getTypeDetail({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Type.getTypeDetail(id),
    );

    if (res.success) {
      yield put(TypeActions.getTypeDetailSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getTypeList({ callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    let res;
    res = yield call(
      Handler.get({ Authorization: token }),
      Type.getTypeList(),
    );

    if (res.data.success) {
      yield put(TypeActions.getTypeListSuccess(res.data.data.list));
      if (callback) {
        callback(res.data.data.list)
      }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getItemTypeList({ callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Type.getItemTypeList(),
    );

    if (res.success) {
      yield put(TypeActions.getItemTypeListSuccess(res.data.list));
      if (callback) {
        callback(res.data.list)
      }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* createType({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Type.createType(),
    );
    if (res.success) {
      yield put(TypeActions.getTypeList(callback));
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* updateType({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
      Type.updateType(),
    );
    if (res.success) {
      yield put(TypeActions.getTypeList(callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* deleteType({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: id, Authorization: token }),
      Type.deleteType(),
    );
    if (res.success) {
      yield put(TypeActions.getTypeList(callback));
      showMessage({ content: '刪除成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getPrevTypeList({ callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    let res;
    res = yield call(
      Handler.get({ Authorization: token }),
      Type.getPrevTypeList(),
    );

    if (res.data.success) {
      yield put(TypeActions.getPrevTypeListSuccess(res.data.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* changeTypeSelect({ id, callback, errorCallback, list }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Type.changeTypeSelect(id),
    );
    if (res.success) {
      yield put(TypeActions.getTypeList(callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
    yield put(TypeActions.getTypeList(callback));
    if (errorCallback) {
      errorCallback(list)
    }
  }
}


export function* changeStatus({ id, callback, errorCallback, list }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Type.changeStatus(id),
    );
    if (res.success) {
      yield put(TypeActions.getTypeList(callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
    yield put(TypeActions.getTypeList(callback))
    if (errorCallback) {
      errorCallback(list)
    }
  }
}

export function* sortType({ id, change, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Type.sortType(id, change),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(TypeActions.getTypeList(callback));
    }
  } catch (err) {
    console.log('err', err);
  }
}



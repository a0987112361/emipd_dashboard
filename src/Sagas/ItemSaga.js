import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import {
  ItemActions,
} from 'src/Stores';
import { Handler, Item } from 'src/apis';
import { showMessage } from 'src/utils/message';
export function* getItemDetail({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Item.getItemDetail(id),
    );

    if (res.success) {
      yield put(ItemActions.getItemDetailSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getItemList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    let { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token }),
      Item.getItemList(),
    );

    if (res.success) {  
      if (callback) {
        callback(res.data.list, res.paging)
      }
      yield put(ItemActions.getItemListSuccess(res.data.list, res.paging));
    }
  } catch (err) {
    console.log('err', err);
    if (errorCallback) { errorCallback() }
  }
}

export function* createItem({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token, ContentItem: 'multipart/form-data' }),
      Item.createItem(),
    );
    if (res.success) {
      if (callback) { callback() }
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
    if (errorCallback) { errorCallback() }
  }
}

export function* updateItem({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token, ContentItem: 'multipart/form-data' }),
      Item.updateItem(),
    );

    if (res.success) {
      if (callback) { callback() }
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
    if (errorCallback) { errorCallback() }
  }
}

export function* deleteItem({ id, callback, payload, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: id, Authorization: token }),
      Item.deleteItem(),
    );
    if (res.success) {
      if (callback) { callback() }
      showMessage({ content: '刪除成功' });
      yield put(ItemActions.getItemList(payload, callback));
    }
  } catch (err) {
    console.log('err', err);
    if (errorCallback) { errorCallback() }
  }
}


export function* getItemSpec({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Item.getItemSpec(id),
    );

    if (res.success) {
      yield put(ItemActions.getItemSpecSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}


export function* getSelect({ callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    let res;
    res = yield call(
      Handler.get({ Authorization: token }),
      Item.getSelect(),
    );

    if (res.data.success) {
      yield put(ItemActions.getSelectSuccess(res.data.data.list));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* changeSelect({ id, callback, payload }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Item.changeSelect(id),
    );
    if (res.success) {
      yield put(ItemActions.getItemList(payload, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* changeOpen({ id, callback, payload }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Item.changeOpen(id),
    );
    if (res.success) {
      yield put(ItemActions.getItemList(payload, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* changeInquiry({ id, callback, payload }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Item.changeInquiry(id),
    );
    if (res.success) {
      yield put(ItemActions.getItemList(payload, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* changeAsk({ id, callback, payload }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Item.changeAsk(id),
    );
    if (res.success) {
      yield put(ItemActions.getItemList(payload, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* sortItem({ id, change, callback, payload }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      Item.sortItem(id, change),
    );
    if (res.success) {
      if (callback) { callback() }
      yield put(ItemActions.getItemList(payload, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}



import { put, call, select } from "redux-saga/effects";

import { Activity3Actions } from "src/Stores";
import { Handler, Activity3 } from "src/apis";
import { showMessage } from "src/utils/message";

export function* getActivity3List({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity3.getActivity3List(
        payload.now_page,
        payload.page_size,
        payload.search,
        payload.order
      )
    );

    if (res.success) {
      yield put(
        Activity3Actions.getActivity3ListSuccess(res.data.list, res.paging)
      );
      if (callback) {
        callback(res.data);
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

export function* getActivity3PicList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity3.getActivity3PicList(
        payload.now_page,
        payload.page_size,
        payload.id
      )
    );

    if (res.success) {
      yield put(
        Activity3Actions.getActivity3PicListSuccess(res.data.list, res.paging)
      );
      if (callback) {
        callback(res.data);
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

export function* getActivity3Info({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity3.getActivity3Info(id)
    );
    if (res.success) {
      yield put(Activity3Actions.getActivity3InfoSuccess(res.data));
      if (callback) {
        callback(res.data);
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

export function* createActivity3({
  payload,
  queryPayload,
  callback,
  errorCallback,
}) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({
        data: payload,
        Authorization: token,
        ContentType: "multipart/form-data",
      }),
      Activity3.createActivity3()
    );
    if (res.success) {
      yield put(
        Activity3Actions.getActivity3List(queryPayload, callback, errorCallback)
      );
      showMessage({ content: "新增成功" });
      if (callback) {
        callback();
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

export function* updateActivity3({
  payload,
  queryPayload,
  callback,
  errorCallback,
}) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({
        data: payload,
        Authorization: token,
        ContentType: "multipart/form-data",
      }),
      Activity3.updateActivity3()
    );
    if (res.success) {
      showMessage({ content: "修改成功" });
      yield put(
        Activity3Actions.getActivity3List(queryPayload, callback, errorCallback)
      );
      if (callback) {
        callback();
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (callback) {
      callback();
    }
  }
}

export function* deleteActivity3({
  payload,
  queryPayload,
  callback,
  errorCallback,
}) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Activity3.deleteActivity3()
    );
    if (res.success) {
      showMessage({ content: "刪除成功" }, 10);
      yield put(
        Activity3Actions.getActivity3List(queryPayload, callback, errorCallback)
      );
      if (callback) {
        callback();
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

export function* updatePin3({
  payload,
  queryPayload,
  callback,
  errorCallback,
}) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      Activity3.updatePin3()
    );
    if (res.success) {
      showMessage({ content: "修改成功" });
      yield put(
        Activity3Actions.getActivity3List(queryPayload, callback, errorCallback)
      );
      if (callback) {
        callback();
      }
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (callback) {
      callback();
    }
  }
}

import { put, call, select } from "redux-saga/effects";

import { ActivityActions } from "src/Stores";
import { Handler, Activity } from "src/apis";
import { showMessage } from "src/utils/message";

export function* getActivityList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity.getActivityList(
        payload.now_page,
        payload.page_size,
        payload.search,
        payload.order
      )
    );

    if (res.success) {
      yield put(
        ActivityActions.getActivityListSuccess(res.data.list, res.paging)
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

export function* getActivityPicList({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity.getActivityPicList(
        payload.now_page,
        payload.page_size,
        payload.id
      )
    );

    if (res.success) {
      yield put(
        ActivityActions.getActivityPicListSuccess(res.data.list, res.paging)
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

export function* getActivityInfo({ id, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      Activity.getActivityInfo(id)
    );
    if (res.success) {
      yield put(ActivityActions.getActivityInfoSuccess(res.data));
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

export function* createActivity({
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
      Activity.createActivity()
    );
    if (res.success) {
      yield put(
        ActivityActions.getActivityList(queryPayload, callback, errorCallback)
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

export function* updateActivity({
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
      Activity.updateActivity()
    );
    if (res.success) {
      showMessage({ content: "修改成功" });
      yield put(
        ActivityActions.getActivityList(queryPayload, callback, errorCallback)
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

export function* deleteActivity({
  payload,
  queryPayload,
  callback,
  errorCallback,
}) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: payload, Authorization: token }),
      Activity.deleteActivity()
    );
    if (res.success) {
      showMessage({ content: "刪除成功" }, 10);
      yield put(
        ActivityActions.getActivityList(queryPayload, callback, errorCallback)
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

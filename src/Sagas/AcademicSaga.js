import { put, call, select } from "redux-saga/effects";

import { AcademicActions } from "src/Stores";
import { Handler, Academic } from "src/apis";
import { showMessage } from "src/utils/message";

/*
 * 關於中心-中心簡介
 */
export function* getAcademic({ callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(Handler.get(), Academic.getAcademic());

    if (res.success) {
      yield put(AcademicActions.getAcademicSuccess(res.data.content));
      if (callback) {
        callback(res.data.content);
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

export function* updateAcademic({ payload, callback, errorCallback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({
        data: payload,
        Authorization: token,
      }),
      Academic.updateAcademic()
    );
    if (res.success) {
      showMessage({ content: "修改成功" });
      yield put(AcademicActions.getAcademicSuccess());
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    if (errorCallback) {
      errorCallback();
    }
  }
}

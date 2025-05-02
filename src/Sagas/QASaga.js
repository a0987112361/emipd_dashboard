import { put, call, select } from 'redux-saga/effects';
// import { saveUserInformation } from 'src/utils/localStorage';

import {
  QAActions,
} from 'src/Stores';
import { Handler, QA } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getQAType({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      QA.getQAType(id),
    );

    if (res.success) {
      yield put(QAActions.getQATypeSuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getQATypeList({ payload = { search: "", now_page: 1, page_size: 10 }, callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      QA.getQATypeList(payload.search, payload.now_page, payload.page_size),
    );

    if (res.success) {
      yield put(QAActions.getQATypeListSuccess(res.data.list));
      if (callback) {
        callback(res.data.list)
      }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getLowestType({ callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      QA.getLowestType(),
    );

    if (res.success) {
      yield put(QAActions.getLowestTypeSuccess(res.data.list));
      if (callback) {
        callback(res.data.list)
      }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* createQAType({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token }),
      QA.createQAType(),
    );
    if (res.success) {
      yield put(QAActions.getQATypeList({ search: "", now_page: 1, page_size: 10 }, callback));
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* updateQAType({ payload, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      QA.updateQAType(),
    );
    if (res.success) {
      yield put(QAActions.getQATypeList({ search: "", now_page: 1, page_size: 10 }, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* deleteQAType({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: id, Authorization: token }),
      QA.deleteQAType(),
    );
    if (res.success) {
      yield put(QAActions.getQATypeList({ search: "", now_page: 1, page_size: 10 }, callback));
      showMessage({ content: '刪除成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* sortQAType({ id, change, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      QA.sortQAType(id, change),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(QAActions.getQATypeList({ search: "", now_page: 1, page_size: 10 }, callback));
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getQA({ id, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      QA.getQA(id),
    );
    if (res.success) {
      yield put(QAActions.getQASuccess(res.data));
      if (callback) { callback(res.data) }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* getQAList({ payload = { qa_type_id: "", search: "", now_page: 1, page_size: 10 }, callback }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.get({ Authorization: token }),
      QA.getQAList(payload.qa_type_id, payload.search, payload.now_page, payload.page_size),
    );

    if (res.success) {
      yield put(QAActions.getQAListSuccess(res.data.list, res.paging));
      if (callback) {
        callback(res.data.list)
      }
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* createQA({ payload, callback, paging }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.post({ data: payload, Authorization: token }),
      QA.createQA(),
    );
    if (res.success) {
      yield put(QAActions.getQAList(paging, callback));
      showMessage({ content: '新增成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* updateQA({ payload, callback, paging }) {
  try {
    const token = yield select((state) => state.user.Token);

    const { data: res } = yield call(
      Handler.put({ data: payload, Authorization: token }),
      QA.updateQA(),
    );
    if (res.success) {
      yield put(QAActions.getQAList(paging, callback));
      showMessage({ content: '修改成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* deleteQA({ id, callback, paging }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.delete({ data: id, Authorization: token }),
      QA.deleteQA(),
    );
    if (res.success) {
      yield put(QAActions.getQAList(paging, callback));
      showMessage({ content: '刪除成功' });
    }
  } catch (err) {
    console.log('err', err);
  }
}

export function* sortQA({ id, change, callback }) {
  try {
    const token = yield select((state) => state.user.Token);
    const { data: res } = yield call(
      Handler.put({ Authorization: token }),
      QA.sortQA(id, change),
    );
    if (res.success) {
      showMessage({ content: '修改成功' });
      yield put(QAActions.getQAList(callback));
    }
  } catch (err) {
    console.log('err', err);
  }
}




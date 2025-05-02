import { put, call, select } from 'redux-saga/effects';

import {
    ManagerActions,
} from 'src/Stores';
import { Handler, User } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getManagerList({ payload, callback, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);

        let res = yield call(
            Handler.get({ Authorization: token }),
            User.getManagerList(payload),
        );
        if (res.data.success) {
            yield put(ManagerActions.getManagerListSuccess(res.data.data.list, res.data.paging));
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (errorCallback) { errorCallback() }
    }
}

export function* createManager({ payload, queryPayload, callback, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token }),
            User.createUser(),
        );
        if (res.success) {
            showMessage({ content: '新增成功' });
            yield put(ManagerActions.getManagerList(queryPayload, callback, errorCallback));
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
        if (errorCallback) { errorCallback() }
    }
}

export function* updateManager({ payload, queryPayload, callback, errorCallback,   }) {
    try {
        const token = yield select((state) => state.user.Token);

        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            User.updateUser(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            if (callback) { callback() }
            yield put(ManagerActions.getManagerList(queryPayload, callback, errorCallback));
        }
    } catch (err) {
        console.log('err', err);
        if (errorCallback) { errorCallback() }
    }
}

export function* deleteManager({ payload, queryPayload, callback, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: payload, Authorization: token }),
            User.deleteUser(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' });
            yield put(ManagerActions.getManagerList(queryPayload, callback, errorCallback));
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
        if (errorCallback) { errorCallback() }
    }
}

// export function* changePassword({ payload, callback, errorCallback }) {
//     try {
//         const token = yield select((state) => state.user.Token);
//         const { data: res } = yield call(
//             Handler.put({ data: payload, Authorization: token }),
//             User.changePassword(),
//         );
//         if (res.success) {
//             showMessage({ content: '修改成功' });
//             if (callback) { callback() }
//         }
//     } catch (err) {
//         console.log('err', err);
//         if (errorCallback) { errorCallback() }
//     }
// }
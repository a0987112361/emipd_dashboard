import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';

import {
    UserActions,
} from 'src/Stores';
import { Handler, User } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* login({ payload, callback, errorCallback }) {
    try {
        const { data: res } = yield call(
            Handler.post({ data: payload }),
            User.login(),
        );

        if (res.success) {
            const setData = {
                Token: res.data.token,
                ...res.data.user,
                admin: {},
            }
            localStorage.removeItem("EMIPD_FAIL"); // 登入成功就把曾經失敗的紀錄刪掉
            if(res.data.user.is_login === true){
                saveUserInformation(setData);
                yield put(UserActions.setUser(setData));
            }else{
                console.log('saga =>', res.data.user);
                if (callback) { callback(res.data.user, res.data.token) }
            }
        }
    } catch (err) {
        console.log('err', err);
        if (errorCallback) { errorCallback(err) }
    // } finally {
    //     if (callback) { callback() }
    }
}

export function* getUserInfo({ id, callback, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            User.user(id),
        );

        if (res.success) {
            if (callback) { callback(res.data) }
            yield put(UserActions.getUserInfoSuccess(res.data));
        }
    } catch (err) {
        console.log('err', err);
    }finally {
        if (errorCallback) { errorCallback() }
    }
}

export function* getAdmin({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            User.admin(id),
        );

        if (res.success) {
            if (callback) { callback(res.data) }
            yield put(UserActions.getAdminSuccess(res.data));
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* updateAdmin({ payload, callback, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);

        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            User.updateAdmin(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            if (callback) { callback() }
            // yield put(UserActions.updateAdmin(() => { }));
            yield put(UserActions.getAdmin(payload.user_id, callback));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if(errorCallback) { errorCallback() }
    }
}

export function* getUserList({ callback, paging = null, search = '', loginOrder = '', createOrder = '' }) {
    try {
        const token = yield select((state) => state.user.Token);

        let res;
        if (paging === null) {
            res = yield call(
                Handler.get({ Authorization: token }),
                User.getUserList(),
            );
        } else {
            res = yield call(
                Handler.get({ Authorization: token }),
                User.getAllPaging(paging.now_page, paging.page_size, search, loginOrder, createOrder),
            );
        }

        if (res.data.success) {
            yield put(UserActions.getUserListSuccess(res.data.data.list, res.data.paging));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* createUser({ payload, callback, paging, errorCallback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token }),
            User.createUser(),
        );
        if (res.success) {
            showMessage({ content: '新增成功' });
            yield put(UserActions.getUserList(() => { }, paging));
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
        if (errorCallback) { errorCallback() }
    }
}

export function* updateUser({ id, payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);

        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            User.updateUser(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            if (callback) { callback() }
            yield put(UserActions.getUserList(() => { }));
            yield put(UserActions.getUserInfo(id, callback));
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* deleteUser({ id, callback, paging}) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: id, Authorization: token }),
            User.deleteUser(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' });
            if (callback) { callback() }
            yield put(UserActions.getUserList(() => { }, paging));
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* changePassword({ payload, callback, errorCallback, token }) {
    try {
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            User.changePassword(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (errorCallback) { errorCallback() }
    }
}

export function* getNoticeCount({callback}) {
    try {
        const token = yield select((state) => state.user.Token);
        let res = yield call(
            Handler.get({ Authorization: token }),
            User.getNoticeCount(),
        );
        if (res.data.success) {
            yield put(UserActions.getNoticeCountSuccess(res.data.data));
            if (callback) { callback() }
        }
    } catch (err) {
        console.log('err', err);
    }
    finally {
        if (callback) { callback() }
    }
}

// export function* forgetPassword({ payload, callback }) {
//     try {
//         const { data: res } = yield call(
//             Handler.get({}),
//             User.forget(payload),
//         );
//         if (res.success) {
//             showMessage({ content: '申請成功，前往信箱收信' });
//             if (callback) { callback() }
//         }
//     } catch (err) {
//         console.log('err', err);
//     }
// }

// export function* checkUpdate({ payload, callback }) {
//     try {
//         const token = yield select((state) => state.user.Token);
//         const { data: res } = yield call(
//             Handler.get({ Authorization: token }),
//             User.checkUpdate(payload),
//         );
//         if (res.success) {
//             if (callback) { callback(res.data.check_update) }
//         }
//     } catch (err) {
//         console.log('err', err);
//         if (callback) { callback(false) }
//     }
// }

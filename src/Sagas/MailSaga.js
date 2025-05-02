import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';

import {
    MailActions,
} from 'src/Stores';
import { Handler, Mail } from 'src/apis';
import { showMessage } from 'src/utils/message';
import _ from 'lodash';

export function* getMailList({ callback, paging = { now_page: 1, page_size: 10 }, search = '' }) {

    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Mail.getMailList(paging.now_page, paging.page_size, search),
        )

        if (res.success) {
            yield put(MailActions.getMailListSuccess(res.data.list, res.paging));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

export function* getMailDetail({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Mail.getMailDetail(id),
        )
        if (res.success) {
            yield put(MailActions.getMailDetailSuccess(res.data));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* createMail({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token }),
            Mail.createMail(),
        );
        if (res.success) {
            showMessage({ content: '新增成功' });
            yield put(MailActions.getMailList(callback));
            if (callback) {
                callback()
            }

        }
    } catch (err) {
        console.log('err', err);
    }
    finally {
        if (callback) { callback() }
    }
}


export function* updateMail({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Mail.updateMail(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' }), 10;
            yield put(MailActions.getMailList(callback));
            if (callback) {
                callback()
            }

        }
    } catch (err) {
        console.log('err', err);
    }
    finally {
        if (callback) { callback() }
    }
}

export function* deleteMail({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: payload, Authorization: token }),
            Mail.deleteMail(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' }, 10);
            yield put(MailActions.getMailList(callback));
            if (callback) {
                callback()
            }

        }
    } catch (err) {
        console.log('err', err);
    }
    finally {
        if (callback) { callback() }
    }
}
import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';

import { PropertyActions, } from 'src/Stores';
import { Handler, Property } from 'src/apis';
import { showMessage } from 'src/utils/message';
import _ from 'lodash';

export function* getPropertyList({ callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Property.getPropertyList(),
        )
        if (res.success) {
            yield put(PropertyActions.getPropertyListSuccess(res.data.list, res.paging));
            if (callback) { callback(res.data.list) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getPropertyDetail({ id, callback }) {
    try {
        let temp = []
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Property.getPropertyList(),
        )
        if (res.success) {
            res.data.list.map((item, index) => {
                if (item.prop_type_id === id) {
                    temp.push(item)
                }
            })
            yield put(PropertyActions.getPropertyDetailSuccess(temp));
            if (callback) { callback(temp) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* createProperty({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token }),
            Property.createProperty(),
        );
        if (res.success) {
            showMessage({ content: '新增成功' });
            yield put(PropertyActions.getPropertyList(callback));
        }
    } catch (err) {
        console.log('err', err);
    }

}

export function* updateProperty({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Property.updateProperty(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            yield put(PropertyActions.getPropertyList(callback));
        }
    } catch (err) {
        console.log('err', err);
    }

}

export function* deleteProperty({ id, callback, paging }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: id, Authorization: token }),
            Property.deleteProperty(),
        );
        if (res.success) {
            yield put(PropertyActions.getPropertyList(callback, paging));
            showMessage({ content: '刪除成功' }, 10);
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* changePropertySort({ id, change, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ Authorization: token }),
            Property.changePropertySort(id, change),
        );
        if (res.success) {
            showMessage({ content: '修改成功' }), 10;
            yield put(PropertyActions.getPropertyList(callback));
        }
    } catch (err) {
        console.log('err', err);
    }
}

import { put, call, select } from 'redux-saga/effects';

import {
    DeliveryActions,
} from 'src/Stores';
import { Handler, Delivery } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getLabelList({ callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Delivery.getLabelList(),
        )
        if (res.success) {
            yield put(DeliveryActions.getLabelListSuccess(res.data));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

export function* getDeliveryList({ callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Delivery.getDeliveryList(),
        )
        if (res.success) {
            yield put(DeliveryActions.getDeliveryListSuccess(res.data));
            if (callback) {
                callback(res.data.list)
            }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getDeliveryDetail({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Delivery.getDeliveryDetail(id),
        )
        if (res.success) {
            yield put(DeliveryActions.getDeliveryDetailSuccess(res.data));
            if (callback) {
                callback(res.data)
            }
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

export function* createDelivery({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.post({ data: payload, Authorization: token }),
            Delivery.createDelivery(),
        );
        if (res.success) {
            showMessage({ content: '新增成功' });
            yield put(DeliveryActions.getDeliveryList());
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

export function* updateDelivery({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Delivery.updateDelivery(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' });
            yield put(DeliveryActions.getDeliveryList());
            yield put(DeliveryActions.getLabelList());
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

export function* deleteDelivery({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.delete({ data: id, Authorization: token }),
            Delivery.deleteDelivery(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' });
            yield put(DeliveryActions.getDeliveryList());
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

export function* sortLogistic({ id, change, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ Authorization: token }),
            Delivery.sortLogistic(id, change),
        );
        if (res.success) {
            showMessage({ content: '修改成功' }), 10;
            yield put(DeliveryActions.getDeliveryList());
            if (callback) {
                callback()
            }
        }
    } catch (err) {
        console.log('err', err);
    }
}
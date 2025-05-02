import { put, call, select } from 'redux-saga/effects';

import {
    OrderActions,
    UserActions,
} from 'src/Stores';
import { Handler, Order } from 'src/apis';
import { showMessage } from 'src/utils/message';

export function* getOrderList({ callback, paging = { now_page: 1, page_size: 10 }, search = '', cart_type = '0', order_status_id = '' }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Order.getOrderList(paging.now_page, paging.page_size, search, cart_type, order_status_id),
        )
        if (res.success) {
            yield put(OrderActions.getOrderListSuccess(cart_type, res.data.list, res.paging));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getOrderDetail({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Order.getOrderDetail(id),
        )
        if (res.success) {
            yield put(OrderActions.getOrderDetailSuccess(res.data));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* updateOrder({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Order.updateOrder(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' }), 10;
            yield put(UserActions.getNoticeCount());
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

export function* updateOrderStatus({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Order.updateOrderStatus(),
        );
        if (res.success) {
            yield put(OrderActions.getOrderList(callback));
            yield put(UserActions.getNoticeCount());
            showMessage({ content: '修改成功' }), 10;
            // if (callback) {
            //     callback()
            // }

        }
    } catch (err) {
        console.log('err', err);
    }
    // finally {
    //     if (callback) { callback() }
    // }
}

export function* deleteOrder({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Order.deleteOrder(),
        );
        if (res.success) {
            showMessage({ content: '刪除成功' });
            yield put(UserActions.getNoticeCount());
            if (callback) {
                callback()
            }
            // yield put(OrderActions.getOrderList());
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getUserOrderList({ id, callback, paging = { now_page: 1, page_size: 10 } }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Order.getUserOrderList(id, paging.now_page, paging.page_size),
        )
        if (res.success) {
            yield put(OrderActions.getUserOrderListSuccess(res.data.list, res.paging));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getUserOrderDetail({ id, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Order.getUserOrderDetail(id),
        )
        if (res.success) {
            yield put(OrderActions.getUserOrderDetailSuccess(res.data));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* getOrderCancelList({ callback, paging = { now_page: 1, page_size: 10 }, search = '', cancel_status = '' }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Order.getOrderCancelList(paging.now_page, paging.page_size, search, cancel_status),
        )
        if (res.success) {
            yield put(OrderActions.getOrderCancelListSuccess(res.data.list, res.paging));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* confirmOrderCancel({ payload, callback, paging, search = '', cancel_status = '' }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            Order.confirmOrderCancel(),
        );
        if (res.success) {
            yield put(OrderActions.getOrderCancelList(callback, paging, search, cancel_status));
            yield put(UserActions.getNoticeCount());
            showMessage({ content: '修改成功' });
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
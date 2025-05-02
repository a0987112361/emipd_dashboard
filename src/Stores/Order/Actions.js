import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getOrderList: ['callback', 'paging', 'search', 'cart_type', 'order_status_id'],
    getOrderListSuccess: ['cart_type', 'payload', 'paging'],
    getOrderDetail: ['id', 'callback'],
    getOrderDetailSuccess: ['payload'],
    updateOrder: ['payload', 'callback'],
    updateOrderStatus: ['payload', 'callback'],
    deleteOrder: ['payload', 'callback'],
    resetOrderDetail: [''],
    getUserOrderList: ['id', 'callback', 'paging'],
    getUserOrderListSuccess: ['payload', 'paging'],
    getUserOrderDetail: ['id', 'callback'],
    getUserOrderDetailSuccess: ['payload'],
    getOrderCancelList: ['callback', 'paging', 'search', 'cancel_status'],
    getOrderCancelListSuccess: ['payload', 'paging'],
    confirmOrderCancel:['payload', 'callback', 'paging', 'search', 'cancel_status']
});

export const OrderTypes = Types;
export default Creators;
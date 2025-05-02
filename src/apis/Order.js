export default {
    getOrderList: (now_page, page_size, search, cart_type, order_status_id) => `api/Order/Log/List?search=${search}&cart_type=${cart_type}&order_status_id=${order_status_id}&now_page=${now_page}&page_size=${page_size}`,
    getOrderDetail: (id) => `api/Order/Log?order_id=${id}`,
    deleteOrder: () => 'api/Order/Cancel',
    updateOrder: () => 'api/Order/Edit',
    updateOrderStatus: () => 'api/Order/EditStatus',
    getUserOrderList: (id, now_page, page_size,) => `api/Order/FrontEnd/List?user_id=${id}&now_page=${now_page}&page_size=${page_size}`,
    getUserOrderDetail: (id) => `api/Order/FrontEnd?order_id=${id}`,
    getOrderCancelList: (now_page, page_size, search, cancel_status) => `api/Order/Cancel/List?search=${search}&cancel_status=${cancel_status}&now_page=${now_page}&page_size=${page_size}`,
    confirmOrderCancel: () => 'api/Order/Cancel',
};
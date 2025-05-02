/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { OrderTypes } from './Actions';

export const getOrderListSuccess = (state, { cart_type, payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.order_checkout_id,
    });
  });

  return {
    ...state,
    OrderList: temp,
    Paging: paging,
  };
};

export const getOrderDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    Order: payload,
  };
};

export const resetOrderDetail = (state, { }) => {
  return {
    ...state,
    Order: {},
  }
};

export const getUserOrderListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.cart_order_id,
    });
  });

  return {
    ...state,
    UserOrderList: temp,

  };
};

export const getUserOrderDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    UserOrder: payload,
  };
};

export const getOrderCancelListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.order_id,
    });
  });

  return {
    ...state,
    OrderCancelList: temp,
    paging: paging,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [OrderTypes.GET_ORDER_LIST_SUCCESS]: getOrderListSuccess,
  [OrderTypes.GET_ORDER_DETAIL_SUCCESS]: getOrderDetailSuccess,
  [OrderTypes.RESET_ORDER_DETAIL]: resetOrderDetail,
  [OrderTypes.GET_USER_ORDER_LIST_SUCCESS]: getUserOrderListSuccess,
  [OrderTypes.GET_USER_ORDER_DETAIL_SUCCESS]: getUserOrderDetailSuccess,
  [OrderTypes.GET_ORDER_CANCEL_LIST_SUCCESS]: getOrderCancelListSuccess,
})

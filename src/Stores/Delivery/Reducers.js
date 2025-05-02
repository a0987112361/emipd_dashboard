/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { DeliveryTypes } from './Actions';

export const getLabelListSuccess = (state, { payload }) => {
  let temp = [];
  payload.list.map((item, index) => {
    temp.push({
      ...item,
      key: item.label_id,
    });
  });
  return {
    ...state,
    labelList: temp,
  };
};

export const getDeliveryListSuccess = (state, { payload }) => {
  let temp = [];
  payload.list.map((item, index) => {
    temp.push({
      ...item,
      key: item.logistic_id,
    });
  });
  return {
    ...state,
    DeliveryList: temp,
  };
};

export const getDeliveryDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    Delivery: payload,
  };
};

export const resetDeliveryDetail = (state, { }) => {
  return {
    ...state,
    Delivery: {},
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  // export const reducer = createReducer(INITIAL_STATE, {
  [DeliveryTypes.GET_LABEL_LIST_SUCCESS]: getLabelListSuccess,
  [DeliveryTypes.GET_DELIVERY_LIST_SUCCESS]: getDeliveryListSuccess,
  [DeliveryTypes.GET_DELIVERY_DETAIL_SUCCESS]: getDeliveryDetailSuccess,
  [DeliveryTypes.RESET_DELIVERY_DETAIL]: resetDeliveryDetail,
})

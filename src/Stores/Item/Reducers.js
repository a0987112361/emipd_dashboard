/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ItemTypes } from './Actions';

export const getItemDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    item: payload,
  }
};

export const getItemListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.item_id,
    })
  })
  return {
    ...state,
    itemList: temp,
    paging: paging
  }
};

export const getItemSpecSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    itemSpec: payload,
  }
};

export const getSelectSuccess = (state, { payload }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.item_id,
    })
  })
  return {
    ...state,
    itemSelect: temp
  }
};

export const resetItemDetail = (state, { }) => {
  return {
    ...state,
    item: {},
  }
};


export const reducer = createReducer(INITIAL_STATE, {
  [ItemTypes.GET_ITEM_DETAIL_SUCCESS]: getItemDetailSuccess,
  [ItemTypes.GET_ITEM_LIST_SUCCESS]: getItemListSuccess,

  [ItemTypes.GET_ITEM_SPEC_SUCCESS]: getItemSpecSuccess,
  [ItemTypes.GET_SELECT_SUCCESS]: getSelectSuccess,

  [ItemTypes.RESET_ITEM_DETAIL]: resetItemDetail,
});

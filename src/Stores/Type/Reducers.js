/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import _ from 'lodash';
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { TypeTypes } from './Actions';

export const getTypeDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    type: payload,
  }
};

export const getTypeListSuccess = (state, { payload }) => {
  let temp = [];
  let total2 = [];
  let total3 = [];

  // 將從後端拿回來的值，變成第一層的分類
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.type_id,
    })
  })

  temp.map((item) => {
    // 判斷第一層的分類底下是否還有第二層
    if (_.has(item, 'types')) {
      total2.push(item.types.length)
    } else {
      total2.push(0)
    }
    // 判斷第一層的分類底下是否還有第二層
    if (item.types != undefined) {
      item.types.map((info) => {
        if (_.has(info, 'types')) {
          total3.push({ id: info.type_id, typeNum: info.types.length })
        } else {
          total3.push({ id: info.type_id, typeNum: 0 })
        }
      })
    }
  })

  return {
    ...state,
    typeList: temp,
    firstTotal: temp.length,
    secondTotal: total2,
    thirdTotal: total3,
  }
};

export const getItemTypeListSuccess = (state, { payload }) => {
  let temp = [];

  // 將從後端拿回來的值，變成第一層的分類
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.type_id,
    })
  })

  return {
    ...state,
    itemTypeList: temp,
  }
};

export const resetTypeDetail = (state, { }) => {
  return {
    ...state,
    type: {},
  }
};

export const getPrevTypeListSuccess = (state, { payload }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.type_id,
    })
  })
  return {
    ...state,
    secondTypeList: temp
  }
};


export const reducer = createReducer(INITIAL_STATE, {
  [TypeTypes.GET_TYPE_DETAIL_SUCCESS]: getTypeDetailSuccess,
  [TypeTypes.GET_TYPE_LIST_SUCCESS]: getTypeListSuccess,
  [TypeTypes.GET_ITEM_TYPE_LIST_SUCCESS]: getItemTypeListSuccess,
  [TypeTypes.RESET_TYPE_DETAIL]: resetTypeDetail,
  [TypeTypes.GET_PREV_TYPE_LIST_SUCCESS]: getPrevTypeListSuccess,
});

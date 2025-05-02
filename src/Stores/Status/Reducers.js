/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { StatusTypes } from './Actions';

export const getStatusDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    status: payload,
  }
};

export const getStatusListSuccess = (state, { payload }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.order_status_id,
    })
  })
  return {
    ...state,
    statusList: temp
  }
};

export const resetStatusDetail = (state, { }) => {
  return {
    ...state,
    status: {},
  }
};


export const reducer = createReducer(INITIAL_STATE, {
  [StatusTypes.GET_STATUS_DETAIL_SUCCESS]: getStatusDetailSuccess,
  [StatusTypes.GET_STATUS_LIST_SUCCESS]: getStatusListSuccess,
  [StatusTypes.RESET_STATUS_DETAIL]: resetStatusDetail,
});

/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { MailTypes } from './Actions';

export const getMailListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.notice_id,
    });
  });

  return {
    ...state,
    MailList: temp,
    Paging: paging,
  };
};

export const getMailDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    Mail: payload,
  };
};

export const resetMailDetail = (state, { }) => {
  return {
    ...state,
    Mail: {},
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [MailTypes.GET_MAIL_LIST_SUCCESS]: getMailListSuccess,
  [MailTypes.GET_MAIL_DETAIL_SUCCESS]: getMailDetailSuccess,
  [MailTypes.RESET_MAIL_DETAIL]: resetMailDetail,
})

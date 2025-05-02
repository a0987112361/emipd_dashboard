import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { Activity2Types } from './Actions';

export const getActivity2ListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.activity_id,
    });
  });
  return {
    ...state,
    activityList: temp,
    paging: paging
  };
};

export const getActivity2PicListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.activity_id,
    });
  });
  return {
    ...state,
    activityPicList: temp,
    picPaging: paging
  };
};

export const getActivity2InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    activityInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Activity2Types.GET_ACTIVITY2_LIST_SUCCESS]: getActivity2ListSuccess,
  [Activity2Types.GET_ACTIVITY2_PIC_LIST_SUCCESS]: getActivity2PicListSuccess,
  [Activity2Types.GET_ACTIVITY2_INFO_SUCCESS]: getActivity2InfoSuccess,
})

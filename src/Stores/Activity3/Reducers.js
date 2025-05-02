import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { Activity3Types } from './Actions';

export const getActivity3ListSuccess = (state, { payload, paging }) => {
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

export const getActivity3PicListSuccess = (state, { payload, paging }) => {
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

export const getActivity3InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    activityInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Activity3Types.GET_ACTIVITY3_LIST_SUCCESS]: getActivity3ListSuccess,
  [Activity3Types.GET_ACTIVITY3_PIC_LIST_SUCCESS]: getActivity3PicListSuccess,
  [Activity3Types.GET_ACTIVITY3_INFO_SUCCESS]: getActivity3InfoSuccess,
})

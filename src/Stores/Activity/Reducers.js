import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ActivityTypes } from './Actions';

export const getActivityListSuccess = (state, { payload, paging }) => {
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

export const getActivityPicListSuccess = (state, { payload, paging }) => {
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

export const getActivityInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    activityInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [ActivityTypes.GET_ACTIVITY_LIST_SUCCESS]: getActivityListSuccess,
  [ActivityTypes.GET_ACTIVITY_PIC_LIST_SUCCESS]: getActivityPicListSuccess,
  [ActivityTypes.GET_ACTIVITY_INFO_SUCCESS]: getActivityInfoSuccess,
})

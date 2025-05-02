import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { Course3Types } from './Actions';

export const getCourse3ListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.course_id,
    });
  });
  return {
    ...state,
    courseList: temp,
    paging: paging
  };
};

export const getCourse3InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    courseInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Course3Types.GET_COURSE3_LIST_SUCCESS]: getCourse3ListSuccess,
  [Course3Types.GET_COURSE3_INFO_SUCCESS]: getCourse3InfoSuccess,
})

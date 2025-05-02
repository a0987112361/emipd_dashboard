import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { Course2Types } from './Actions';

export const getCourse2ListSuccess = (state, { payload, paging }) => {
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

export const getCourse2InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    courseInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Course2Types.GET_COURSE2_LIST_SUCCESS]: getCourse2ListSuccess,
  [Course2Types.GET_COURSE2_INFO_SUCCESS]: getCourse2InfoSuccess,
})

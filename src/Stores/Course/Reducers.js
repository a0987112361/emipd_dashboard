import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { CourseTypes } from './Actions';

export const getCourseListSuccess = (state, { payload, paging }) => {
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

export const getCourseInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    courseInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [CourseTypes.GET_COURSE_LIST_SUCCESS]: getCourseListSuccess,
  [CourseTypes.GET_COURSE_INFO_SUCCESS]: getCourseInfoSuccess,
})

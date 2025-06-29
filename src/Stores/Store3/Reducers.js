/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { Store3Types } from "./Actions";

export const getStore3Success = (state, { payload }) => {
  return {
    ...state,
    store: payload,
  };
};

export const getTeam3ListSuccess = (state, { payload }) => {
  return {
    ...state,
    teamList: payload,
  };
};

export const getTeacher3ListSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherList: payload,
  };
};

export const getTeacher3InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherInfo: payload,
  };
};

export const getTeacherEnListSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherEnList: payload,
  };
};

export const getTeacherEnInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherEnInfo: payload,
  };
};

export const getTeacherZhListSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherZhList: payload,
  };
};

export const getTeacherZhInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherZhInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Store3Types.GET_STORE3_SUCCESS]: getStore3Success,
  [Store3Types.GET_TEAM3_LIST_SUCCESS]: getTeam3ListSuccess,
  [Store3Types.GET_TEACHER3_LIST_SUCCESS]: getTeacher3ListSuccess,
  [Store3Types.GET_TEACHER3_INFO_SUCCESS]: getTeacher3InfoSuccess,
  [Store3Types.GET_TEACHER_EN_LIST_SUCCESS]: getTeacherEnListSuccess,
  [Store3Types.GET_TEACHER_EN_INFO_SUCCESS]: getTeacherEnInfoSuccess,
  [Store3Types.GET_TEACHER_ZH_LIST_SUCCESS]: getTeacherZhListSuccess,
  [Store3Types.GET_TEACHER_ZH_INFO_SUCCESS]: getTeacherZhInfoSuccess,
});

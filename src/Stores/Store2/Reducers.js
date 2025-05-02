/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { Store2Types } from './Actions';

export const getStore2Success = (state, { payload }) => {
  return {
    ...state,
    store: payload,
  }
};

export const getTeam2ListSuccess = (state, { payload }) => {
  return {
    ...state,
    teamList: payload,
  }
};

export const getTeacher2ListSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherList: payload,
  }
};

export const getTeacher2InfoSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherInfo: payload,
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [Store2Types.GET_STORE2_SUCCESS]: getStore2Success,
  [Store2Types.GET_TEAM2_LIST_SUCCESS]: getTeam2ListSuccess,
  [Store2Types.GET_TEACHER2_LIST_SUCCESS]: getTeacher2ListSuccess,
  [Store2Types.GET_TEACHER2_INFO_SUCCESS]: getTeacher2InfoSuccess,
});

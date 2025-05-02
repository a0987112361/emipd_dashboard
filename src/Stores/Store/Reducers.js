/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { StoreTypes } from './Actions';

export const getStoreSuccess = (state, { payload }) => {
  return {
    ...state,
    store: payload,
  }
};

export const getTeamListSuccess = (state, { payload }) => {
  return {
    ...state,
    teamList: payload,
  }
};

export const getTeacherListSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherList: payload,
  }
};

export const getTeacherInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    teacherInfo: payload,
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [StoreTypes.GET_STORE_SUCCESS]: getStoreSuccess,
  [StoreTypes.GET_TEAM_LIST_SUCCESS]: getTeamListSuccess,
  [StoreTypes.GET_TEACHER_LIST_SUCCESS]: getTeacherListSuccess,
  [StoreTypes.GET_TEACHER_INFO_SUCCESS]: getTeacherInfoSuccess,
});

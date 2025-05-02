/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { HomeTypes } from './Actions';

export const getHomeInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    homeInfo: payload
  };
};

export const getAboutInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    aboutInfo: payload
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  // export const reducer = createReducer(INITIAL_STATE, {
    [HomeTypes.GET_HOME_INFO_SUCCESS]: getHomeInfoSuccess,
    [HomeTypes.GET_ABOUT_INFO_SUCCESS]: getAboutInfoSuccess,
})

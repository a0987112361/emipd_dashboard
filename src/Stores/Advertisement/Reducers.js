/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { AdTypes } from './Actions';

export const getAdDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    Advertisement: payload,
  };

};

export const reducer = createReducer(INITIAL_STATE, {
  [AdTypes.GET_AD_DETAIL_SUCCESS]: getAdDetailSuccess,
})

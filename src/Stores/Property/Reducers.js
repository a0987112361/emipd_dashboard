/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { PropertyTypes } from './Actions';

export const getPropertyListSuccess = (state, { payload }) => {
  let temp = [];

  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.prop_type_id,
    });
  });
  return {
    ...state,
    PropertyList: temp,
  };
};

export const getPropertyDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    Property: payload,
  };
};

export const resetPropertyDetail = (state, { }) => {
  return {
    ...state,
    Property: {},
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [PropertyTypes.GET_PROPERTY_LIST_SUCCESS]: getPropertyListSuccess,
  [PropertyTypes.GET_PROPERTY_DETAIL_SUCCESS]: getPropertyDetailSuccess,
  [PropertyTypes.RESET_PROPERTY_DETAIL]: resetPropertyDetail,
})

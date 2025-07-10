/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { AcademicTypes } from "./Actions";

export const getAcademicSuccess = (state, { payload }) => {
  return {
    ...state,
    content: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [AcademicTypes.GET_ACADEMIC_SUCCESS]: getAcademicSuccess,
});

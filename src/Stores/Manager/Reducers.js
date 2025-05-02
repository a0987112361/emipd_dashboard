/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ManagerTypes } from './Actions';

export const getManagerListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    if(item.role_id !== 'M001'){
      temp.push({
        ...item,
        key: item.user_id,
      })
    }
  })

  return {
    ...state,
    managerList: temp,
    paging: paging,
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [ManagerTypes.GET_MANAGER_LIST_SUCCESS]: getManagerListSuccess,
});

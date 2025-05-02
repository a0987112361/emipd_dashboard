/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ContactTypes } from './Actions';

export const getContactInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    contactInfo: payload,
  }
};

export const getContactListSuccess = (state, { payload, paging }) => {
  let dealTemp = [];
  let unDealTemp = [];
  let dealPaging = {};
  let unDealPaging = {};

  payload.map((item, index) => {
    if(item.is_deal === true){
      dealTemp.push({
        ...item,
        key: item.contact_form_id,
      })
    }else{
      unDealTemp.push({
        ...item,
        key: item.contact_form_id,
      })
    }
  })

  dealPaging = {
    now_page: 1,
    page_size: 10,
    total: dealTemp.length
  }

  unDealPaging = {
    now_page: 1,
    page_size: 10,
    total: unDealTemp.length
  }


  return {
    ...state,
    contactList: payload,
    dealList: dealTemp,
    unDealList: unDealTemp,
    dealPaging: dealPaging,
    unDealPaging: unDealPaging
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [ContactTypes.GET_CONTACT_LIST_SUCCESS]: getContactListSuccess,
  [ContactTypes.GET_CONTACT_INFO_SUCCESS]: getContactInfoSuccess,
});

import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ResourceTypes } from './Actions';

export const getResourceListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.resource_id,
    });
  });
  return {
    ...state,
    resourceList: temp,
    paging: paging
  };
};

export const getResourceInfoSuccess = (state, { payload }) => {
  // let infoData = {
  //   ...payload,
  //   img: temp,
  // }
  return {
    ...state,
    resourceInfo: payload,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [ResourceTypes.GET_RESOURCE_LIST_SUCCESS]: getResourceListSuccess,
  [ResourceTypes.GET_RESOURCE_INFO_SUCCESS]: getResourceInfoSuccess,
})

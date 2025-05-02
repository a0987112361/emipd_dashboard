/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { BannerTypes } from './Actions';
import _ from 'lodash';

export const getBannerListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item, index) => {
    temp.push({
      ...item,
      key: item.banner_id,
      imgs: _.has(item, 'imgs') ? item.imgs : []
    });
  });

  temp.map((item) => {
    if(item.imgs.length > 0){
      item.imgs.map((info) => {
        if(info.platform === 'PC'){
          item.banner_web_img = info.file_url
        }else{
          item.banner_app_img = info.file_url
        }
      })
    }
  })

  return {
    ...state,
    bannerList: temp,
    paging: paging,
  };
};

export const getBannerInfoSuccess = (state, { payload }) => {

  let temp = [];let temp1 = [];let temp2 = [];let temp3 = [];
  payload.imgs.map((item) => {
    if(item.platform === 'PC'){
      if(item.lang === 'zh'){
        temp.push(item)
      }else{
        temp1.push(item)
      }
    }else{
      if(item.lang === 'zh'){
        temp2.push(item)
      }else{
        temp3.push(item)
      }
    }
  })

  let newData = {
    ...payload,
    banner_zh_web_img: temp,
    banner_en_web_img: temp1,
    banner_zh_phone_img: temp2,
    banner_en_phone_img: temp3
  }

  return {
    ...state,
    bannerInfo: newData,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [BannerTypes.GET_BANNER_LIST_SUCCESS]: getBannerListSuccess,
  [BannerTypes.GET_BANNER_INFO_SUCCESS]: getBannerInfoSuccess,
})

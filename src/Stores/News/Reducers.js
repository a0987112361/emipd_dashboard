/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { NewsTypes } from './Actions';

export const getNewsListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.news_id,
    })
  })

  return {
    ...state,
    newsList: temp,
    paging: paging,
  }
};

export const getNewsInfoSuccess = (state, { payload }) => {
  return {
    ...state,
    newsInfo: payload,
  }
};


export const reducer = createReducer(INITIAL_STATE, {
  [NewsTypes.GET_NEWS_LIST_SUCCESS]: getNewsListSuccess,
  [NewsTypes.GET_NEWS_INFO_SUCCESS]: getNewsInfoSuccess,
});

/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import _ from 'lodash';
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ArticleTypes } from './Actions';
import { StaticRouter } from 'react-router';
import moment from 'moment';

export const getArticleDetailSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    article: payload,
  }
};

export const getArticleListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.news_id,
    })
  })

  return {
    ...state,
    articleList: temp,
    paging: paging,
  }
};

export const resetArticleDetail = (state, { }) => {
  return {
    ...state,
    article: {},
  }
};


export const reducer = createReducer(INITIAL_STATE, {
  [ArticleTypes.GET_ARTICLE_DETAIL_SUCCESS]: getArticleDetailSuccess,
  [ArticleTypes.GET_ARTICLE_LIST_SUCCESS]: getArticleListSuccess,
  [ArticleTypes.RESET_ARTICLE_DETAIL]: resetArticleDetail,
});

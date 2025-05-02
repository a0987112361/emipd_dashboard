/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { UserTypes } from './Actions';
import { getUserInformation } from 'src/utils/localStorage';

const userInfoStr = getUserInformation();
export const setToken = (state, { token }) => ({
  ...state,
  Token: token,
}
);

export const setUser = (state, { payload }) => ({
  ...state,
  ...payload,
  user: payload,
});

export const getUserListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    temp.push({
      ...item,
      key: item.user_id,
    })
  })

  return {
    ...state,
    userList: temp,
    paging: paging,
  }
};

export const getUserInfoSuccess = (state, { payload }) => {
  console.log('reducer: get user: =>', payload);
  return {
    ...state,
    userInfo: payload,
  }
};

export const getAdminSuccess = (state, { payload }) => {
  return {
    ...state,
    admin: payload,
  }
};

export const setMobile = (state, { payload }) => {
  return {
    ...state,
    isMobile: payload,
  }
};

export const resetUserInfo = (state, { }) => {
  return {
    ...state,
    userInfo: {},
  }
};

export const getNoticeCountSuccess = (state, { payload }) => {
  return {
    ...state,
    noticeList: payload,
  }
};

export const reducer = createReducer(userInfoStr ? JSON.parse(userInfoStr) : INITIAL_STATE, {
  [UserTypes.SET_TOKEN]: setToken,
  [UserTypes.SET_USER]: setUser,
  [UserTypes.GET_USER_LIST_SUCCESS]: getUserListSuccess,
  [UserTypes.GET_USER_INFO_SUCCESS]: getUserInfoSuccess,
  [UserTypes.GET_ADMIN_SUCCESS]: getAdminSuccess,
  [UserTypes.RESET_USER_INFO]: resetUserInfo,

  [UserTypes.SET_MOBILE]: setMobile,
  [UserTypes.GET_NOTICE_COUNT_SUCCESS]: getNoticeCountSuccess,
  // [UserTypes.GET_USER_BY_ID]: getUserById,
  // [UserTypes.GET_USER_BY_ID_SUCCESS]: getUserByIdSuccess,
  // [UserTypes.GET_WEATHER_LIST_SUCCESS]: getWeatherListSuccess,
});

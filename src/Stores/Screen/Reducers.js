import _ from 'lodash';
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { ScreenTypes } from './Actions';

export const handleChangeScreenSize = (state, { width, height }) => {
  return {
    ...state,
    screenWidth: width,
    screenHeight: height,
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [ScreenTypes.HANDLE_CHANGE_SCREEN_SIZE]: handleChangeScreenSize,
});

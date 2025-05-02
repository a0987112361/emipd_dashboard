/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */
import _ from 'lodash';
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { QATypes } from './Actions';

export const getQATypeSuccess = (state, { payload }) => {
  return {
    ...state,
    ...payload,
    QAType: payload,
  }
};

export const getQATypeListSuccess = (state, { payload }) => {
  let temp = [];
  let total2 = [];
  let total3 = [];

  payload.map((item) => {
    temp.push({
      ...item,
      key: item.qa_type_id,
    })
  })

  temp.map((item) => {
    if (_.has(item, 'qa_types')) {
      total2.push(item.qa_types.length)
    } else {
      total2.push(0)
    }
    if (item.qa_types != undefined) {
      item.qa_types.map((info) => {
        if (_.has(info, 'qa_types')) {
          total3.push({ id: info.qa_type_id, qaNum: info.qa_types.length })
        } else {
          total3.push({ id: info.qa_type_id, qaNum: 0 })
        }
      })
    }
  })

  let firstOption = [{ id: '0', name: '無' }];
  let secondOption = [];

  temp.map((item) => {
    firstOption.push({
      id: item.qa_type_id,
      name: item.qa_type_name
    })

    if (_.has(item, 'qa_types')) {
      item.qa_types.map((info) => {
        secondOption.push({
          id: info.qa_type_id,
          name: info.qa_type_name
        })
      })

    }
  })

  return {
    ...state,
    QATypeList: temp,
    firstTotal: temp.length,
    secondTotal: total2,
    thirdTotal: total3,
    firstTypeList: firstOption,
    secondTypeList: secondOption,
  }
};

export const resetQAType = (state, { }) => {
  return {
    ...state,
    QAType: {},
  }
};

export const getQASuccess = (state, { payload }) => {
  return {
    ...state,
    QA: payload,
  }
};

export const getQAListSuccess = (state, { payload, paging }) => {
  let temp = [];

  payload.map((item) => {
    temp.push({
      ...item,
      key: item.qa_id,
    })
  })

  return {
    ...state,
    QAList: temp,
    paging: paging,
  }
};

export const getLowestTypeSuccess = (state, { payload, paging }) => {
  let temp = [];

  payload.map((item) => {
    temp.push({
      id: item.qa_type_id,
      name: item.qa_type_name,
    })
  })

  return {
    ...state,
    lowestType: temp
  }
};

export const resetQA = (state, { }) => {
  return {
    ...state,
    QA: {},
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [QATypes.GET_QA_TYPE_SUCCESS]: getQATypeSuccess,
  [QATypes.GET_QA_TYPE_LIST_SUCCESS]: getQATypeListSuccess,
  [QATypes.RESET_QA_TYPE]: resetQAType,
  [QATypes.GET_QA_SUCCESS]: getQASuccess,
  [QATypes.GET_QA_LIST_SUCCESS]: getQAListSuccess,
  [QATypes.RESET_QA]: resetQA,
  [QATypes.GET_LOWEST_TYPE_SUCCESS]: getLowestTypeSuccess,
});

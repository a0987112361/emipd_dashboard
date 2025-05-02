/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    QATypeList: [],
    QAType: {},

    QAList: [],
    QA: {},
    paging: {},

    firstTypeList: [], //第一層qa分類(用於新增qaType Option)
    secondTypeList: [], //第二層qa分類(用於新增qa Option)
    firstTotal: [],
    secondTotal: [],
    thirdTotal: [],

    lowestType: [],
};

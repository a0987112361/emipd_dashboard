import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    // getActivityItemList: ['callback'],
    // getActivityItemListSuccess: ['payload'],
    // getActivityList: ['callback', 'paging'],
    // getActivityListSuccess: ['payload', 'paging'],
    // getActivityDetail: ['id', 'callback'],
    // getActivityDetailSuccess: ['payload'],
    // createActivity: ['payload', 'callback'],
    // updateActivity: ['payload', 'callback'],
    // deleteActivity: ['id', 'callback', 'paging'],
    // resetActivityDetail: [''],


    getActivity2List: ['payload', 'callback', 'errorCallback'],
    getActivity2ListSuccess: ['payload', 'paging'],
    getActivity2Info:  ['id', 'callback', 'errorCallback'],
    getActivity2InfoSuccess: ['payload', 'paging'],
    getActivity2PicList: ['payload', 'callback', 'errorCallback'],
    getActivity2PicListSuccess: ['payload', 'paging'],
    createActivity2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateActivity2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteActivity2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const Activity2Types = Types;
export default Creators;
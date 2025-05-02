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


    getActivityList: ['payload', 'callback', 'errorCallback'],
    getActivityListSuccess: ['payload', 'paging'],
    getActivityInfo:  ['id', 'callback', 'errorCallback'],
    getActivityInfoSuccess: ['payload', 'paging'],
    getActivityPicList: ['payload', 'callback', 'errorCallback'],
    getActivityPicListSuccess: ['payload', 'paging'],
    createActivity:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateActivity:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteActivity:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const ActivityTypes = Types;
export default Creators;
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


    getActivity3List: ['payload', 'callback', 'errorCallback'],
    getActivity3ListSuccess: ['payload', 'paging'],
    getActivity3Info:  ['id', 'callback', 'errorCallback'],
    getActivity3InfoSuccess: ['payload', 'paging'],
    getActivity3PicList: ['payload', 'callback', 'errorCallback'],
    getActivity3PicListSuccess: ['payload', 'paging'],
    createActivity3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateActivity3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteActivity3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const Activity3Types = Types;
export default Creators;
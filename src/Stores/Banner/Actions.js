import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getBannerList: ['payload', 'callback', 'errorCallback'],
    getBannerListSuccess: ['payload', 'paging'],
    getBannerInfo: ['id', 'callback', 'errorCallback'],
    getBannerInfoSuccess: ['payload'],
    createBanner: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateBanner: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteBanner: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    changeBannerStatus: ['id', 'queryPayload', 'callback', 'errorCallback'],
    sortBanner: ['id', 'action', 'queryPayload', 'callback', 'errorCallback']
});

export const BannerTypes = Types;
export default Creators;
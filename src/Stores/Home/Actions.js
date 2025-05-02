import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getHomeInfo: ['callback', 'errorCallback'],
    getHomeInfoSuccess: ['payload'],
    updateHomeInfo: ['payload', 'callback', 'errorCallback'],
    getAboutInfo: ['callback', 'errorCallback'],
    getAboutInfoSuccess: ['payload'],
    updateAboutInfo: ['payload', 'callback', 'errorCallback'],
});

export const HomeTypes = Types;
export default Creators;
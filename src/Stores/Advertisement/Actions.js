import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getAdDetail: ['callback'],
    getAdDetailSuccess: ['payload'],
    updateAd: ['payload','callback'],
});

export const AdTypes = Types;
export default Creators;
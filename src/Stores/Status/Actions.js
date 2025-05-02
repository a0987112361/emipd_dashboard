import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getStatusDetail: ['id', 'callback'],
    getStatusDetailSuccess: ['payload'],
    getStatusList: ['is_inquiry', 'callback'],
    getStatusListSuccess: ['payload'],
    createStatus: ['payload', 'callback'],
    updateStatus: ['payload', 'callback'],
    deleteStatus: ['id', 'callback'],
    resetStatusDetail: [''],

});

export const StatusTypes = Types;
export default Creators;

import { useCallback } from 'react';
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getManagerList: ['payload', 'callback', 'errorCallback'],
    getManagerListSuccess: ['payload', 'paging'],
    createManager: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateManager: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteManager: ['id', 'queryPayload', 'callback', 'errorCallback'],
    // changePassword: ['payload', 'callback', 'errorCallback' ],
});

export const ManagerTypes = Types;
export default Creators;
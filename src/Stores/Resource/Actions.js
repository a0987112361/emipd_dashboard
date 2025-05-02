import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getResourceList: ['payload', 'callback', 'errorCallback'],
    getResourceListSuccess: ['payload', 'paging'],
    getResourceInfo:  ['id', 'callback', 'errorCallback'],
    getResourceInfoSuccess: ['payload', 'paging'],
    createResource:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateResource:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteResource:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const ResourceTypes = Types;
export default Creators;
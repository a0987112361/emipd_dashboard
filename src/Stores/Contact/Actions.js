import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getContactList: ['payload', 'callback', 'errorCallback'],
    getContactListSuccess: ['payload', 'paging',],
    getContactInfo: ['id', 'callback', 'errorCallback'],
    getContactInfoSuccess: ['payload'],
    updateContact: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteContact: ['payload', 'queryPayload', 'callback', 'errorCallback'],
});

export const ContactTypes = Types;
export default Creators;

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getMailList: ['callback', 'paging', 'search'],
    getMailListSuccess: ['payload', 'paging'],
    getMailDetail: ['id', 'callback'],
    getMailDetailSuccess: ['payload'],
    updateMail: ['payload', 'callback'],
    createMail: ['payload', 'callback'],
    deleteMail: ['payload', 'callback'],
    resetMailDetail: [''],
});

export const MailTypes = Types;
export default Creators;
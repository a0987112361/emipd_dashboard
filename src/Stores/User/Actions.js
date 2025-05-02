import { useCallback } from 'react';
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    setToken: ['token'],
    getUserInfo: ['id', 'callback', 'errorCallback'],
    getUserInfoSuccess: ['payload'],

    getAdmin: ['id', 'callback'],
    getAdminSuccess: ['payload'],
    updateAdmin: ['payload', 'callback', 'errorCallback'],

    getUserList: ['callback', 'paging', 'search', 'loginOrder', 'createOrder'],
    getUserListSuccess: ['payload', 'paging'],
    createUser: ['payload', 'callback', 'paging', 'errorCallback'],
    updateUser: ['id', 'payload', 'callback'],
    deleteUser: ['id', 'callback', 'paging'],
    changePassword: ['payload', 'callback', 'errrorCallback', 'token'],
    resetUserInfo: [''],

    login: ['payload', 'callback', 'errorCallback'],
    setUser: ['payload'],

    setMobile: ['payload'],

    getNoticeCount: ['callback'],
    getNoticeCountSuccess: ['payload'],
});

export const UserTypes = Types;
export default Creators;
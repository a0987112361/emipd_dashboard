import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getQAType: ['id', 'callback'],
    getQATypeSuccess: ['payload'],
    getQATypeList: ['payload', 'callback'],
    getQATypeListSuccess: ['payload'],
    createQAType: ['payload', 'callback'],
    updateQAType: ['payload', 'callback'],
    deleteQAType: ['id', 'callback'],
    resetQAType: [''],
    sortQAType: ['id', 'change', 'callback'],
    getLowestType: ['callback'],
    getLowestTypeSuccess: ['payload'],

    getQA: ['id', 'callback'],
    getQASuccess: ['payload'],
    getQAList: ['payload', 'callback'],
    getQAListSuccess: ['payload', 'paging'],
    createQA: ['payload', 'callback', 'paging'],
    updateQA: ['payload', 'callback', 'paging'],
    deleteQA: ['id', 'callback', 'paging'],
    resetQA: [''],
});

export const QATypes = Types;
export default Creators;

import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getTypeDetail: ['id', 'callback'],
    getTypeDetailSuccess: ['payload'],
    getTypeList: ['callback'],
    getTypeListSuccess: ['payload'],
    getItemTypeList: ['callback'], // 取得item 屬性資料
    getItemTypeListSuccess: ['payload'], // 取得item 屬性資料
    createType: ['payload', 'callback'],
    updateType: ['payload', 'callback'],
    deleteType: ['id', 'callback'],
    resetTypeDetail: [''],
    getPrevTypeList: ['callback'],
    getPrevTypeListSuccess: ['payload'],
    changeTypeSelect: ['id', 'callback', 'errorCallback', 'list'],
    changeStatus: ['id', 'callback', 'errorCallback', 'list'],
    sortType: ['id', 'change', 'callback']
});

export const TypeTypes = Types;
export default Creators;

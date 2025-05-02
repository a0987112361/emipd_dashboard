import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getPropertyList: ['callback', 'paging', 'all'], // true全部資料、false分頁
    getPropertyListSuccess: ['payload', 'paging'],
    getPropertyDetail: ['id', 'callback'],
    getPropertyDetailSuccess: ['payload'],
    createProperty: ['payload', 'callback'],
    updateProperty: ['payload', 'callback'],
    deleteProperty: ['id', 'callback', 'paging'],
    resetPropertyDetail: [''],
    changePropertySort: ['id', 'change', 'callback'],
});

export const PropertyTypes = Types;
export default Creators;
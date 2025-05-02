import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getItemDetail: ['id', 'callback', 'errorCallback'],
    getItemDetailSuccess: ['payload'],
    getItemList: ['payload', 'callback'],
    getItemListSuccess: ['payload', 'paging'],

    getItemSpec: ['id', 'callback'],
    getItemSpecSuccess: ['payload'],
    getSelect: ['callback'],
    getSelectSuccess: ['payload'],

    createItem: ['payload', 'callback', 'errorCallback'],
    updateItem: ['payload', 'callback', 'errorCallback'],
    deleteItem: ['id', 'callback', 'payload', 'errorCallback'],

    changeSelect: ['id', 'callback', 'payload'],
    changeOpen: ['id', 'callback', 'payload'],
    changeInquiry: ['id', 'callback', 'payload'],
    changeAsk: ['id', 'callback', 'payload'],
    sortItem: ['id', 'change', 'callback', 'payload'],

    resetItemDetail: [''],
});

export const ItemTypes = Types;
export default Creators;

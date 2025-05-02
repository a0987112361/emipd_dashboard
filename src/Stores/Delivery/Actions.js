import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getLabelList: ['callback'],
    getLabelListSuccess: ['payload'],
    getDeliveryList: ['callback'],
    getDeliveryListSuccess: ['payload'],
    getDeliveryDetail: ['id', 'callback'],
    getDeliveryDetailSuccess: ['payload'],
    createDelivery: ['payload', 'callback'],
    updateDelivery: ['payload', 'callback'],
    deleteDelivery: ['id', 'callback'],
    resetDeliveryDetail: [''],
    sortLogistic: ['id', 'change', 'callback']
});

export const DeliveryTypes = Types;
export default Creators;
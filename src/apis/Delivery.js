// const prefix = 'api/client';
export default {
    getLabelList: () => 'api/Logistic/Label/GetAll',
    getDeliveryList: () => 'api/Logistic/GetAll',
    createDelivery: () => 'api/Logistic',
    updateDelivery: () => 'api/Logistic',
    deleteDelivery: () => 'api/Logistic',
    getDeliveryDetail: (id) => `api/Logistic?logistic_id=${id}`,
    sortLogistic: (id, change) => `/api/Logistic/ChangeOrder?logistic_id=${id}&change=${change}`,
};
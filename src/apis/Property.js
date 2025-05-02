// const prefix = 'api/client';
export default {
    getPropertyList: () => 'api/Property/GetAll',
    getAllPage: (paging) => `api/Property/GetAll?now_page=${paging.now_page}&page_size=${paging.page_size}`,
    createProperty: () => 'api/Property',
    updateProperty: () => 'api/Property',
    deleteProperty: () => 'api/Property',
    changePropertySort: (id, change) => `/api/Property/ChangeOrder?prop_type_id=${id}&change=${change}`,
};
// const prefix = 'api/client';
export default {
    // getActivityItemList: () => 'api/Item/Form',
    getActivityList: (now_page, page_size, search, order) => `/api/activity/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
    getActivityInfo: (id) => `/api/activity/dashboard?id=${id}`,
    getActivityPicList: (now_page, page_size, id) => `/api/activity/GetAll/image?now_page=${now_page}&page_size=${page_size}&id=${id}`,
    createActivity: () => '/api/Activity',
    updateActivity: () => '/api/Activity',
    deleteActivity: () => '/api/Activity',
};
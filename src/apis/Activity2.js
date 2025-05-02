// const prefix = 'api/client';
export default {
    // getActivityItemList: () => 'api/Item/Form',
    getActivity2List: (now_page, page_size, search, order) => `/api/activity2/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
    getActivity2Info: (id) => `/api/activity2/dashboard?id=${id}`,
    getActivity2PicList: (now_page, page_size, id) => `/api/activity2/GetAll/image?now_page=${now_page}&page_size=${page_size}&id=${id}`,
    createActivity2: () => '/api/Activity2',
    updateActivity2: () => '/api/Activity2',
    deleteActivity2: () => '/api/Activity2',
};
// const prefix = 'api/client';
export default {
    getBannerList: (now_page, page_size) => `/api/Banner/Dashboard/GetAll?now_page=${now_page}&page_size=${page_size}`,
    createBanner: () => '/api/Banner',
    updateBanner: () => '/api/Banner',
    deleteBanner: () => '/api/Banner',
    getBannerInfo: (id) => `/api/Banner?id=${id}`,
    changeBannerStatus: (id) => `/api/banner/switch?id=${id}`,
    sortBanner: (id, action) => `/api/banner/order?id=${id}&action=${action}`,
};
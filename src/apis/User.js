// const prefix = 'api/client';

export default {
    login: () => '/api/auth/login',
    
    admin: (id) => `/api/user?id=${id}`,
    updateAdmin: () => '/api/user',

    user: (id) => `/api/user?id=${id}`,
    getUserList: () => '/api/user/getAll',
    getAllPaging: (now_page, page_size, search, loginOrder, createOrder) => `/api/user/getAll?search=${search}&user_type_id&login_time=${loginOrder}&create_time=${createOrder}&now_page=${now_page}&page_size=${page_size}`,
    createUser: () => '/api/user',
    updateUser: () => '/api/user',
    deleteUser: () => '/api/user',
    changePassword: () => '/api/user/password',
    getManagerList: (payload) => `/api/user/GetAll?search=${payload.search}&now_page=${payload.now_page}&page_size=${payload.page_size}&order=${payload.order}`,
    
    // getNoticeCount: () => 'api/Auth/NoticeCount',

    // insertUser: () => '/api/User/Register',
};
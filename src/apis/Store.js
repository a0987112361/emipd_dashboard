// const prefix = 'api/client';

export default {
    getStore: () => '/api/about',
    updateStore: () => '/api/about',

    getTeamList: () => '/api/team/GetAll?now_page=0&page_size=0',
    updateTeamList: () => '/api/team/list',

    getTeacherList: (searchValue) => `/api/teacher/GetAll?now_page=0&page_size=0&search=${searchValue}`,
    getTeacherInfo: (teacherId) => `/api/teacher?id=${teacherId}`,
    createTeacher: () => '/api/teacher',
    updateTeacher: () => '/api/teacher',
    deleteTeacher: () => '/api/teacher',
    updateTeacherOrder: () => `/api/teacher/order`,

    // getQADetail: (id) => `/api/QA?qa_id=${id}`,
    // getQAList: (search, now_page, page_size) => `/api/QA/getAll?qa_type_id=&search=${search}&now_page=${now_page}&page_size=${page_size}`,
    // createQA: () => '/api/QA',
    // updateQA: () => '/api/QA',
    // deleteQA: () => '/api/QA',
};
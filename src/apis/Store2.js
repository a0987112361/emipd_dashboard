// const prefix = 'api/client';

export default {
    getStore2: () => '/api/about2',
    updateStore2: () => '/api/about2',

    getTeam2List: () => '/api/team2/GetAll?now_page=0&page_size=0',
    updateTeam2List: () => '/api/team2/list',

    getTeacher2List: (searchValue) => `/api/teacher2/GetAll?now_page=0&page_size=0&search=${searchValue}`,
    getTeacher2Info: (teacherId) => `/api/teacher2?id=${teacherId}`,
    createTeacher2: () => '/api/teacher2',
    updateTeacher2: () => '/api/teacher2',
    deleteTeacher2: () => '/api/teacher2',
    updateTeacher2Order: () => `/api/teacher2/order`,

    // getQADetail: (id) => `/api/QA?qa_id=${id}`,
    // getQAList: (search, now_page, page_size) => `/api/QA/getAll?qa_type_id=&search=${search}&now_page=${now_page}&page_size=${page_size}`,
    // createQA: () => '/api/QA',
    // updateQA: () => '/api/QA',
    // deleteQA: () => '/api/QA',
};
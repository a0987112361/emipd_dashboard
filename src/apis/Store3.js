// const prefix = 'api/client';

export default {
    getStore3: () => '/api/about3',
    updateStore3: () => '/api/about3',

    getTeam3List: () => '/api/team3/GetAll?now_page=0&page_size=0',
    updateTeam3List: () => '/api/team3/list',

    getTeacher3List: (searchValue) => `/api/teacher3/GetAll?now_page=0&page_size=0&search=${searchValue}`,
    getTeacher3Info: (teacherId) => `/api/teacher3?id=${teacherId}`,
    createTeacher3: () => '/api/teacher3',
    updateTeacher3: () => '/api/teacher3',
    deleteTeacher3: () => '/api/teacher3',
    updateTeacher3Order: () => `/api/teacher3/order`,

    // getQADetail: (id) => `/api/QA?qa_id=${id}`,
    // getQAList: (search, now_page, page_size) => `/api/QA/getAll?qa_type_id=&search=${search}&now_page=${now_page}&page_size=${page_size}`,
    // createQA: () => '/api/QA',
    // updateQA: () => '/api/QA',
    // deleteQA: () => '/api/QA',
};
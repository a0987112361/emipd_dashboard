export default {
    getMailList: (now_page, page_size, search) => `api/Mail/GetAll?search=${search}&now_page=${now_page}&page_size=${page_size}`,
    getMailDetail: (id) => `api/Mail?id=${id}`,
    deleteMail: () => 'api/Mail',
    updateMail: () => 'api/Mail',
    createMail: () => 'api/Mail'
};
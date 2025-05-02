// const prefix = 'api/client';

export default {
  getContactList: (now_page, page_size) => `/api/contact/form/GetAll?now_page=${now_page}&page_size=${page_size}`,
  getContactInfo: (id) => `/api/contact/form?id=${id}`,
  // createContact: () => '/api/contact',
  updateContact: () => '/api/contact/form',
  deleteBanner: () => '/api/contact/form',
  // changeContactStatus: (id, status) => `api/Contact/status?contact_id=${id}&contact_status=${status}`,
};

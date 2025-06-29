// const prefix = 'api/client';
export default {
  // getActivityItemList: () => 'api/Item/Form',
  getActivity3List: (now_page, page_size, search, order) =>
    `/api/activity3/dashboard/GetAll?now_page=${now_page}&page_size=${page_size}&search=${search}&order=${order}&is_front=true`,
  getActivity3Info: (id) => `/api/activity3/dashboard?id=${id}`,
  getActivity3PicList: (now_page, page_size, id) =>
    `/api/activity3/GetAll/image?now_page=${now_page}&page_size=${page_size}&id=${id}`,
  createActivity3: () => "/api/Activity3",
  updateActivity3: () => "/api/Activity3",
  deleteActivity3: () => "/api/Activity3",
  updatePin3: () => "/api/Activity3/pin",
};

// const prefix = 'api/client';

export default {
  getTypeDetail: (id) => `/api/type?type_id=${id}`,
  getTypeList: () => '/api/type/getAll',
  getItemTypeList: () => '/api/type/ItemForm',
  getAllPaging: () => '/api/type/getAll',
  createType: () => '/api/type',
  updateType: () => '/api/type',
  deleteType: () => '/api/type',
  getPrevTypeList: () => '/api/type/form',
  changeStatus: (id) => `/api/type/switch?type_id=${id}`,// 列表更改 is_open
  changeTypeSelect: (id) => `/api/type/select?type_id=${id}`,// 列表更改 is_select
  sortType: (id, change) => `/api/Type/ChangeOrder?type_id=${id}&change=${change}`,
};

// const prefix = 'api/client';

export default {
  getStatusDetail: (id) => `/api/OrderStatus?cart_status_id=${id}`,
  getStatusList: (is_inquiry) => `/api/OrderStatus/GetAll?${is_inquiry !== '' ? `&is_inquiry=${is_inquiry}` : ''}`,
  getAllPaging: () => '/api/OrderStatus/getAll',
  createStatus: () => '/api/OrderStatus',
  updateStatus: () => '/api/OrderStatus',
  deleteStatus: () => '/api/OrderStatus',
  // createImg: () => '/api/cartStatus/upload',
};

// const prefix = 'api/client';

export default {
  getItemDetail: (id) => `/api/item?item_id=${id}`,
  getItemList: () => '/api/item/getAll',
  getAllPaging: () => '/api/item/getAll',

  getItemSpec: (id) => `/api/item/itemSpec?item_id=${id}`,// 取得 商品規格 spec
  getSelect: () => `/api/item/select`,// 取得 精選商品 is_select

  createItem: () => '/api/item',
  updateItem: () => '/api/item',
  deleteItem: () => '/api/item',

  changeSelect: (id) => `api/item/switch/select?item_id=${id}`,// 更改 精選 is_select
  changeOpen: (id) => `api/item/switch?item_id=${id}`,// 更改 上下架 is_open
  changeInquiry: (id) => `api/item/switch/inquiry?item_id=${id}`,// 更改 詢價 is_inquiry
  changeAsk: (id) => `api/item/switch/ask?item_id=${id}`,// 更改 詢價(不顯示價格) is_ask
  sortItem: (id, change) => `/api/item/changeOrder?item_id=${id}&change=${change}`,// 更改 排序 order

};

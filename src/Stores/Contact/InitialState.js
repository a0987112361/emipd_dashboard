/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    contactList: [],
    dealList: [],
    unDealList: [],
    paging: {
        now_page: 1,
        page_size: 10,
        total: 10,
    },
    contactInfo: {},
    contactTypeList: [],
    dealPaging: {
        now_page: 1,
        page_size: 10,
        total: 10,
    },
    unDealPaging: {
        now_page: 1,
        page_size: 10,
        total: 10,
    }
};

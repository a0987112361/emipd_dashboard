import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getNewsList: ['payload', 'callback', 'errorCallback'],
    getNewsListSuccess: ['payload', 'paging'],
    getNewsInfo: ['newsId', 'callback', 'errorCallback'],
    getNewsInfoSuccess: ['payload'],


    createNews: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateNews: ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteNews: ['payload', 'queryPayload', 'callback', 'errorCallback'],

});

export const NewsTypes = Types;
export default Creators;

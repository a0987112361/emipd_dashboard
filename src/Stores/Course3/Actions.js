import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getCourse3List: ['payload', 'callback', 'errorCallback'],
    getCourse3ListSuccess: ['payload', 'paging'],
    getCourse3Info:  ['id', 'callback', 'errorCallback'],
    getCourse3InfoSuccess: ['payload', 'paging'],
    createCourse3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateCourse3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteCourse3:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const Course3Types = Types;
export default Creators;
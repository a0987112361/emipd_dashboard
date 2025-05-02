import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getCourse2List: ['payload', 'callback', 'errorCallback'],
    getCourse2ListSuccess: ['payload', 'paging'],
    getCourse2Info:  ['id', 'callback', 'errorCallback'],
    getCourse2InfoSuccess: ['payload', 'paging'],
    createCourse2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateCourse2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteCourse2:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const Course2Types = Types;
export default Creators;
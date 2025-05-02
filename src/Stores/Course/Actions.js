import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    getCourseList: ['payload', 'callback', 'errorCallback'],
    getCourseListSuccess: ['payload', 'paging'],
    getCourseInfo:  ['id', 'callback', 'errorCallback'],
    getCourseInfoSuccess: ['payload', 'paging'],
    createCourse:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    updateCourse:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
    deleteCourse:  ['payload', 'queryPayload', 'callback', 'errorCallback'],
})

export const CourseTypes = Types;
export default Creators;
import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getStore: ['callback', 'errorCallback'],
  getStoreSuccess: ['payload'],
  updateStore: ['payload', 'callback', 'errorCallback'],

  getTeamList: ['callback', 'errorCallback'],
  getTeamListSuccess: ['payload'],
  updateTeamList: ['payload', 'callback', 'errorCallback'],

  getTeacherList: ['searchValue', 'callback', 'errorCallback'],
  getTeacherListSuccess: ['payload'],
  getTeacherInfo: ['teacherId', 'callback', 'errorCallback'],
  getTeacherInfoSuccess: ['payload'],
  createTeacher: ['payload', 'callback', 'errorCallback'],
  updateTeacher: ['payload', 'searchValue', 'callback', 'errorCallback'],
  deleteTeacher: ['payload', 'searchValue', 'callback', 'errorCallback'],
  updateTeacherOrder: ['payload', 'searchValue', 'callback', 'errorCallback'],
});

export const StoreTypes = Types;
export default Creators;

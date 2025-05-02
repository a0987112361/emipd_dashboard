import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getStore2: ['callback', 'errorCallback'],
  getStore2Success: ['payload'],
  updateStore2: ['payload', 'callback', 'errorCallback'],

  getTeam2List: ['callback', 'errorCallback'],
  getTeam2ListSuccess: ['payload'],
  updateTeam2List: ['payload', 'callback', 'errorCallback'],

  getTeacher2List: ['searchValue', 'callback', 'errorCallback'],
  getTeacher2ListSuccess: ['payload'],
  getTeacher2Info: ['teacherId', 'callback', 'errorCallback'],
  getTeacher2InfoSuccess: ['payload'],
  createTeacher2: ['payload', 'callback', 'errorCallback'],
  updateTeacher2: ['payload', 'searchValue', 'callback', 'errorCallback'],
  deleteTeacher2: ['payload', 'searchValue', 'callback', 'errorCallback'],
  updateTeacher2Order: ['payload', 'searchValue', 'callback', 'errorCallback'],
});

export const Store2Types = Types;
export default Creators;

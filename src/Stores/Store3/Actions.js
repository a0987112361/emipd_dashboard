import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getStore3: ["callback", "errorCallback"],
  getStore3Success: ["payload"],
  updateStore3: ["payload", "callback", "errorCallback"],

  getTeam3List: ["callback", "errorCallback"],
  getTeam3ListSuccess: ["payload"],
  updateTeam3List: ["payload", "callback", "errorCallback"],

  getTeacher3List: ["searchValue", "callback", "errorCallback"],
  getTeacher3ListSuccess: ["payload"],
  getTeacher3Info: ["teacherId", "callback", "errorCallback"],
  getTeacher3InfoSuccess: ["payload"],
  createTeacher3: ["payload", "callback", "errorCallback"],
  updateTeacher3: ["payload", "searchValue", "callback", "errorCallback"],
  deleteTeacher3: ["payload", "searchValue", "callback", "errorCallback"],
  updateTeacher3Order: ["payload", "searchValue", "callback", "errorCallback"],

  getTeacherEnList: ["searchValue", "callback", "errorCallback"],
  getTeacherEnListSuccess: ["payload"],
  getTeacherEnInfo: ["teacherId", "callback", "errorCallback"],
  getTeacherEnInfoSuccess: ["payload"],
  createTeacherEn: ["payload", "callback", "errorCallback"],
  updateTeacherEn: ["payload", "searchValue", "callback", "errorCallback"],
  deleteTeacherEn: ["payload", "searchValue", "callback", "errorCallback"],
  updateTeacherEnOrder: ["payload", "searchValue", "callback", "errorCallback"],

  getTeacherZhList: ["searchValue", "callback", "errorCallback"],
  getTeacherZhListSuccess: ["payload"],
  getTeacherZhInfo: ["teacherId", "callback", "errorCallback"],
  getTeacherZhInfoSuccess: ["payload"],
  createTeacherZh: ["payload", "callback", "errorCallback"],
  updateTeacherZh: ["payload", "searchValue", "callback", "errorCallback"],
  deleteTeacherZh: ["payload", "searchValue", "callback", "errorCallback"],
  updateTeacherZhOrder: ["payload", "searchValue", "callback", "errorCallback"],
});

export const Store3Types = Types;
export default Creators;

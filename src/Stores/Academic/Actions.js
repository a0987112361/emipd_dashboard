import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAcademic: ["callback", "errorCallback"],
  getAcademicSuccess: ["payload"],
  updateAcademic: ["payload", "callback", "errorCallback"],
});

export const AcademicTypes = Types;
export default Creators;

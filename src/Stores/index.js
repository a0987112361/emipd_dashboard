import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas";

import { reducer as ScreenReducer } from "./Screen/Reducers";
import { reducer as ManagerReducer } from "./Manager/Reducers";
import { reducer as UserReducer } from "./User/Reducers";
import { reducer as StoreReducer } from "./Store/Reducers";
import { reducer as Store2Reducer } from "./Store2/Reducers";
import { reducer as Store3Reducer } from "./Store3/Reducers";
import { reducer as BannerReducer } from "./Banner/Reducers";
import { reducer as PropertyReducer } from "./Property/Reducers";
import { reducer as AdvertisementReducer } from "./Advertisement/Reducers";
import { reducer as ArticleReducer } from "./Article/Reducers";
import { reducer as DeliveryReducer } from "./Delivery/Reducers";
import { reducer as StatusReducer } from "./Status/Reducers";
import { reducer as NewsReducer } from "./News/Reducers";
import { reducer as ActivityReducer } from "./Activity/Reducers";
import { reducer as Activity2Reducer } from "./Activity2/Reducers";
import { reducer as Activity3Reducer } from "./Activity3/Reducers";
import { reducer as CourseReducer } from "./Course/Reducers";
import { reducer as Course2Reducer } from "./Course2/Reducers";
import { reducer as Course3Reducer } from "./Course3/Reducers";
import { reducer as ResourceReducer } from "./Resource/Reducers";
import { reducer as TypeReducer } from "./Type/Reducers";
import { reducer as ContactReducer } from "./Contact/Reducers";
import { reducer as ItemReducer } from "./Item/Reducers";
import { reducer as OrderReducer } from "./Order/Reducers";
import { reducer as MailReducer } from "./Mail/Reducers";
import { reducer as QAReducer } from "./QA/Reducers";
import { reducer as AcademicReducer } from "./Academic/Reducers";

import { reducer as HomeReducer } from "./Home/Reducers";

export { default as ScreenActions } from "./Screen/Actions";
export { default as ManagerActions } from "./Manager/Actions";
export { default as UserActions } from "./User/Actions";
export { default as StoreActions } from "./Store/Actions";
export { default as Store2Actions } from "./Store2/Actions";
export { default as Store3Actions } from "./Store3/Actions";
export { default as BannerActions } from "./Banner/Actions";
export { default as PropertyActions } from "./Property/Actions";
export { default as AdvertisementActions } from "./Advertisement/Actions";
export { default as ArticleActions } from "./Article/Actions";
export { default as DeliveryActions } from "./Delivery/Actions";
export { default as StatusActions } from "./Status/Actions";
export { default as NewsActions } from "./News/Actions";
export { default as ActivityActions } from "./Activity/Actions";
export { default as Activity2Actions } from "./Activity2/Actions";
export { default as Activity3Actions } from "./Activity3/Actions";
export { default as CourseActions } from "./Course/Actions";
export { default as Course2Actions } from "./Course2/Actions";
export { default as Course3Actions } from "./Course3/Actions";
export { default as ResourceActions } from "./Resource/Actions";
export { default as TypeActions } from "./Type/Actions";
export { default as ContactActions } from "./Contact/Actions";
export { default as ItemActions } from "./Item/Actions";
export { default as OrderActions } from "./Order/Actions";
export { default as MailActions } from "./Mail/Actions";
export { default as QAActions } from "./QA/Actions";
export { default as AcademicActions } from "./Academic/Actions";

export { default as HomeActions } from "./Home/Actions";

export default () => {
  const rootReducer = combineReducers({
    screen: ScreenReducer,
    manager: ManagerReducer,
    user: UserReducer,
    store: StoreReducer,
    store2: Store2Reducer,
    store3: Store3Reducer,
    banner: BannerReducer,
    property: PropertyReducer,
    advertisement: AdvertisementReducer,
    delivery: DeliveryReducer,
    article: ArticleReducer,
    status: StatusReducer,
    news: NewsReducer,
    activity: ActivityReducer,
    activity2: Activity2Reducer,
    activity3: Activity3Reducer,
    course: CourseReducer,
    course2: Course2Reducer,
    course3: Course3Reducer,
    resource: ResourceReducer,
    type: TypeReducer,
    contact: ContactReducer,
    item: ItemReducer,
    order: OrderReducer,
    mail: MailReducer,
    qa: QAReducer,
    academic: AcademicReducer,
    home: HomeReducer,
  });
  return configureStore(rootReducer, rootSaga);
};

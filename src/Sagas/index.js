import { takeLatest, all, takeEvery } from "redux-saga/effects";

import * as ManagerSaga from "./ManagerSaga";
import * as UserSaga from "./UserSaga";
import * as StoreSaga from "./StoreSaga";
import * as Store2Saga from "./Store2Saga";
import * as Store3Saga from "./Store3Saga";
import * as BannerSaga from "./BannerSaga";
import * as PropertySaga from "./PropertySaga";
import * as AdvertisementSaga from "./AdvertisementSaga";
import * as ArticleSaga from "./ArticleSaga";
import * as DeliverySaga from "./DeliverySaga";
import * as StatusSaga from "./StatusSaga";
import * as NewsSaga from "./NewsSaga";
import * as ActivitySaga from "./ActivitySaga";
import * as Activity2Saga from "./Activity2Saga";
import * as Activity3Saga from "./Activity3Saga";
import * as CourseSaga from "./CourseSaga";
import * as Course2Saga from "./Course2Saga";
import * as Course3Saga from "./Course3Saga";
import * as ResourceSaga from "./ResourceSaga";
import * as TypeSaga from "./TypeSaga";
import * as ContactSaga from "./ContactSaga";
import * as ItemSaga from "./ItemSaga";
import * as OrderSaga from "./OrderSaga";
import * as MailSaga from "./MailSaga";
import * as QASaga from "./QASaga";
import * as HomeSaga from "./HomeSaga";
import * as AcademicSaga from "./AcademicSaga";

import { ManagerTypes } from "src/Stores/Manager/Actions";
import { UserTypes } from "src/Stores/User/Actions";
import { StoreTypes } from "src/Stores/Store/Actions";
import { Store2Types } from "src/Stores/Store2/Actions";
import { Store3Types } from "src/Stores/Store3/Actions";
import { BannerTypes } from "src/Stores/Banner/Actions";
import { PropertyTypes } from "src/Stores/Property/Actions";
import { AdTypes } from "src/Stores/Advertisement/Actions";
import { ArticleTypes } from "src/Stores/Article/Actions";
import { DeliveryTypes } from "src/Stores/Delivery/Actions";
import { StatusTypes } from "src/Stores/Status/Actions";
import { NewsTypes } from "src/Stores/News/Actions";
import { ActivityTypes } from "src/Stores/Activity/Actions";
import { Activity2Types } from "src/Stores/Activity2/Actions";
import { Activity3Types } from "src/Stores/Activity3/Actions";
import { CourseTypes } from "src/Stores/Course/Actions";
import { Course2Types } from "src/Stores/Course2/Actions";
import { Course3Types } from "src/Stores/Course3/Actions";
import { ResourceTypes } from "src/Stores/Resource/Actions";
import { TypeTypes } from "src/Stores/Type/Actions";
import { ContactTypes } from "src/Stores/Contact/Actions";
import { ItemTypes } from "src/Stores/Item/Actions";
import { OrderTypes } from "src/Stores/Order/Actions";
import { MailTypes } from "src/Stores/Mail/Actions";
import { QATypes } from "src/Stores/QA/Actions";
import { HomeTypes } from "src/Stores/Home/Actions";
import { AcademicTypes } from "src/Stores/Academic/Actions";

export default function* root() {
  yield all([
    takeLatest(UserTypes.LOGIN, UserSaga.login),
    takeLatest(UserTypes.GET_USER_INFO, UserSaga.getUserInfo),
    takeLatest(UserTypes.GET_ADMIN, UserSaga.getAdmin),
    takeLatest(UserTypes.UPDATE_ADMIN, UserSaga.updateAdmin),
    takeLatest(UserTypes.GET_USER_LIST, UserSaga.getUserList),
    takeLatest(UserTypes.CREATE_USER, UserSaga.createUser),
    takeLatest(UserTypes.UPDATE_USER, UserSaga.updateUser),
    takeLatest(UserTypes.DELETE_USER, UserSaga.deleteUser),
    takeLatest(UserTypes.CHANGE_PASSWORD, UserSaga.changePassword),
    takeLatest(UserTypes.GET_NOTICE_COUNT, UserSaga.getNoticeCount),

    takeLatest(ManagerTypes.GET_MANAGER_LIST, ManagerSaga.getManagerList),
    takeLatest(ManagerTypes.CREATE_MANAGER, ManagerSaga.createManager),
    takeLatest(ManagerTypes.UPDATE_MANAGER, ManagerSaga.updateManager),
    takeLatest(ManagerTypes.DELETE_MANAGER, ManagerSaga.deleteManager),
    // takeLatest(ManagerTypes.CHANGE_PASSWORD, ManagerSaga.changePassword),

    takeLatest(PropertyTypes.GET_PROPERTY_LIST, PropertySaga.getPropertyList),
    takeLatest(
      PropertyTypes.GET_PROPERTY_DETAIL,
      PropertySaga.getPropertyDetail
    ),
    takeLatest(PropertyTypes.CREATE_PROPERTY, PropertySaga.createProperty),
    takeLatest(PropertyTypes.UPDATE_PROPERTY, PropertySaga.updateProperty),
    takeLatest(PropertyTypes.DELETE_PROPERTY, PropertySaga.deleteProperty),
    takeLatest(
      PropertyTypes.CHANGE_PROPERTY_SORT,
      PropertySaga.changePropertySort
    ),

    takeLatest(AdTypes.GET_AD_DETAIL, AdvertisementSaga.getAdDetail),
    takeLatest(AdTypes.UPDATE_AD, AdvertisementSaga.updateAd),

    takeLatest(DeliveryTypes.GET_LABEL_LIST, DeliverySaga.getLabelList),
    takeLatest(DeliveryTypes.GET_DELIVERY_LIST, DeliverySaga.getDeliveryList),
    takeLatest(
      DeliveryTypes.GET_DELIVERY_DETAIL,
      DeliverySaga.getDeliveryDetail
    ),
    takeLatest(DeliveryTypes.CREATE_DELIVERY, DeliverySaga.createDelivery),
    takeLatest(DeliveryTypes.UPDATE_DELIVERY, DeliverySaga.updateDelivery),
    takeLatest(DeliveryTypes.DELETE_DELIVERY, DeliverySaga.deleteDelivery),
    takeLatest(DeliveryTypes.SORT_LOGISTIC, DeliverySaga.sortLogistic),

    takeLatest(ArticleTypes.GET_ARTICLE_LIST, ArticleSaga.getArticleList),
    takeLatest(ArticleTypes.GET_ARTICLE_DETAIL, ArticleSaga.getArticleDetail),
    takeLatest(ArticleTypes.CREATE_ARTICLE, ArticleSaga.createArticle),
    takeLatest(ArticleTypes.UPDATE_ARTICLE, ArticleSaga.updateArticle),
    takeLatest(ArticleTypes.DELETE_ARTICLE, ArticleSaga.deleteArticle),
    takeLatest(ArticleTypes.CREATE_IMG, ArticleSaga.createImg),

    takeLatest(StatusTypes.GET_STATUS_LIST, StatusSaga.getStatusList),
    takeLatest(StatusTypes.GET_STATUS_DETAIL, StatusSaga.getStatusDetail),
    takeLatest(StatusTypes.CREATE_STATUS, StatusSaga.createStatus),
    takeLatest(StatusTypes.UPDATE_STATUS, StatusSaga.updateStatus),
    takeLatest(StatusTypes.DELETE_STATUS, StatusSaga.deleteStatus),

    takeLatest(TypeTypes.GET_TYPE_LIST, TypeSaga.getTypeList),
    takeLatest(TypeTypes.GET_ITEM_TYPE_LIST, TypeSaga.getItemTypeList),
    takeLatest(TypeTypes.GET_TYPE_DETAIL, TypeSaga.getTypeDetail),
    takeLatest(TypeTypes.CREATE_TYPE, TypeSaga.createType),
    takeLatest(TypeTypes.UPDATE_TYPE, TypeSaga.updateType),
    takeLatest(TypeTypes.DELETE_TYPE, TypeSaga.deleteType),
    takeLatest(TypeTypes.GET_PREV_TYPE_LIST, TypeSaga.getPrevTypeList),
    takeLatest(TypeTypes.CHANGE_TYPE_SELECT, TypeSaga.changeTypeSelect),
    takeLatest(TypeTypes.CHANGE_STATUS, TypeSaga.changeStatus),
    takeLatest(TypeTypes.SORT_TYPE, TypeSaga.sortType),

    takeEvery(ItemTypes.GET_ITEM_LIST, ItemSaga.getItemList),
    takeLatest(ItemTypes.GET_ITEM_DETAIL, ItemSaga.getItemDetail),
    takeLatest(ItemTypes.CREATE_ITEM, ItemSaga.createItem),
    takeLatest(ItemTypes.UPDATE_ITEM, ItemSaga.updateItem),
    takeLatest(ItemTypes.DELETE_ITEM, ItemSaga.deleteItem),
    takeLatest(ItemTypes.GET_ITEM_SPEC, ItemSaga.getItemSpec),
    takeLatest(ItemTypes.GET_SELECT, ItemSaga.getSelect),
    takeLatest(ItemTypes.CHANGE_SELECT, ItemSaga.changeSelect),
    takeLatest(ItemTypes.CHANGE_OPEN, ItemSaga.changeOpen),
    takeLatest(ItemTypes.CHANGE_INQUIRY, ItemSaga.changeInquiry),
    takeLatest(ItemTypes.CHANGE_ASK, ItemSaga.changeAsk),
    takeLatest(ItemTypes.SORT_ITEM, ItemSaga.sortItem),

    takeLatest(OrderTypes.GET_ORDER_LIST, OrderSaga.getOrderList),
    takeLatest(OrderTypes.GET_ORDER_DETAIL, OrderSaga.getOrderDetail),
    takeLatest(OrderTypes.UPDATE_ORDER, OrderSaga.updateOrder),
    takeLatest(OrderTypes.UPDATE_ORDER_STATUS, OrderSaga.updateOrderStatus),
    takeLatest(OrderTypes.DELETE_ORDER, OrderSaga.deleteOrder),
    takeLatest(OrderTypes.GET_USER_ORDER_LIST, OrderSaga.getUserOrderList),
    takeLatest(OrderTypes.GET_USER_ORDER_DETAIL, OrderSaga.getUserOrderDetail),
    takeLatest(OrderTypes.GET_ORDER_CANCEL_LIST, OrderSaga.getOrderCancelList),
    takeLatest(OrderTypes.CONFIRM_ORDER_CANCEL, OrderSaga.confirmOrderCancel),

    takeLatest(MailTypes.GET_MAIL_LIST, MailSaga.getMailList),
    takeLatest(MailTypes.GET_MAIL_DETAIL, MailSaga.getMailDetail),
    takeLatest(MailTypes.UPDATE_MAIL, MailSaga.updateMail),
    takeLatest(MailTypes.DELETE_MAIL, MailSaga.deleteMail),
    takeLatest(MailTypes.CREATE_MAIL, MailSaga.createMail),

    takeLatest(QATypes.GET_QA_TYPE_LIST, QASaga.getQATypeList),
    takeLatest(QATypes.GET_QA_TYPE, QASaga.getQAType),
    takeLatest(QATypes.CREATE_QA_TYPE, QASaga.createQAType),
    takeLatest(QATypes.UPDATE_QA_TYPE, QASaga.updateQAType),
    takeLatest(QATypes.DELETE_QA_TYPE, QASaga.deleteQAType),
    takeLatest(QATypes.SORT_QA_TYPE, QASaga.sortQAType),
    takeLatest(QATypes.GET_LOWEST_TYPE, QASaga.getLowestType),

    takeLatest(QATypes.GET_QA_LIST, QASaga.getQAList),
    takeLatest(QATypes.GET_QA, QASaga.getQA),
    takeLatest(QATypes.CREATE_QA, QASaga.createQA),
    takeLatest(QATypes.UPDATE_QA, QASaga.updateQA),
    takeLatest(QATypes.DELETE_QA, QASaga.deleteQA),

    // home
    takeLatest(HomeTypes.GET_HOME_INFO, HomeSaga.getHomeInfo),
    takeLatest(HomeTypes.UPDATE_HOME_INFO, HomeSaga.updateHomeInfo),

    // about
    takeLatest(HomeTypes.GET_ABOUT_INFO, HomeSaga.getAboutInfo),
    takeLatest(HomeTypes.UPDATE_ABOUT_INFO, HomeSaga.updateAboutInfo),

    // store
    takeLatest(StoreTypes.GET_STORE, StoreSaga.getStore),
    takeLatest(StoreTypes.UPDATE_STORE, StoreSaga.updateStore),
    takeLatest(StoreTypes.GET_TEAM_LIST, StoreSaga.getTeamList),
    takeLatest(StoreTypes.UPDATE_TEAM_LIST, StoreSaga.updateTeamList),
    takeLatest(StoreTypes.GET_TEACHER_LIST, StoreSaga.getTeacherList),
    takeLatest(StoreTypes.GET_TEACHER_INFO, StoreSaga.getTeacherInfo),
    takeLatest(StoreTypes.CREATE_TEACHER, StoreSaga.createTeacher),
    takeLatest(StoreTypes.UPDATE_TEACHER, StoreSaga.updateTeacher),
    takeLatest(StoreTypes.UPDATE_TEACHER_ORDER, StoreSaga.updateTeacherOrder),
    takeLatest(StoreTypes.DELETE_TEACHER, StoreSaga.deleteTeacher),

    // store2
    takeLatest(Store2Types.GET_STORE2, Store2Saga.getStore2),
    takeLatest(Store2Types.UPDATE_STORE2, Store2Saga.updateStore2),
    takeLatest(Store2Types.GET_TEAM2_LIST, Store2Saga.getTeam2List),
    takeLatest(Store2Types.UPDATE_TEAM2_LIST, Store2Saga.updateTeam2List),
    takeLatest(Store2Types.GET_TEACHER2_LIST, Store2Saga.getTeacher2List),
    takeLatest(Store2Types.GET_TEACHER2_INFO, Store2Saga.getTeacher2Info),
    takeLatest(Store2Types.CREATE_TEACHER2, Store2Saga.createTeacher2),
    takeLatest(Store2Types.UPDATE_TEACHER2, Store2Saga.updateTeacher2),
    takeLatest(
      Store2Types.UPDATE_TEACHER2_ORDER,
      Store2Saga.updateTeacher2Order
    ),
    takeLatest(Store2Types.DELETE_TEACHER2, Store2Saga.deleteTeacher2),

    // store3
    takeLatest(Store3Types.GET_STORE3, Store3Saga.getStore3),
    takeLatest(Store3Types.UPDATE_STORE3, Store3Saga.updateStore3),
    takeLatest(Store3Types.GET_TEAM3_LIST, Store3Saga.getTeam3List),
    takeLatest(Store3Types.UPDATE_TEAM3_LIST, Store3Saga.updateTeam3List),

    takeLatest(Store3Types.GET_TEACHER3_LIST, Store3Saga.getTeacher3List),
    takeLatest(Store3Types.GET_TEACHER3_INFO, Store3Saga.getTeacher3Info),
    takeLatest(Store3Types.CREATE_TEACHER3, Store3Saga.createTeacher3),
    takeLatest(Store3Types.UPDATE_TEACHER3, Store3Saga.updateTeacher3),
    takeLatest(
      Store3Types.UPDATE_TEACHER3_ORDER,
      Store3Saga.updateTeacher3Order
    ),
    takeLatest(Store3Types.DELETE_TEACHER3, Store3Saga.deleteTeacher3),

    takeLatest(Store3Types.GET_TEACHER_EN_LIST, Store3Saga.getTeacherEnList),
    takeLatest(Store3Types.GET_TEACHER_EN_INFO, Store3Saga.getTeacherEnInfo),
    takeLatest(Store3Types.CREATE_TEACHER_EN, Store3Saga.createTeacherEn),
    takeLatest(Store3Types.UPDATE_TEACHER_EN, Store3Saga.updateTeacherEn),
    takeLatest(
      Store3Types.UPDATE_TEACHER_EN_ORDER,
      Store3Saga.updateTeacherEnOrder
    ),
    takeLatest(Store3Types.DELETE_TEACHER_EN, Store3Saga.deleteTeacherEn),

    takeLatest(Store3Types.GET_TEACHER_ZH_LIST, Store3Saga.getTeacherZhList),
    takeLatest(Store3Types.GET_TEACHER_ZH_INFO, Store3Saga.getTeacherZhInfo),
    takeLatest(Store3Types.CREATE_TEACHER_ZH, Store3Saga.createTeacherZh),
    takeLatest(Store3Types.UPDATE_TEACHER_ZH, Store3Saga.updateTeacherZh),
    takeLatest(
      Store3Types.UPDATE_TEACHER_ZH_ORDER,
      Store3Saga.updateTeacherZhOrder
    ),
    takeLatest(Store3Types.DELETE_TEACHER_ZH, Store3Saga.deleteTeacherZh),

    // news
    takeLatest(NewsTypes.GET_NEWS_LIST, NewsSaga.getNewsList),
    takeLatest(NewsTypes.GET_NEWS_INFO, NewsSaga.getNewsInfo),
    takeLatest(NewsTypes.CREATE_NEWS, NewsSaga.createNews),
    takeLatest(NewsTypes.UPDATE_NEWS, NewsSaga.updateNews),
    takeLatest(NewsTypes.DELETE_NEWS, NewsSaga.deleteNews),

    // activity
    takeLatest(ActivityTypes.GET_ACTIVITY_LIST, ActivitySaga.getActivityList),
    takeLatest(
      ActivityTypes.GET_ACTIVITY_PIC_LIST,
      ActivitySaga.getActivityPicList
    ),
    takeLatest(ActivityTypes.GET_ACTIVITY_INFO, ActivitySaga.getActivityInfo),
    takeLatest(ActivityTypes.CREATE_ACTIVITY, ActivitySaga.createActivity),
    takeLatest(ActivityTypes.UPDATE_ACTIVITY, ActivitySaga.updateActivity),
    takeLatest(ActivityTypes.DELETE_ACTIVITY, ActivitySaga.deleteActivity),

    // activity2
    takeLatest(
      Activity2Types.GET_ACTIVITY2_LIST,
      Activity2Saga.getActivity2List
    ),
    takeLatest(
      Activity2Types.GET_ACTIVITY2_PIC_LIST,
      Activity2Saga.getActivity2PicList
    ),
    takeLatest(
      Activity2Types.GET_ACTIVITY2_INFO,
      Activity2Saga.getActivity2Info
    ),
    takeLatest(Activity2Types.CREATE_ACTIVITY2, Activity2Saga.createActivity2),
    takeLatest(Activity2Types.UPDATE_ACTIVITY2, Activity2Saga.updateActivity2),
    takeLatest(Activity2Types.DELETE_ACTIVITY2, Activity2Saga.deleteActivity2),

    // activity3
    takeLatest(
      Activity3Types.GET_ACTIVITY3_LIST,
      Activity3Saga.getActivity3List
    ),
    takeLatest(
      Activity3Types.GET_ACTIVITY3_PIC_LIST,
      Activity3Saga.getActivity3PicList
    ),
    takeLatest(
      Activity3Types.GET_ACTIVITY3_INFO,
      Activity3Saga.getActivity3Info
    ),
    takeLatest(Activity3Types.CREATE_ACTIVITY3, Activity3Saga.createActivity3),
    takeLatest(Activity3Types.UPDATE_ACTIVITY3, Activity3Saga.updateActivity3),
    takeLatest(Activity3Types.DELETE_ACTIVITY3, Activity3Saga.deleteActivity3),
    takeLatest(Activity3Types.UPDATE_PIN3, Activity3Saga.updatePin3),

    // course
    takeLatest(CourseTypes.GET_COURSE_LIST, CourseSaga.getCourseList),
    takeLatest(CourseTypes.GET_COURSE_INFO, CourseSaga.getCourseInfo),
    takeLatest(CourseTypes.CREATE_COURSE, CourseSaga.createCourse),
    takeLatest(CourseTypes.UPDATE_COURSE, CourseSaga.updateCourse),
    takeLatest(CourseTypes.DELETE_COURSE, CourseSaga.deleteCourse),

    // course2
    takeLatest(Course2Types.GET_COURSE2_LIST, Course2Saga.getCourse2List),
    takeLatest(Course2Types.GET_COURSE2_INFO, Course2Saga.getCourse2Info),
    takeLatest(Course2Types.CREATE_COURSE2, Course2Saga.createCourse2),
    takeLatest(Course2Types.UPDATE_COURSE2, Course2Saga.updateCourse2),
    takeLatest(Course2Types.DELETE_COURSE2, Course2Saga.deleteCourse2),

    // course3
    takeLatest(Course3Types.GET_COURSE3_LIST, Course3Saga.getCourse3List),
    takeLatest(Course3Types.GET_COURSE3_INFO, Course3Saga.getCourse3Info),
    takeLatest(Course3Types.CREATE_COURSE3, Course3Saga.createCourse3),
    takeLatest(Course3Types.UPDATE_COURSE3, Course3Saga.updateCourse3),
    takeLatest(Course3Types.DELETE_COURSE3, Course3Saga.deleteCourse3),

    // resource
    takeLatest(ResourceTypes.GET_RESOURCE_LIST, ResourceSaga.getResourceList),
    takeLatest(ResourceTypes.GET_RESOURCE_INFO, ResourceSaga.getResourceInfo),
    takeLatest(ResourceTypes.CREATE_RESOURCE, ResourceSaga.createResource),
    takeLatest(ResourceTypes.UPDATE_RESOURCE, ResourceSaga.updateResource),
    takeLatest(ResourceTypes.DELETE_RESOURCE, ResourceSaga.deleteResource),

    // banner
    takeLatest(BannerTypes.GET_BANNER_LIST, BannerSaga.getBannerList),
    takeLatest(BannerTypes.GET_BANNER_INFO, BannerSaga.getBannerInfo),
    takeLatest(BannerTypes.CREATE_BANNER, BannerSaga.createBanner),
    takeLatest(BannerTypes.UPDATE_BANNER, BannerSaga.updateBanner),
    takeLatest(BannerTypes.DELETE_BANNER, BannerSaga.deleteBanner),
    takeLatest(BannerTypes.CHANGE_BANNER_STATUS, BannerSaga.changeBannerStatus),
    takeLatest(BannerTypes.SORT_BANNER, BannerSaga.sortBanner),

    // contact
    takeLatest(ContactTypes.GET_CONTACT_LIST, ContactSaga.getContactList),
    takeLatest(ContactTypes.GET_CONTACT_INFO, ContactSaga.getContactInfo),
    takeLatest(ContactTypes.UPDATE_CONTACT, ContactSaga.updateContact),
    takeLatest(ContactTypes.DELETE_CONTACT, ContactSaga.deleteContact),

    // Academic
    takeLatest(AcademicTypes.GET_ACADEMIC, AcademicSaga.getAcademic),
    takeLatest(AcademicTypes.UPDATE_ACADEMIC, AcademicSaga.updateAcademic),
  ]);
}

import React, { Fragment } from "react";
import { Switch, Redirect, Route, HashRouter } from "react-router-dom";

import HomeLayout from "src/Layout/HomeLayout";
import BannerScreen from "src/Containers/Banner/BannerScreen";
import HomeScreen from "src/Containers/Home/HomeScreen";
import NewsScreen from "src/Containers/News/NewsScreen";
import NewsDetailScreen from "src/Containers/News/NewsDetailScreen";
import ManagerScreen from "src/Containers/Manager/ManagerScreen";
import CourseDetailScreen from "../Containers/Course/CourseDetailScreen";
import CourseScreen from "src/Containers/Course/CourseScreen";
import Course2Screen from "src/Containers/Course/Course2Screen";
import Course3Screen from "src/Containers/Course/Course3Screen";
import ActivityScreen from "src/Containers/Activity/ActivityScreen";
import Activity2Screen from "src/Containers/Activity/Activity2Screen";
import Activity3Screen from "src/Containers/Activity/Activity3Screen";
import ResourceDetailScreen from "src/Containers/Resource/ResourceDetailScreen";
import ResourceScreen from "src/Containers/Resource/ResourceScreen";
import StoreScreen from "src/Containers/Store/StoreScreen";
import Store2Screen from "src/Containers/Store/Store2Screen";
import Store3Screen from "src/Containers/Store/Store3Screen";
import AboutScreen from "src/Containers/About/AboutScreen";
import ContactScreen from "src/Containers/Contact/ContactScreen";
import AcademicScreen from "src/Containers/Academic/AcademicScreen";

import MailScreen from "src/Containers/Mail/MailScreen";
import UserScreen from "src/Containers/User/UserScreen";
import UserCreate from "../Containers/User/UserCreate";
import UserUpdate from "../Containers/User/UserUpdate";

class RouterPage extends React.Component {
  render() {
    return (
      <HomeLayout>
        <HashRouter>
          <Switch>
            <Route exact path="/banner" component={BannerScreen} />
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/news/create" component={NewsDetailScreen} />
            <Route path="/news/update/:id" component={NewsDetailScreen} />
            <Route exact path="/news" component={NewsScreen} />
            <Route exact path="/manager" component={ManagerScreen} />
            <Route exact path="/course/create" component={CourseDetailScreen} />
            <Route path="/course/update/:id" component={CourseDetailScreen} />
            <Route exact path="/course" component={CourseScreen} />
            <Route exact path="/course2" component={Course2Screen} />
            <Route exact path="/course3" component={Course3Screen} />
            <Route exact path="/activity" component={ActivityScreen} />
            <Route exact path="/activity2" component={Activity2Screen} />
            <Route exact path="/activity3" component={Activity3Screen} />
            <Route
              exact
              path="/resource/detail"
              component={ResourceDetailScreen}
            />
            <Route exact path="/resource" component={ResourceScreen} />
            <Route exact path="/store" component={StoreScreen} />
            <Route exact path="/store2" component={Store2Screen} />
            <Route exact path="/store3" component={Store3Screen} />
            <Route exact path="/about" component={AboutScreen} />
            <Route exact path="/contact" component={ContactScreen} />
            <Route exact path="/academic" component={AcademicScreen} />
            <Route exact path="/user" component={UserScreen} />
            <Route exact path="/user/create" component={UserCreate} />
            <Route path="/user/update/:id" component={UserUpdate} />
            <Route exact path="/mail" component={MailScreen} />
            <Redirect from="/" to="/banner" />
          </Switch>
        </HashRouter>
      </HomeLayout>
    );
  }
}

class LoginRoutes extends React.Component {
  render() {
    return (
      <Fragment>
        <RouterPage />
      </Fragment>
    );
  }
}

export default LoginRoutes;

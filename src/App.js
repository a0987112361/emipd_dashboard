import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoutePage from './routes/RoutePage';
import UnRoutePage from './routes/UnRoutePage';
import { UserActions } from 'src/Stores';
import 'reset-css';
import 'react-chat-elements/dist/main.css';
import 'react-dates/initialize';
import './App.css';
import 'react-dates/lib/css/_datepicker.css';
import 'antd/dist/antd.css';

class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    isShow: false,
  }

  componentDidMount() {
    const { getUserInfo } = this.props;
    const callback = () => {
      this.setState({
        isShow: true,
      });
    }
    window.addEventListener('resize', this.handleSize);
    // getUserInfo(callback);
  }


  componentWillUnmount() {
    // 移除监听事件
    window.removeEventListener('resize', this.handleSize);
  }

  // 自适应浏览器的高度
  handleSize = () => {
    const { setMobile } = this.props;
    let width = document.body.clientWidth;
    // 1920: 14
    // 1600: 13
    // 1440: 12
    // 1366: 11
    // 1024: 10
    // 900: 9
    // 768 ipad: 8
    // 413 6 7 8 plus: 4
    // 374 6 7 8 : 3
    // 319 SE: 2
    // 300: 1
    if (width > 1920) {
      setMobile(14);
    } else if (width > 1600) {
      setMobile(13);
    } else if (width > 1440) {
      setMobile(12);
    } else if (width > 1366) {
      setMobile(11);
    } else if (width > 1024) {
      setMobile(10);
    } else if (width > 900) {
      setMobile(9);
    } else if (width > 768) {
      setMobile(8);
    } else if (width > 413) {
      setMobile(4);
    } else if (width > 374) {
      setMobile(3);
    } else if (width > 319) {
      setMobile(2);
    } else if (width > 300) {
      setMobile(1);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        {/* <RoutePage /> */}
        {!_.isEmpty(user.Token) ? <RoutePage /> : <UnRoutePage />}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    isMobile: state.user.isMobile,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getUserInfo: UserActions.getUserInfo,
        setMobile: UserActions.setMobile,
      },
      dispatch,
    ),
)(App);

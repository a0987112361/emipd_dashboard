import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import _ from 'lodash';
import styled from 'styled-components'

import { Menu, Modal, Form, Row, Col, Input, Divider, Button } from 'antd';
import hashHistory from 'src/utils/HashHistory';
import { removeUserInformation } from 'src/utils/localStorage';
import { Colors, Images } from 'src/Theme';
import { translate as t } from 'src/Helpers/I18n';
import './AutoSideBar.css';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const styles = {
  drawerPaper: {
    backgroundColor: Colors.primary,
    // boxShadow: `5px 0px ${Colors.third}`,
    zIndex: 1,
  },
  imgStyle: {
    width: '34px',
    height: '47px',
    marginRight: '12px',
  },
  headerStyle: {
    fontSize: '35px',
    color: Colors.second,
    width: '100%',
    height: '80px',
    lineHeight: '80px',
    margin: '0px auto 0px 40px'
  },
  menuStyle: {
    backgroundColor: Colors.primary,
    borderRight: '0px',
  },
  modalBtnStyle: {
    width: '100px',
    height: '40px',
    borderRadius: '5px',
  },
  headerStyle: {
    fontSize: '30px',
    color: 'white',
    fontWeight: 'bold',
  }
};

class AutoSideBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    handleOpenMenu: PropTypes.func,
    showClose: PropTypes.bool,
  };

  state = {
    isOpen: true,
    key: '',
    resetPasswordModalVisible: false,
    handleOpenMenu: () => { },
    showClose: true,
  };

  componentDidMount() {
    const { user } = this.props;
    if (window.location.hash.indexOf('client') > -1) {
      this.setState({
        key: 'client',
      });
    } else if (window.location.hash.indexOf('user') > -1) {
      this.setState({
        key: 'user',
      });
    } else if (window.location.hash.indexOf('project') > -1) {
      this.setState({
        key: 'project',
      });
    } else if (window.location.hash.indexOf('issue') > -1) {
      this.setState({
        key: 'issue',
      });
    } else if (window.location.hash.indexOf('notification') > -1) {
      this.setState({
        key: 'notification',
      });
    } else if (window.location.hash.indexOf('param_setting') > -1) {
      this.setState({
        key: 'param_setting',
      });
    } else if (window.location.hash.indexOf('dashboard') > -1) {
      this.setState({
        key: 'dashboard',
      });
    } else if (window.location.hash.indexOf('assets') > -1) {
      this.setState({
        key: 'assets',
      });
    } else if (window.location.hash.indexOf('company') > -1) {
      this.setState({
        key: 'company',
      });
    } else if (window.location.hash.indexOf('import') > -1) {
      this.setState({
        key: 'import',
      });
    } else {
      this.setState({
        key: 'client',
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.user !== this.props.user) {
    //   if (!nextProps.user.is_login) {
    //     this.setState({
    //       resetPasswordModalVisible: true,
    //     });
    //   }
    // }

  }

  changeRoute = (route) => {
    const { handleOpenMenu } = this.props;
    handleOpenMenu();
    if (route === 'logout') {
      this.handleLogout();
    } else {
      this.setState({
        key: route,
      });
      hashHistory.push(`/${route}`);
    }
  }

  handleLogout = () => {
    const { setToken } = this.props;
    Swal.fire({
      title: '是否要登出',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.value) {
        hashHistory.push('/login');
        setToken('');
        removeUserInformation();
      }
    })
  }

  handleResetPassword = (value) => {
    const { resetPassword, user } = this.props;
    const callback = () => {
      this.setState({
        resetPasswordModalVisible: false,
      });
    }
    resetPassword({ new_password: value.password, user_id: user.user_id }, callback);
  }

  renderMenuList = (menu, isChild = false) => {
    const { isOpen } = this.props;
    return _.map(menu, (item) => {
      if (_.has(item, "children")) {
        return (
          <Menu.SubMenu
            id="sub_item"
            key={item.key}
            icon={<img src={item.img} className="menu_item_img"></img>}
            title={item.title}
            style={styles.menuStyle}
          >
            {this.renderMenuList(item.children, true)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            onClick={() => this.changeRoute(item.key)}
            className="fix_menu"
            key={item.key}
            icon={<img src={item.img} className="menu_item_img"></img>}
          >
            {isOpen || isChild ? item.title : ''}
          </Menu.Item>
        );
      }
    });
  }


  render() {
    const { key } = this.state;
    const {
      user,
      isOpen,
      handleChangeMenu,
      handleOpenMenu,
      showClose,
    } = this.props;


    const menuList = [
      {
        key: 'dashboard',
        img: Images.dashboard,
        title: t('sidebar_dashboard'),
      },
      {
        key: 'client',
        img: Images.client,
        title: t('sidebar_client'),
      },
      {
        key: 'user',
        img: Images.group,
        title: t('sidebar_user'),
      },
      {
        key: 'project',
        img: Images.project,
        title: t('sidebar_project'),
      },
      {
        key: 'issue',
        img: Images.issue,
        title: t('sidebar_task'),
      },
      {
        key: 'notification',
        img: Images.bell,
        title: t('sidebar_notification'),
      },
      {
        key: 'search',
        img: Images.search,
        title: t('sidebar_search'),
      },
      // {
      //   key: 'assets',
      //   img: Images.asset,
      //   title: t('sidebar_assets'),
      // },
      {
        key: 'param_setting',
        img: Images.setting,
        title: t('sidebar_param_setting'),
      },
      {
        key: 'import',
        img: Images.import,
        title: t('sidebar_import'),
      }, {
        key: 'logout',
        img: Images.logout,
        title: t('sidebar_logout'),
      },
    ];

    if (user.role_id === 'M001' || user.role_id === 'M002' || user.role_id === 'M003') {
      menuList.unshift({
        key: 'company',
        img: Images.company,
        title: t('sidebar_company'),
      })
    }

    if (key === '') {
      return null;
    }

    return (
      <div
        style={{ ...styles.drawerPaper, width: isOpen ? '240px' : '62px' }}
        className="drawerBox"
      >
        <Menu
          defaultSelectedKeys={[key]}
          mode={isOpen ? 'inline' : 'vertical'}
          style={{ ...styles.menuStyle, width: isOpen ? '240px' : '62px' }}
        >
          {this.renderMenuList(menuList)}
        </Menu>

        {showClose && <img
          onClick={handleChangeMenu}
          src={isOpen ? Images.menu_close : Images.menu_open}
          className="menu_item_img"
          style={{ marginLeft: '16px', position: 'absolute', bottom: '8px' }} />}
        {/* {resetPasswordModalVisible && this.renderResetPassword()} */}
      </div >
    );
  }
}

export default AutoSideBar;

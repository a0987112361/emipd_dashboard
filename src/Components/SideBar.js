import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Button } from 'antd';
import {
  IdcardOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const drawerWidth = 240;
const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'inherit !important',
    marginTop: '100px',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  iconStyle: {
    width: '30px',
    height: '30px',
    marginLeft: '16px',
  },
  textStyle: {
    marginLeft: '16px',
  }
});

class SideBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    handleCloseDrawer: PropTypes.func.isRequired,
  };

  state = {
    isOpen: true,
  };

  render() {
    const { isOpen, handleCloseDrawer, history } = this.props;
    return (
      <div
        className={styles.drawerPaper}
      >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<IdcardOutlined />}>
            借閱證管理
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            讀者資料管理
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            權限管理
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default SideBar;

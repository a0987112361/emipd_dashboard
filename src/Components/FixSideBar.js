import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import _ from 'lodash';

import { Menu, Modal, Form, Row, Col, Input, Divider, Button } from 'antd';
import hashHistory from 'src/utils/HashHistory';
import { removeUserInformation } from 'src/utils/localStorage';
import { Colors, Images } from 'src/Theme';
// import './FixSideBar.css';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const styles = {
  drawerPaper: {
    width: '240px',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    backgroundColor: Colors.primary,
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
    width: '152px',
    borderRight: '0px',
    margin: '0px auto 0px 30px',
  },
  modalBtnStyle: {
    width: '100px',
    height: '40px',
    borderRadius: '5px',
  },
};

class FixSideBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    handleCloseDrawer: PropTypes.func.isRequired,
  };

  state = {
    isOpen: true,
    key: 'student',
    resetPasswordModalVisible: false,
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user.is_login) {
      this.setState({
        resetPasswordModalVisible: true,
      });
    }
    if (window.location.hash.indexOf('permission') > -1) {
      this.setState({
        key: 'permission',
      });
    } else if (window.location.hash.indexOf('school') > -1) {
      this.setState({
        key: 'school',
      });
    } else if (window.location.hash.indexOf('member') > -1) {
      this.setState({
        key: 'member',
      });
    } else if (window.location.hash.indexOf('class') > -1) {
      this.setState({
        key: 'class',
      });
    } else if (window.location.hash.indexOf('activity') > -1) {
      this.setState({
        key: 'activity',
      });
    } else if (window.location.hash.indexOf('student') > -1) {
      this.setState({
        key: 'student',
      });
    } else {
      this.setState({
        key: 'student'
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      if (!nextProps.user.is_login) {
        this.setState({
          resetPasswordModalVisible: true,
        });
      }
    }

  }

  changeRoute = (route) => {
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


  renderResetPassword = () => {
    const {
      resetPasswordModalVisible,
    } = this.state;

    return <Modal
      title={<p
        style={{
          fontSize: '30px',
          color: Colors.textColor,
          marginBottom: '0px',
        }}>
        首次登入密碼修改
      </p>}
      visible={resetPasswordModalVisible}
      closable={false}
      footer={null}
    >
      <Form
        {...layout}
        name="basic"
        onFinish={this.handleResetPassword}
      >
        <Row gutter={24} style={{ width: '100%' }}>
          <Col xs={24} md={24}>
            <Form.Item
              name="password"
              label="密碼"
              hasFeedback
            >
              <Input.Password style={{ borderRadius: '5px', height: '40px', border: '1px solid #B6D234' }} placeholder="請輸入密碼" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              name="confirmPassword"
              label="確認密碼"
              dependencies={['password']}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('兩者密碼不一致');
                  },
                }),
              ]}
            >
              <Input.Password style={{ borderRadius: '5px', height: '40px', border: '1px solid #B6D234' }} placeholder="請輸入確認密碼" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button
            style={{
              ...styles.modalBtnStyle,
              marginRight: '16px',
              backgroundColor: Colors.btnColor,
              color: 'white',
            }} htmlType="submit">
            確定
          </Button>
        </div>
      </Form>
    </Modal>
  }


  render() {
    const { key, resetPasswordModalVisible } = this.state;
    const { user } = this.props;
    if (key === '' || _.isEmpty(user.sidePermission) || user.sidePermission.length === 0) {
      return null;
    }


    const menuList = [
      {
        key: 'school',
        img: Images.school,
        title: '學校管理',
      },
      {
        key: 'member',
        img: Images.member,
        title: '教師管理',
      },
      {
        key: 'class',
        img: Images.class,
        title: '班級管理',
      },
      {
        key: 'activity',
        img: Images.activity,
        title: '活動管理',
      },
      {
        key: 'student',
        img: Images.student,
        title: '學童管理',
      },
    ]
    let tempMenuList = [];
    menuList.map((item) => {
      user.sidePermission.map((userItem) => {
        if (item.key === userItem.key) {
          tempMenuList.push(item);
        }
      })
    });
    tempMenuList.push({
      key: 'logout',
      img: Images.logout,
      title: '登出',
    });

    return (
      <div
        style={styles.drawerPaper}
      >
        <div style={styles.headerStyle}>
          <img src={Images.award} style={styles.imgStyle} />
          榮譽榜
        </div>
        <img
          src={Images.login_line}
          style={{
            height: '34px',
            overflow: 'hidden',
            marginTop: '-12px',
            width: '240px',
          }}
        />
        {/* <div style={{ width: '100%', textAlign: 'center', border: '0px' }}> */}
        <Menu
          defaultSelectedKeys={[key]}
          style={styles.menuStyle}
        >
          {
            tempMenuList.map((item) => {
              return (
                <Menu.Item onClick={() => this.changeRoute(item.key)} className="fix_menu" key={item.key} icon={<img src={item.img} className="menu_item_img"></img>}>
                  {item.title}
                </Menu.Item>
              )
            })
          }

        </Menu>
        {/* </div> */}
        {resetPasswordModalVisible && this.renderResetPassword()}
      </div >
    );
  }
}

export default FixSideBar;

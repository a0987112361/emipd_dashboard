import React from "react";
import PropTypes from "prop-types";
import {
  Layout,
  Menu,
  Badge,
  Dropdown,
  Modal,
  Form,
  Input,
  Button,
  Upload,
} from "antd";
import { MenuOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { FormInput, FixSideBar } from "src/Components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import "./HomeLayout.css";
import { UserActions, ScreenActions } from "src/Stores";
import { Images, Colors } from "src/Theme";
import hashHistory from "src/utils/HashHistory";
import { removeUserInformation } from "src/utils/localStorage";
import _, { isEmpty } from "lodash";

const { Header, Sider, Content } = Layout;

const styles = {
  infoStyle: {
    width: "250px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    paddingRight: "8px",
  },
  iconStyle: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  btnStyle: {
    backgroundColor: "#004C7C",
    width: "103px",
    height: "40px",
    color: "white",
    borderRadius: "4px",
  },
  inputStyle: {
    border: "1px solid #7D9EB5",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    paddingLeft: "8px",
    color: "#455A68",
    marginBottom: "10px",
  },
  noticeStyle: {
    backgroundColor: "red",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    lineHeight: "30px",
    textAlign: "center",
    marginLeft: "8px",
  },
};

let menuList = [
  {
    key: "banner",
    img: Images.carousel,
    title: "輪播圖管理",
  },
  {
    key: "home",
    img: Images.store,
    title: "首頁",
  },
  {
    key: "news",
    img: Images.notice,
    title: "最新消息",
  },
  {
    key: "course",
    img: Images.article,
    title: "課程資訊(EMIPD)",
  },
  {
    key: "course2",
    img: Images.article,
    title: "課程資訊(ESPPD)",
  },
  {
    key: "course3",
    img: Images.article,
    title: "課程資訊(漢學EMIPD)",
  },
  {
    key: "activity",
    img: Images.activity,
    title: "活動花絮(EMIPD)",
  },
  {
    key: "activity2",
    img: Images.activity,
    title: "活動花絮(ESPPD)",
  },
  {
    key: "activity3",
    img: Images.activity,
    title: "活動花絮(漢學EMIPD)",
  },
  {
    key: "resource",
    img: Images.admin,
    title: "資源分享",
  },
  {
    key: "store",
    img: Images.store,
    title: "關於中心(EMIPD)",
  },
  {
    key: "store2",
    img: Images.store,
    title: "關於中心(ESPPD)",
  },
  {
    key: "store3",
    img: Images.store,
    title: "關於中心(漢學EMIPD)",
  },
  {
    key: "academic",
    img: Images.article,
    title: "學術發表",
  },
  {
    key: "about",
    img: Images.store,
    title: "聯絡我們",
  },
  {
    key: "contact",
    img: Images.form,
    title: "聯絡表單回應",
  },
  {
    key: "manager",
    img: Images.admin,
    title: "管理員",
  },
  // {
  //   key: 'user',
  //   img: Images.user,
  //   title: '會員管理'
  // },
  // {
  //   key: 'article',
  //   img: Images.article,
  //   title: '文章管理'
  // },
  // {
  //   key: 'activity',
  //   img: Images.activity,
  //   title: '活動管理'
  // },
  // {
  //   key: 'type',
  //   img: Images.type,
  //   title: '產品分類管理'
  // },
  // {
  //   key: 'prop',
  //   img: Images.prop,
  //   title: '產品屬性管理'
  // },
  // {
  //   key: 'item',
  //   img: Images.product,
  //   title: '產品管理'
  // },
  // {
  //   key: 'order',
  //   img: Images.order,
  //   title: '訂單管理'
  // },
  // {
  //   key: 'orderCancel',
  //   img: Images.cancel_order,
  //   title: '訂單取消管理'
  // },
  // {
  //   key: 'delivery',
  //   img: Images.delivery,
  //   title: '運費管理'
  // },

  // {
  //   key: 'advertisement',
  //   img: Images.ad,
  //   title: '廣告管理'
  // },
  // {
  //   key: 'qaType',
  //   img: Images.qaC,
  //   title: '問與答分類'
  // },
  // {
  //   key: 'qa',
  //   img: Images.qa,
  //   title: '問與答管理'
  // },
  // {
  //   key: 'mail',
  //   img: Images.mail,
  //   title: '系統信件管理'
  // },
];

const normFile = (e) => {
  let list = e.fileList;
  if (list.length >= 2) {
    list.slice(1);
    e.fileList = list;
  }
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};
class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      currentKey: "",
      viewModalVisible: false,
      viewPwdModalVisible: false,
      ImageData: [],
      isLoading: false,
      headerData: {},
      key: "",
      isOpen: true,
      userId: "",
      adminData: {},
    };
  }
  static propTypes = {
    children: PropTypes.object,
  };

  componentDidMount = () => {
    const { getUserInfo, user, getAdmin, admin, getNoticeCount } = this.props;
    const { userId } = this.state;

    this.showRoute();
    window.addEventListener("hashchange", this.showRoute, false);

    window.addEventListener("resize", this.handleUpdateSize);
    this.handleUpdateSize();

    this.setState({
      isLoading: true,
    });

    const callback = (value) => {
      this.setState({
        isLoading: false,
        userId: value.user_id,
        adminData: value,
      });
    };

    getAdmin(user.user_id, callback, this.errorCallback);
  };

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.showRoute, false);
  }

  handleUpdateSize = (value) => {
    const { handleChangeScreenSize } = this.props;
    handleChangeScreenSize(
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
    );
  };

  showRoute = () => {
    if (window.location.hash.indexOf("banner") > -1) {
      this.setState({
        key: "banner",
      });
    } else if (window.location.hash.indexOf("home") > -1) {
      this.setState({
        key: "home",
      });
    } else if (window.location.hash.indexOf("about") > -1) {
      this.setState({
        key: "about",
      });
    } else if (window.location.hash.indexOf("news") > -1) {
      this.setState({
        key: "news",
      });
    } else if (window.location.hash.indexOf("manager") > -1) {
      this.setState({
        key: "manager",
      });
    } else if (window.location.hash.indexOf("user") > -1) {
      this.setState({
        key: "user",
      });
    } else if (window.location.hash.indexOf("course3") > -1) {
      this.setState({
        key: "course3",
      });
    } else if (window.location.hash.indexOf("course2") > -1) {
      this.setState({
        key: "course2",
      });
    } else if (window.location.hash.indexOf("course") > -1) {
      this.setState({
        key: "course",
      });
    } else if (window.location.hash.indexOf("activity3") > -1) {
      this.setState({
        key: "activity3",
      });
    } else if (window.location.hash.indexOf("activity2") > -1) {
      this.setState({
        key: "activity2",
      });
    } else if (window.location.hash.indexOf("activity") > -1) {
      this.setState({
        key: "activity",
      });
    } else if (window.location.hash.indexOf("store3") > -1) {
      this.setState({
        key: "store3",
      });
    } else if (window.location.hash.indexOf("store2") > -1) {
      this.setState({
        key: "store2",
      });
    } else if (window.location.hash.indexOf("store") > -1) {
      this.setState({
        key: "store",
      });
    } else if (window.location.hash.indexOf("contact") > -1) {
      this.setState({
        key: "contact",
      });
    } else {
      this.setState({
        key: "banner",
      });
    }
  };

  changeRoute = (route) => {
    this.setState({
      key: route,
    });
    hashHistory.push(`/${route}`);
  };

  handleUpdate = (value) => {
    const { updateAdmin, admin } = this.props;
    const { ImageData } = this.state;

    const callback = (value) => {
      this.setState({
        isLoading: false,
        viewModalVisible: false,
        adminData: value,
      });
    };

    let payload = {
      ...admin,
      ...value,
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        updateAdmin(payload, callback, this.errorCallback);
      }
    );
  };

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleUpdatePwd = (value) => {
    const { changePassword, user } = this.props;

    const callback = () => {
      this.setState({
        isLoading: false,
        viewPwdModalVisible: false,
      });
    };
    let newData = {
      user_id: user.user_id,
      old_password: value.old_password,
      new_password: value.new_password,
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        changePassword(newData, callback, this.errorCallback, user.Token);
      }
    );
  };

  handleClick = () => {
    const { setToken } = this.props;

    Swal.fire({
      title: "是否要登出",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確定",
    }).then((result) => {
      if (result.value) {
        removeUserInformation();
        setToken("");
        window.location.reload();
      }
    });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuClick = (item) => {
    this.setState({ currentKey: item.key });
    hashHistory.push(item.key);
  };

  renderUserModal = () => {
    const { admin } = this.props;
    const { viewModalVisible, ImageData, adminData } = this.state;

    return (
      <Modal
        title="編輯個人資料"
        visible={viewModalVisible}
        width={520}
        height={520}
        onCancel={() => this.closeModal()}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ ...adminData }}
          onFinish={this.handleUpdate}
          style={{ color: "#7D9EB5" }}
        >
          <p>帳號：{admin.account}</p>
          <FormInput
            required
            title="姓名"
            propName="name"
            requiredErrorMessage="請輸入姓名"
            placeholder="請輸入姓名"
            labelCol={24}
            wrapperCol={24}
            inputStyle={styles.inputStyle}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Button style={styles.btnStyle} htmlType="submit">
              確定
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  renderPwdModal = () => {
    const { viewPwdModalVisible } = this.state;

    return (
      <Modal
        title="變更密碼"
        visible={viewPwdModalVisible}
        width={520}
        height={520}
        onCancel={() => this.closeModal()}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{}}
          onFinish={this.handleUpdatePwd}
          style={{ color: "#7D9EB5" }}
        >
          <Form.Item
            name="old_password"
            colon={false}
            label="舊密碼"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "請輸入舊密碼" }]}
          >
            <Input.Password
              placeholder="請輸入舊密碼"
              style={styles.inputStyle}
            />
          </Form.Item>
          <Form.Item
            name="new_password"
            colon={false}
            label="新密碼"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "請輸入新密碼" }]}
          >
            <Input.Password
              placeholder="請輸入新密碼"
              style={styles.inputStyle}
            />
          </Form.Item>
          <Form.Item
            name="passwordCheck"
            colon={false}
            label="確認新密碼"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "請輸入新密碼" }]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("new_password") != value && value == null) {
                    return Promise.reject(new Error("此欄位不可為空！"));
                  } else if (
                    !value ||
                    getFieldValue("new_password") === value
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("與新密碼不一致"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="請輸入確認密碼"
              style={styles.inputStyle}
            />
          </Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Button style={styles.btnStyle} htmlType="submit">
              確定
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  closeModal() {
    this.setState({
      viewModalVisible: false,
      viewPwdModalVisible: false,
    });
  }

  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList("ImageData", newFileList.splice(1, 1));
    } else {
      this.setFileList("ImageData", newFileList);
    }
  };

  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  };

  render() {
    const { children, user, admin = { name: "" }, noticeList } = this.props;
    const {
      viewModalVisible,
      viewPwdModalVisible,
      key,
      isOpen,
      userId,
      adminData,
    } = this.state;

    if (!isEmpty(admin)) {
      if (admin.role_id !== "M001") {
        menuList = menuList.filter((item) => item.title !== "管理員");
      }
    }

    if (key === "") return null;

    let menu = (
      <Menu>
        <Menu.Item
          key="0"
          onClick={() => this.setState({ viewModalVisible: true })}
        >
          <span style={{ display: "flex", justifyContent: "center" }}>
            帳號設定
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="1"
          onClick={() => this.setState({ viewPwdModalVisible: true })}
        >
          <span style={{ display: "flex", justifyContent: "center" }}>
            變更密碼
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.handleClick}>
          <span style={{ display: "flex", justifyContent: "center" }}>
            登出
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={240}
          style={{ overflowY: "auto" }}
        >
          <div className="logo"></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[key]}
            style={{ marginTop: "65px" }}
          >
            {menuList.map((item) => {
              return (
                <Menu.Item
                  onClick={() => this.changeRoute(item.key)}
                  key={item.key}
                  icon={
                    <img
                      src={item.img}
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                  }
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.title}
                    {_.has(noticeList, item.key) && (
                      <div style={styles.noticeStyle}>
                        {noticeList[item.key]}
                      </div>
                    )}
                  </div>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background-top"
            style={{ padding: 0, boxShadow: "0px 2px 10px #859DB1" }}
          >
            {React.createElement(MenuOutlined, {
              className: "trigger",
              onClick: this.toggle,
            })}
            <div style={styles.infoStyle}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  className="ant-dropdown-link"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      overflow: "hidden",
                      marginRight: "10px",
                      display: "flex",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={Images.adminPhoto}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  {admin.name}
                  <DownOutlined style={{ marginLeft: "10px" }} />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background-content"
            style={{
              padding: "30px 20px",
              minHeight: 280,
              overflowY: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
        {viewModalVisible && this.renderUserModal()}
        {viewPwdModalVisible && this.renderPwdModal()}
      </Layout>
    );
  }
}

export default connect(
  (state) => ({
    screenWidth: state.screen.screenWidth,
    screenHeight: state.screen.screenHeight,
    user: state.user,
    admin: state.user.admin,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        handleChangeScreenSize: ScreenActions.handleChangeScreenSize,
        setToken: UserActions.setToken,
        changePassword: UserActions.changePassword,
        updateAdmin: UserActions.updateAdmin,
        getUserInfo: UserActions.getUserInfo,
        getAdmin: UserActions.getAdmin,
      },
      dispatch
    )
)(HomeLayout);

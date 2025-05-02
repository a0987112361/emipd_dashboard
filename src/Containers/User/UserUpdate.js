import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Modal, Input, Select, Tabs, Form, Radio, Row, Col, DatePicker } from 'antd';
import { Images } from 'src/Theme';

import "./UserUpdate.css"
import _ from 'lodash';
import moment from 'moment';
import { UserActions, OrderActions } from '../../Stores';
import { city, area } from '../../utils/location';
import HashHistory from '../../utils/HashHistory';

const { Option } = Select;
const { TabPane } = Tabs;

const styles = {
  root: {
    flexGrow: 1,
    // height: '100%',
    // overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '30px',
  },
  contentBottom: {
    width: '100%',
    height: '100%',
    marginTop: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '16px',
    overflowY: 'auto'
  },
  inputStyle: {
    width: '470px',
    height: '40px',
    borderRadius: '5px',
  },
  formTop: {
    width: '100%',
    display: 'flex',
    padding: '20px 25px 30px 25px',
    borderBottom: '#A6C1D3 1px solid'
  },
  formBottom: {
    width: '100%',
    display: 'flex',
    padding: '0px 25px 25px 25px'
  },
  btnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  btnStyle: {
    width: '100px',
    height: '40px',
    color: '#fff',
    backgroundColor: '#004C7C',
    borderRadius: '4px',
    marginBottom: '40px'
  },
  title: {
    color: '#7D9EB5',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '40px'
  },
  content: {
    color: '#004C7C',
    fontSize: '18px',
    fontWeight: 'bold',
    lineHeight: '25px',
    // lineHeight: '40px'
  },
  itemTitleRow: {
    width: '100%',
    height: '60px',
    borderBottom: '1px solid #C2D7E6',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#455A68',
    padding: '0px 20px',
    alignItems: 'center'
  },
  itemContentRow: {
    width: '100%',
    borderBottom: '1px solid #DDDDDD',
    fontSize: '18px',
    color: '#455A68',
    padding: '0px 20px',
    alignItems: 'center'
  },
};

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.updateForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      viewModalVisible: false,
      userId: '',
      cityData: '',
      areaList: [],
      areaData: '',
      cartId: '',
      isShow: false,
      form: {},
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { history, getUserInfo,  } = this.props;

    this.setState({
      isLoading: true,
      
    });

    let temp = ""
    temp = history.location.pathname.split('/user/update/');

    const callback = (value) => {
      this.setState({
        isLoading: false,
        userId: temp[1],
        areaData: value.area,
        form: {
          ...value,
          // phone: !value.phone ? value.phone : '',
          phone: value.phone === undefined ? '' : value.phone,
          birth: moment(value.birth),
        }
      });
      this.handleAreaList(value.country)
    }

    getUserInfo(temp[1], callback);
  }

  componentWillUnmount() {
    const { resetUserInfo } = this.props;
    resetUserInfo();
  }

  handleUpdate = (value) => {
    const { updateUser } = this.props;
    const { userId, form } = this.state;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
      });
      if (!_.isEmpty(value.new_password) || !_.isEmpty(value.new_password_check)) {
        this.handleChangePassword(value.new_password);
      }
      HashHistory.push('/user')
    }

    // let payload = [];
    // payload.push({
    //   ...value,
    //   user_id: userId
    // })

    // let formData = new FormData();

    // formData.append('user_id', payload[0].user_id);
    // formData.append('account', payload[0].account);
    // formData.append('name', payload[0].name);
    // formData.append('gender', payload[0].gender);
    // formData.append('email', payload[0].email);
    // formData.append('phone', payload[0].phone === undefined ? '' : payload[0].phone);
    // formData.append('country', payload[0].country === undefined ? '臺中市' : payload[0].country);
    // formData.append('area', payload[0].area === undefined ? '中區' : payload[0].area);
    // formData.append('addr', payload[0].addr);

    let data = {
      ...value,
      user_id: userId,
    }

    updateUser(userId, data, callback);
  }

  handleChangePassword(value) {
    const { changePassword } = this.props;
    const { userId } = this.state;
    this.setState({
      isLoading: true
    })
    const callback = () => {
      this.setState({
        isLoading: false
      })
    }

    let payload = {};
    payload = { user_id: userId, new_password: value };
    changePassword(payload, callback);
  }

  //修改會員資料-表單變動
  handleFormChange = (change, all) => {
    if (_.has(change, 'country')) {
      this.updateForm.current.setFieldsValue({ area: undefined });
    }
  }

  //修改會員資料-地區選單option
  handleAreaList = (e) => {
    let areaListData = area.filter((item) => {
      return item.key == e;
    });

    this.setState({
      areaList: areaListData[0].list,
    })
  }

  //訂購紀錄
  columns = [
    {
      width: '100px',
      title: '訂單編號',
      dataIndex: 'cart_order_id',
      key: 'cart_order_id',
      align: 'center',
    },
    {
      width: '100px',
      title: '訂單類型',
      dataIndex: 'is_inquiry',
      key: 'is_inquiry',
      align: 'center',
      render: (value) =>
        <div>
          {value ? "願望清單" : "線上購物"}
        </div>
    },
    {
      width: '100px',
      title: '狀態',
      dataIndex: 'cart_status_name',
      key: 'cart_status_name',
      align: 'center',

    },
    {
      width: '100px',
      title: '總計',
      dataIndex: 'cart_total',
      key: 'cart_total',
      align: 'center',
    },
    {
      width: '150px',
      title: '購買日期',
      dataIndex: 'checkout_time',
      key: 'checkout_time',
      align: 'center',
      defaultSortOrder: 'descend',
      render: (value, record) =>
        <div>
          {moment(value).format('YYYY/MM/DD HH:mm:ss')}
        </div>
    },
    {
      width: '100px',
      title: '操作',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (value, record) =>
        <div>
          <img
            src={Images.detail}
            onClick={() => this.renderViewModal(record.cart_id)} />
        </div>
    },
  ];

  //訂單詳細開關
  renderViewModal = (id) => {
    const { getUserOrderDetail } = this.props
    this.setState({
      viewModalVisible: true,
    });
    const callback = (value) => {
      this.setState({
        detailLoading: false,
        isShow: true,

      })
    }
    getUserOrderDetail(id, callback);
  }

  //訂單詳細Modal
  renderDetailModal() {
    const { viewModalVisible, isShow } = this.state;
    const { UserOrder } = this.props;

    if (!isShow) {
      return null;
    }
    let sum = ''
    return (
      <Modal
        title="詳細購買紀錄"
        visible={viewModalVisible}
        width={1200}
        height={870}
        onCancel={() => this.setState({ viewModalVisible: false })}
        footer={null}
      >

        <Row style={{ width: '100%' }}>
          <Col style={styles.title}>訂單明細</Col>
          <Col style={styles.content}> #{UserOrder.cart_order_id}</Col>
        </Row>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {
            UserOrder.is_inquiry ?
              <Row style={{ width: '100%' }}>
                <Col style={styles.title}>訂單類型：</Col>
                <Col span={7} style={styles.content}>願望清單</Col>
              </Row>
              :
              <Row style={{ width: '100%' }}>
                <Col style={styles.title}>訂單類型：</Col>
                <Col span={7} style={styles.content}>線上購物</Col>
                <Col style={styles.title}>結帳日期：</Col>
                <Col span={10} style={styles.content}>{UserOrder.checkout_time}</Col>
              </Row>
          }
          {
            UserOrder.is_inquiry ?
              null
              :
              <Row style={{ width: '100%' }}>
                <Col style={styles.title}>運送方式：</Col>
                <Col span={7} style={styles.content}>{UserOrder.logistic.logistic_name}</Col>
                <Col style={styles.title}>付款方式：</Col>
                <Col span={10} style={styles.content}>{UserOrder.pay.pay_name}</Col>
              </Row>
          }
          <div style={{ width: '100%', marginBottom: '50px', boxShadow: '0px -2px 10px 2px#e5edf4', }}>
            <Row style={styles.itemTitleRow}>
              <Col span={15}>
                商品
              </Col>
              <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                單價
              </Col>
              <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                數量
              </Col>
              <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                總計
              </Col>
            </Row>
            {
              UserOrder.cart_items.map((item) => {
                sum = item.cart_item_total
                return (
                  <Row style={styles.itemContentRow}>
                    <Col span={15} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '90px', height: '106px', marginRight: '60px', display: 'flex', alignItems: 'center' }}>
                        <img src={item.item_img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ width: '350px' }}>
                        <span>{item.item_name}</span>
                        {
                          _.has(item, 'item_specs') &&
                          item.item_specs.map((val) => {
                            return (
                              <div>
                                <span>{val.spec_type_name}：{val.spec}</span>
                              </div>
                            )
                          })
                        }

                      </div>
                    </Col>
                    <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                      ${item.item_price}
                    </Col>
                    <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                      {item.cart_item_count}
                    </Col>
                    <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
                      ${item.cart_item_total}
                    </Col>
                  </Row>
                )

              })
            }
            <Row style={{ backgroundColor: '#F3F7F9', width: '100%', height: '122px', fontSize: '18px', color: '#455A68', padding: '0px 20px', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Col span={17}></Col>
              {!UserOrder.is_inquiry &&
                <Col span={4} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                  <span style={{ width: '100%', height: '35px' }}>小計</span>
                  <span style={{ width: '100%', height: '35px' }}>運送方式</span>
                </Col>
              }
              {!UserOrder.is_inquiry &&
                <Col span={3} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center' }}>
                  <span style={{ width: '100%', height: '35px' }}>${sum}元</span>
                  <span style={{ width: '100%', height: '35px' }}>
                    {UserOrder.cart_logistic_price == 0 ? "-" : "$" + UserOrder.cart_logistic_price + "元"}
                  </span>

                </Col>}
            </Row>
            <Row style={{ backgroundColor: '#FFFFFF', width: '100%', height: '62px', fontSize: '18px', color: '#455A68', padding: '0px 20px', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Col span={17}></Col>
              <Col span={4} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                <span style={{ width: '100%', height: '35px' }}>總額</span>
              </Col>
              <Col span={3} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', textAlign: 'center' }}>
                <span style={{ width: '100%', height: '35px' }}>${UserOrder.cart_total}元</span>
              </Col>
            </Row>
          </div>
        </div>

      </Modal>
    )
  }

  renderUserOrder = () => {
    const { getUserOrderList } = this.props;
    const { userId } = this.state;

    const callback = (value) => {
      this.setState({
        isLoading: false,
      })
    }
    getUserOrderList(userId, callback, { now_page: 1, page_size: 10 });
  }

  //修改會員資料
  renderUserData = () => {
    const { user } = this.props;
    const { areaList, form } = this.state;

    if (_.isEmpty(form)) {
      return null;
    }
    return (
      <div style={{ overflowY: 'auto' }}>
        <Form
          ref={this.updateForm}
          labelCol={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
          labelAlign="left"
          initialValues={{
            ...form,
          }}
          // style={{ overflowY: 'auto' }}
          onFinish={this.handleUpdate}
          onValuesChange={this.handleFormChange}
        >
          <div style={styles.formTop}>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#7D9EB5',
              }}
            >
              帳號： &nbsp;{form.account}
            </span>
            {/*
            <Form.Item
              name="level"
              label="會員等級"
              rules={[{ required: true, message: '此欄位不可為空！' }]}
            >
              <Select
                allowClear
                showArrow
                showSearch
                placeholder="請選擇會員等級"
                style={styles.inputStyle}
              >
                <Option value="青銅級">青銅級</Option>
                <Option value="白銀級">白銀級</Option>
              </Select>
            </Form.Item>
            */}
          </div>
          <div style={styles.formBottom}>
            <div style={{ width: '50%', padding: '0 16px 0 0' }}>
              <Form.Item
                name="name"
                label="姓名"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: '此欄位不可為空' }]}
              >
                <Input
                  placeholder='請輸入姓名'
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="性別"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group>
                  <Radio value={0} style={{ color: '#7D9EB5' }}>女</Radio>
                  <Radio value={1} style={{ color: '#7D9EB5' }}>男</Radio>
                  <Radio value={2} style={{ color: '#7D9EB5' }}>其他</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="phone"
                label="電話"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="請輸入電話"
                  // maxLength={10}
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Row style={{ width: '470px' }}>
                <Col lg={12}>
                  <Form.Item
                    name="country"
                    label="地址"
                    required
                    colon={false}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ paddingRight: '10px', }}
                  >
                    <Select
                      allowClear
                      showArrow
                      showSearch
                      placeholder="請選擇縣市"
                      style={{ height: '40px', borderRadius: '5px' }}
                      onChange={this.handleAreaList}
                    >
                      {city.map((item) => {
                        return (
                          <Option key={item} value={item}>{item}</Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item
                    name="area"
                    label="地區"
                    colon={false}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    required
                  >
                    <Select
                      allowClear
                      showArrow
                      showSearch
                      placeholder="請選擇地區"
                      style={{ height: '40px', borderRadius: '5px' }}
                    >
                      {areaList ?
                        areaList.map((item, index) => {
                          return (
                            <Option key={index} value={item}>{item}</Option>
                          )
                        }) : null
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="addr"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginTop: '5px' }}
                placeholder='如：建行路一段...'
                rules={[{ required: true, message: '此欄位不可為空' }]}
              >
                <Input
                  placeholder='請輸入地址'
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="信箱"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    type: 'email',
                    message: '格式錯誤！',
                  },
                ]}
              >
                <Input
                  placeholder="請輸入信箱"
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="birth"
                label="生日"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: '此欄位不可為空',
                  },
                ]}
              >
                {/* <Input
                  style={styles.inputStyle}
                  // disabled
                /> */}
                <DatePicker
                  placeholder="請選擇生日"
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="likes"
                label="喜好"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Select
                  allowClear
                  showArrow
                  showSearch
                  mode="multiple"
                  placeholder="請選擇喜好"
                  style={styles.inputStyle}
                  disabled
                >
                  <Option key="1" value="jack">Jack</Option>
                  <Option key="2" value="mac">Mac</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="tags"
                colon={false}
                label="店家註記喜好"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              // rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Select
                  allowClear
                  showArrow
                  showSearch
                  mode="multiple"
                  placeholder="請選擇店家註記喜好"
                  style={styles.inputStyle}
                  disabled
                >
                  <Option key="1" value="jack">Jack</Option>
                  <Option key="2" value="mac">Mac</Option>
                </Select>
              </Form.Item>

            </div>
            <div style={{ width: '50%' }}>
              <Form.Item
                name="new_password"
                colon={false}
                label="新密碼"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input.Password
                  placeholder='請輸入新密碼'
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="passwordCheck"
                colon={false}
                label="確認新密碼"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // dependencies={['new_password']}
                rules={[
                  ({ getFieldValue }) =>
                  ({
                    validator(_, value) {
                      if (getFieldValue('new_password') != value && value == null) {
                        return Promise.reject(new Error('此欄位不可為空！'));
                      } else if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('與新密碼不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder='請輸入確認密碼'
                  style={styles.inputStyle}
                />
              </Form.Item>
            </div>
          </div>
          <div style={styles.btnBlock}>
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div >
    )
  }

  handleTabChange = (key) => {
    if (key === '1') {
      this.renderUserData();
    }
    if (key === '2') {
      this.renderUserOrder();
    }
  }

  render() {
    const { UserOrderList, user, admin, userInfo } = this.props;
    const { userId, form } = this.state;

    // if (user.user_id != userId) {
    //   return null;
    // }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              會員管理
            </div>
            <div style={styles.contentBottom}>
              <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                <TabPane tab="會員資料" key="1" style={styles.tabStyle}>
                  {this.renderUserData()}
                </TabPane>
                <TabPane tab="訂購紀錄" key="2" style={styles.tabStyle}>
                  <Table
                    id='table'
                    pagination={{
                      position: ['bottomCenter'],
                    }}
                    columns={this.columns}
                    dataSource={UserOrderList}
                    style={{ width: '100%' }}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        {this.state.viewModalVisible && this.renderDetailModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    user: state.user,
    userInfo: state.user.userInfo,
    UserOrderList: state.order.UserOrderList,
    UserOrder: state.order.UserOrder,
    admin: state.user.admin,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getUserInfo: UserActions.getUserInfo,
        updateUser: UserActions.updateUser,
        changePassword: UserActions.changePassword,
        resetUserInfo: UserActions.resetUserInfo,
        getUserOrderList: OrderActions.getUserOrderList,
        getUserOrderDetail: OrderActions.getUserOrderDetail,
        getAdmin: UserActions.getAdmin,
      },
      dispatch,
    ),
)(UserUpdate);
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Select, Tabs, Form, DatePicker, Radio, Row, Col } from 'antd';

import "./UserCreate.css"
import _ from 'lodash';
import HashHistory from '../../utils/HashHistory';
import { UserActions } from '../../Stores';
import { city, area } from '../../utils/location';


const { Option } = Select;
const { TabPane } = Tabs;

const styles = {
  root: {
    flexGrow: 1,
    // height: '100%',
    // height: '1000px',
    // overflowY: 'scroll',
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
    marginBottom: '20px'
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
    overflowY: 'auto',
  },
  inputStyle: {
    width: '470px',
    height: '40px',
    borderRadius: '5px'
  },
  tabStyle: {
    height: '100%'
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
  }
};

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.createForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      areaList: [],
      phone: '',
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  handleCreate = (value) => {
    const { createUser } = this.props;
    const { phone } = this.state;
    this.setState({
      isLoading: true
    })

    const callback = () => {
      this.setState({
        isLoading: false
      })
      HashHistory.push('/user');
    }

    // let formData = new FormData();

    // formData.append('account', value.account);
    // formData.append('name', value.name);
    // formData.append('birth', value.birth.format('YYYY-MM-DD'));
    // formData.append('gender', value.gender);
    // formData.append('email', value.email);
    // formData.append('phone', value.phone === undefined ? '' : value.phone);
    // formData.append('country', value.country);
    // formData.append('area', value.area);
    // formData.append('addr', value.addr);
    // formData.append('password', value.password);

    let data = {
      ...value,
      birth: value.birth.format('YYYY-MM-DD'),
      phone: value.phone === undefined ? '' : value.phone,
    }

    createUser(data, callback);
  }

  // 新增會員資料-表單變動
  handleFormChange = (change, all) => {
    if (_.has(change, 'country')) {
      this.createForm.current.setFieldsValue({ area: undefined });
    }
  }

  handleAreaList = (e) => {
    area.map((item, index) => {
      if (item.key === e) {
        this.setState({
          areaList: area[index].list
        })
      }
    })
  }

  renderUserData = () => {
    const { areaList } = this.state;
    return (
      <div style={{ overflowY: 'auto' }}>
        <Form
          ref={this.createForm}
          labelCol={{ style: { fontSize: '20px', fontWeight: 'bold' } }}
          // labelCol={{ style: { width: '100%', fontSize: '20px', fontWeight: 'bold' } }}
          labelAlign="left"
          initialValues={{}}
          onFinish={this.handleCreate}
          onValuesChange={this.handleFormChange}
        >
          <div style={styles.formTop}>
            <div style={{width: '50%', paddingRight: '16px'}}>
              <Form.Item
                name="account"
                label="帳號"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: '此欄位不可為空' },
                  { max: 20, message: '最多輸入20碼' },
                ]}
              >
                <Input
                  placeholder='請輸入帳號'
                  style={styles.inputStyle}
                />
              </Form.Item>
            </div>
            {/*
             <Form.Item
              name="level"
              label="會員等級"
              rules={[{ required: true, message: '此欄位不可為空' }]}
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
            <div style={{ width: '50%', paddingRight: '16px' }}>
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
                rules={[{ required: true, message: '此欄位不可為空' }]}
              >
                <Radio.Group>
                  <Radio value={0} style={{ color: '#7D9EB5' }}>女</Radio>
                  <Radio value={1} style={{ color: '#7D9EB5' }}>男</Radio>
                  <Radio value={2} style={{ color: '#7D9EB5' }}>其他</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="phone"
                colon={false}
                label="電話"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="請輸入電話"
                  maxLength={10}
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Row style={{ width: '470px' }}>
                <Col lg={12}>
                  <Form.Item
                    name="country"
                    colon={false}
                    label="地址"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: '此欄位不可為空' }]}
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
                    colon={false}
                    label="地區"
                    colon={false}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: '此欄位不可為空' }]}
                  >
                    <Select
                      allowClear
                      showArrow
                      showSearch
                      placeholder="請選擇地區"
                      style={{ height: '40px', borderRadius: '5px' }}
                    >
                      {
                        areaList.map((item) => {
                          return (
                            <Option key={item} value={item}>{item}</Option>
                          )
                        })
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
                placeholder='如：建行路一段...'
                rules={[{ required: true, message: '此欄位不可為空' }]}
                style={{ marginTop: '5px' }}
              >
                <Input
                  placeholder='請輸入地址'
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="email"
                colon={false}
                label="信箱"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    type: 'email',
                    message: '格式錯誤',
                  },
                  {
                    required: true,
                    message: '此欄位不可為空',
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
              // rules={[{ required: true, message: '此欄位不可為空' }]}
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
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="店家註記喜好"
              // rules={[{ required: true, message: '此欄位不可為空' }]}
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
                name="password"
                colon={false}
                label="密碼"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: '此欄位不可為空' }]}
              >
                <Input.Password
                  placeholder='請輸入密碼'
                  style={styles.inputStyle}
                />
              </Form.Item>
              <Form.Item
                name="passwordCheck"
                label="確認密碼"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: '此欄位不可為空' }]}
                dependencies={['password']}
                rules={[
                  { required: true, message: '此欄位不可為空' },
                  ({ getFieldValue }) =>
                    ({
                      validator(_, value) {
                        if (getFieldValue('password') != value && value == null) {
                          return Promise.reject(new Error('此欄位不可為空'));
                        } else if (!value || getFieldValue('password') === value) {
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
        </Form >
      </div >
    )
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              會員管理
            </div>
            <div style={styles.contentBottom}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="會員資料" key="1" style={styles.tabStyle}>
                  {this.renderUserData()}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        createUser: UserActions.createUser,
      },
      dispatch,
    ),
)(UserCreate);
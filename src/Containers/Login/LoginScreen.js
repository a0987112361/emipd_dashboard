import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserActions } from 'src/Stores';
import { Button, Modal, Input, Form,  } from 'antd';

import { LoginMiddleView } from 'src/Components';
import Swal from 'sweetalert2';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '30px',
  },
  btnStyle: {
    width: '100px',
    height: '40px',
    color: '#fff',
    backgroundColor: '#004C7C',
    borderRadius: '4px',
    marginBottom: '40px'
  },
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      firstLoginUser: {},
      firstLoginToken: '',
      failTimes: 0,
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount = () => {
    let record = JSON.parse(localStorage.getItem('EMIPD_FAIL'));
    if(record){
      this.setState({ failTimes: record.count})
      if(new Date(Date.now()).getTime() > new Date(record.ok_date).getTime()){
        this.setState({ 
            failTimes: 0
          }, () => // 如果現在要登入時 已超過第五次的15分鐘時間則清掉重算
          localStorage.removeItem("EMIPD_FAIL")
        )
      }
    } 
  }

  handleLogin = (value) => {
    const { login } = this.props;

    const callback = (value, token) => {
      this.setState({
        isLoading: false,
        firstLoginUser: value,
        firstLoginToken: token
      }, () => {
        if(value.is_login === true) {
          this.handleResetPasswordModal()
        }
      });
    }

    const errorCallback = (value) => {
      if(value.data.success === false){
        let now = new Date(Date.now());
        let next = new Date(new Date().getTime() + 15*60*1000); // 15min later
        let record = localStorage.getItem("EMIPD_FAIL");
        let newRecord = {}; let oldRecord = {};
        
        if(record === null){  // 第1次登入錯誤
          newRecord.login_date = now.toString();
          newRecord.login_time = new Date(Date.now()).toLocaleTimeString();
          newRecord.count = 1;
          this.setState({ failTimes: 1 }, () => {window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));} )
        }else{  // 登入錯誤次數1次以上
          oldRecord = JSON.parse(localStorage.getItem('EMIPD_FAIL'));
          let oldCount = JSON.parse(localStorage.getItem("EMIPD_FAIL")).count;
          
          newRecord.login_date = now.toString();
          newRecord.login_time = new Date(Date.now()).toLocaleTimeString();
          newRecord.ok_date = next.toString();
          newRecord.count = oldCount + 1;


          if(oldCount >= 4){  // 登入錯誤次數5次以上
            if(new Date(Date.now()).getDate() === new Date(oldRecord.ok_date).getDate()){  // 如果跟之前允許登入的日期同天
              newRecord.ok_date = next.toString();
              if(newRecord.count === 5){
                this.setState({ failTimes: 5 }, () => {
                  Swal.fire({
                    icon: 'error',
                    title: '登入錯誤已達5次，將鎖定15分鐘無法登入。'
                  })
                  window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));
                })
                
              }else{
                if(new Date(Date.now()).getTime() > new Date(oldRecord.ok_date).getTime()){
                  newRecord.count = 1
                  this.setState({ failTimes: 1 }, () => {window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));} )
                }else{
                  this.setState({ failTimes: 5 })
                }
              }
            }else{  // 如果不同天，就重新寫入全部的值、次數調為1
              newRecord = {
                ...oldRecord,
                count: 1
              }
              this.setState({ failTimes: 1 }, () => {window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));} )
            }
          }else{  // 登入錯誤次數2~4次        
            if((new Date(Date.now()).getTime() - new Date().getTime()) == 0) {  // 目前登入時間未超過今日12:00
              this.setState({ failTimes: this.state.failTimes + 1 }, () => {window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));} )
            }else{  // 如果跨日，就重新寫入全部的值、次數調為1
              newRecord = {
                ...oldRecord,
                count: 1
              }
              this.setState({ failTimes: 1 }, () => {window.localStorage.setItem("EMIPD_FAIL", JSON.stringify(newRecord));} )
            }
          }
        }
      }

      this.setState({
        isLoading: false,
      });
    }

    this.setState({
      isLoading: true,
    }, () => {
      login(value, callback, errorCallback);
    });
  };

  
  handleResetPasswordModal = () => {
    this.setState({
      resetPasswordModalVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      isLoading: false, 
      resetPasswordModalVisible: false,
    })
  }

  handleChangePwd = (value) => {
    const { changePassword } = this.props;
    const { firstLoginUser, firstLoginToken } = this.state;

    const callback = () => {
      this.setState({
        isLoading: false,
        resetPasswordModalVisible: false
      })
    };

    const errorCallback = (value) => {
          this.setState({
            isLoading: false,
          })
        }

    let newData = {
      user_id: firstLoginUser.user_id,
      old_password: '0000',
      new_password: value.new_password
    }

    this.setState({
      isLoading: true,
    }, () => {
      changePassword(newData, callback, errorCallback, firstLoginToken);
    })
  }

  renderResetPasswordModal = () => {
    const { resetPasswordModalVisible, firstLoginUser } = this.state;

    return (
      <Modal
        title="首次登入密碼修改"
        visible={resetPasswordModalVisible}
        centered
        closable
        width={500}
        height={380}
        onCancel={() => this.closeModal()}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Form
            name='basic'
            initialValues={firstLoginUser}
            onFinish={this.handleChangePwd}
            style={{ width: '100%' }}
          >
            <Form.Item
              name="new_password"
              colon={false}
              label="新密碼"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[{ required: true, message: '請輸入新密碼' }]}
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
              required
              rules={[{ required: true, message: '此欄位不可為空' }]}
              // dependencies={['new_password']}
              rules={[
                ({ getFieldValue }) =>
                ({
                  validator(_, value) {
                    if (getFieldValue('new_password') != value && value == null && value == '') {
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
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button style={styles.btnStyle} htmlType='submit'>確定</Button>
            </div>
          </Form>
        </div>
      </Modal>
    )
  }

  render() {
    const { isLoading, failTimes, resetPasswordModalVisible } = this.state;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <LoginMiddleView isLoading={isLoading} handleLogin={this.handleLogin} failTimes={failTimes} />
        {resetPasswordModalVisible && this.renderResetPasswordModal()}
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
        setToken: UserActions.setToken,
        login: UserActions.login,
        changePassword: UserActions.changePassword,
      },
      dispatch,
    ),
)(LoginScreen);

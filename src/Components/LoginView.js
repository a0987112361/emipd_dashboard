import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'antd';

import { FormInputWhite } from 'src/Components';
import { Metrics, Images, Colors } from 'src/Theme';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden'
  },
  paper: {
    padding: Metrics.baseMargin,
    textAlign: 'center',
    height: '100%',
  },
  wrapper: {
    height: '100%',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: document.documentElement.clientWidth >= 600 ? '60px' : '32px',
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: '5px',
  },
  btnStyle: {
    width: '140px',
    height: '40px',
    marginRight: '30px',
    borderRadius: '5px',
  },
  btnBox: {
    margin: document.documentElement.clientWidth >= 600 ? '32px' : '16px',
    marginTop: '60px',
  },
  iconImg: {
    width: '340px',
    height: '80px',
    maxWidth: '80%'
  },
  iconBox: {
    marginTop: document.documentElement.clientWidth >= 600 ? '100px' : '60px',
    marginBottom: '16px',
    width: '100%',
    textAlign: 'center',
  },
  rightBox: {
    maxWidth: '600px',
    margin: 'auto',
    padding: document.documentElement.clientWidth >= 600 ? '32px' : '16px',
  },
  itemBox: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  }
};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
class LoginView extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    text: '',
    password: '',
    form: {
      account: '',
      password: '',
    },
    isLoading: false,
    currentMode: 'login',
  };

  handleChangeValue = (change, all) => {
    this.setState({
      form: all,
    })
  }

  handleForget = (value) => {
    const { forgetPassword } = this.props;
    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
        currentMode: 'login',
      });
    }
    forgetPassword(value.email, callback);
  }


  handleHeaderMarginTop = () => {
    let width = document.documentElement.clientWidth;
    if (width > 1440) {
      return '160px';
    } else if (width > 1024 && width <= 1440) {
      return '80px';
    } else {
      return '30px';
    }
  }

  render() {
    const { handleLogin } = this.props;
    const { form, currentMode, isLoading } = this.state;
    return (
      <div style={styles.root}>
        <Row style={styles.fullHeight}>
          {document.documentElement.clientWidth > 900 && <Col xs={24} lg={12} xl={16} xxl={18} style={styles.fullHeight}>
            <img src={Images.background_login} style={styles.imgStyle} />
          </Col>}
          <Col xs={24} lg={12} xl={8} xxl={6} style={{ ...styles.fullHeight, backgroundColor: Colors.primary }}>
            <div style={styles.rightBox}>
              <p style={{ ...styles.header, marginTop: this.handleHeaderMarginTop() }}>
                元弘資訊管理系統
              </p>
              {
                currentMode === 'login' ? <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                    account: '',
                    password: '',
                  }}
                  onFinish={value => handleLogin(value)}
                  onValuesChange={this.handleChangeValue}
                >
                  <FormInputWhite
                    title="帳號"
                    required
                    propName='account'
                    placeholder="請輸入帳號"
                    requiredErrorMessage="請輸入帳號"
                  />
                  <FormInputWhite
                    title="密碼"
                    required
                    propName='password'
                    type="password"
                    placeholder="請輸入密碼"
                    requiredErrorMessage="請輸入密碼"
                  />
                  <Form.Item style={{ width: '100%', textAlign: 'center', marginTop: document.documentElement.clientWidth > 600 ? '80px' : '30px' }}>
                    <Button type="cancel" onClick={() => this.setState({ currentMode: 'forget' })} style={{ ...styles.btnStyle, width: document.documentElement.clientWidth > 600 ? '140px' : '100%', marginTop: document.documentElement.clientWidth > 600 ? '0px' : '16px' }}>
                      忘記密碼
                  </Button>
                    <Button style={{ ...styles.btnStyle, width: document.documentElement.clientWidth > 600 ? '140px' : '100%', marginTop: document.documentElement.clientWidth > 600 ? '0px' : '16px' }} type="primary" htmlType="submit">
                      登入
                  </Button>
                  </Form.Item>
                </Form> : <div>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: 'white' }}>忘記密碼</p>
                  <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                      email: '',
                      password: '',
                    }}
                    onFinish={this.handleForget}
                    onValuesChange={this.handleChangeValue}
                  >
                    <FormInputWhite
                      title="信箱"
                      required
                      propName='email'
                      placeholder="請輸入信箱"
                      requiredErrorMessage="請輸入信箱"
                    />

                    <Form.Item style={{ width: '100%', textAlign: 'center', marginTop: document.documentElement.clientWidth > 600 ? '80px' : '30px' }}>
                      <Button loading={isLoading} style={{ ...styles.btnStyle, width: document.documentElement.clientWidth > 600 ? '140px' : '100%', marginTop: document.documentElement.clientWidth > 600 ? '0px' : '16px' }} type="primary" htmlType="submit">
                        送出
                      </Button>
                      <Button onClick={() => this.setState({ currentMode: 'login' })} style={{ ...styles.btnStyle, width: document.documentElement.clientWidth > 600 ? '140px' : '100%', marginTop: document.documentElement.clientWidth > 600 ? '0px' : '16px' }} type="cancel" >
                        返回
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              }

              <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={Images.logo_white} style={{ width: '200px', height: '80px', marginTop: '30px ' }} />
              </div>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

export default LoginView;

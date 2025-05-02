import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'antd';

import { FormInput } from 'src/Components';
import { Images, Screen } from 'src/Theme';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
    background: `url(${Images.bg}) no-repeat center bottom`,
    backgroundSize: 'cover'
  },
  header: {
    width: '100%',
    textAlign: 'center',
    fontSize: '40px',
    color: '#528872',
    letterSpacing: '5px',
    marginBottom: '-40px',
    paddingTop: '16px',
  },
  title: {
    fontSize: '40px',
    color: '#223345',
    display: 'flex',
    justifyContent: 'center'
  },
  wrapperBox: {
    width: '550px',
    height: '500px',
    margin: 'auto',
    marginTop: `${(document.documentElement.clientHeight - 560) / 2}px`,
  },
  middleBox: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    zIndex: 0,
    position: 'relative',
    background: `url(${Images.middleBg}) no-repeat center bottom`,
    backgroundSize: 'contain',
    display: 'flex',
  },
  btnStyle: {
    width: '100px',
    height: '40px',
    backgroundColor: '#004C7C',
    borderRadius: '5px',
    color: 'white'
  },
  inputStyle: {
    width: '300px',
    height: '40px',
    border: '1px solid #CBD871',
    borderRadius: '5px',
  }
};

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
class LoginMiddleView extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    text: '',
    password: '',
  };

  handleHeaderMarginTop = () => {
    let width = Screen.screenWidth;
    if (width > 1440) {
      return '160px';
    } else if (width > 1024 && width <= 1440) {
      return '80px';
    } else {
      return '0px';
    }
  }

  render() {
    const { handleLogin, failTimes, isLoading } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.wrapperBox}>
          <div style={styles.title}>EMIPD後台</div>
          <div style={styles.middleBox}>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                account: '',
                password: '',
              }}
              style={{ width: '300px', margin: 'auto', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}
              onFinish={value => handleLogin(value)}
            >
              <FormInput
                required
                propName='account'
                placeholder="帳號"
                requiredErrorMessage="帳號"
                inputStyle={styles.inputStyle}
              />
              <FormInput
                required
                propName='password'
                type="password"
                placeholder="密碼"
                inputStyle={{ ...styles.inputStyle }}
                requiredErrorMessage="密碼"
              />

              {failTimes > 0 &&
                <div style={{ color: '#f00', fontSize: '12px' }}>
                  今日登入失敗已{failTimes}次，累積5次將限制15分鐘無法登入。
                </div>
              }

              <Form.Item>
                <Button loading={isLoading} style={styles.btnStyle} htmlType="submit" disabled={failTimes >= 5}>
                  登入
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div style={{
          width: '100%',
          fontSize: '20px',
          textAlign: 'center',
          position: 'absolute',
          bottom: '16px',
          color: '#004c7c',
          letterSpacing: '5px'
        }}>
          © 元弘資訊系統有限公司
        </div>
      </div >
    );
  }
}

export default LoginMiddleView;

import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import Swal from 'sweetalert2';

import { Screen } from 'src/Theme';
import hashHistory from 'src/utils/HashHistory';
import headerBarStyle from './HeaderBar.less';
import { removeUserInformation } from 'src/utils/localStorage';

const styles = {
  root: {
    display: 'flex',
  },
  appBar: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    padding: '0px 40px',
  },
  menuButton: {
    marginRight: '16px',
  },
  hide: {
    display: 'none',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'left',
    maxWidth: '400px',
    width: '100%',
  },
  toolbar: {
    padding: '0px 32px',
  },
  logoImage: {
    width: '50px',
    height: '50px',
    marginTop: '25px',
    marginLeft: '16px',
  },
  items: {
    fontSize: Screen.screenWidth > 1024 ? '26px' : '20px',
    flex: 1,
    textAlign: 'right',
    lineHeight: '120px',
  },
  itemBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  }
};

class HeaderBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    isOpen: PropTypes.bool,
    handleOpenDrawer: PropTypes.func.isRequired,
    title: PropTypes.string,
    hasDrawer: PropTypes.bool,
    height: PropTypes.number,
    textSize: PropTypes.number,
    textStyle: PropTypes.object,
    barStyle: PropTypes.object,
  };

  static defaultProps = {
    isOpen: true,
    title: 'This is Header',
    hasDrawer: true,
    height: 64,
    textSize: 16,
    textStyle: {},
    barStyle: {},
  };

  state = {
    key: 'lands',
  }

  componentDidMount() {
    if (window.location.hash.indexOf('/banner') > -1) {
      this.setState({
        key: 'banner',
      });
    } else if (window.location.hash.indexOf('/news') > -1) {
      this.setState({
        key: 'news',
      });
    } else if (window.location.hash.indexOf('/product') > -1) {
      this.setState({
        key: 'product',
      });
    }
  }

  handleClick = e => {
    const {
      setToken,
    } = this.props;
    this.setState({ key: e.key });
    switch (e.key) {
      case 'banner':
        hashHistory.push('/banner');
        break;
      case 'news':
        hashHistory.push('/news');
        break;
      case 'product':
        hashHistory.push('/product');
        break;
      case 'logout':
        Swal.fire({
          title: '是否要登出',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '確定',
        }).then((result) => {
          if (result.value) {
            setToken('');
            removeUserInformation();
          }
        })
        break;
      default:
        break;
    }
  }

  render() {
    const {
      title,
      height,
      textSize,
      textStyle, // 文字樣式
      barStyle, // HeaderBar 樣式
    } = this.props;
    const {
      key,
    } = this.state;
    return (
      <div>
        <div
          style={{ ...styles.appBar, height: height, ...barStyle }}
        >
          <div
            variant="h6"
            noWrap
            style={{
              ...styles.headerText,
              lineHeight: `${height}px`,
              fontSize: textSize,
              ...textStyle,
            }}
          >
            {title}
          </div>
          <div style={styles.itemBox}>
            <Menu
              mode="horizontal"
              selectedKeys={[key]}
              onClick={this.handleClick}
            >
              <Menu.Item style={styles.items}
                className={headerBarStyle.menuBox} key="banner">
                輪播圖管理
              </Menu.Item>
              <Menu.Item style={styles.items}
                className={headerBarStyle.menuBox} key="product">
                產品管理
              </Menu.Item>
              <Menu.Item style={styles.items}
                className={headerBarStyle.menuBox} key="news">
                最新消息管理
              </Menu.Item>
              <Menu.Item style={styles.items}
                className={headerBarStyle.menuBox} key="logout">
                登出
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderBar;

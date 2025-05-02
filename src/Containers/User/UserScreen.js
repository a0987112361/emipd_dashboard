import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Space, Input, } from 'antd';
import { Images, Screen } from 'src/Theme';
import hashHistory from '../../utils/HashHistory';

import "./UserScreen.css";
import moment from 'moment';
import Swal from 'sweetalert2';
import { UserActions } from 'src/Stores';

let timer;

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
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
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
    marginLeft: '40px',
  },
  contentBottom: {
    // overflowY: 'auto',
    width: '100%',
    height: '100%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  contentBottomTitle: {
    marginLeft: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  spaceStyle: {
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    padding: '10px 20px',
    marginTop: '30px',
  },
  inputStyle: {
    width: '317px',
    height: '40px',
    borderRadius: '5px',
    border: '1px solid #A6C1D3',
  }
};

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      searchValue: '',
      userId: '',
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getUserList, resetUserInfo } = this.props;

    this.setState({
      isLoading: true
    })
    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

    resetUserInfo();
    getUserList(callback, { now_page: 1, page_size: 10 });
  }

  handleChange = (pagination, filters, sorter) => {
    const { getUserList, paging } = this.props;
    const { searchValue } = this.state;

    let loginOrder;
    let createOrder;
    if (sorter.columnKey == 'login_time') {
      if (sorter.order == 'ascend') {
        loginOrder = 1
      } else if (sorter.order == 'descend') {
        loginOrder = -1
      } else {
        loginOrder = 0
      }
    } else if (sorter.columnKey == 'create_time') {
      if (sorter.order == 'ascend') {
        createOrder = 1
      } else if (sorter.order == 'descend') {
        createOrder = -1
      } else {
        createOrder = 0
      }
    }

    if (paging.now_page !== pagination.current) {
      this.setState({
        isLoading: true,
      });
      const callback = () => {
        this.setState({
          isLoading: false,
        });
      }
      getUserList(callback, { now_page: pagination.current, page_size: paging.page_size }, searchValue, loginOrder, createOrder);
    } else {
      this.setState({
        isLoading: true,
      });
      const callback = () => {
        this.setState({
          isLoading: false,
        });
      }
      getUserList(callback, { now_page: pagination.current, page_size: paging.page_size }, searchValue, loginOrder, createOrder);
    }
  }

  handleSearch = (e) => {
    const { getUserList, paging } = this.props;
    let value = e.target.value;

    const handleGetUserList = () => {
      this.setState({
        isLoading: true,
      });
      const callback = () => {
        this.setState({
          isLoading: false,
        });
      }

      if (value === '') {
        getUserList(callback, { now_page: 1, page_size: paging.page_size }, '');
        this.setState({
          searchValue: '',
        });
      } else {
        getUserList(callback, { now_page: 1, page_size: paging.page_size }, value);
        this.setState({
          searchValue: value,
        });
      }
    }

    function debounce(func, delay = 250) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay)
    }
    debounce(handleGetUserList, 500);
  }

  //刪除的提示框
  renderCheckModal(id) {
    Swal.fire({
      title: '確定要刪除嗎?',
      text: "資料刪除後無法恢復，如果要刪除請按確認",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#E21D53',
      cancelButtonColor: '#004C7C',
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleDelete(id)
        Swal.close()
      }
    })
  }

  handleDelete = (userId) => {
    const { deleteUser, paging } = this.props;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
      })
    }

    let id = [];
    id.push(userId);

    deleteUser(id, callback, paging);
  }

  render() {
    const {
      userList,
      paging = {
        now_page: 1,
        total: 0,
        page_size: 10,
      },
      screenHeight
    } = this.props;

    const columns = [
      {
        // width: '100px',
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        // width: '100px',
        title: '帳號',
        dataIndex: 'account',
        key: 'account',
        align: 'center',
      },
      ,
      {
        width: '150px',
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        render: (value) =>
          <div style={{ width: (Screen.screenWidth < 1367) && '200px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      },
      // {
      //   width: '100px',
      //   title: '會員等級',
      //   dataIndex: 'role_id',
      //   key: 'role_id',
      //   align: 'center',
      // },
      {
        // width: '100px',
        title: '最近登入日期',
        dataIndex: 'login_time',
        key: 'login_time',
        align: 'center',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => {
          // let aTimeString = moment(a.login_time).format('YYYY/MM/DD HH:mm:ss');
          // let bTimeString = moment(b.login_time).format('YYYY/MM/DD HH:mm:ss');
          // let aTime = new Date(aTimeString).getTime();
          // let bTime = new Date(bTimeString).getTime();
          // return aTime - bTime
        },
        render: (value) => {
          if (value === "0001-01-01T00:00:00") {
            return ("尚未登入")
          } else {
            return (moment(value).format('YYYY/MM/DD HH:mm:ss'))
          }
        }
      },
      {
        // width: '100px',
        title: '註冊日期',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => {
          //   let aTimeString = moment(a.create_time).format('YYYY/MM/DD HH:mm:ss');
          //   let bTimeString = moment(b.create_time).format('YYYY/MM/DD HH:mm:ss');
          //   let aTime = new Date(aTimeString).getTime();
          //   let bTime = new Date(bTimeString).getTime();
          //   return aTime - bTime
        },
        render: (value) => (moment(value).format('YYYY/MM/DD HH:mm:ss'))
      },
      {
        // width: '100px',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          <div>
            {/* <img
              src={Images.edit}
              onClick={() => hashHistory.push(`/user/update/${record.user_id}`)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src={Images.delete}
              onClick={() => this.renderCheckModal(record.user_id)}
              style={{ cursor: 'pointer', marginLeft: '15px' }}
            /> */}

            <Button
              onClick={() => hashHistory.push(`/user/update/${record.user_id}`)}
              style={{cursor: 'pointer', border: 'none', padding: '0px' }}
            >
              <img src={Images.edit} />
            </Button>
            <Button
              onClick={() => this.renderCheckModal(record.user_id)}
              style={{ cursor: 'pointer', border: 'none', padding: '15px' }}
            >
              <img src={Images.delete} />
            </Button>
          </div>
      },
    ];

    // 分頁樣式
    const renderPagination = (current, type, originalElement) => {
      if (type === 'prev') {
        return <a className="table-prev" >&lt;&nbsp;&nbsp;  Prev</a>;
      } if (type === 'next') {
        return <a>Next  &nbsp;&nbsp;&gt;</a>;
      }
      return originalElement;
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              會員管理
              <Button style={styles.btnStyle} onClick={() => hashHistory.push('/user/create')}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <Space style={styles.spaceStyle}>
              <Input
                placeholder='輸入關鍵字'
                style={styles.inputStyle}
                onChange={this.handleSearch}
              />
              {/*
                <Select
                allowClear
                showArrow
                showSearch
                mode="multiple"
                placeholder="請選擇會員等級"
                style={styles.inputStyle}
              >
                <Option value="青銅級">青銅級</Option>
                <Option value="白銀級">白銀級</Option>
              </Select>
              */}
            </Space>
            <div style={styles.contentBottom}>
              <Table
                id='user-table'
                onChange={this.handleChange}
                pagination={{
                  pageSize: paging.page_size || 10,
                  total: paging.total,
                  current: paging.now_page || 1,
                  showSizeChanger: false,
                  position: ['bottomCenter'],
                  itemRender: (current, type, originalElement) => renderPagination(current, type, originalElement)
                }}
                columns={columns}
                dataSource={userList}
                style={{ width: '100%'}}
                scroll={{ y:  screenHeight - 410 }}
              />
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
    userList: state.user.userList,
    paging: state.user.paging,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getUserList: UserActions.getUserList,
        deleteUser: UserActions.deleteUser,
        resetUserInfo: UserActions.resetUserInfo,
      },
      dispatch,
    ),
)(UserScreen);
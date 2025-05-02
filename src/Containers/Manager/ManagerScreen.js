import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Space, Input, Modal, Form} from 'antd';
import { Images, Screen } from 'src/Theme';

import "./ManagerScreen.css"
import moment from 'moment';
import Swal from 'sweetalert2';
import { ManagerActions, UserActions } from 'src/Stores';

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
  createBtnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
    marginLeft: '40px',
  },
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
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
    border: '1px solid #7D9EB5',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
  }
};

class ManagerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      searchValue: '',
      userId: '',
      currentUserInfo: {},
      viewModalVisible: false,
      viewUpdateModalVisible: false,
      queryPayload: {
        now_page: 1,
        page_size: 10,
        search: '',
        order: -1,
      },
      mode: 'create', // 預設模式
      currentId: '',
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount = () => {
    const { location } = this.props;

    let url = location.search;
    this.setState({
      url: url,
    }, () => {
      this.handleDataChange();
    });
  }

  // 路由改變會觸發
  componentWillReceiveProps(nextProps) {
    const { url } = this.state;
    if (nextProps.location.search !== url) {
      this.setState({ 
        url: nextProps.location.search,
      }, () => {
        this.handleDataChange();
      });
    }
  }

  // 列表api主要控制function(抓網址query去呼叫)
  handleDataChange = () => {
    const { location, paging, getManagerList } = this.props;
    
    //初始預設值
    let urlData = {
      now_page: 1,
      page_size: 10,
      search: '',
      order:0
    }; 

    if(window.location.href.indexOf('?') > -1){
      let url = location.search;
      let tempParams = new URLSearchParams(url);

      if(tempParams.get('search')){
        urlData['search'] = tempParams.get('search');
      } 

      if(tempParams.get('now_page')){
        urlData['now_page'] = parseInt(tempParams.get('now_page'));
      }
      
      if(tempParams.get('page_size')){
        urlData['page_size'] = parseInt(tempParams.get('page_size'));
      } 

      if(tempParams.get('order')){
        urlData['order'] = parseInt(tempParams.get('order'));
      }
    }

    let payload = {
      now_page: urlData.now_page,
      page_size: urlData.page_size,
      search: urlData.search,
      order: urlData.order
    };

    const callback = (value) => {
      this.setState({
        isLoading: false
      })
    }
    
    this.setState({
      isLoading: true,
      queryPayload: payload
    }, () => {
      getManagerList(payload, callback, this.errorCallback)
    });
  }

  // 路由帶query
  handleRouteChange = () => {
    const { history } = this.props;
    const { queryPayload } = this.state;
    this.setState({
      isLoading: false
    }, () => {
      history.push(`/manager?${queryPayload.search !== '' ? `search=${queryPayload.search}&` : ''}${queryPayload.now_page !== 1 ? `now_page=${queryPayload.now_page}&` : ''}${queryPayload.page_size !== 10 ? `page_size=${queryPayload.page_size}&` : ''}${queryPayload.order !== 0 ? `order=${queryPayload.order}` : ''}`);
    })
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  }

  // 關鍵字搜尋
  handleSearch = (e) => {
    let value = e.target.value;

    const handleGetList = () => {
      let newPayload = this.state.queryPayload;
      newPayload.search = value;
      newPayload.now_page = 1;

      this.setState({
        searchValue: (value === '') ? '' : value,
        isLoading: true,
        queryPayload: newPayload,
      }, () => {
        this.handleRouteChange();
      });
    }

    function debounce(func, delay = 250) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay)
    }
    debounce(handleGetList, 500);
  }

  // 換頁
  handleChange = (pagination, filters, sorter) => {
    const { paging } = this.props;
    let newPayload = this.state.queryPayload;
    let updateOrder = 0;

    if (sorter.order == 'ascend') {
      updateOrder = 1
    } else if (sorter.order == 'descend') {
      updateOrder = -1
    } else {
      updateOrder = 0
    }

    newPayload.order = updateOrder;
    if ((paging.now_page !== pagination.current) || (paging.page_size !== pagination.pageSize)) {
      newPayload.now_page = pagination.current;
      newPayload.page_size = pagination.pageSize;
    } 

    this.setState({
      isLoading: true,
      queryPayload: newPayload,
    }, () => {
      this.handleRouteChange();
    })
  }

  // 控制新增和編輯彈窗
  handleViewModal = (mode, id) => {
    const { getUserInfo } = this.props;

    const callback = (value) => {
      this.setState({
        currentId: value.user_id,
        currentUserInfo: value,
        isLoading: false,
        viewModalVisible: true,
      });
    }
    
    if(mode === 'update'){
      this.setState({
        isLoading: true,
        mode: 'update'
      }, () => {
        getUserInfo(id, callback, this.errorCallback)
      });
    }else{
      this.setState({
        mode: 'create',
        viewModalVisible: true,
      });
    }
  }

  // 刪除
  handleDelete = (managerId) => {
    const { deleteManager, paging } = this.props;
    const { queryPayload, } = this.state;

    let id = managerId.toString()
    let payload = [];
    payload.push(id)

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }
    console.log('payload =>', payload);

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
      if (result.value) {
        this.setState({
          isLoading: true,
        }, () => {
          deleteManager(payload, queryPayload, callback, this.errorCallback);
        })
      };
    });
  }

  closeModal() {
    this.setState({
      viewModalVisible: false,
    })
  }

  // 新增與更新
  handleSubmit = (value) => {
    const { createManager, updateManager, admin } = this.props;
    const { zhComputerImgData, zhPhoneImgData, enComputerImgData, enPhoneImgData, mainImageData, queryPayload, mode, currentId, } = this.state;

    let payload = {
      ...value,
      role_id: 'M002',
    }

    if(mode === 'update'){
      payload.user_id = currentId
    }else{
      payload.password = '0000'
    }

    const callback = () => {
      this.setState({
        isLoading: false,
        viewModalVisible: false,
      })
    }

    this.setState({
      isLoading: true,
    }, () => {
      if(mode === 'create'){
        createManager(payload, queryPayload, callback, this.errorCallback)
      }else{
        updateManager(payload, queryPayload, callback, this.errorCallback)
      }
    })
  }


  renderViewModal() {
    const { userInfo } = this.props;
    const { viewModalVisible, isLoading, mode, currentUserInfo } = this.state;

    return (
      <Modal
        title={(mode === 'create') ? '新增管理員' : '編輯管理員'}
        visible={viewModalVisible}
        width={520}
        height={520}
        centered
        onCancel={() => this.setState({ viewModalVisible: false })}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          initialValues={
            (mode === 'update') ?
            {
              ...currentUserInfo,
            }:
            {
            }
          }
          onFinish={this.handleSubmit}
          style={{ color: '#7D9EB5' }}
        >
          <Form.Item
            name="account"
            label={(mode === 'create') ? '帳號(預設首次登入密碼為0000)' : '帳號'}
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: '10px' }}
            rules={[
              { required: true, message: '此欄位不可為空!' },
              { max: 20, message: '最多輸入20碼' }
            ]}
          >
            <Input
              style={styles.inputStyle}
              placeholder='請輸入帳號'
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: '10px' }}
            rules={[{ required: true, message: '此欄位不可為空' }]}
          >
            <Input
              placeholder='請輸入姓名'
              style={styles.inputStyle}
            />
          </Form.Item>
          {/* {(mode === 'update') &&
            <div>
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
            </div>
          } */}

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Button style={styles.btnStyle} htmlType='submit' loading={isLoading}>
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }

  // handleCreate = (value) => {
  //   const { createManager } = this.props;
  //   this.setState({
  //     isLoading: true
  //   })

  //   const callback = (value) => {
  //     this.setState({
  //       isLoading: false,
  //       viewModalVisible: false,
  //     })
  //   }

  //   const errorCallback = (value) => {
  //     this.setState({
  //       isLoading: false,
  //     })
  //   }
  //   let payload = {
  //     ...value,
  //     role_id: 'M002',
  //     gender: 2
  //   }

  //   createManager(payload, callback, errorCallback);
  // }

  // renderUpdateViewModal = (value) => {
  //   this.setState({
  //     viewUpdateModalVisible: true,
  //     userInfo: value,
  //   });
  // }

  // renderUpdateModal() {
  //   const { viewUpdateModalVisible, userInfo, isLoading } = this.state;

  //   return (
  //     <Modal
  //       title="編輯管理員"
  //       visible={viewUpdateModalVisible}
  //       width={520}
  //       height={520}
  //       onCancel={() => this.setState({ viewUpdateModalVisible: false })}
  //       footer={null}
  //       maskClosable={false}
  //     >
  //       <Form
  //         name='basic'
  //         initialValues={{
  //           name: userInfo.name,
  //           email: userInfo.email
  //         }}
  //         onFinish={this.handleUpdate}
  //         style={{ color: '#7D9EB5' }}
  //       >
  //         <div style={styles.formTop}>
  //           <span
  //             style={{
  //               fontSize: '16px',
  //               fontWeight: 'bold',
  //               color: '#7D9EB5',
  //               // margin: '0px 0px 20px 5px'
  //             }}
  //           >
  //             帳號 &nbsp;{userInfo.account}
  //           </span>
  //         </div>
  //         <Form.Item
  //           name="password"
  //           label="密碼"
  //           colon={false}
  //           labelCol={{ span: 24 }}
  //           wrapperCol={{ span: 24 }}
  //           style={{ marginTop: '10px' }}
  //         >
  //           <Input.Password
  //             style={styles.inputStyle}
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           name="passwordCheck"
  //           label="確認密碼"
  //           colon={false}
  //           labelCol={{ span: 24 }}
  //           wrapperCol={{ span: 24 }}
  //           // rules={[{ required: true, message: '此欄位不可為空' }]}
  //           dependencies={['password']}
  //           rules={[
  //             ({ getFieldValue }) =>
  //               ({
  //                 validator(_, value) {
  //                   if (getFieldValue('password') != value && value == null) {
  //                     return Promise.reject(new Error('此欄位不可為空'));
  //                   } else if (!value || getFieldValue('password') === value) {
  //                     return Promise.resolve();
  //                   }
  //                   return Promise.reject(new Error('與新密碼不一致'));
  //                 },
  //               }),
  //           ]}
  //           style={{ marginTop: '10px' }}
  //         >
  //           <Input.Password
  //             style={styles.inputStyle}
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           name="name"
  //           label="姓名"
  //           colon={false}
  //           labelCol={{ span: 24 }}
  //           wrapperCol={{ span: 24 }}
  //           rules={[{ required: true, message: '此欄位不可為空' }]}
  //           style={{ marginTop: '10px' }}
  //         >
  //           <Input
  //             placeholder='請輸入姓名'
  //             style={styles.inputStyle}
  //           />
  //         </Form.Item>
  //         <Form.Item
  //           name="email"
  //           colon={false}
  //           label="信箱"
  //           labelCol={{ span: 24 }}
  //           wrapperCol={{ span: 24 }}
  //           rules={[
  //             {
  //               type: 'email',
  //               message: '格式錯誤',
  //             },
  //             {
  //               required: true,
  //               message: '此欄位不可為空',
  //             },
  //           ]}
  //           style={{ marginTop: '10px' }}
  //         >
  //           <Input
  //             placeholder="請輸入信箱"
  //             style={styles.inputStyle}
  //           />
  //         </Form.Item>
  //         <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
  //           <Button style={styles.btnStyle} htmlType='submit' loading={isLoading}>
  //             儲存
  //           </Button>
  //         </div>
  //       </Form>
  //     </Modal>
  //   )
  // }
  
  // handleUpdate = (value) => {
  //   const { userInfo } = this.state;
  //   const { updateManager, changePassword } = this.props;
  //   this.setState({
  //     isLoading: true
  //   })

  //   const callback2 = () => {
  //     this.setState({
  //       isLoading: false,
  //       viewUpdateModalVisible: false,
  //     })
  //   }

  //   const errorCallback = (value) => {
  //     this.setState({
  //       isLoading: false,
  //     })
  //   }

  //   if(value.password != undefined)
  //   {
  //     const callback = () => {
  //       this.setState({
  //         isLoading: false,
  //         viewUpdateModalVisible: false,
  //       })
  //     }
      
  //     let payload = {};
  //     payload = { user_id: userInfo.user_id, new_password: value.password };
  //     changePassword(payload, callback, errorCallback);
  //   }

  //   let payload = {
  //     ...value,
  //     user_id: userInfo.user_id,
  //     role_id: 'M002',
  //     gender: 2
  //   }
  //   updateManager(payload, callback2, errorCallback);
  // }

  // //刪除的提示框
  // renderCheckModal(id) {
  //   Swal.fire({
  //     title: '確定要刪除嗎?',
  //     text: "資料刪除後無法恢復，如果要刪除請按確認",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     reverseButtons: true,
  //     confirmButtonText: '確定刪除',
  //     cancelButtonText: '取消',
  //     confirmButtonColor: '#E21D53',
  //     cancelButtonColor: '#004C7C',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.handleDelete(id)
  //       Swal.close()
  //     }
  //   })
  // }

  // handleDelete = (userId) => {
  //   const { deleteManager } = this.props;

  //   this.setState({
  //     isLoading: true,
  //   });
  //   const callback = () => {
  //     this.setState({
  //       isLoading: false,
  //     })
  //   }

  //   const errorCallback = (value) => {
  //     this.setState({
  //       isLoading: false,
  //     })
  //   }

  //   let id = [];
  //   id.push(userId);

  //   deleteManager(id, callback, errorCallback);
  // }

  render() {
    const { viewModalVisible, viewUpdateModalVisible } = this.state;
    const {
      screenHeight,
      managerList,
      paging = {
        now_page: 1,
        total: 0,
        page_size: 10,
      }
    } = this.props;

    const columns = [
      {
        width: '15%',
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        width: '70%',
        title: '帳號',
        dataIndex: 'account',
        key: 'account',
        align: 'left',
      },
      // {
      //   width: '55%',
      //   title: 'E-mail',
      //   dataIndex: 'email',
      //   key: 'email',
      //   align: 'center',
      //   render: (value) =>
      //     <div style={{ width: (Screen.screenWidth < 1367) && '200px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      // },
      // {
      //   // width: '100px',
      //   title: '最近登入日期',
      //   dataIndex: 'login_time',
      //   key: 'login_time',
      //   align: 'center',
      //   render: (value) => {
      //     if (value === "0001-01-01T00:00:00" || value === undefined) {
      //       return ("尚未登入")
      //     } else {
      //       return (moment(value).format('YYYY/MM/DD HH:mm:ss'))
      //     }
      //   }
      // },
      {
        width: '15%',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          <div>
            <Button
              style={{cursor: 'pointer', border: 'none', padding: '0px'}}
              onClick={() => this.handleViewModal('update', record.user_id)}
            >
              <img src={Images.edit} />
            </Button>
            <Button
              style={{ cursor: 'pointer', border: 'none', marginLeft: '15px' }}
              onClick={() => this.handleDelete(record.user_id)}
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
              管理員
              <Button style={styles.createBtnStyle} onClick={() => this.handleViewModal('create')}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <Space style={styles.spaceStyle}>
              <Input
                style={{ width: '317px', height: '40px', borderRadius: '5px', border: '1px solid #A6C1D3', }}
                placeholder='輸入關鍵字'
                onChange={this.handleSearch}
              />
            </Space>
            <div style={styles.contentBottom}>
              <Table
                // id='table'
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
                dataSource={managerList}
                style={{ width: '100%' }}
                scroll={{ y:  screenHeight - 410 }}
              />
            </div>
          </div>
        </div>
        {viewModalVisible && this.renderViewModal()}
        {viewUpdateModalVisible && this.renderUpdateModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    managerList: state.manager.managerList,
    paging: state.manager.paging,
    userInfo: state.user.userInfo,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getManagerList: ManagerActions.getManagerList,
        getUserInfo: UserActions.getUserInfo,
        createManager: ManagerActions.createManager,
        updateManager: ManagerActions.updateManager,
        changePassword: ManagerActions.changePassword,
        deleteManager: ManagerActions.deleteManager,
      },
      dispatch,
    ),
)(ManagerScreen);
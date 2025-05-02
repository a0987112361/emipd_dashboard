import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Modal, Form, Input, Switch } from 'antd';
import { FormInput } from 'src/Components';
import { Images, Colors } from 'src/Theme';
import { CheckOutlined } from '@ant-design/icons';

import _ from 'lodash';
import Swal from 'sweetalert2';
import { StatusActions } from 'src/Stores';


const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
    overflowY: 'hidden',
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
  inputStyle: {
    border: '1px solid #7D9EB5',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
  },
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
  },
  contentBottom: {
    width: '100%',
    height: '100%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
};

class StatusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      viewModalVisible: false,
      viewUpdateModalVisible: false,
      checkModalVisible: false,
      statusId: ''
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount = () => {
    const { getStatusList } = this.props

    this.setState({
      isLoading: true
    });

    const callback = () => {
      this.setState({
        isLoading: false
      })
    };

    getStatusList('', callback);
  }

  handleCreate = (value) => {
    const { createStatus } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = () => {
      this.setState({
        isLoading: false,
        viewModalVisible: false
      })
    };

    createStatus(value, callback);
  }

  handleUpdate = (value) => {
    const { updateStatus } = this.props;
    const { statusId } = this.state;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
        viewUpdateModalVisible: false,
      })

    }

    let payload = {
      ...value,
      cart_status_id: statusId,
    };

    updateStatus(payload, callback);


  }

  handleDelete = (statusId) => {
    const { deleteStatus } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = () => {
      this.setState({
        isLoading: false,
        checkModalVisible: false,
      })
    }

    let id = [];
    id.push(statusId);

    deleteStatus(id, callback);
  }

  renderViewModal = () => {
    this.setState({
      viewModalVisible: true,
    });
  }

  renderUpdateViewModal = (id) => {
    const { getStatusDetail } = this.props;
    this.setState({
      isLoading: true,
      statusId: id
    });

    const callback = () => {
      this.setState({
        viewUpdateModalVisible: true,
        isLoading: false,
      });
    }

    getStatusDetail(id, callback);
  }

  renderCreateModal() {
    const { viewModalVisible } = this.state;

    return (
      <Modal
        title="新增訂單狀態"
        visible={viewModalVisible}
        width={520}
        height={520}
        onCancel={() => this.setState({ viewModalVisible: false })}
        footer={null}
      >
        <Form
          name='basic'
          initialValues={{
          }}
          onFinish={this.handleCreate}
          style={{ color: '#7D9EB5' }}
        >
          <FormInput
            required
            title="狀態名稱"
            propName="cart_status_name"
            requiredErrorMessage="請輸入狀態名稱"
            placeholder="請輸入狀態名稱"
          />
          {/*
         <Form.Item
            name="is_open"
            label="是否通知顧客"
            labelCol={4}
            colon={false}
            valuePropName="checked"
            style={{ marginTop: '10px' }}
          >
            <Switch
              onChange={this.onSwitchChange}
            />
          </Form.Item>
        */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <Button style={styles.btnStyle} htmlType='submit'>
              儲存
            </Button>
          </div>
        </Form>
      </Modal >
    )
  }

  renderUpdateModal() {
    const { viewUpdateModalVisible } = this.state;
    const { status } = this.props;

    return (
      <Modal
        title="編輯訂單狀態"
        visible={viewUpdateModalVisible}
        width={520}
        height={520}
        onCancel={() => this.closeUpdateModal()}
        footer={null}
      >
        <Form
          name='basic'
          initialValues={{
            ...status,
          }}
          onFinish={this.handleUpdate}
          style={{ color: '#7D9EB5' }}
        >
          <FormInput
            required
            title="狀態名稱"
            propName="cart_status_name"
            requiredErrorMessage="請輸入狀態名稱"
          />
          <Form.Item
            name="is_open"
            label="是否通知顧客"
            labelCol={4}
            colon={false}
            valuePropName="checked"
            rules={[{ required: true, message: '此欄位不可為空！' }]}
            style={{ marginTop: '10px' }}
          >
            <Switch
              onChange={this.onSwitchChange}
            />
          </Form.Item>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <Button style={styles.btnStyle} htmlType='submit'>
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }

  closeUpdateModal() {
    const { resetStatusDetail } = this.props;

    this.setState({
      viewUpdateModalVisible: false
    })

    resetStatusDetail();
  }

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

  //直接在列表修改狀態
  handleChangeSwitch = (value) => {
    const { updateStatus } = this.props;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
      })
    }

    let payload = {
      ...value,
      is_open: !value.is_open
    }
    updateStatus(payload, callback);
  }



  render() {
    const { statusList } = this.props;
    const { viewModalVisible } = this.state;

    // 分頁樣式
    const renderPagination = (current, type, originalElement) => {
      if (type === 'prev') {
        return <a className="table-prev" >&lt;&nbsp;&nbsp;  Prev</a>;
      } if (type === 'next') {
        return <a>Next  &nbsp;&nbsp;&gt;</a>;
      }
      return originalElement;
    }

    const columns = [
      {
        width: '30px',
        title: '狀態名稱',
        dataIndex: 'cart_status_name',
        key: 'cart_status_name',
        align: 'center'
      },
      {
        width: '100px',
        title: '是否通知',
        dataIndex: 'is_open',
        key: 'is_open',
        align: 'center',
        render: (value, record) => (
          <div>
            <Switch
              checkedChildren={<CheckOutlined />}
              checked={record.is_open}
              onChange={() => this.handleChangeSwitch(record)}
            />
          </div>
        ),
      },
      {
        width: '50px',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          <div>
            <img
              src={Images.edit}
              onClick={() => this.renderUpdateViewModal(record.cart_status_id)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src={Images.delete}
              onClick={() => this.renderCheckModal(record.cart_status_id)}
              style={{ marginLeft: '15px', cursor: 'pointer' }}
            />
            {this.state.viewUpdateModalVisible && this.renderUpdateModal()}
          </div>
      },
    ];

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              <span style={{ marginRight: '40px' }}>訂單狀態管理</span>
              <Button style={styles.btnStyle} onClick={() => this.renderViewModal()}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <div style={styles.contentBottom} >
              <Table
                id='table'
                onChange={this.handleChange}
                pagination={{
                  // pageSize: paging.page_size || 10,
                  // total: paging.total,
                  // current: paging.now_page || 1,
                  showSizeChanger: false,
                  position: ['bottomCenter'],
                  itemRender: (current, type, originalElement) => renderPagination(current, type, originalElement)
                }}
                columns={columns}
                dataSource={statusList}
                style={{ width: '100%', height: '90%', overflowY: 'auto' }}
              // scroll={{ y: 500 }}
              />
            </div>
          </div>
        </div>
        {viewModalVisible && this.renderCreateModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    statusList: state.status.statusList,
    status: state.status.status
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getStatusList: StatusActions.getStatusList,
        getStatusDetail: StatusActions.getStatusDetail,
        createStatus: StatusActions.createStatus,
        updateStatus: StatusActions.updateStatus,
        deleteStatus: StatusActions.deleteStatus,
        resetStatusDetail: StatusActions.resetStatusDetail,
      },
      dispatch,
    ),
)(StatusScreen);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Form, Tabs } from 'antd';
import { DataTable, FormInputSelect, FormTextarea } from 'src/Components';
import { Images } from 'src/Theme';

import _ from 'lodash';
import { ContactActions } from 'src/Stores';

const { TabPane } = Tabs;

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
    border: '1px solid #A6C1D3',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
  },
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '65px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: '4px',
    marginLeft: '20px',
  },
  btnStyle2: {
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
  datePickerStyle: {
    border: '1px solid #A6C1D3',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
    color: '#7D9EB5'
  }
};

class ContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      viewModalVisible: false,
      viewUpdateModalVisible: false,
      checkModalVisible: false,
      contactId: '',
      dealList: [],
      unDealList: [],
      tabStatus: '0',
      tab: 1, // 分頁標籤
      currentId: '',
      action: ''
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount = () => {
    this.setState({
      isLoading: true,
    }, () => {
      this.handleTabChange(1)
    });
  }

  handleUpdate = (value) => {
    const { updateContact, contactInfo } = this.props;

    const callback = () => {
      this.setState({
        isLoading: false,
        viewUpdateModalVisible: false
      })
    }

    let payload = {
      contact_form_id: contactInfo.contact_form_id,
      is_deal: value.is_deal === 0 ? false : true,
    }

    if(!_.isNil(value.remark)){
      payload.remark = value.remark
    }

    this.setState({
      isLoading: true,
    }, () => {
      updateContact(payload, {now_page: 1, page_size: 10}, callback, this.errorCallback);
    });
  }

  renderUpdateViewModal = (id, dealAction) => {
    const { getContactInfo } = this.props;
    
    const callback = (value) => {
      this.setState({
        currentData: value,
        isLoading: false,
        viewUpdateModalVisible: true
      }, () => {
        this.renderUpdateModal()
      });
    }

    this.setState({
      isLoading: true,
      action: dealAction,
      currentId: id
    }, () => {
      getContactInfo(id, callback, this.errorCallback);
    });
  }

  renderUpdateModal() {
    const { contactInfo } = this.props;
    const { viewUpdateModalVisible, tab, isLoading, currentId } = this.state;

    const contactStatusOption = [
      {id: 0,name: '未處理'},
      {id: 1,name: '已完成'}
    ]

    return (
      <Modal
        title="聯絡表單回應內容"
        visible={viewUpdateModalVisible}
        width={520}
        height={520}
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          initialValues={{
            ...contactInfo,
            is_deal: contactInfo.is_deal ? 1 : 0
          }}
          onFinish={this.handleUpdate}
          style={{ color: '#7D9EB5' }}
        >
          <div>
            <FormInputSelect
              title="處理狀態"
              required
              options={contactStatusOption}
              propName='is_deal'
              placeholder="請選擇處理狀態"
              requiredErrorMessage="請選擇處理狀態"
            />

            <FormTextarea
              title="備註"
              propName="remark"
              placeholder="請輸入備註"
              rowHeight={6}
            />
          </div>
          <div style={{ width: '100%', borderTop: '1px solid #C2D7E6', marginTop: '30px', paddingTop: '30px' }}>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.4em' }}>聯絡人</p>
            <p style={{ fontSize: '14px', }}>{contactInfo.contact_form_name}</p>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.4em' }}>信箱</p>
            <p style={{ fontSize: '14px', }}>{contactInfo.contact_form_email}</p>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.4em' }}>主旨</p>
            <p style={{ fontSize: '14px', }}>{contactInfo.contact_form_title}</p>
            <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.4em' }}>訊息內容</p>
            <p style={{ fontSize: '14px', }}>{contactInfo.contact_form_content}</p>
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button style={styles.btnStyle2} htmlType='submit' loading={isLoading}>
              確定
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }

  closeModal() {
    this.setState({
      viewUpdateModalVisible: false,
      viewModalVisible: false,
    })
  }

  // renderReadModal(id, dealAction, remark) {
  //   console.log('remark =>', remark);
  //   Swal.fire({
  //     title: '是否將狀態改為「' + `${dealAction === true ? '已處理' : '待處理'}` + '」?',
  //     text: '原備註內容為：' + `${remark}`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     reverseButtons: true,
  //     confirmButtonText: '確定變更',
  //     cancelButtonText: '取消',
  //     confirmButtonColor: '#E21D53',
  //     cancelButtonColor: '#004C7C',
  //     input: 'textarea',
  //     inputLabel: 'remark',
  //     inputPlaceholder: '請輸入備註內容',
  //     inputLabelAttributes: {
  //       'for': 'remark'
  //     },
  //     inputAttributes: {
  //       'name': 'remark'
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.handleUpdate(id, dealAction, result.value)
  //       Swal.close()
  //     }
  //   })
  // }

  handleChange = (pagination, filters, sorter) => {
    const { getContactList, unDealPaging } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = (value) => {
      this.setState({
        isLoading: false,
        unDealList: value.list
      })
    }

    getContactList(callback, { now_page: pagination.current, page_size: unDealPaging.page_size }, '0');
  }

  handleChange2 = (pagination, filters, sorter) => {
    const { getContactList, dealPaging } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = (value) => {
      this.setState({
        isLoading: false,
        dealList: value.list
      })
    }

    getContactList(callback, { now_page: pagination.current, page_size: dealPaging.page_size }, '1');
  }

  renderUnDeal = () => {
    const { getContactList } = this.props;

    this.setState({
      isLoading: true
    })

    const callback = (value) => {
      this.setState({
        isLoading: false,
        unDealList: value.list
      })
    }

    getContactList(callback, { now_page: 1, page_size: 10 }, '0');
  }

  renderDeal = () => {
    const { getContactList } = this.props;

    this.setState({
      isLoading: true
    })
    const callback = (value) => {
      this.setState({
        isLoading: false,
        dealList: value.list
      })
    }

    getContactList(callback, { now_page: 1, page_size: 10 }, '1');

  }

  handleTabChange = (key) => {
    const { getContactList, paging } = this.props;
    let currentKey = Number(key);

    let payload = {
      now_page: paging.now_page,
      page_size: paging.page_size,
    };

    const callback = (value) => {
      this.setState({
        isLoading: false
      })
    }

    this.setState({
      isLoading: true,
      tab: currentKey
    }, () => {
        getContactList(payload, callback, this.errorCallback);
    });
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      contactList,
      dealList,
      unDealList,
      screenHeight,
      dealPaging,
      unDealPaging
    } = this.props;

    const { viewUpdateModalVisible, tab } = this.state;


    const columns = [
      // {
      //   // width: '100px',
      //   title: '日期',
      //   dataIndex: 'create_time',
      //   key: 'create_time',
      //   align: 'center',
      //   render: (value) => moment(value).format('YYYY/MM/DD HH:mm:ss')
      // },
      {
        width: '15%',
        title: '聯絡人',
        dataIndex: 'contact_form_name',
        key: 'contact_form_name',
        align: 'center'
      },
      {
        width: '20%',
        title: '信箱',
        dataIndex: 'contact_form_email',
        key: 'contact_form_email',
        align: 'left'
      },
      {
        // width: '200px',
        title: '主旨',
        dataIndex: 'contact_form_title',
        key: 'contact_form_title',
        render: (value) =>
          <div style={{ width: '200px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      },
      {
        // width: '200px',
        title: '訊息',
        dataIndex: 'contact_form_content',
        key: 'contact_form_content',
        render: (value) =>
          <div style={{ width: '200px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      },
      {
        // width: '200px',
        title: '備註',
        dataIndex: 'remark',
        key: 'remark',
        render: (value) =>
          <div style={{ width: '200px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      },
      // {
        // width: '150px',
      //   title: '備註',
      //   dataIndex: 'contact_note',
      //   key: 'contact_note',
      //   render: (value) =>
      //     <div style={{ width: '150px', overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      // },
      {
        // width: '100px',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {record.is_deal === false ?
              <img
                src={Images.edit}
                onClick={() => this.renderUpdateViewModal(record.contact_form_id, true)}
                style={{ cursor: 'pointer' }}
              />
              :
              <Button
                onClick={() => this.renderUpdateViewModal(record.contact_form_id, false)}
                style={styles.btnStyle}
              >
                復原
              </Button>
            }
          </div>
      },
    ];

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              <span style={{ marginRight: '40px' }}>聯絡表單回應</span>
            </div>
            <div style={styles.contentBottom} >
              <Tabs defaultActiveKey={tab} onChange={this.handleTabChange} >
                <TabPane tab="未處理" key="1" style={styles.tabStyle}>
                  <DataTable
                    column={columns}
                    data={unDealList}
                    isRowSelection={false}
                    showCreateButton={false}
                    showDeleteButton={false}
                    showSearch={false}
                    hasPagination={true}
                    // isLoading={isLoading}
                    paging={unDealPaging}
                    handleChange={this.handleChange}
                    hasCustomChildren
                    scroll={{ y:  screenHeight - 391 }}
                  />
                </TabPane>
                <TabPane tab="已處理" key="2" style={styles.tabStyle}>
                  <DataTable
                    column={columns}
                    data={dealList}
                    isRowSelection={false}
                    showCreateButton={false}
                    showDeleteButton={false}
                    showSearch={false}
                    hasPagination={true}
                    paging={dealPaging}
                    handleChange={this.handleChange2}
                    hasCustomChildren
                    scroll={{ y:  screenHeight - 391 }}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        {viewUpdateModalVisible && this.renderUpdateModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    // contactTypeList: state.contact.contactTypeList,
    contactList: state.contact.contactList,
    dealList: state.contact.dealList,
    unDealList: state.contact.unDealList,
    paging: state.contact.paging,
    contactInfo: state.contact.contactInfo,
    dealPaging: state.contact.dealPaging,
    unDealPaging: state.contact.unDealPaging,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getContactList: ContactActions.getContactList,
        getContactInfo: ContactActions.getContactInfo,
        updateContact: ContactActions.updateContact,
        deleteContact: ContactActions.deleteContact,
        // resetContactDetail: ContactActions.resetContactDetail,
        // changeContactStatus: ContactActions.changeContactStatus,
      },
      dispatch,
    ),
)(ContactScreen);

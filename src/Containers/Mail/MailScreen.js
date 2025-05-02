import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Modal, Form, Input, Upload, DatePicker, Radio } from 'antd';
import { FormTextarea, DataTable } from 'src/Components';
import { Images, Colors } from 'src/Theme';
import moment from 'moment';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { MailActions } from 'src/Stores';

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
  inputStyle: {
    border: '1px solid #7D9EB5',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
    color: '#004C7C'
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
    overflowY: 'hidden'
  },
  contentBottomTitle: {
    marginLeft: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  imgWebDiv: {
    width: '180px',
    height: '80px',
    display: 'block',
    overflow: 'hidden',
    margin: 'auto'
  },
  imgPhoneDiv: {
    width: '80px',
    height: '105px',
    display: 'block',
    overflow: 'hidden',

    margin: 'auto'
  },
  imgStyle: {
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    border: 'none',
  }
};

class MailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      viewModalVisible: false,
      viewUpdateModalVisible: false,
      loading: false,
      searchValue: '',
      checkModalVisible: false,
      isShow: false,
      mailData: [],
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount = () => {
    const { getMailList } = this.props

    const callback = () => {
      this.setState({
        isLoading: false,
        isShow: true,
      })
    }
    getMailList(callback, { now_page: 1, page_size: 10 })
  }


  renderViewModal = () => {
    this.setState({
      viewModalVisible: true,
    });
  }

  renderUpdateViewModal = (id) => {
    const { getMailDetail, Mail } = this.props;
    const { mailData } = this.state;

    this.setState({
      isLoading: true,
      loading: true
    });

    const callback = (value) => {
      this.setState({
        viewUpdateModalVisible: true,
        isLoading: false,
        mailData: value
      });
    }

    getMailDetail(id, callback);
  }

  renderCreateModal() {
    const { viewModalVisible } = this.state;

    return (
      <Modal
        title="新增系統信件"
        visible={viewModalVisible}
        width={520}
        height={520}
        onCancel={() => this.setState({ viewModalVisible: false })}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          initialValues={{
            sendObject:1,
          }}
          onFinish={this.handleCreate}
          // style={{ color: '#7D9EB5' }}
        >
          <Form.Item
            name="notice_title"
            label="主旨 "
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請輸入主旨!' }]}
          >
            <Input
              style={styles.inputStyle}
              placeholder="請輸入主旨"
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="發佈日期 "
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請輸入發佈日期!' }]}
          >
            <DatePicker style={styles.inputStyle} placeholder="請輸入發佈日期" disabledDate={this.handleDate} />
          </Form.Item>

          <Form.Item
            name="sendObject"
            label="對象"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請選擇發送對象!' }]}
          >
            <Radio.Group>
              <Radio value={1} style={{color: '#7D9EB5'}}>所有會員</Radio>
              {/* <Radio value={2}>B</Radio> */}
            </Radio.Group>  
          </Form.Item>

          <FormTextarea
            title="發送內容 "
            propName="notice_content"
            rowHeight={6}
            required
            requiredErrorMessage="請輸入發送內容"
            placeholder="請輸入發送內容"
          />

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Button style={styles.btnStyle} htmlType='submit'>
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }

  closeUpdateModal() {
    const { resetMailDetail } = this.props;

    this.setState({
      viewUpdateModalVisible: false
    })

    resetMailDetail();
  }

  handleDate = (time) => {
    return time &&  time.valueOf() < moment().subtract(1, 'days');// Can not select days before today and today
  }

  renderUpdateModal() {
    const { viewUpdateModalVisible, loading } = this.state;
    const { Mail } = this.props;

    let updateSendObject='';

    if(Mail.user_types_name === '所有會員'){
      updateSendObject = 1;
    }

    return (
      <Modal
        title="編輯系統信件"
        visible={viewUpdateModalVisible}
        width={520}
        height={520}
        onCancel={() => this.closeUpdateModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          initialValues={{
            ...Mail,
            notice_time: moment(Mail.notice_time),
            sendObject:updateSendObject,
          }}
          onFinish={this.handleUpdate}
          // style={{ color: '#7D9EB5' }}
        >
          <Form.Item
            name="notice_title"
            label="主旨 "
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請輸入主旨!' }]}
          >
            <Input
              style={styles.inputStyle}
              placeholder="請輸入主旨"
            />
          </Form.Item>

          <Form.Item
            name="notice_time"
            label="發佈日期 "
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請輸入發佈日期!' }]}
          >
            <DatePicker placeholder="請輸入發佈日期" style={styles.inputStyle} disabledDate={this.handleDate} />
          </Form.Item>

          <Form.Item
            name="sendObject"
            label="對象"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: '請選擇發送對象!' }]}
          >
            <Radio.Group>
              <Radio value={1} style={{color: '#7D9EB5'}}>所有會員</Radio>
              {/* <Radio value={2}>B</Radio> */}
            </Radio.Group>  
          </Form.Item>

          <FormTextarea
            title="發送內容 "
            propName="notice_content"
            rowHeight={6}
            required
            requiredErrorMessage="請輸入發送內容"
            placeholder="請輸入發送內容"
          />


          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Button style={styles.btnStyle} htmlType='submit'>
              儲存
            </Button>
          </div>

        </Form>
      </Modal>
    )
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

  handleUpdate = (value) => {
    const { updateMail, Mail } = this.props;

    let currentDateTime = moment().format('YYYY-MM-DD');
    let time =  '';
    let all;

    this.setState({
      isLoading: true,
    });
    const callback = (data) => {
      this.setState({
        isLoading: false,
        viewUpdateModalVisible: false,
      })
    }

    if(value.sendObject === 1 && (value.notice_time.format('YYYY-MM-DD') === currentDateTime)){
      time = !_.isEmpty(value.notice_time) ? moment(value.notice_time).format('YYYY-MM-DD') + 'T' + moment().add(1, 'minutes').format('HH:mm:ss') : Mail.notice_time;
      all = true;
    } else if(value.sendObject === 1){
      time = !_.isEmpty(value.notice_time) ? moment(value.notice_time).format('YYYY-MM-DDTHH:mm:ss') : Mail.notice_time;
      all = true;
    } else {
      all = false;
    }

    let payload = {
      "notice_id": Mail.notice_id,
      "notice_title": value.notice_title,
      "notice_content": value.notice_content,
      "notice_time": time,
      "notice_type_id": Mail.notice_type_id,
      "is_all":all,
    }
    updateMail(payload, callback);
  }

  handleCreate = (value) => {
    const { createMail, Mail } = this.props;

    let currentDateTime = moment().format('YYYY-MM-DD');
    let time =  '';
    let all;

    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
        viewModalVisible: false,
      })
    }

    if(value.sendObject === 1 && (value.time.format('YYYY-MM-DD') === currentDateTime)){
      time =  moment(value.time).format('YYYY-MM-DD') + 'T' + moment().add(1, 'minutes').format('HH:mm:ss');
      all = true;
    } else if(value.sendObject === 1) {
      time =  moment(value.time).format('YYYY-MM-DDTHH:mm:ss');
      all = true;
    } else {
      all = false;
    }

    let payload = {
      "notice_title": value.notice_title,
      "notice_content": value.notice_content,
      "notice_time": time,
      "notice_type_id": "systemmail",
      "is_all":all,
    }
    createMail(payload, callback);
  }

  handleDelete = (id) => {
    const { deleteMail } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = () => {
      this.setState({
        isLoading: false,
        checkModalVisible: false,
      })
    }

    let mailId = [];
    mailId.push(id);

    deleteMail(mailId, callback);
  }


  handleChange = (pagination) => {
    const { getMailList, Paging } = this.props;

    this.setState({
      isLoading: true,
    });

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

    getMailList(callback, { now_page: pagination.current, page_size: Paging.page_size });
  }

  render() {
    const { viewModalVisible, isShow, viewUpdateModalVisible } = this.state;
    const { screenHeight, MailList, Paging } = this.props;

    if (!isShow) {
      return null;
    }

    const columns = [
      {
        width: '250px',
        title: '主旨',
        dataIndex: 'notice_title',
        key: 'notice_title',
        align: 'left',
        render: (value, record) =>
          <div style={{textAlign: 'left', color: '#223345'}}>
            {value}
          </div>
      },
      {
        width: '100px',
        title: '發送日期',
        dataIndex: 'notice_time',
        key: 'notice_time',
        align: 'center',
        render: (value, record) => 
          <div style={{color: '#223345'}}>
            {(moment(record.notice_time).format('YYYY/MM/DD'))}
          </div>
      },
      // {
      //   width: '200px',
      //   title: '發送對象',
      //   dataIndex: 'putOn',
      //   key: 'putOn',
      //   align: 'center',
      //   render: (value, record) => (
      //     <div>

      //     </div>
      //   ),
      // },
      {
        width: '50px',
        title: '操作',
        dataIndex: 'setting',
        key: 'setting',
        align: 'center',
        render: (value, record) =>
          {
            return <div>
                      {/* 對編輯和刪除按鈕加上判斷(把日期先轉換為一串純文字，再比較發送日期是否比當天晚) */}
                      <Button
                        onClick={moment(record.notice_time).format('YYYYMMDD') > moment().format('YYYYMMDD') ? () => this.renderUpdateViewModal(record.notice_id) : () => {} }
                        style={{
                          border: 'none',
                          cursor: moment(record.notice_time).format('YYYYMMDD') > moment().format('YYYYMMDD') ? 'pointer' : 'not-allowed'
                        }}
                      >
                        <img src={Images.edit} />
                      </Button>
                      <Button
                        onClick={moment(record.notice_time).format('YYYYMMDD') > moment().format('YYYYMMDD') ? () => this.renderCheckModal(record.notice_id) : () => {} }
                        style={{
                          border: 'none',
                          // marginLeft: '15px',
                          cursor: moment(record.notice_time).format('YYYYMMDD') > moment().format('YYYYMMDD') ? 'pointer' : 'not-allowed'
                        }}
                      >
                        <img src={Images.delete} />
                      </Button>
                  </div>
          }
          
      },
    ];

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              <span style={{ marginRight: '40px' }}>系統信件管理</span>
              <Button style={styles.btnStyle} onClick={() => this.renderViewModal()}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <div style={styles.contentBottom} id='mail-table' >
              <DataTable
                column={columns}
                data={MailList}
                isRowSelection={false}
                showCreateButton={false}
                showDeleteButton={false}
                showSearch={false}
                hasPagination={true}
                paging={Paging}
                handleChange={this.handleChange}
                // hasCustomChildren
                tableStyle={{ width: '100%', }}
                scroll={{ y:  screenHeight - 321 }}
              />

            </div>
          </div>
        </div>
        {viewModalVisible && this.renderCreateModal()}
        {viewUpdateModalVisible && this.renderUpdateModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    MailList: state.mail.MailList,
    Mail: state.mail.Mail,
    Paging: state.mail.Paging,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getMailList: MailActions.getMailList,
        getMailDetail: MailActions.getMailDetail,
        createMail: MailActions.createMail,
        updateMail: MailActions.updateMail,
        deleteMail: MailActions.deleteMail,
        resetMailDetail: MailActions.resetMailDetail,
      },
      dispatch,
    ),
)(MailScreen);

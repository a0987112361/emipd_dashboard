import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Modal, Form, Spin, DatePicker, Switch, Row, Col, Space, Input, Upload, message } from 'antd';
import { InboxOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import { FormInput, FormInputSelect, FormTextarea, HtmlEditor } from 'src/Components';
import { Images, Screen, Colors } from 'src/Theme';

import "./ActivityScreen.css"
import moment from 'moment';
import Swal from 'sweetalert2';
import { Activity2Actions } from 'src/Stores';
import _ from 'lodash';

const { Dragger } = Upload;
let timer;
const normFile = e => {
  let list = e.fileList;
  if (list.length >= 2) {
    list.slice(1);
    e.fileList = list;
  }
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

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
  langMark: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: Colors.primary
  },
  htmlBtnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0px'
  },
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '100px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
    marginLeft: '40px',
  },
  contentBottom: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '20px',
    fontWeight: 'bold',
    overflowY: 'auto'
  },
  datePickerStyle: {
    border: '1px solid #A6C1D3',
    borderRadius: '5px',
    height: '40px',
    width: '100%',
    paddingLeft: '8px',
    color: '#7D9EB5'
  },
  contentBottomTitle: {
    marginLeft: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  spaceStyle: {
    width: '100%',
    height: '65px',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    padding: '0px 20px',
    marginTop: '30px',
  },
  inputStyle: {
    width: '317px',
    height: '40px',
    borderRadius: '5px'
  }
};

class Activity2Screen extends React.Component {
  constructor(props) {
    super(props);
    this.activityForm = React.createRef();
    this.state = {
      isLoading: false,
      loading: false,
      viewModalVisible: false,
      checkModalVisible: false,
      queryPayload: {
        now_page: 1,
        page_size: 10,
        search: '',
        order: -1,
      },
      mode: 'create', // 預設模式
      activityContentZh: '',
      activityContentEn: '',
      mainImageData: [],  // 放列表的主要圖片(單一張)
      mainImageId: '',
      moreImageData: [],
      originFileData: [],
      filmPath: '',
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
    const { location, paging, getActivityList } = this.props;
    const { queryPayload } = this.state;
    
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

    const callback = () => {
      this.setState({
        isLoading: false
      })
    }
    
    this.setState({
      isLoading: true,
      queryPayload: payload
    }, () => {
      getActivityList(payload, callback, this.errorCallback)
    });
  }

  // 路由帶query
  handleRouteChange = () => {
    const { history } = this.props;
    const { queryPayload } = this.state;
    this.setState({
      isLoading: false
    }, () => {
      history.push(`/activity2?${queryPayload.search !== '' ? `search=${queryPayload.search}&` : ''}${queryPayload.now_page !== 1 ? `now_page=${queryPayload.now_page}&` : ''}${queryPayload.page_size !== 10 ? `page_size=${queryPayload.page_size}&` : ''}${queryPayload.order !== 0 ? `order=${queryPayload.order}` : ''}`);
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
    const { getActivityInfo } = this.props;

    const callback = (value) => {
      let mainImgTemp = [];
      if(_.has(value, 'file')){
        if(!_.isEmpty(value.file) && !_.isNil(value.file.file_id)){
          mainImgTemp.push({
            ...value.file,
            uid: 1,
            name: 'activity.jpg',
            status: 'done',
            id: value.file.file_id,
            url: value.file.file_url,
            originFileObj: value.file
          });
        }
      }

      let moreImgTemp = [];
      if(_.has(value, 'imgs')){
        if(!_.isEmpty(value.imgs)){
          value.imgs.map((item) => {
            moreImgTemp.push({
              uid: item.file_id,
              name: 'activitys.jpg',
              status: 'done',
              id: item.file_id,
              url: item.file_url,
              imgUrl: item.file_url,
              originFileObj: item
            });
          })
        }
      }

      this.setState({
        currentId: value.activity_id,
        activityContentZh: value.activity_content_zh,
        activityContentEn: value.activity_content_en,
        mainImageData: mainImgTemp,
        mainImageId: value.file.file_id,
        moreImageData: moreImgTemp,
        originFileData: moreImgTemp,
        filmPath: _.isNil(value.video) ? [] : value.video,
        isLoading: false,
        viewModalVisible: true,
      });
    }
    
    if(mode === 'update'){
      this.setState({
        isLoading: true,
        mode: 'update'
      }, () => {
        getActivityInfo(id, callback, this.errorCallback)
      });
    }else{
      this.setState({
        mode: 'create',
        activityContentZh: '',
        activityContentEn: '',
        mainImageData: [],
        moreImageData: [],
        filmPath: '',
        viewModalVisible: true,
      });
    }
    
  }

  // 刪除
  handleDelete = (activityId) => {
    const { deleteActivity, paging } = this.props;
    const { queryPayload, } = this.state;

    let id = activityId.toString()
    let payload = [];
    payload.push(id)

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

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
          deleteActivity(payload, queryPayload, callback, this.errorCallback);
        })
      };
    });
  }

  //html編輯器
  handleChangeContent = (text, value) => {
    if (text == 'activityContentZh'){
      this.setState({ activityContentZh: value.toHTML() });
    }else if (text == 'activityContentEn'){
      this.setState({ activityContentEn: value.toHTML() });
    }
  }

  closeModal() {
    this.setState({
      viewModalVisible: false,
    })
  }

  // 圖片預覽 step 1
  handlePreview = (file) => {
    const  imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  }
  // 圖片預覽 step 2
  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('mainImageData', newFileList.splice(1, 1));
    } else {
      this.setFileList('mainImageData', newFileList);
    }
  };
  // 圖片預覽 step 2
  handleMoreChange = ({ fileList: newFileList }) => {
    this.setFileList('moreImageData', newFileList);
  };
  // 圖片預覽 step 2
  handleVideoChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('filmPath', newFileList.splice(1, 1));
    } else {
      this.setFileList('filmPath', newFileList);
    }
  };
  // 圖片預覽 step 3
  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  }
  beforeFilmUpload = (file) => {
    const isVideo = file.type === 'video/mp4';
    if (!isVideo) message.error('只能上傳mp4的檔案!');

    let isOk = true;
    let isLoading = true;

    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url
    video.load(); // fetches metadata(獲得數據)
    video.onloadedmetadata = (evt) => {
      if (isLoading && isOk)
        this.setState({ filmPath: file })
      return isOk;
    }

  }

  //選擇影片後
  handleChangeFilm = (info) => {
    let bool = this.beforeFilmUpload(info.file.originFileObj);
    if (bool) {
      this.getBase64(info.file.originFileObj,
        () => this.setState({ loading: false, filmPath: info.file.originFileObj, is_film: true, }),
        'film'
      );
    }
  };

  // 新增與更新
  handleSubmit = (value) => {
    const { createActivity, updateActivity } = this.props;
    const { filmPath, mainImageData, moreImageData, queryPayload, activityContentEn, activityContentZh, mode, originFileData, currentId, mainImageId } = this.state;
    let isOk = true;
    let formData = new FormData();
    

    formData.append('activity_releasetime', moment(value.activity_releasetime).format('YYYY-MM-DD'));
    formData.append('activity_title_zh', value.activity_title_zh);
    formData.append('activity_content_zh', activityContentZh);
    formData.append('activity_title_en', value.activity_title_en);
    formData.append('activity_content_en', activityContentEn);
    formData.append('is_open', true);
    
    if(mode === 'update'){
      formData.append('activity_id', currentId);

      // mainImg
      if(mainImageData.length === 0){
        formData.append('file_id', '');
      }else if(_.has(mainImageData[0].originFileObj, 'uid')){ // 如果有重新上傳的動作
        formData.append('upload_file', mainImageData[0].originFileObj);
      }else{
        formData.append('file_id', mainImageData[0].file_id);
      }

      // video
      if(filmPath.length === 0){  // 如果原本有影片但刪掉 給video_id空字串
        formData.append('video_id', '');
      }else if(_.has(filmPath, 'uid')){ // 如果有重新上傳的動作
        formData.append('video', filmPath); 
      }else{  // 如果維持不變，給video_id原id
        formData.append('video_id', filmPath.file_id); 
      }
      
      // 其他照片
      if(moreImageData.length < 0){ // 如果把原來有的照片「全部刪除」，就把原本的照片id都推進去delete_imgs陣列裡
        originFileData.map((item, index) => {
          formData.append('delete_imgs[' + index + ']', item.file_id);
        })
      }else{ // 如果沒有全刪，(要留著的不用傳)
        let oldTemp = [];
        let addTemp = [];
        let newTemp = [];
        let delTemp = [];
        originFileData.map((item) => { oldTemp.push(item.id) })
        moreImageData.map((item) => { 
          if(!_.has(item, 'id')){
            console.log('item =>', item);
            addTemp.push(item) 
          }else{
            newTemp.push(item.id) 
          }
        });

        oldTemp.map((item) => {
          if(!newTemp.includes(item)) {
            delTemp.push(item)
          }
        })

        // 多新增的給imgs欄位
        if(addTemp.length > 0){
          addTemp.map((item) => {
            formData.append('imgs', item.originFileObj);
          })
        }

        // 把要刪掉的id給delete_imgs陣列。
        delTemp.map((item, index) => {
          formData.append('delete_imgs[' + index + ']', item);
        })
      }
    }else{
      formData.append('upload_file', mainImageData[0].originFileObj);
      formData.append('video', filmPath); 
      if(moreImageData.length > 0){
        moreImageData.map((item) => {
          formData.append('imgs', item.originFileObj);
        })
      }
    }

    const callback = () => {
      this.setState({
        isLoading: false,
        viewModalVisible: false,
      })
    }

    if(isOk === true){
      this.setState({
        isLoading: true,
      }, () => {
        if(mode === 'create'){
          createActivity(formData, queryPayload, callback, this.errorCallback)
        }else{
          updateActivity(formData, queryPayload, callback, this.errorCallback)
        }
      })
    }
  }

  // 渲染新增和編輯彈窗
  renderViewModal = () => {
    const { activityInfo } = this.props;
    const { viewModalVisible, filmPath, mainImageData, moreImageData, activityContentZh, activityContentEn, mode, loading, isLoading } = this.state;

    return (
      <Modal
        title={(mode === 'create') ? '新增活動花絮' : '編輯活動花絮'}
        visible={viewModalVisible}
        width={1000}
        centered
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          ref={this.activityForm}
          initialValues={
            (mode === 'update') ?
            {
              ...activityInfo,
              // main_img: activityInfo.file.file_id,
              activity_releasetime: moment(activityInfo.activity_releasetime)
            }:
            {
            }
          }
          onValuesChange={this.handleChangeForm}
          onFinish={this.handleSubmit}
          style={{ color: '#7D9EB5' }}
        >
          <Row style={{margin: '0', rowGap: '12px'}} gutter={8}>
            <Col span={8}>
              <Form.Item
                name="main_img"
                label="主要照片"
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                valuePropName='main_img'
                getValueFromEvent={normFile}
                required
                // rules={[{ required: true, message: '請上傳主要照片' }]}
                style={{ height: '180px', marginTop: '10px', display: 'block' }}
              >
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  accept=".PNG,.JPG,.JPEG"
                  fileList={mainImageData}
                  onChange={this.handleAvatarChange}
                  customRequest={dummyRequest}
                  beforeUpload={(file) => {
                    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJPG) {
                      return false;
                    } else {
                      return true;
                    }
                  }}
                >
                  {mainImageData.imgUrl ?
                    <img src={mainImageData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    :
                    <div>
                      {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                      <div style={{ marginTop: 8 }}>上傳照片</div>
                    </div>
                  }
                </Upload>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="activity_releasetime"
                label="發佈日期 "
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: '請選擇發佈日期' }]}
              >
                <DatePicker placeholder='請選擇發佈日期' style={styles.datePickerStyle} />
              </Form.Item>
            </Col>
          </Row>

          <div style={{marginTop: '16px'}}>
            <div style={styles.langMark}>中文</div>

            <FormInput
              required
              title="標題 "
              propName="activity_title_zh"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="activity_content_zh"
              title='內文'
              required
              requiredErrorMessage="請輸入中文內文"
              value={activityContentZh}
              placeholder='請輸入中文內文'
              onEditorStateChange={(value) => this.handleChangeContent('activityContentZh', value)}
            />
          </div>

          <div style={{marginTop: '16px'}}>
            <div style={styles.langMark}>英文</div>

            <FormInput
              required
              title="標題 "
              propName="activity_title_en"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="activity_content_en"
              title='內文'
              required
              requiredErrorMessage="請輸入英文內文"
              value={activityContentEn}
              placeholder='請輸英文內文'
              onEditorStateChange={(value) => this.handleChangeContent('activityContentEn', value)}
            />
          </div>

          <div style={{marginTop: '16px', }}>
            <Form.Item
              name="imgs"
              valuePropName="imgs"
              label="活動照片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              getValueFromEvent={e => {
                if(Array.isArray(e)){
                  return e;
                }
                return e && e.fileList;
              }}
              className="drag-pics-area"
            >
              <Dragger
                name='imgs'
                multiple
                accept=".PNG,.JPG,.JPEG"
                listType='picture-card'
                fileList={moreImageData}
                onChange={this.handleMoreChange}
                customRequest={dummyRequest}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  {/* <InboxOutlined /> */}
                  {/* <PictureOutlined /> */}
                  <img src={Images.outline} alt="upload-more" />
                </p>
                <p className="ant-upload-text">點擊或拖拉照片到此區域進行上傳</p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  為提供完整顯示，僅供.PNG,.JPG,.JPEG等照片格式上傳。
                </p>
              </Dragger>
              {moreImageData.imgUrl &&
                <img src={moreImageData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              }
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="upload_file"
              label="活動影片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="upload_file"
              getValueFromEvent={normFile}
              style={{ height: '180px', marginTop: '10px', display: 'block' }}
            >
              <Upload
                id="img"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.beforeFilmUpload}
                customRequest={dummyRequest}
                onChange={this.handleChangeFilm}
              >
                {filmPath ?
                  <video alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls >
                    <source src={filmPath} type="video/mp4" />
                  </video>
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳影片</div>
                  </div>
                }
              </Upload>
            </Form.Item>
          </div>

          <div style={styles.htmlBtnBlock}>
            <Button style={styles.btnStyle} htmlType='submit' loading={isLoading}>
              儲存
            </Button>
          </div>
        </Form>
      </Modal >
    )
  }



  render() {
    const { screenHeight, activityList, paging  } = this.props;
    const { viewModalVisible, isLoading } = this.state;

    const columns = [
      {
        width: '15%',
        title: '發佈日期',
        dataIndex: 'activity_releasetime',
        key: 'activity_releasetime',
        align: 'center',
        render: (value) => moment(value).format("YYYY/MM/DD")
      },
      {
        width: '50%',
        title: '活動花絮標題',
        dataIndex: 'activity_title_zh',
        key: 'activity_title_zh',        
        align: 'left',
        render: (value) =>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
      },
      {
        width: '10%',
        title: '瀏覽人數',
        dataIndex: 'viewers',
        align: 'center',
        key: 'viewers',
      },
      {
        width: '10%',
        title: '分享次數',
        dataIndex: 'shares',
        align: 'center',
        key: 'shares'
      },
      {
        width: '15%',
        title: '操作',
        dataIndex: '',
        key: '',
        align: 'center',
        render: (value, record) => {
          return (
            <div>
              <Button
                style={{cursor: 'pointer', border: 'none', padding: '0px'}}
                onClick={() => this.handleViewModal('update', record.activity_id)}
              >
                <img src={Images.edit} />
              </Button>
              <Button
                style={{ cursor: 'pointer', border: 'none', marginLeft: '15px' }}
                onClick={() => this.handleDelete(record.activity_id)}
              >
                <img src={Images.delete} />
              </Button>
            </div>
          )
        }
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
              活動花絮管理
              <Button style={styles.btnStyle} onClick={() => this.handleViewModal('create')}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <Space style={styles.spaceStyle}>
              <Form
                name='basic'
                initialValues={{
                  ...this.state.queryPayload,
                }}
                style={{width: '100%', display: 'flex', alignItems: 'center'}}
              >
                <FormInput
                  placeholder='輸入關鍵字'
                  propName="search"
                  style={{width: '317px'}}
                  onChange={this.handleSearch}
                />
              </Form>
            </Space>
            <div style={styles.contentBottom} >
              <Table
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
                dataSource={activityList}
                style={{ width: '100%' }}
                scroll={{ y:  screenHeight - 420 }}
              />
            </div>
          </div>
          {viewModalVisible && this.renderViewModal()}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    activityList: state.activity2.activityList,
    paging: state.activity2.paging,
    activityPicList: state.activity2.activityPicList,
    picPaging: state.activity2.picPaging,
    activityInfo: state.activity2.activityInfo,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getActivityList: Activity2Actions.getActivity2List,
        getActivityPicList: Activity2Actions.getActivity2PicList,
        getActivityInfo: Activity2Actions.getActivity2Info,
        createActivity: Activity2Actions.createActivity2,
        updateActivity: Activity2Actions.updateActivity2,
        deleteActivity: Activity2Actions.deleteActivity2,
      },
      dispatch,
    ),
)(Activity2Screen);
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Table, Modal, Form, Input, Upload, Switch } from 'antd';
import { Images, Colors } from 'src/Theme';
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import { SortButton } from 'src/Components';
import "./BannerScreen.css"
import _ from 'lodash';
import Swal from 'sweetalert2';
import { BannerActions } from 'src/Stores';

let timer;
const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
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
  langMark: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: Colors.primary
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
  contentBottomTitle: {
    marginLeft: '5px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'

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
class BannerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isLoading: false,
      viewModalVisible: false,
      viewUpdateModalVisible: false,
      zhComputerImgData: [],  // 中文電腦圖
      zhPhoneImgData: [], // 中文手機圖
      enComputerImgData: [], // 英文電腦圖
      enPhoneImgData: [], // 英文手機圖
      loading: false,
      checkModalVisible: false,
      total: '0',
      nowPage: 1,
      pageSize: 10,
      imgData: [
        { index: '0', id: '', imgUrl: '', imgFile: '', imgName: '封面圖片', path: '' },
      ],
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
    const { location, paging, getBannerList } = this.props;
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

    const callback = (value) => {
      this.setState({
        isLoading: false
      })
    }
    
    this.setState({
      isLoading: true,
      queryPayload: payload
    }, () => {
      getBannerList(payload, callback, this.errorCallback)
    });
  }

  // 路由帶query
  handleRouteChange = () => {
    const { history } = this.props;
    const { queryPayload } = this.state;
    this.setState({
      isLoading: false
    }, () => {
      history.push(`/banner?${queryPayload.search !== '' ? `search=${queryPayload.search}&` : ''}${queryPayload.now_page !== 1 ? `now_page=${queryPayload.now_page}&` : ''}${queryPayload.page_size !== 10 ? `page_size=${queryPayload.page_size}&` : ''}${queryPayload.order !== 0 ? `order=${queryPayload.order}` : ''}`);
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
    const { getBannerInfo } = this.props;

    const callback = (value) => {
      // let imgData = [
      //   {platform: 'PC', lang: 'zh', upload_file: zhComputerImgData[0].originFileObj},
      //   {platform: 'Phone', lang: 'zh', upload_file: zhPhoneImgData[0].originFileObj},
      //   {platform: 'PC', lang: 'en', upload_file: enComputerImgData[0].originFileObj},
      //   {platform: 'Phone', lang: 'en', upload_file: enPhoneImgData[0].originFileObj},

      let itemTemp0 = []; let itemTemp1 = []; let itemTemp2 = []; let itemTemp3 = [];
      value.imgs.map((item, index) => {
        if(item.platform === 'PC'){
          if(item.lang === 'zh'){
            itemTemp0.push({
              ...item,
              columnName: item.platform + item.lang,
              uid: item.file_id,
              name: `${item.platform + item.lang}`+'.jpg',
              status: 'done',
              id: item.file_id,
              url: item.file_url,
              originFileObj: {file_id: item.file_id, file_url: item.file_url}
            });
            this.setState({ zhComputerImgData: itemTemp0 })
          }else{
            itemTemp1.push({
              ...item,
              columnName: item.platform + item.lang,
              uid: item.file_id,
              name: `${item.platform + item.lang}`+'.jpg',
              status: 'done',
              id: item.file_id,
              url: item.file_url,
              originFileObj: {file_id: item.file_id, file_url: item.file_url}
            }); 
            this.setState({ enComputerImgData: itemTemp1 })
          }
        }else{
          if(item.lang === 'zh'){
            itemTemp2.push({
              ...item,
              columnName: item.platform + item.lang,
              uid: item.file_id,
              name: `${item.platform + item.lang}`+'.jpg',
              status: 'done',
              id: item.file_id,
              url: item.file_url,
              originFileObj: {file_id: item.file_id, file_url: item.file_url}
            });
            this.setState({ zhPhoneImgData: itemTemp2 })
          }else{
            itemTemp3.push({
              ...item,
              columnName: item.platform + item.lang,
              uid: item.file_id,
              name: `${item.platform + item.lang}`+'.jpg',
              status: 'done',
              id: item.file_id,
              url: item.file_url,
              originFileObj: {file_id: item.file_id, file_url: item.file_url}
            });
            this.setState({ enPhoneImgData: itemTemp1 })
          }
        }
      })
      
      this.setState({
        currentId: value.banner_id,
        isLoading: false,
        viewModalVisible: true,
        
        // zhComputerImgData: 
      });
    }
    
    if(mode === 'update'){
      this.setState({
        isLoading: true,
        mode: 'update'
      }, () => {
        getBannerInfo(id, callback, this.errorCallback)
      });
    }else{
      this.setState({
        mode: 'create',
        zhComputerImgData: [],
        zhPhoneImgData: [],
        enComputerImgData: [],
        enPhoneImgData: [],
        viewModalVisible: true,
      });
    }
  }

  // 刪除
  handleDelete = (bannerId) => {
    const { deleteBanner, paging } = this.props;
    const { queryPayload, } = this.state;

    let id = bannerId.toString()
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
          deleteBanner(payload, queryPayload, callback, this.errorCallback);
        })
      };
    });
  }

  closeModal() {
    this.setState({
      viewModalVisible: false,
    })
  }

  renderViewModal() {
    const { bannerInfo } = this.props;
    const { viewModalVisible, loading, zhComputerImgData, zhPhoneImgData, enComputerImgData, enPhoneImgData, mode } = this.state;

    return (
      <Modal
        title={(mode === 'create') ? '新增輪播圖' : '編輯輪播圖'}
        visible={viewModalVisible}
        width={660}
        height={520}
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name='basic'
          initialValues={
            (mode === 'update') ?
            {
              ...bannerInfo,
            }:
            {
            }
          }
          onFinish={this.handleSubmit}
          style={{ color: '#7D9EB5' }}
        >
          <div style={{color: '#c21313', fontSize: '18px'}}>* 建議電腦尺寸為1920*700，手機尺寸為1024*373</div>
          <div style={styles.langMark}>中文</div>
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="banner_zh_web_img"
              label="電腦版圖片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="banner_zh_web_img"
              getValueFromEvent={normFile}
              required
              style={{ display: 'block' }}
              rules={[{ required: true, message: '請選擇電腦版圖片' }]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG,.GIF"
                fileList={zhComputerImgData}
                onChange={this.handleChangeZhComputer}
                customRequest={dummyRequest}
                onPreview={this.handleComputerPreview}
                // onPreview={onPreview}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {zhComputerImgData.imgUrl ?
                  <img src={zhComputerImgData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
            </Form.Item>

            <Form.Item
              name="banner_zh_phone_img"
              label="手機版圖片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="banner_zh_phone_img"
              getValueFromEvent={normFile}
              style={{ display: 'block' }}
              required
              rules={[{ required: true, message: '請選擇手機版圖片' }]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG,.GIF"
                fileList={zhPhoneImgData}
                onChange={this.handleChangeZhPhone}
                customRequest={dummyRequest}
                onPreview={this.handlePhonePreview}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {zhComputerImgData.imgUrl ?
                  <img src={zhComputerImgData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
            </Form.Item>
          </div>

          <div style={styles.langMark}>英文</div>
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="banner_en_web_img"
              label="電腦版圖片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="banner_en_web_img"
              getValueFromEvent={normFile}
              style={{ display: 'block' }}
              required
              rules={[{ required: true, message: '請選擇電腦版圖片' }]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG,.GIF"
                fileList={enComputerImgData}
                onChange={this.handleChangeEnComputer}
                customRequest={dummyRequest}
                onPreview={this.handleComputerPreview}
                // onPreview={onPreview}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {enComputerImgData.imgUrl ?
                  <img src={enComputerImgData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
            </Form.Item>

            <Form.Item
              name="banner_en_phone_img"
              label="手機版圖片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="banner_en_phone_img"
              getValueFromEvent={normFile}
              style={{ display: 'block' }}
              required
              rules={[{ required: true, message: '請選擇手機版圖片' }]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG,.GIF"
                fileList={enPhoneImgData}
                onChange={this.handleChangeEnPhone}
                customRequest={dummyRequest}
                onPreview={this.handlePhonePreview}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {enPhoneImgData.imgUrl ?
                  <img src={enPhoneImgData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
            </Form.Item>
          </div>

          <Form.Item
            name="banner_url"
            label="連結"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input style={styles.inputStyle} placeholder="請輸入連結" />
          </Form.Item>

          <div style={styles.htmlBtnBlock}>
            <Button style={styles.btnStyle} htmlType='submit'>
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }

  handleComputerPreview = (file) => {
    const  imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  }

  handlePhonePreview = (file) => {
    const  imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  }

  handleChangeZhComputer = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('zhComputerImgData', newFileList.splice(1, 1));
    } else {
      this.setFileList('zhComputerImgData', newFileList);
    }
  };

  handleChangeEnComputer = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('enComputerImgData', newFileList.splice(1, 1));
    } else {
      this.setFileList('enComputerImgData', newFileList);
    }
  };

  handleChangeZhPhone = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('zhPhoneImgData', newFileList.splice(1, 1));
    } else {
      this.setFileList('zhPhoneImgData', newFileList);
    }
  };

  handleChangeEnPhone = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('enPhoneImgData', newFileList.splice(1, 1));
    } else {
      this.setFileList('enPhoneImgData', newFileList);
    }
  };

  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  }

  // 新增與更新
  handleSubmit = (value) => {
    const { createBanner, updateBanner, bannerInfo } = this.props;
    const { zhComputerImgData, zhPhoneImgData, enComputerImgData, enPhoneImgData, mainImageData, queryPayload, mode, currentId, } = this.state;
    let isOk = true;
    let formData = new FormData();
    formData.append('banner_url', (value.banner_url !== undefined &&  value.banner_url !== null &&  value.banner_url !== 'null') ? value.banner_url : '');

    if(mode === 'update'){
      formData.append('banner_id', currentId);
      /**
       * NOTE: 後端規則
       * 有更改的要給原本的file_id,並給對應的platform和lang、新的upload_file
       * 沒更改的就不都用傳
       */
      let imgData = [];
      if(!_.has(zhComputerImgData[0], 'file_id')){
        imgData.push({platform: 'PC', lang: 'zh', file_id: bannerInfo.banner_zh_web_img[0].file_id, upload_file: zhComputerImgData[0].originFileObj})
      }
      if(!_.has(zhPhoneImgData[0], 'file_id')){
        imgData.push({platform: 'Phone', lang: 'zh', file_id: bannerInfo.banner_zh_phone_img[0].file_id, upload_file: zhPhoneImgData[0].originFileObj})
      }
      if(!_.has(enComputerImgData[0], 'file_id')){
        imgData.push({platform: 'PC', lang: 'en', file_id: bannerInfo.banner_en_web_img[0].file_id, upload_file: enComputerImgData[0].originFileObj})
      }
      if(!_.has(enPhoneImgData[0], 'file_id')){
        imgData.push({platform: 'Phone', lang: 'en', file_id: bannerInfo.banner_en_phone_img[0].file_id, upload_file: enPhoneImgData[0].originFileObj})
      }
  
      imgData.map((item, index) => {
        formData.append('edit_imgs[' + `${index}` + '].file_id', item.file_id);
        formData.append('edit_imgs[' + `${index}` + '].platform', item.platform);
        formData.append('edit_imgs[' + `${index}` + '].lang', item.lang);
        formData.append('edit_imgs[' + `${index}` + '].upload_file', item.upload_file);
      })
    }else{
      let imgData = [
        {platform: 'PC', lang: 'zh', upload_file: zhComputerImgData[0].originFileObj},
        {platform: 'Phone', lang: 'zh', upload_file: zhPhoneImgData[0].originFileObj},
        {platform: 'PC', lang: 'en', upload_file: enComputerImgData[0].originFileObj},
        {platform: 'Phone', lang: 'en', upload_file: enPhoneImgData[0].originFileObj},
      ]
  
      imgData.map((item, index) => {
        formData.append('imgs[' + `${index}` + '].platform', item.platform);
        formData.append('imgs[' + `${index}` + '].lang', item.lang);
        formData.append('imgs[' + `${index}` + '].upload_file', item.upload_file);
      })
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
          createBanner(formData, queryPayload, callback, this.errorCallback)
        }else{
          updateBanner(formData, queryPayload, callback, this.errorCallback)
        }
      })
    }
  }

  handleChangeSwitch = (id) => {
    const { changeBannerStatus } = this.props;
    const { queryPayload } = this.state;

    const callback = () => {
      this.setState({
        isLoading: false,
      })
    }

    this.setState({
      isLoading: true,
    }, () => {
      changeBannerStatus(id, queryPayload, callback, this.errorCallback);
    });
  }

  handleSort(id, action) {
    const { sortBanner } = this.props;
    const { queryPayload } = this.state;
    
    const callback = () => {
      this.setState({
        isLoading: false
      })
    }

    this.setState({
      isLoading: true,
    }, () => {
      sortBanner(id, action, queryPayload, callback, this.errorCallback)
    });
  }

  render() {
    const { viewModalVisible, total, viewUpdateModalVisible, nowPage, pageSize } = this.state;
    const { screenHeight, bannerList, paging, Carousel } = this.props;

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
        width: '10%',
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
        align: 'center',
        render: (value, record, index) => (
          <div>
            <SortButton
              currentIndex={(nowPage - 1) * pageSize + index}
              length={total}
              handleClickUp={() => this.handleSort(record.banner_id, 'up')}
              handleClickDown={() => this.handleSort(record.banner_id, 'down')}
            />
          </div>
        ),
      },
      {
        width: '10%',
        title: '上架',
        dataIndex: 'is_open',
        key: 'is_open',
        align: 'center',
        render: (value, record) => (
          <div>
            <Switch
              checkedChildren={<CheckOutlined />}
              defaultChecked={record.is_open}
              onChange={() => this.handleChangeSwitch(record.banner_id)}
            />
          </div>
        ),
      },
      {
        width: '15%',
        title: '電腦版圖片',
        dataIndex: 'banner_web_img',
        key: 'banner_web_img',
        align: 'center',
        render: (value, record) => (
          <div style={styles.imgWebDiv}>
            <img src={record.banner_web_img} style={styles.imgStyle} />
          </div>
        ),
      },
      {
        width: '15%',
        title: '手機版圖片',
        dataIndex: 'banner_app_img',
        key: 'banner_app_img',
        align: 'center',
        render: (value, record) => {
          if (!_.isEmpty(record.banner_app_img)) {
            return (
              <div style={styles.imgPhoneDiv}>
                <img src={record.banner_app_img} style={styles.imgStyle} />
              </div>
            )
          }
        }
      },
      {
        width: '35%',
        title: '連結',
        dataIndex: 'banner_url',
        key: 'banner_url',
        align: 'left',
        render: (value, record) =>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {(value !== undefined && value !== null && value !== 'null')  ? value : ''}
          </div>
      },
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
              onClick={() => this.handleViewModal('update', record.banner_id)}
            >
              <img src={Images.edit} />
            </Button>
            <Button
              style={{ cursor: 'pointer', border: 'none', marginLeft: '15px' }}
              onClick={() => this.handleDelete(record.banner_id)}
            >
              <img src={Images.delete} />
            </Button>
          </div>
      },
    ];

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              <span style={{ marginRight: '40px' }}>輪播圖管理</span>
              <Button style={styles.btnStyle} onClick={() => this.handleViewModal('create')}>
                <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
              </Button>
            </div>
            <div style={styles.contentBottom} >
              <Table
                columns={columns}
                dataSource={bannerList}
                onChange={this.handleChange}
                pagination={{
                  pageSize: paging.page_size || 10,
                  total: paging.total,
                  current: paging.now_page || 1,
                  showSizeChanger: false,
                  position: ['bottomCenter'],
                  itemRender: (current, type, originalElement) => renderPagination(current, type, originalElement)
                }}
                style={{ width: '100%'}}
                scroll={{ y:  screenHeight - 296 }}
              />
            </div>
          </div>
        </div>
        {viewModalVisible && this.renderViewModal()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    bannerList: state.banner.bannerList,
    bannerInfo: state.banner.bannerInfo,
    paging: state.banner.paging,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getBannerList: BannerActions.getBannerList,
        getBannerInfo: BannerActions.getBannerInfo,
        createBanner: BannerActions.createBanner,
        updateBanner: BannerActions.updateBanner,
        deleteBanner: BannerActions.deleteBanner,
        changeBannerStatus: BannerActions.changeBannerStatus,
        sortBanner: BannerActions.sortBanner,
      },
      dispatch,
    ),
)(BannerScreen);

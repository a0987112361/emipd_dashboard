import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Select, Tabs, Form, Row, Col, Switch, Upload, message, Spin } from 'antd';
import { Images } from 'src/Theme';

import "./AboutScreen.css"
import _ from 'lodash';
import { HomeActions } from '../../Stores';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined, LoadingOutlined, FormatPainterFilled, CheckOutlined } from '@ant-design/icons';
import { HtmlEditor } from 'src/Components';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const styles = {
  root: {
    flexGrow: 1,
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
    marginBottom: '20px'
  },
  contentTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '30px',
  },
  contentBottom: {
    width: '100%',
    minHeight: '1200px',
    height: '100%',
    marginTop: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '16px',
    overflowY: 'auto',
    paddingBottom: '90px'
  },
  inputStyle: {
    // width: '470px',
    height: '40px',
    borderRadius: '5px',
    // marginBottom: '10px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
  tabStyle: {
    width: '100%'
    // height: '1000px'
  },
  formTop: {
    padding: '20px 25px 30px 25px',
    borderBottom: '#A6C1D3 1px solid'
  },
  formStyle: {
    width: '100%',
    display: 'flex',
    padding: '25px'
  },
  QAFormStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  htmlBtnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px'
  },
  btnStyle: {
    width: '100px',
    height: '40px',
    color: '#fff',
    backgroundColor: '#004C7C',
    borderRadius: '4px'
  },
  areaStyle: {
    width: '470px',
    height: '150px',
    borderRadius: '4px',
    resize: 'none',
    padding: '10px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
  selectStyle: {
    width: '250px',
    height: '40px',
    borderRadius: '5px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
  titleStyle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#7D9EB5'
  },
  titleCenterStyle: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#7D9EB5'
  },
  uploadBtnStyle: {
    width: '100%',
    height: '50px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.updateForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      loading: false,
      viewModalVisible: false,
      infoId: '',
      aboutText: '',
      notesText: '',
      isBirth: false,
      imgPath: '',
      avatar: '',
      adImgPath: '',
      adAvatar: '',
      adImg: [],
      urlData: [
        { index: '0', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '1', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '2', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '3', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '4', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '5', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '6', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '7', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' }
      ],
      deleteImgId: []
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getAboutInfo, getAboutDetail, getNotesDetail } = this.props;

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

    this.setState({
      isLoading: true,
    }, () => {
      getAboutInfo(callback, this.errorCallback);
    });
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  }

  handleUpdate = (value) => {
    const { updateAboutInfo } = this.props;
    const { infoId, urlData, deleteImgId } = this.state;

    let payload = {
      contact_addr_en: value.contact_addr_en,
      contact_addr_zh: value.contact_addr_zh,
      contact_email: value.contact_email,
      contact_fb: value.contact_fb,
      contact_fb_url: value.contact_fb_url,
      contact_map: value.contact_map,
      contact_tel: value.contact_tel
    }

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    }

    this.setState({
      isLoading: true,
    }, () => {
      updateAboutInfo(payload, callback, this.errorCallback);
    });
  }

  handleDeleteUrl = (id) => {
    const { deleteUrl } = this.props;

    this.setState({
      loading: true
    })
    const callback = () => {
      this.setState({
        loading: false,
      })
    }
    deleteUrl(id, callback)
  }

  handleSaveDeleteId = (index) => {
    const { urlData } = this.state;

    urlData.map((item) => {
      if (item.index == index) {

        if (item.id != 0) {

          let newDeleteId = this.state.deleteImgId;
          newDeleteId.push(item.id)

          this.setState({
            deleteImgId: newDeleteId
          })

          let newUrlData = this.state.urlData;

          newUrlData[index].id = '';
          newUrlData[index].imgUrl = '';
          newUrlData[index].imgFile = '';
          newUrlData[index].imgName = '';
          newUrlData[index].position = '';

          this.setState({
            urlData: newUrlData
          })
        } else {
          let newUrlData = this.state.urlData;
          newUrlData[index].id = '';
          newUrlData[index].imgUrl = '';
          newUrlData[index].imgFile = '';
          newUrlData[index].imgName = '';
          newUrlData[index].position = '';

          this.setState({
            urlData: newUrlData
          })
        }
      }
    })
  }

  //圖片
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //社群連結圖片
  handleChangeImg = (info, index) => {
    const { urlData } = this.state;

    if (info.file.status === 'done' && this.beforeUpload) {
      this.getBase64(info.file.originFileObj,
        imgPath => this.setState({
          imgPath,
          loading: false,
          avatar: info.file.originFileObj
        },
          () => {
            urlData[index].imgUrl = this.state.imgPath;
            urlData[index].imgFile = this.state.avatar;
            urlData[index].imgName = info.file.name;
            urlData[index].position = index + 1;
            this.setState({
              urlData: urlData
            })
          }
        )
      );
    }
  };

  // setFileList
  setFileList = (key, file, name) => {
    let newAdImg;

    newAdImg = this.state.adImg.map((item, index) => {
      if (index === name) {
        return {
          ...item,
          key: name,
          file: file[0],
        }
      } else {
        return item
      }
    })
    this.setState({
      adImg: newAdImg,
    });
  }

  // 特惠廣告圖片
  handleAdImgChange = ({ fileList: newFileList }, name) => {
    this.setFileList('adImg', newFileList, name);
  };

  handleAboutUpdate = () => {
    const { updateAbout } = this.props;
    const { aboutText } = this.state;

    this.setState({
      isLoading: true
    })
    const callback = () => {
      this.setState({
        isLoading: false,
        aboutText: ''
      })

    }
    updateAbout({ info_about: aboutText }, callback)
  }

  //修改購物須知
  handleNotesUpdate = () => {
    const { updateNotes } = this.props;
    const { notesText } = this.state;

    this.setState({
      isLoading: true
    })
    const callback = () => {
      this.setState({
        isLoading: false,
        notesText: ''
      })
    }

    updateNotes({ info_notes: notesText }, callback)
  }

  //html編輯器
  handleChangeContent = (text, value) => {
    if (text == 'about')
      this.setState({ aboutText: value.toHTML() });

    if (text == 'notes')
      this.setState({ notesText: value.toHTML() });
  }

  //生日禮設定
  onSwitchChange = () => {
    this.setState({
      isBirth: !this.state.isBirth
    })
  }

  //處理連結path
  handleChangeInput = (value, index) => {
    const { urlData } = this.state;
    urlData[index].path = value;
    this.setState({
      urlData: urlData
    })
  }

  //社群連結(連結圖片、圖片名稱)畫面
  renderUrlImgScreen = (data, index) => {
    if (data.imgUrl == 0) {
      return (
        <Row style={{ width: '95%', height: '50px', border: '1px solid #A6C1D3', backgroundColor: '#E9E9E9' }}></Row>
      )
    } else {
      return (
        <div style={{ width: '95%', height: '50px', border: '1px solid #A6C1D3', display: 'flex', alignItems: 'center', justifyContent:'space-between', padding: '0px 5px' }}>
          <div>
            <img src={data.imgUrl} style={{ width: '36px', height: '36px', border: '0px' }} />
          </div>
          <div style={{overflow:'hidden', textOverflow: "ellipsis", color: '#7D9EB5', fontSize: '16px', margin: '0px 10px', whiteSpace:'nowrap'}}>
              {data.imgName}
          </div>
          <div>
            <img src={Images.delete2} style={{ cursor: 'pointer' }} onClick={() => this.handleSaveDeleteId(index)} />
          </div>
        </div>
      )
    }
  }

  //社群連結畫面
  renderUrlScreen = (data, index) => {
    return (
      <Row style={{ width: '100%', marginBottom: '10px' }}>
        <Col span={8}>
          {
            this.renderUrlImgScreen(this.state.urlData[index], index)
          }
        </Col>
        <Col span={4}>
          <Upload
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={this.beforeUpload}
            customRequest={dummyRequest}
            onChange={(info) => this.handleChangeImg(info, index)}
            style={{ width: '100%' }}
          >
            <Button icon={<UploadOutlined />} style={styles.uploadBtnStyle}>
              Upload
            </Button>
          </Upload>
        </Col>
        <Col span={10} style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
          <Input
            value={data.path}
            onChange={e => this.handleChangeInput(e.target.value, index)}
            style={{
              height: '40px',
              border: '1px solid #A6C1D3',
              borderRadius: '5px',
              marginLeft: '20px'
            }}
          />
        </Col>
      </Row>
    )
  }

  //營業時間畫面
  renderTimeScreen = (name, num) => {
    return (
      <Col span={12}>
        <Form.Item
          name={`info_time${num}`}
          label={name}
          // labelCol={4}
          colon={false}
        >
          <Input placeholder={`請輸入${name}營業時間`} style={{...styles.inputStyle, width: '100%'}} />
        </Form.Item>
      </Col>
    )
  }

  //營業時間陣列
  infoTimeData = [
    {
      name: '周一',
      num: 1
    }, {
      name: '周二',
      num: 2
    },
    {
      name: '周三',
      num: 3
    },
    {
      name: '周四',
      num: 4
    },
    {
      name: '周五',
      num: 5
    },
    {
      name: '周六',
      num: 6
    },
    {
      name: '周日',
      num: 7
    },
  ]



  //關於我們
  renderAbout = () => {
    const { aboutText } = this.state;
    return (
      <div style={{ width: '100%', padding: '25px' }}>
        <Form
          name="basic"
          onFinish={this.handleAboutUpdate}
          labelCol={{ span: 24 }}
        >
          <HtmlEditor
            propName="info_about"
            title='中心簡介'
            required
            requiredErrorMessage="請輸入中心簡介"
            value={aboutText}
            placeholder='中心簡介'
            onEditorStateChange={(value) => this.handleChangeContent('about', value)}
          />
          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  //購物需知
  renderNotes = () => {
    const { notesText } = this.state;

    return (
      <div style={{ width: '100%', padding: '25px' }}>
        <Form
          name="basic"
          onFinish={this.handleNotesUpdate}
          labelCol={{ span: 24 }}
        >
          <HtmlEditor
            propName="info_notes"
            title='購物需知'
            required
            requiredErrorMessage="請輸入購物需知"
            value={notesText}
            placeholder={'notification_modal_placeholder_content'}
            onEditorStateChange={(value) => this.handleChangeContent('notes', value)}
          />
          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  //常見問題
  renderQA = () => {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Form
          name="basic"
          initialValues={{
            qa: [{ problem: '' }, { problem: '' }, { problem: '' }],
          }}
          onFinish={this.handleCreate}
          onValuesChange={this.handleFormChange}
          style={{ width: '100%' }}
        >
          <Row style={{ width: '100%', height: '50px', alignItems: 'center', borderBottom: '1px solid #A6C1D3' }}>
            <Col span={2} style={styles.titleCenterStyle}>
              排序
            </Col>
            <Col span={20} style={styles.titleStyle}>
              問與答
            </Col>
            <Col span={2} style={styles.titleCenterStyle}>
              操作
            </Col>
          </Row>
          <Form.List
            name="qa"
          >
            {(fields, { add, remove }) => (
              <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {fields.map((field, index) => (
                  <Row style={{ width: '100%', padding: '15px 0px 25px 0px', borderBottom: '1px solid #A6C1D3' }}>
                    <Col span={2}>
                      {/*排序*/}
                    </Col>
                    <Col span={20}>
                      <div style={{ width: '100%' }}>
                        <Form.Item
                          {...field}
                          label="問"
                          colon={false}
                          name={[field.name, 'problem']}
                          fieldKey={[field.fieldKey, 'problem']}
                          validateTrigger={['onChange']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "請輸入問題",
                            },
                          ]}
                        >
                          <Input style={{ width: '100%', height: '40px', borderRadius: '5px', border: '1px solid #A6C1D3' }} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          label="答"
                          colon={false}
                          name={[field.name, 'answer']}
                          fieldKey={[field.fieldKey, 'answer']}
                          validateTrigger={['onChange']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "請輸入問題的回答",
                            },
                          ]}
                          style={{ marginTop: '15px' }}
                        >
                          <Input style={{ width: '100%', height: '125px', borderRadius: '5px', border: '1px solid #A6C1D3' }} />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={2} style={{ display: 'flex', justifyContent: 'center' }}>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '95%', marginTop: '25px' }}
                  icon={<PlusOutlined />}
                >
                  新增一行
                </Button>
              </div>
            )}
          </Form.List>
          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  // 特惠廣告區塊
  renderAD = () => {
    const { loading } = this.state;

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Form
          name="basic"
          initialValues={{
            ad: [{ img: '' }, { img: '' }, { img: '' }]
          }}
          onFinish={this.handleCreate}
          onValuesChange={this.handleFormChange}
          style={{ width: '100%' }}
        >
          <Row style={{ width: '100%', height: '50px', alignItems: 'center', borderBottom: '1px solid #A6C1D3' }}>
            <Col span={2} style={styles.titleCenterStyle}>
              排序
            </Col>
            <Col span={4} style={styles.titleCenterStyle}>
              圖片
            </Col>
            <Col span={8} style={styles.titleCenterStyle}>
              標題
            </Col>
            <Col span={8} style={styles.titleCenterStyle}>
              連結
            </Col>
            <Col span={2} style={styles.titleCenterStyle}>
              操作
            </Col>
          </Row>
          <Form.List
            name="ad"
          >
            {(fields, { add, remove }) => (
              <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {fields.map((field) => (
                  <Row style={{ width: '100%', height: '200px', borderBottom: '1px solid #A6C1D3' }}>
                    <Col span={2}>
                      {/*排序*/}
                    </Col>
                    <Col span={4} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'img']}
                        fieldKey={[field.fieldKey, 'img']}
                        validateTrigger={['onChange']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "請選擇圖片",
                          },
                        ]}
                        onChange={this.testChange()}
                        style={{ width: '100px', height: '100px' }}
                      >
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={this.beforeUpload}
                          customRequest={dummyRequest}
                          onChange={(info) => this.handleAdImgChange(info, field.name)}
                        >
                          {this.state.adImgPath ?
                            <img src={this.state.adImgPath} style={{ width: '100%', height: '100%' }} />
                            :
                            <div >
                              {loading ? <LoadingOutlined /> : <img src={Images.outline} />}
                              <div>上傳圖片</div>
                            </div>
                          }
                        </Upload>
                      </Form.Item>
                    </Col>
                    <Col span={8} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'title']}
                        fieldKey={[field.fieldKey, 'title']}
                        validateTrigger={['onChange']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "請輸入標題",
                          },
                        ]}
                        style={{ width: '80%' }}
                      >
                        <Input style={{ width: '100%', height: '40px', borderRadius: '5px', border: '1px solid #A6C1D3' }} />
                      </Form.Item>
                    </Col>
                    <Col span={8} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'link']}
                        fieldKey={[field.fieldKey, 'link']}
                        validateTrigger={['onChange']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "請輸入連結",
                          },
                        ]}
                        style={{ width: '80%' }}
                      >
                        <Input style={{ width: '100%', height: '40px', borderRadius: '5px', border: '1px solid #A6C1D3' }} />
                      </Form.Item>
                    </Col>

                    <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '95%', marginTop: '25px' }}
                  icon={<PlusOutlined />}
                >
                  新增一行
                </Button>

              </div>
            )}
          </Form.List>
          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  //行動呼籲
  renderAction = () => {
    return (
      <div style={{ width: '100%', padding: '25px' }}>
        <Form
          ref={this.updateForm}
          labelCol={{ style: { width: '100%', fontSize: '16px', fontWeight: 'bold' } }}
          labelAlign="left"
          initialValues={{
          }}
          // style={{ overflowY: 'auto' }}
          onFinish={this.handleUpdate}
          onValuesChange={this.handleFormChange}
        >
          <Row>
            <p style={{ color: '#7D9EB5', fontWeight: 'bold', fontSize: '16px', }}>
              背景圖片
            </p>
            <div>

            </div>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="info_name"
                label="大標題"
                rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Input placeholder='請輸入大標題' style={styles.inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="info_name"
                label="按鈕文字"
                rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Input placeholder='請輸入按鈕文字' style={styles.inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name="info_name"
                label="小標題"
                rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Input placeholder='請輸入小標題' style={styles.inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="info_name"
                label="連結"
                rules={[{ required: true, message: '此欄位不可為空！' }]}
              >
                <Input placeholder='請輸入連結' style={styles.inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '400px'
            }}
          >
            <Button htmlType="submit" style={styles.btnStyle}>儲存</Button>
          </div>
        </Form>
      </div >
    )
  }

  render() {
    const { aboutInfo, screenHeight } = this.props;
    const { isLoading } = this.state;

    if(isLoading === true){
      return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '150px', background: 'transparent'}}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              聯絡我們管理
            </div>
            <div style={{...styles.contentBottom, minHeight: screenHeight - 183}}>
              <Form
                initialValues={{...aboutInfo}}
                labelCol={{ style: { fontSize: '16px', fontWeight: 'bold' } }}
                labelAlign="left"
                style={{width: '100%'}}
                onFinish={this.handleUpdate}
              >
                <Row style={{margin: '20px 0px', rowGap: '12px'}} gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="contact_map"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      label="Google 地圖嵌入碼"
                      rules={[
                        {
                          required: true,
                          message: '此欄位不可為空！',
                        },
                      ]}
                    >
                      <TextArea placeholder='請輸入Google 地圖嵌入碼' style={{...styles.inputStyle, resize: 'none', height: '150px'}} />
                    </Form.Item>
                  </Col>
                  <Col span={12}></Col>
                  <Col span={12}>
                    <Form.Item
                      name="contact_tel"
                      label="電話"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: '請輸入電話',
                        },
                      ]}
                    >
                      <Input placeholder="請輸入電話" style={styles.inputStyle} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="contact_email"
                      label="E-mail"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: '請輸入信箱',
                          type: 'email',
                          message: '格式錯誤！',
                        },
                      ]}
                    >
                      <Input placeholder="請輸入信箱" style={styles.inputStyle} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="contact_fb"
                      label="粉絲頁名稱"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[{ 
                        required: true, 
                        message: '此欄位不可為空！',
                      }]}
                    >
                      <Input placeholder='請輸入粉絲頁名稱' style={styles.inputStyle} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="contact_fb_url"
                      label="粉絲頁連結"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[{ 
                        required: true, 
                        message: '此欄位不可為空！',
                        type: 'url',
                        message: '格式錯誤！',
                      }]}
                    >
                      <Input placeholder='請輸入粉絲頁連結' style={styles.inputStyle} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="contact_addr_zh"
                      label="中文地址"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[{ required: true, message: '此欄位不可為空！' }]}
                    >
                      <Input placeholder='請輸入中文地址' style={styles.inputStyle} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="contact_addr_en"
                      label="英文地址"
                      colon={false}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[{ required: true, message: '此欄位不可為空！' }]}
                    >
                      <Input placeholder='請輸入英文地址' style={styles.inputStyle} />
                    </Form.Item>
                  </Col>
                </Row>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>
                  <Button style={styles.btnStyle} htmlType='submit' loading={isLoading}>
                    儲存
                  </Button>
                </div>
              </Form>
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
    screenHeight: state.screen.screenHeight,
    aboutInfo: state.home.aboutInfo,
    // storeAbout: state.store.storeAbout,
    // storeNotes: state.store.storeNotes,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getAboutInfo: HomeActions.getAboutInfo,
        updateAboutInfo: HomeActions.updateAboutInfo,
      },
      dispatch,
    ),
)(AboutScreen);
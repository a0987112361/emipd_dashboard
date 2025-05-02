import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Select, Form, Input, Upload, Row, Col, DatePicker, message } from 'antd';
import { Images, Colors } from 'src/Theme';
import { LoadingOutlined, PlusOutlined, UploadOutlined, CheckOutlined } from '@ant-design/icons';
import { ActivityActions } from 'src/Stores';
import HashHistory from 'src/utils/HashHistory';
import { HtmlEditor, FormInput, FormInputSelect } from 'src/Components';
import _ from 'lodash';
import moment from 'moment';
import './ActivityDetailScreen.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
  contentTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '30px',
  },
  contentBody: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '8px 20px',
    color: '#7D9EB5',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  btnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
  },

};

class ActivityDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.createForm = React.createRef();
    this.state = {
      isLoading: false,
      imgList: [],
      imgLoading: false,
      contentText: '',
      productList: [],
      activityId: '',
      isShow: false,
      selectId: [], // select初始值
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { history, getActivityItemList, getActivityDetail } = this.props;

    let temp = "";
    temp = history.location.pathname.split('/activity/update/');

    let tempList = [];

    const callback = (value) => {
      value.list.map((item) => {
        if (_.isEmpty(item.item_img)) {
          tempList.push({
            id: item.item_id,
            name: item.item_name,
            img: Images.no_product
          })
        } else {
          tempList.push({
            id: item.item_id,
            name: item.item_name,
            img: item.item_img
          })
        }
      })
      this.setState({
        isLoading: false,
        productList: tempList
      }, () => getActivityDetail(temp[1], callback2))
    }

    getActivityItemList(callback);

    const callback2 = (value) => {
      let temp = [];
      temp.push({
        uid: 1,
        name: 'activity.jpg',
        status: 'done',
        id: value.activity_id,
        url: value.activity_img,
      });

      let imgs = [];

      value.items.map((item) => {
        tempList.map((temp) => {
          if (item.item_id == temp.id) {
            imgs.push({
              img: temp.img,
              name: temp.name
            });
          }
        })
      })

      let selectId = [];

      value.items.map((info) => {
        selectId.push(info.item_id);
      })

      this.setState({
        isLoading: false,
        imgList: imgs,
        activityId: value.activity_id,
        ImageData: temp,
        contentText: value.activity_content,
        isShow: true,
        selectId: selectId
      })
    }

  }

  componentWillUnmount() {
    const { resetActivityDetail } = this.props;
    resetActivityDetail();
  }

  handleUpdate = (value) => {
    const { updateActivity } = this.props;
    this.setState({
      isLoading: true
    })

    let formData = new FormData();
    formData.append('activity_id', this.state.activityId);
    formData.append('activity_title', value.activity_title);
    formData.append('activity_content', this.state.contentText)
    formData.append('activity_start', moment(value.date[0]).format('YYYY-MM-DD'))
    formData.append('activity_end', moment(value.date[1]).format('YYYY-MM-DD'))
    if (!_.isEmpty(this.state.ImageData)) {
      formData.append('activity_img', this.state.ImageData[0].originFileObj);
    }
    let indexKey = 0;
    value.items.map((item) => {
      formData.append(`items[${indexKey}]`, item);
      indexKey += 1
    })

    const callback = () => {
      this.setState({
        isLoading: false
      })
      HashHistory.push('/activity');
    }
    updateActivity(formData, callback);
  }

  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('ImageData', newFileList.splice(1, 1));
    } else {
      this.setFileList('ImageData', newFileList);
    }
  };

  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  }

  handleChangeContent = (value) => {
    this.setState({ contentText: value.toHTML() });
  }

  handlePreview = (file) => {
    const  imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  }

  selectChange = (val) => {
    const { productList } = this.state;

    let imgs = [];
    val.map((item) => {
      productList.map((product) => {
        if (item == product.id) {
          imgs.push({
            img: product.img,
            name: product.name
          });
        }
      })
    })

    this.setState({
      imgList: imgs,
    })
  }

  render() {
    const { imgLoading, contentText, productList, imgList, isShow, ImageData } = this.state;
    const { Activity } = this.props

    if (!isShow) {
      return null;
    }

    let tempDatePicker = [moment(Activity.activity_start), moment(Activity.activity_end)];
    return (
      <div style={{ width: '100%', height: '90%' }}>
        <div style={styles.contentTop}>
          <span style={{ marginRight: '40px' }}>活動管理</span>
        </div>
        <div style={styles.contentBody}>
          <Form
            name='basic'
            initialValues={{
              ...Activity,
              date: tempDatePicker,
              activity_content: this.state.contentText,
              items: this.state.selectId
            }}
            onFinish={this.handleUpdate}
          >
            <FormInput
              required
              propName='activity_title'
              placeholder="輸入活動名稱"
              title="活動名稱 "
              requiredErrorMessage="輸入活動名稱"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: '10px' }}
              rule={[
                { max: 100, message: '最多輸入100個字' }
              ]}
            />

            <Form.Item
              name="date"
              label="發佈日期 "
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: '此欄位不可為空！' }]}
            >
              <RangePicker
                placeholder={["開始日期", "結束日期"]}
                style={{ borderRadius: '5px', border: '1px solid #a6c1d3', width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="activity_img"
              valuePropName="activity_img"
              getValueFromEvent={normFile}
              label="活動照片(建議解析度為1470*374)"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG"
                fileList={ImageData}
                onChange={this.handleAvatarChange}
                customRequest={dummyRequest}
                onPreview={this.handlePreview}
                // onPreview={onPreview}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {ImageData.imgUrl ?
                  <img src={ImageData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {imgLoading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
            </Form.Item>

            {/* <div style={{ color: '#7D9EB5', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>*說明</div> */}
            <HtmlEditor
              title="說明"
              propName="activity_content"
              value={contentText}
              onEditorStateChange={this.handleChangeContent}
              require
              requiredErrorMessage="請輸入說明"
            />

            <FormInputSelect
              title="活動產品"
              allowClear
              mode="multiple"
              options={productList}
              propName='items'
              placeholder="請選擇產品"
              onChange={this.selectChange}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
              style={{ margin: '30px 0px' }}
            />
            <Row gutter={[8, 48]} style={{ width: '100%', height: 'auto', marginBottom: '50px' }}>
              {
                (imgList.length > 0) &&
                imgList.map((item, index) => {
                  return (
                    <Col span={4} style={{ width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '16px' }}>
                      <div style={{ width: '100%', height: '200px' }}>
                        <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className='multiLine'
                        style={{
                          display: '-webkit-box',
                          wordBreak: 'break-all',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          webkitLineClamp: '4',
                          webkitBoxOrient: 'vertical',
                          height: '50px',
                          textAlign: 'center'
                        }}>
                        {item.name}
                      </div>
                    </Col>
                  )
                })
              }

            </Row>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0px 0px 24px 0px' }}>
              <Button style={styles.btnStyle} htmlType='submit'>
                儲存
              </Button>
            </div>
          </Form>
        </div>
      </div >
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    Activity: state.activity.Activity,
    ItemList: state.activity.ItemList
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getActivityItemList: ActivityActions.getActivityItemList,
        getActivityDetail: ActivityActions.getActivityDetail,
        updateActivity: ActivityActions.updateActivity,
        resetActivityDetail: ActivityActions.resetActivityDetail,
      },
      dispatch,
    ),
)(ActivityDetailScreen);


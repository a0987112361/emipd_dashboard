import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Select,
  Form,
  Input,
  Upload,
  Row,
  Col,
  DatePicker,
  message,
} from "antd";
import { Images, Colors } from "src/Theme";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { ActivityActions } from "src/Stores";
import HashHistory from "src/utils/HashHistory";
import {
  HtmlEditor,
  FormInputSelect,
  FormInput,
  FormTextarea,
} from "src/Components";
import _ from "lodash";
import moment from "moment";
import "./ActivityCreate.css";

const { RangePicker } = DatePicker;

const normFile = (e) => {
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
    height: "100%",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  contentTop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "30px",
  },
  contentBody: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    marginTop: "20px",
    padding: "8px 20px",
    color: "#7D9EB5",
    fontWeight: "bold",
    fontSize: "16px",
  },
  btnStyle: {
    backgroundColor: "#004C7C",
    width: "103px",
    height: "40px",
    color: "white",
    borderRadius: "4px",
  },
};

class ActivityCreate extends React.Component {
  constructor(props) {
    super(props);
    this.createForm = React.createRef();
    this.state = {
      isLoading: false,
      imgList: [],
      contentText: "",
      productList: [],
      ImageData: [],
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getActivityItemList, ItemList } = this.props;
    const callback = (value) => {
      let tempList = [];

      value.list.map((item) => {
        if (_.isEmpty(item.item_img)) {
          tempList.push({
            id: item.item_id,
            name: item.item_name,
            img: Images.no_product,
          });
        } else {
          tempList.push({
            id: item.item_id,
            name: item.item_name,
            img: item.item_img,
          });
        }
      });
      this.setState({
        isLoading: false,
        productList: tempList,
      });
    };

    getActivityItemList(callback);
  }

  handleCreate = (value) => {
    const { createActivity } = this.props;
    const { ImageData } = this.state;

    this.setState({
      isLoading: true,
    });

    let formData = new FormData();
    formData.append("activity_title", value.name);
    formData.append("activity_content", this.state.contentText);
    let indexKey = 0;
    if (value.items != undefined) {
      value.items.map((item) => {
        formData.append(`items[${indexKey}]`, item);
        indexKey += 1;
      });
    }

    formData.append(
      "activity_start",
      moment(value.date[0]).format("YYYY-MM-DD")
    );
    formData.append("activity_end", moment(value.date[1]).format("YYYY-MM-DD"));

    if (ImageData.length > 0) {
      formData.append("activity_img", ImageData[0].originFileObj);
    }
    const callback = () => {
      this.setState({
        isLoading: false,
      });
      HashHistory.push("/activity");
    };

    createActivity(formData, callback);
  };

  handleChangeContent = (value) => {
    this.setState({ contentText: value });
  };

  selectChange = (val) => {
    const { productList } = this.state;
    let imgs = [];
    val.map((item) => {
      productList.map((product) => {
        if (item == product.id) {
          imgs.push({
            img: product.img,
            name: product.name,
          });
        }
      });
    });
    this.setState({
      imgList: imgs,
    });
  };

  handlePreview = (file) => {
    const imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  };

  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList("ImageData", newFileList.splice(1, 1));
    } else {
      this.setFileList("ImageData", newFileList);
    }
  };

  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  };

  render() {
    const { contentText, productList, imgList, ImageData, isLoading } =
      this.state;

    return (
      <div style={{ width: "100%", height: "90%" }}>
        <div style={styles.contentTop}>
          <span style={{ marginRight: "40px" }}>活動管理</span>
        </div>
        <div style={styles.contentBody}>
          <Form name="basic" onFinish={this.handleCreate}>
            <FormInput
              required
              propName="name"
              placeholder="請輸入活動名稱"
              title="活動名稱"
              requiredErrorMessage="請輸入活動名稱"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: "10px" }}
              rule={[{ max: 100, message: "最多輸入100個字" }]}
            />
            <Form.Item
              name="date"
              label="發佈日期"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
              rules={[{ required: true, message: "請選擇發佈日期" }]}
            >
              <RangePicker
                placeholder={["開始日期", "結束日期"]}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A6C1D3",
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              name="ad_img"
              valuePropName="ad_img"
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
                beforeUpload={(file) => {
                  const isJPG =
                    file.type === "image/jpeg" || file.type === "image/png";
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {ImageData.imgUrl ? (
                  <img
                    src={ImageData.imgUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div>
                    {isLoading ? (
                      <LoadingOutlined />
                    ) : (
                      <img src={Images.outline} alt="avatar" />
                    )}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <div
              style={{
                color: "#7D9EB5",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              * 說明
            </div>
            <HtmlEditor
              propName="content"
              required
              requiredErrorMessage="請輸入說明"
              value={contentText}
              onEditorStateChange={this.handleChangeContent}
              style={{ marginBottom: "20px" }}
            />
            <FormInputSelect
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
              title="活動產品"
              allowClear
              mode="multiple"
              options={productList}
              propName="items"
              placeholder="請選擇產品"
              onChange={this.selectChange}
              style={{ marginTop: "30px" }}
            />
            <Row
              style={{ width: "100%", height: "auto", marginBottom: "30px" }}
            >
              {imgList.map((item, index) => {
                return (
                  <Col
                    span={4}
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    <div style={{ width: "100%", height: "200px" }}>
                      <img
                        src={item.img}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        minHeight: "50px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "0px 0px 24px 0px",
              }}
            >
              <Button style={styles.btnStyle} htmlType="submit">
                儲存
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    ItemList: state.activity.ItemList,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getActivityItemList: ActivityActions.getActivityItemList,
        createActivity: ActivityActions.createActivity,
      },
      dispatch
    )
)(ActivityCreate);

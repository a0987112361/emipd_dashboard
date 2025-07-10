import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Table,
  Modal,
  Form,
  Spin,
  DatePicker,
  Switch,
  Row,
  Col,
  Space,
  Input,
  Upload,
  message,
} from "antd";

import {
  LoadingOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Images, Screen, Colors } from "src/Theme";
import { FormInput, HtmlEditor } from "src/Components";
import hashHistory from "../../utils/HashHistory";
import "./ResourceScreen.css";
import _ from "lodash";
import Swal from "sweetalert2";
import { ResourceActions } from "src/Stores";
import moment from "moment";

let timer;
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
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentTop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "30px",
  },
  btnStyle: {
    backgroundColor: "#004C7C",
    width: "100px",
    height: "40px",
    color: "white",
    borderRadius: "4px",
    marginLeft: "40px",
  },
  contentBottom: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "20px",
    fontWeight: "bold",
    overflowY: "auto",
  },
  contentBottomTitle: {
    marginLeft: "5px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  htmlBtnBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },
  btnStyle: {
    backgroundColor: "#004C7C",
    width: "100px",
    height: "40px",
    color: "white",
    borderRadius: "4px",
    marginLeft: "40px",
  },
  langMark: {
    fontWeight: "bold",
    fontSize: "20px",
    color: Colors.primary,
  },
  spaceStyle: {
    width: "100%",
    height: "65px",
    backgroundColor: "#fff",
    boxShadow: "0px 5px 20px rgba(176,195,211,0.16)",
    borderRadius: "4px",
    padding: "0px 20px",
    marginTop: "30px",
  },
  inputStyle: {
    width: "317px",
    height: "40px",
    borderRadius: "5px",
  },
};

class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.resourceForm = React.createRef();
    this.state = {
      isLoading: false,
      viewModalVisible: false,
      queryPayload: {
        now_page: 1,
        page_size: 10,
        search: "",
        order: -1,
      },
      // for editing form reset
      formInitialValues: {},
      formKey: Date.now(),
      // existing fields
      mode: "create",
      resourceContentZh: "",
      resourceContentEn: "",
      mainImageData: [],
      mainImageId: "",
      currentId: "",
      fileData: [],
      originFileData: [],
      columnChangeForm: {},
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    this.handleDataChange();
  }

  handleDataChange = () => {
    const { location, paging, getResourceList } = this.props;
    let urlData = { now_page: 1, page_size: 10, search: "", order: 0 };
    if (window.location.href.includes("?")) {
      const temp = new URLSearchParams(location.search);
      if (temp.get("search")) urlData.search = temp.get("search");
      if (temp.get("now_page"))
        urlData.now_page = parseInt(temp.get("now_page"));
      if (temp.get("page_size"))
        urlData.page_size = parseInt(temp.get("page_size"));
      if (temp.get("order")) urlData.order = parseInt(temp.get("order"));
    }
    const payload = { ...urlData };
    this.setState({ isLoading: true, queryPayload: payload }, () => {
      getResourceList(
        payload,
        () => this.setState({ isLoading: false }),
        this.errorCallback
      );
    });
  };

  // 路由改變會觸發
  componentWillReceiveProps(nextProps) {
    const { url } = this.state;
    if (nextProps.location.search !== url) {
      this.setState(
        {
          url: nextProps.location.search,
        },
        () => {
          this.handleDataChange();
        }
      );
    }
  }

  // 路由帶query
  handleRouteChange = () => {
    const { history } = this.props;
    const { queryPayload } = this.state;
    this.setState(
      {
        isLoading: false,
      },
      () => {
        history.push(
          `/resource?${
            queryPayload.search !== "" ? `search=${queryPayload.search}&` : ""
          }${
            queryPayload.now_page !== 1
              ? `now_page=${queryPayload.now_page}&`
              : ""
          }${
            queryPayload.page_size !== 10
              ? `page_size=${queryPayload.page_size}&`
              : ""
          }${queryPayload.order !== 0 ? `order=${queryPayload.order}` : ""}`
        );
      }
    );
  };

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  };

  // 關鍵字搜尋
  handleSearch = (e) => {
    let value = e.target.value;

    const handleGetList = () => {
      let newPayload = this.state.queryPayload;
      newPayload.search = value;
      newPayload.now_page = 1;

      this.setState(
        {
          searchValue: value === "" ? "" : value,
          isLoading: true,
          queryPayload: newPayload,
        },
        () => {
          this.handleRouteChange();
        }
      );
    };

    function debounce(func, delay = 250) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay);
    }
    debounce(handleGetList, 500);
  };

  // 換頁
  handleChange = (pagination, filters, sorter) => {
    const { paging } = this.props;
    let newPayload = this.state.queryPayload;
    let updateOrder = 0;

    if (sorter.order == "ascend") {
      updateOrder = 1;
    } else if (sorter.order == "descend") {
      updateOrder = -1;
    } else {
      updateOrder = 0;
    }

    newPayload.order = updateOrder;
    if (
      paging.now_page !== pagination.current ||
      paging.page_size !== pagination.pageSize
    ) {
      newPayload.now_page = pagination.current;
      newPayload.page_size = pagination.pageSize;
    }

    this.setState(
      {
        isLoading: true,
        queryPayload: newPayload,
      },
      () => {
        this.handleRouteChange();
      }
    );
  };

  // 控制新增和編輯彈窗
  handleViewModal = (mode, id, record) => {
    if (mode === "update") {
      this.setState({ isLoading: true, mode }, () => {
        this.setState({
          currentId: record.resource_id,
        });
        this.props.getResourceInfo(id, this.handleEditInit, () =>
          this.setState({ isLoading: false })
        );
      });
    } else {
      this.setState({
        mode: "create",
        viewModalVisible: true,
        resourceContentZh: "",
        resourceContentEn: "",
        mainImageData: [],
        fileData: [],
        formInitialValues: {},
        formKey: Date.now(),
      });
    }
  };

  handleEditInit = (value) => {
    const imgTemp =
      value.img && value.img.file_id
        ? [
            {
              uid: value.img.file_id,
              name: value.img.file_name || "image",
              status: "done",
              url: value.img.file_url,
              originFileObj: value.img,
            },
          ]
        : [];
    const fileTemp =
      value.file && value.file.file_id
        ? [
            {
              uid: value.file.file_id,
              name: value.file.file_name,
              status: "done",
              url: value.file.file_url,
              originFileObj: value.file,
            },
          ]
        : [];
    const categoryValues = (value.categories || []).map((cat) => ({
      category_title_zh: cat.category_title_zh,
      category_title_en: cat.category_title_en,
      category_id: cat.category_id,
      subitems: (cat.subitems || []).map((sub) => ({
        title_zh: sub.title_zh,
        title_en: sub.title_en,
        subitem_id: sub.subitem_id,
        file_zh: sub.file_zh_data
          ? [
              {
                uid: sub.file_zh_data.file_id,
                name: sub.file_zh_data.file_name,
                status: "done",
                url: sub.file_zh_data.file_url,
                originFileObj: sub.file_zh_data,
              },
            ]
          : [],
        file_en: sub.file_en_data
          ? [
              {
                uid: sub.file_en_data.file_id,
                name: sub.file_en_data.file_name,
                status: "done",
                url: sub.file_en_data.file_url,
                originFileObj: sub.file_en_data,
              },
            ]
          : [],
      })),
    }));
    const initialValues = {
      ...value,
      categories: categoryValues,
      img: imgTemp,
      upload_file: fileTemp,
    };
    this.setState({
      formInitialValues: initialValues,
      formKey: Date.now(),
      resourceContentZh: value.resource_content_zh,
      resourceContentEn: value.resource_content_en,
      mainImageData: imgTemp,
      fileData: fileTemp,
      originFileData: value.file,
      mainImageId: value.img && value.img.file_id,
      viewModalVisible: true,
      isLoading: false,
    });
  };

  // 刪除
  handleDelete = (resourceId) => {
    const { deleteResource, paging } = this.props;
    const { queryPayload } = this.state;

    let id = resourceId.toString();
    let payload = [];
    payload.push(id);

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    };

    Swal.fire({
      title: "確定要刪除嗎?",
      text: "資料刪除後無法恢復，如果要刪除請按確認",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "確定刪除",
      cancelButtonText: "取消",
      confirmButtonColor: "#E21D53",
      cancelButtonColor: "#004C7C",
    }).then((result) => {
      if (result.value) {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            deleteResource(payload, queryPayload, callback, this.errorCallback);
          }
        );
      }
    });
  };

  closeModal() {
    this.setState({
      viewModalVisible: false,
    });
  }

  onSwitchChange = (value) => {};

  // 圖片預覽 step 1
  handlePreview = (file) => {
    const imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  };
  // 圖片預覽 step 2
  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList("mainImageData", newFileList.splice(1, 1));
    } else {
      this.setFileList("mainImageData", newFileList);
    }
  };
  // 圖片預覽 step 2
  handleFileChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList("fileData", newFileList.splice(1, 1));
    } else {
      this.setFileList("fileData", newFileList);
    }
  };
  // 圖片預覽 step 3
  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  };

  //html編輯器
  handleChangeContent = (text, value) => {
    if (text == "resourceContentZh") {
      this.setState({ resourceContentZh: value });
    } else if (text == "resourceContentEn") {
      this.setState({ resourceContentEn: value });
    }
  };

  handleChangeForm = (change, all) => {
    this.setState({
      columnChangeForm: all.columns,
    });
  };

  handleSubmit = (value) => {
    const { createResource, updateResource } = this.props;
    const {
      mainImageData,
      queryPayload,
      resourceContentEn,
      resourceContentZh,
      mode,
      currentId,
      fileData,
      mainImageId,
      columnChangeForm,
    } = this.state;

    let isOk = true;
    let formData = new FormData();

    // if (fileData.length === 0) {
    //   message.error("請上傳檔案", 10);
    //   isOk = false;
    // }

    // 基本欄位
    formData.append("resource_title_zh", value.resource_title_zh || "");
    formData.append("resource_content_zh", resourceContentZh || "");
    formData.append("resource_title_en", value.resource_title_en || "");
    formData.append("resource_content_en", resourceContentEn || "");
    formData.append("resource_url", value.resource_url || "");
    formData.append("is_fill", value.is_fill ? true : false);

    if (mode === "update") {
      formData.append("resource_id", currentId);

      // 處理主圖
      if (mainImageData.length === 0) {
        formData.append("img_file_id", ""); // 清空
      } else if (_.has(mainImageData[0], "originFileObj")) {
        formData.append("img", mainImageData[0].originFileObj);
      } else {
        formData.append("img_file_id", mainImageId);
      }

      // 處理主檔案
      if (_.has(fileData[0], "originFileObj")) {
        formData.append("upload_file", fileData[0].originFileObj);
      } else {
        formData.append("upload_file", fileData);
      }
    } else {
      // create
      if (mainImageData.length > 0) {
        formData.append("img", mainImageData[0].originFileObj);
      }
      if (fileData.length > 0) {
        formData.append("upload_file", fileData[0].originFileObj);
      }
    }

    // categories & subitems
    if (Array.isArray(value.categories)) {
      value.categories.forEach((cat, catIdx) => {
        if (cat.category_id) {
          formData.append(
            `categories[${catIdx}].category_id`,
            cat.category_id || ""
          );
        }
        formData.append(
          `categories[${catIdx}].category_title_zh`,
          cat.category_title_zh || ""
        );
        formData.append(
          `categories[${catIdx}].category_title_en`,
          cat.category_title_en || ""
        );

        if (Array.isArray(cat.subitems)) {
          cat.subitems.forEach((sub, subIdx) => {
            if (sub.subitem_id) {
              formData.append(
                `categories[${catIdx}].subitems[${subIdx}].subitem_id`,
                sub.subitem_id || ""
              );
            }
            formData.append(
              `categories[${catIdx}].subitems[${subIdx}].title_zh`,
              sub.title_zh || ""
            );
            formData.append(
              `categories[${catIdx}].subitems[${subIdx}].title_en`,
              sub.title_en || ""
            );

            // ★ 子項中文字檔：update 時帶 file_id 或 新檔案
            if (mode === "update") {
              if (sub.file_zh && sub.file_zh.length > 0) {
                if (
                  _.has(sub.file_zh[0], "originFileObj") &&
                  !sub.file_zh[0].originFileObj.file_id
                ) {
                  formData.append(
                    `categories[${catIdx}].subitems[${subIdx}].file_zh`,
                    sub.file_zh[0].originFileObj
                  );
                }
              }
              if (sub.file_en && sub.file_en.length > 0) {
                if (
                  _.has(sub.file_en[0], "originFileObj") &&
                  !sub.file_en[0].originFileObj.file_id
                ) {
                  formData.append(
                    `categories[${catIdx}].subitems[${subIdx}].file_en`,
                    sub.file_en[0].originFileObj
                  );
                }
              }
            } else {
              // create 時純粹上新檔案
              if (sub.file_zh && sub.file_zh.length > 0) {
                formData.append(
                  `categories[${catIdx}].subitems[${subIdx}].file_zh`,
                  sub.file_zh[0].originFileObj
                );
              }
              if (sub.file_en && sub.file_en.length > 0) {
                formData.append(
                  `categories[${catIdx}].subitems[${subIdx}].file_en`,
                  sub.file_en[0].originFileObj
                );
              }
            }
          });
        }
      });
    }

    const callback = () => {
      this.setState({ isLoading: false, viewModalVisible: false });
    };

    if (isOk) {
      this.setState({ isLoading: true }, () => {
        if (mode === "create") {
          createResource(formData, queryPayload, callback, this.errorCallback);
        } else {
          updateResource(formData, queryPayload, callback, this.errorCallback);
        }
      });
    }
  };

  // 渲染新增和編輯彈窗
  renderViewModal = () => {
    const { resourceInfo } = this.props;
    const {
      viewModalVisible,
      fileData,
      mainImageData,
      moreImageData,
      resourceContentZh,
      resourceContentEn,
      mode,
      loading,
      isLoading,
      formInitialValues,
    } = this.state;
    const initial =
      mode === "update"
        ? formInitialValues
        : { resource_url: "", is_fill: false };

    return (
      <Modal
        title={mode === "create" ? "新增資源分享" : "編輯資源分享"}
        visible={viewModalVisible}
        width={1000}
        centered
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name="basic"
          ref={this.resourceForm}
          initialValues={initial}
          onValuesChange={this.handleChangeForm}
          onFinish={this.handleSubmit}
          style={{ color: "#7D9EB5" }}
        >
          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>中文</div>

            <FormInput
              required
              title="標題 "
              propName="resource_title_zh"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="resource_content_zh"
              title="內文"
              value={resourceContentZh}
              placeholder="請輸入中文內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("resourceContentZh", value)
              }
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>英文</div>

            <FormInput
              title="標題 "
              propName="resource_title_en"
              required
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="resource_content_en"
              title="內文"
              value={resourceContentEn}
              placeholder="請輸英文內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("resourceContentEn", value)
              }
            />
          </div>

          <div>
            <FormInput
              title="資源連結"
              propName="resource_url"
              // required
              // requiredErrorMessage="請輸入資源連結"
              placeholder="請輸入資源連結"
            />
          </div>

          <div>
            <Form.Item
              name="img"
              label="資源圖片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="img"
              getValueFromEvent={normFile}
              style={{ marginTop: "10px", display: "block" }}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG"
                fileList={mainImageData}
                onChange={this.handleAvatarChange}
                customRequest={dummyRequest}
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
                {mainImageData.imgUrl ? (
                  <img
                    src={mainImageData.imgUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div>
                    {loading ? (
                      <LoadingOutlined />
                    ) : (
                      <img src={Images.outline} alt="avatar" />
                    )}
                    <div style={{ marginTop: 8 }}>上傳照片</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="is_fill"
              label="是否需填寫資料"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              colon={false}
              valuePropName="is_fill"
              style={{ marginTop: "10px" }}
              required
              requiredErrorMessage="請選擇是否需填寫資料"
            >
              <Switch
                defaultChecked={
                  mode === "update" ? resourceInfo.is_fill : false
                }
                onChange={this.onSwitchChange}
              />
            </Form.Item>
            <Form.Item
              name="img"
              label="資源檔案"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="img"
              getValueFromEvent={normFile}
              style={{ height: "180px", marginTop: "10px", display: "block" }}
              // required
              // requiredErrorMessage="請上傳檔案"
            >
              <Upload
                listType="text"
                multiple={true}
                customRequest={dummyRequest}
                fileList={fileData}
                onChange={this.handleFileChange}
                style={{ marginLeft: "20px" }}
              >
                <Button
                  style={{
                    backgroundColor: Colors.white,
                    border: `1px solid ${Colors.primary}`,
                    // width: '100%',
                    height: "36px",
                    color: Colors.primary,
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "10px 0px",
                  }}
                  icon={<UploadOutlined />}
                >
                  上傳
                </Button>
              </Upload>
            </Form.Item>
            <Form.List name="categories">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      style={{
                        marginBottom: 24,
                        padding: 16,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                      }}
                    >
                      <div style={{ marginBottom: 12 }}>
                        <Form.Item
                          name={[field.name, "category_title_zh"]}
                          label="大標題（中文）"
                          rules={[
                            { required: true, message: "請輸入中文大標題" },
                          ]}
                        >
                          <Input placeholder="請輸入中文大標題" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "category_title_en"]}
                          label="大標題（英文）"
                          rules={[
                            { required: true, message: "請輸入英文大標題" },
                          ]}
                        >
                          <Input placeholder="請輸入英文大標題" />
                        </Form.Item>
                      </div>

                      <Form.List name={[field.name, "subitems"]}>
                        {(
                          subFields,
                          { add: addSubitem, remove: removeSubitem }
                        ) => (
                          <div>
                            {subFields.map((subField, subIndex) => (
                              <div
                                key={subField.key}
                                style={{
                                  marginBottom: 16,
                                  padding: 12,
                                  background: "#fafafa",
                                  border: "1px dashed #d9d9d9",
                                }}
                              >
                                <Form.Item
                                  name={[subField.name, "title_zh"]}
                                  label="子項目標題（中文）"
                                  rules={[
                                    {
                                      required: true,
                                      message: "請輸入子項目中文標題",
                                    },
                                  ]}
                                >
                                  <Input placeholder="請輸入子項目中文標題" />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "title_en"]}
                                  label="子項目標題（英文）"
                                  rules={[
                                    {
                                      required: true,
                                      message: "請輸入子項目英文標題",
                                    },
                                  ]}
                                >
                                  <Input placeholder="請輸入子項目英文標題" />
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "file_zh"]}
                                  label="中文檔案"
                                  valuePropName="fileList"
                                  getValueFromEvent={normFile}
                                  rules={[
                                    {
                                      required: true,
                                      message: "請上傳中文檔案",
                                    },
                                  ]}
                                >
                                  <Upload
                                    customRequest={dummyRequest}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                  >
                                    <Button icon={<UploadOutlined />}>
                                      上傳檔案
                                    </Button>
                                  </Upload>
                                </Form.Item>
                                <Form.Item
                                  name={[subField.name, "file_en"]}
                                  label="英文檔案"
                                  valuePropName="fileList"
                                  getValueFromEvent={normFile}
                                  rules={[
                                    {
                                      required: true,
                                      message: "請上傳英文檔案",
                                    },
                                  ]}
                                >
                                  <Upload
                                    customRequest={dummyRequest}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                  >
                                    <Button icon={<UploadOutlined />}>
                                      上傳檔案
                                    </Button>
                                  </Upload>
                                </Form.Item>
                                <Button
                                  danger
                                  onClick={() => removeSubitem(subField.name)}
                                >
                                  刪除子項目
                                </Button>
                              </div>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => addSubitem()}
                                block
                                icon={<PlusOutlined />}
                              >
                                新增子項目
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>

                      <Button
                        type="default"
                        danger
                        onClick={() => remove(field.name)}
                        style={{ marginTop: 16 }}
                      >
                        刪除此大標
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      新增大標
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </div>

          <div style={styles.htmlBtnBlock}>
            <Button
              style={styles.btnStyle}
              htmlType="submit"
              loading={isLoading}
            >
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  render() {
    const { screenHeight, resourceList, paging } = this.props;
    const { viewModalVisible, isLoading } = this.state;

    const columns = [
      {
        width: "70%",
        title: "資源名稱",
        dataIndex: "resource_title_zh",
        key: "resource_title_zh",
      },
      {
        width: "15%",
        title: "下載次數",
        dataIndex: "resource_download",
        key: "resource_download",
        align: "center",
      },
      {
        width: "15%",
        title: "操作",
        dataIndex: "",
        key: "",
        align: "center",
        render: (value, record) => {
          return (
            <div>
              <Button
                style={{ cursor: "pointer", border: "none", padding: "0px" }}
                onClick={() =>
                  this.handleViewModal("update", record.resource_id, record)
                }
              >
                <img src={Images.edit} />
              </Button>
              <Button
                style={{
                  cursor: "pointer",
                  border: "none",
                  marginLeft: "15px",
                }}
                onClick={() => this.handleDelete(record.resource_id)}
              >
                <img src={Images.delete} />
              </Button>
            </div>
          );
        },
      },
    ];

    // 分頁樣式
    const renderPagination = (current, type, originalElement) => {
      if (type === "prev") {
        return <a className="table-prev">&lt;&nbsp;&nbsp; Prev</a>;
      }
      if (type === "next") {
        return <a>Next &nbsp;&nbsp;&gt;</a>;
      }
      return originalElement;
    };

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              資源分享管理
              <Button
                style={styles.btnStyle}
                onClick={() => this.handleViewModal("create")}
              >
                <img
                  src={Images.add}
                  style={{ width: "15px", marginRight: "10px" }}
                />
                新增
              </Button>
            </div>
            <Space style={styles.spaceStyle}>
              <Form
                name="basic"
                initialValues={{
                  ...this.state.queryPayload,
                }}
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <FormInput
                  placeholder="輸入關鍵字"
                  propName="search"
                  style={{ width: "317px" }}
                  onChange={this.handleSearch}
                />
              </Form>
            </Space>
            <div style={styles.contentBottom}>
              <Table
                onChange={this.handleChange}
                pagination={{
                  pageSize: paging.page_size || 10,
                  total: paging.total,
                  current: paging.now_page || 1,
                  showSizeChanger: false,
                  position: ["bottomCenter"],
                  itemRender: (current, type, originalElement) =>
                    renderPagination(current, type, originalElement),
                }}
                columns={columns}
                dataSource={resourceList}
                style={{ width: "100%" }}
                scroll={{ y: screenHeight - 420 }}
              />
            </div>

            {viewModalVisible && this.renderViewModal()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    resourceList: state.resource.resourceList,
    paging: state.resource.paging,
    resourceInfo: state.resource.resourceInfo,
    screenHeight: state.screen.screenHeight,
    screenWidth: state.screen.screenWidth,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getResourceList: ResourceActions.getResourceList,
        getResourceInfo: ResourceActions.getResourceInfo,
        createResource: ResourceActions.createResource,
        updateResource: ResourceActions.updateResource,
        deleteResource: ResourceActions.deleteResource,
      },
      dispatch
    )
)(ResourceScreen);

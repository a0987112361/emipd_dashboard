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
import { LoadingOutlined } from "@ant-design/icons";
import { FormInput, HtmlEditor } from "src/Components";
import { Images, Colors } from "src/Theme";

import "./CourseScreen.css";
import _ from "lodash";
import Swal from "sweetalert2";
import moment from "moment";
import { CourseActions } from "src/Stores";

let timer;
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
    // overflowY: 'hidden',
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
  inputStyle: {
    border: "1px solid #7D9EB5",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    paddingLeft: "8px",
    color: "#455A68",
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
  datePickerStyle: {
    border: "1px solid #A6C1D3",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    paddingLeft: "8px",
    color: "#7D9EB5",
  },
  contentBottom: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  contentBottomTitle: {
    marginLeft: "5px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  imgWebDiv: {
    width: "180px",
    height: "80px",
    display: "block",
    overflow: "hidden",
    margin: "auto",
  },
  imgPhoneDiv: {
    width: "80px",
    height: "105px",
    display: "block",
    overflow: "hidden",
    margin: "auto",
  },
  imgStyle: {
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    border: "none",
  },
};

class CourseScreen extends React.Component {
  constructor(props) {
    super(props);
    this.activityForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      loading: false,
      viewModalVisible: false,
      queryPayload: {
        now_page: 1,
        page_size: 10,
        search: "",
        order: -1,
      },
      mode: "create", // 預設模式
      courseContentZh: "",
      courseContentEn: "",
      mainImageData: [], // 放列表的主要圖片(單一張)
      mainEnImageData: [], // 放列表的主要圖片(單一張)
      mainImageId: "",
      mainEnImageId: "",
      currentId: "",
      start: "",
      end: "",
      courseRegtime: "",
      courseRegtimeString: "",
    };
  }

  componentDidMount = () => {
    const { location } = this.props;

    let url = location.search;
    this.setState(
      {
        url: url,
      },
      () => {
        this.handleDataChange();
      }
    );
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

  // 列表api主要控制function(抓網址query去呼叫)
  handleDataChange = () => {
    const { location, paging, getCourseList } = this.props;
    const { queryPayload } = this.state;

    //初始預設值
    let urlData = {
      now_page: 1,
      page_size: 10,
      search: "",
      order: 0,
    };

    if (window.location.href.indexOf("?") > -1) {
      let url = location.search;
      let tempParams = new URLSearchParams(url);

      if (tempParams.get("search")) {
        urlData["search"] = tempParams.get("search");
      }

      if (tempParams.get("now_page")) {
        urlData["now_page"] = parseInt(tempParams.get("now_page"));
      }

      if (tempParams.get("page_size")) {
        urlData["page_size"] = parseInt(tempParams.get("page_size"));
      }

      if (tempParams.get("order")) {
        urlData["order"] = parseInt(tempParams.get("order"));
      }
    }

    let payload = {
      now_page: urlData.now_page,
      page_size: urlData.page_size,
      search: urlData.search,
      order: urlData.order,
    };

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    };

    this.setState(
      {
        isLoading: true,
        queryPayload: payload,
      },
      () => {
        getCourseList(payload, callback, this.errorCallback);
      }
    );
  };

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
          `/course?${
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
  handleViewModal = (mode, id) => {
    const { getCourseInfo } = this.props;

    const callback = (value) => {
      let mainImgTemp = [];
      let mainEnImgTemp = [];
      if (_.has(value, "file")) {
        if (!_.isEmpty(value.file) && !_.isNil(value.file.file_id)) {
          mainImgTemp.push({
            ...value.file,
            uid: 1,
            name: "activity.jpg",
            status: "done",
            id: value.file.file_id,
            url: value.file.file_url,
            originFileObj: value.file,
          });
        }
      }

      if (_.has(value, "file_en")) {
        if (!_.isEmpty(value.file_en) && !_.isNil(value.file_en.file_id)) {
          mainEnImgTemp.push({
            ...value.file_en,
            uid: 1,
            name: "activity.jpg",
            status: "done",
            id: value.file_en.file_id,
            url: value.file_en.file_url,
            originFileObj: value.file_en,
          });
        }
      }
      let range = value.course_regtime.split("~");

      this.setState({
        currentId: value.course_id,
        courseContentZh: value.course_content_zh,
        courseContentEn: value.course_content_en,
        mainImageData: mainImgTemp,
        mainEnImageData: mainEnImgTemp,
        mainImageId: value.file.file_id,
        mainEnImageId: value.file_en.file_id,
        isLoading: false,
        viewModalVisible: true,
      });
    };

    if (mode === "update") {
      this.setState(
        {
          isLoading: true,
          mode: "update",
        },
        () => {
          getCourseInfo(id, callback, this.errorCallback);
        }
      );
    } else {
      this.setState({
        mode: "create",
        courseContentZh: "",
        courseContentEn: "",
        mainImageData: [],
        mainEnImageData: [],
        moreImageData: [],
        filmPath: "",
        viewModalVisible: true,
      });
    }
  };

  // 刪除
  handleDelete = (courseId) => {
    const { deleteCourse, paging } = this.props;
    const { queryPayload } = this.state;

    let id = courseId.toString();
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
            deleteCourse(payload, queryPayload, callback, this.errorCallback);
          }
        );
      }
    });
  };

  //html編輯器
  handleChangeContent = (text, value) => {
    if (text == "courseContentZh") {
      this.setState({ courseContentZh: value });
    } else if (text == "courseContentEn") {
      this.setState({ courseContentEn: value });
    }
  };

  closeModal() {
    this.setState({
      viewModalVisible: false,
    });
  }

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
  handleEnAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList("mainEnImageData", newFileList.splice(1, 1));
    } else {
      this.setFileList("mainEnImageData", newFileList);
    }
  };
  // 圖片預覽 step 3
  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  };

  dateChange = (moment, date) => {
    const { tab } = this.state;
    const dateRange = date;
    console.log("dateRange =>", dateRange);

    this.setState({
      start: dateRange[0],
      end: dateRange[1],
      courseRegtime: dateRange[0] + "~" + dateRange[1],
      courseRegtimeString: dateRange[0] + "~" + dateRange[1],
    });
  };

  // 新增與更新
  handleSubmit = (value) => {
    const { createCourse, updateCourse } = this.props;
    const {
      mainImageData,
      mainEnImageData,
      queryPayload,
      courseContentEn,
      courseContentZh,
      mode,
      currentId,
      mainImageId,
      mainEnImageId,
      courseRegtimeString,
    } = this.state;
    let isOk = true;
    let formData = new FormData();

    formData.append("course_regtime", "~");
    formData.append(
      "course_releasetime",
      moment(value.course_releasetime).format("YYYY-MM-DD")
    );
    formData.append("course_link", "example");
    formData.append("course_title_zh", value.course_title_zh);
    formData.append("course_content_zh", courseContentZh);
    formData.append("course_title_en", value.course_title_en);
    formData.append("course_content_en", courseContentEn);
    formData.append("is_open", true);

    if (mode === "update") {
      formData.append("course_id", currentId);
      if (mainImageData.length === 0) {
        // 如果把圖片清空
        formData.append("file_id", "");
      } else if (_.has(mainImageData[0].originFileObj, "uid")) {
        // 如果有重新上傳的動作
        formData.append("upload_file", mainImageData[0].originFileObj);
      } else {
        // 如果保持不變
        formData.append("file_id", mainImageId);
      }
      if (mainEnImageData.length === 0) {
        // 如果把圖片清空
        formData.append("file_id_en", "");
      } else if (_.has(mainEnImageData[0].originFileObj, "uid")) {
        // 如果有重新上傳的動作
        formData.append("upload_file_en", mainEnImageData[0].originFileObj);
      } else {
        // 如果保持不變
        formData.append("file_id_en", mainEnImageId);
      }
    } else {
      if (mainImageData.length > 0) {
        formData.append("upload_file", mainImageData[0].originFileObj);
      }
      if (mainEnImageData.length > 0) {
        formData.append("upload_file_en", mainEnImageData[0].originFileObj);
      }
    }

    const callback = () => {
      this.setState({
        isLoading: false,
        viewModalVisible: false,
      });
    };

    if (isOk === true) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          if (mode === "create") {
            createCourse(formData, queryPayload, callback, this.errorCallback);
          } else {
            updateCourse(formData, queryPayload, callback, this.errorCallback);
          }
        }
      );
    }
  };

  // 渲染新增和編輯彈窗
  renderViewModal = () => {
    const { courseInfo } = this.props;
    const {
      viewModalVisible,
      courseRegtime,
      mainImageData,
      mainEnImageData,
      courseContentZh,
      courseContentEn,
      mode,
      loading,
      isLoading,
    } = this.state;

    return (
      <Modal
        title={mode === "create" ? "新增課程資訊" : "編輯課程資訊"}
        visible={viewModalVisible}
        width={1000}
        centered
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name="basic"
          ref={this.courseForm}
          initialValues={
            mode === "update"
              ? {
                  ...courseInfo,
                  course_regtime: courseRegtime,
                  course_releasetime: moment(courseInfo.course_releasetime),
                }
              : {}
          }
          onValuesChange={this.handleChangeForm}
          onFinish={this.handleSubmit}
          style={{ color: "#7D9EB5" }}
        >
          <Row style={{ margin: "0", rowGap: "12px" }} gutter={8}>
            <Col span={8}>
              <Form.Item
                name="course_releasetime"
                label="發佈日期 "
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "請選擇發佈日期" }]}
              >
                <DatePicker
                  placeholder="請選擇發佈日期"
                  style={styles.datePickerStyle}
                  format="YYYY/MM/DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>中文</div>

            <FormInput
              required
              title="標題 "
              propName="course_title_zh"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="course_content_zh"
              title="內文"
              value={courseContentZh}
              placeholder="請輸入中文內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("courseContentZh", value)
              }
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>英文</div>

            <FormInput
              required
              title="標題 "
              propName="course_title_en"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="course_content_en"
              title="內文"
              value={courseContentEn}
              placeholder="請輸英文內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("courseContentEn", value)
              }
            />
          </div>

          <div>
            <Form.Item
              name="main_img"
              label="課程照片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="main_img"
              getValueFromEvent={normFile}
              style={{ height: "180px", marginTop: "10px", display: "block" }}
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
              name="main_img_en"
              label="課程英文照片"
              colon={false}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              valuePropName="main_img_en"
              getValueFromEvent={normFile}
              style={{ height: "180px", marginTop: "10px", display: "block" }}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG"
                fileList={mainEnImageData}
                onChange={this.handleEnAvatarChange}
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
                {mainEnImageData.imgUrl ? (
                  <img
                    src={mainEnImageData.imgUrl}
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
    const { screenHeight, courseList, paging } = this.props;
    const { viewModalVisible, isLoading } = this.state;

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

    const columns = [
      {
        width: "10%",
        title: "發佈日期",
        dataIndex: "course_releasetime",
        key: "course_releasetime",
        align: "center",
        render: (value) => moment(value).format("YYYY/MM/DD"),
      },
      // {
      //   width: '25%',
      //   title: '報名日期',
      //   dataIndex: 'course_regtime',
      //   key: 'course_regtime',
      //   align: 'center',
      //   render: (value) =>
      //     <div>{value.replace(',' , '~')}</div>
      // },
      {
        width: "30%",
        title: "標題",
        dataIndex: "course_title_zh",
        key: "course_title_zh",
        align: "left",
        render: (value) => (
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        width: "10%",
        title: "瀏覽人數",
        dataIndex: "viewers",
        align: "center",
        key: "viewers",
      },
      {
        width: "10%",
        title: "分享次數",
        dataIndex: "shares",
        align: "center",
        key: "shares",
      },
      {
        width: "15%",
        title: "操作",
        dataIndex: "setting",
        key: "setting",
        align: "center",
        render: (value, record) => {
          return (
            <div>
              <Button
                style={{ cursor: "pointer", border: "none", padding: "0px" }}
                onClick={() => this.handleViewModal("update", record.course_id)}
              >
                <img src={Images.edit} />
              </Button>
              <Button
                style={{
                  cursor: "pointer",
                  border: "none",
                  marginLeft: "15px",
                }}
                onClick={() => this.handleDelete(record.course_id)}
              >
                <img src={Images.delete} />
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              <span style={{ marginRight: "40px" }}>課程管理</span>
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
                dataSource={courseList}
                style={{ width: "100%" }}
                scroll={{ y: screenHeight - 420 }}
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
    courseList: state.course.courseList,
    paging: state.course.paging,
    courseInfo: state.course.courseInfo,
    screenHeight: state.screen.screenHeight,
    screenWidth: state.screen.screenWidth,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getCourseList: CourseActions.getCourseList,
        getCourseInfo: CourseActions.getCourseInfo,
        createCourse: CourseActions.createCourse,
        updateCourse: CourseActions.updateCourse,
        deleteCourse: CourseActions.deleteCourse,
      },
      dispatch
    )
)(CourseScreen);

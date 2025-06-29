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
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import {
  FormInput,
  FormInputSelect,
  HtmlEditor,
  SortButton,
} from "src/Components";
import { Images, Colors } from "src/Theme";

import _ from "lodash";
import Swal from "sweetalert2";
import moment from "moment";
import { NewsActions } from "src/Stores";

let timer;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const styles = {
  root: {
    flexGrow: 1,
    height: "100%",
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
  langMark: {
    fontWeight: "bold",
    fontSize: "20px",
    color: Colors.primary,
  },
  inputStyle: {
    border: "1px solid #A6C1D3",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    paddingLeft: "8px",
  },
  btnStyle: {
    backgroundColor: "#004C7C",
    width: "103px",
    height: "40px",
    color: "white",
    borderRadius: "4px",
  },
  contentBottom: {
    width: "100%",
    height: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "white",
    overflowY: "auto",
  },
  datePickerStyle: {
    border: "1px solid #A6C1D3",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
    paddingLeft: "8px",
    color: "#7D9EB5",
  },
  spaceStyle: {
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0px 5px 20px rgba(176,195,211,0.16)",
    borderRadius: "4px",
    padding: "10px 20px",
    marginTop: "30px",
  },
};

class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.newsForm = React.createRef();
    this.state = {
      isLoading: false,
      viewModalVisible: false,
      checkModalVisible: false,
      queryPayload: {
        now_page: 1,
        page_size: 10,
        search: "",
        order: -1,
      },
      fileData: [],
      originFileData: [],
      columnChangeLinkForm: [], // 連結的每行欄位
      newsContentZh: "",
      newsContentEn: "",
      mode: "create", // 預設模式
      currentId: "", // 正在編輯的id
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

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
    const { location, getNewsList } = this.props;

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

    let newsPayload = {
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
        queryPayload: newsPayload,
      },
      () => {
        getNewsList(newsPayload, callback, this.errorCallback);
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
          `/news?${
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

  handleChangeForm = (change, all) => {
    this.setState({
      columnChangeLinkForm: all.columns,
    });
  };

  // 新增與更新
  handleSubmit = (value) => {
    const { createNews, updateNews } = this.props;
    const {
      fileData,
      queryPayload,
      newsContentEn,
      newsContentZh,
      mode,
      originFileData,
      currentId,
    } = this.state;
    let isOk = true;
    let formData = new FormData();

    formData.append("news_type_id", value.news_type_id);
    formData.append(
      "news_releasetime",
      moment(value.news_releasetime).format("YYYY-MM-DD")
    );
    formData.append("news_title_zh", value.news_title_zh);
    formData.append("news_content_zh", newsContentZh);
    formData.append("news_title_en", value.news_title_en);
    formData.append("news_content_en", newsContentEn);
    formData.append("is_open", value.is_open);

    if (value.columns.length > 0) {
      value.columns.map((item, index) => {
        formData.append("links[" + `${index}` + "].link", item.link);
        formData.append("links[" + `${index}` + "].link_zh", item.link_zh);
        formData.append("links[" + `${index}` + "].link_en", item.link_en);
      });
    }

    if (mode === "update") {
      formData.append("news_id", currentId);

      var removeFileData = [];
      var saveFileData = _.filter(fileData, (o) => o.file_id);
      _.map(originFileData, (o) => {
        var tmp = _.findIndex(saveFileData, (oo) => oo.file_id === o.file_id);
        if (tmp === -1) removeFileData.push(o.file_id);
      });

      // 把該刪除的檔案「刪除」
      removeFileData.map((item, index) => {
        formData.append("delete_files[" + index + "]", item);
      });
      // 新上傳檔案
      fileData.map((item, index) => {
        formData.append("upload_files", item.originFileObj);
      });
    } else {
      if (fileData.length > 0) {
        fileData.map((item) => {
          formData.append("upload_files", item.originFileObj);
        });
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
            createNews(formData, queryPayload, callback, this.errorCallback);
          } else {
            updateNews(formData, queryPayload, callback, this.errorCallback);
          }
        }
      );
    }
  };

  // 刪除
  handleDelete = (newsId) => {
    const { deleteNews, paging } = this.props;
    const { queryPayload } = this.state;

    let id = newsId.toString();
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
            deleteNews(payload, queryPayload, callback, this.errorCallback);
          }
        );
      }
    });
  };

  // 控制新增和編輯彈窗
  handleViewModal = (mode, id) => {
    const { getNewsInfo } = this.props;

    const callback = (value) => {
      let fileTemp = [];
      value.files.map((item, index) => {
        fileTemp.push({
          ...item,
          uid: _.has(item, "file_id") ? item.file_id : index,
          name: _.has(item, "file_name")
            ? item.file_name
            : "檔案" + (index + 1),
          url: _.has(item, "file_url") ? item.file_url : index,
          originFileObj: item,
        });
      });
      this.setState({
        currentId: value.news_id,
        fileData: fileTemp, // 為完整呈現檔案名稱處理
        originFileData: value.files, // 用來辨別原本的檔案(不會被更動)
        newsContentZh: value.news_content_zh,
        newsContentEn: value.news_content_en,
        columnChangeLinkForm: value.links,
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
          getNewsInfo(id, callback, this.errorCallback);
        }
      );
    } else {
      this.setState({
        mode: "create",
        newsContentZh: "",
        newsContentEn: "",
        fileData: [],
        columnChangeLinkForm: [],
        viewModalVisible: true,
      });
    }
  };

  // 連結的排序
  handleSortLinkColumn = (key, change, text) => {
    const { columnChangeLinkForm, tab } = this.state;
    let temp;
    // 把columnForm從物件變json，再從json變為物件或值
    let copyList = "";
    copyList = JSON.parse(JSON.stringify(columnChangeLinkForm));

    temp = copyList[key];
    copyList[key] = copyList[key + change];
    copyList[key + change] = temp;

    this.newsForm.current.setFieldsValue({ columns: copyList });
    this.setState({
      columnChangeLinkForm: copyList,
    });
  };

  handleFileChange = ({ fileList: newsFileList }) => {
    this.setState({
      fileData: newsFileList,
    });
  };

  //html編輯器
  handleChangeContent = (text, value) => {
    console.log("value =>", value);
    if (text == "newsContentZh") {
      this.setState({ newsContentZh: value });
    } else if (text == "newsContentEn") {
      this.setState({ newsContentEn: value });
    }
  };

  // 渲染新增和編輯彈窗
  renderViewModal = () => {
    const { newsInfo } = this.props;
    const {
      viewModalVisible,
      fileData,
      columnChangeLinkForm,
      newsContentZh,
      newsContentEn,
      mode,
    } = this.state;

    let newsTypeOption = [
      { id: 1, name: "課程公告" },
      { id: 2, name: "教學活動" },
      { id: 3, name: "其他公告" },
    ];

    return (
      <Modal
        title={mode === "create" ? "新增最新消息" : "編輯最新消息"}
        visible={viewModalVisible}
        width={1000}
        centered
        onCancel={() => this.closeModal()}
        footer={null}
        maskClosable={false}
      >
        <Form
          name="basic"
          ref={this.newsForm}
          initialValues={
            mode === "update"
              ? {
                  is_open: false,
                  ...newsInfo,
                  columns: columnChangeLinkForm,
                  news_releasetime: moment(newsInfo.news_releasetime),
                }
              : {
                  columns: columnChangeLinkForm,
                  newsContentZh: "",
                  is_open: false,
                  newsContentEn: "",
                  fileData: [],
                }
          }
          onValuesChange={this.handleChangeForm}
          onFinish={this.handleSubmit}
          style={{ color: "#7D9EB5" }}
        >
          <Row style={{ margin: "0", rowGap: "12px" }} gutter={8}>
            <Col span={6}>
              <FormInputSelect
                title="類別"
                required
                options={newsTypeOption}
                propName="news_type_id"
                placeholder="請選擇類別"
                requiredErrorMessage="請選擇類別"
              />
            </Col>
            <Col span={6}>
              <Form.Item
                name="news_releasetime"
                label="發佈日期 "
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[{ required: true, message: "請選擇發佈日期" }]}
              >
                <DatePicker
                  placeholder="請選擇發佈日期"
                  style={styles.datePickerStyle}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="is_open"
                label="是否上架"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                colon={false}
                required
              >
                <Switch
                  defaultChecked={mode === "update" ? newsInfo.is_open : false}
                  checkedChildren={<CheckOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>中文</div>

            <FormInput
              required
              title="標題 "
              propName="news_title_zh"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="news_content_zh"
              title="內文"
              required
              requiredErrorMessage="請輸入內文"
              value={newsContentZh}
              placeholder="請輸入內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("newsContentZh", value)
              }
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <div style={styles.langMark}>英文</div>

            <FormInput
              required
              title="標題 "
              propName="news_title_en"
              requiredErrorMessage="請輸入標題"
              placeholder="請輸入標題"
            />

            <HtmlEditor
              propName="news_content_en"
              title="內文"
              required
              requiredErrorMessage="請輸入內文"
              value={newsContentEn}
              placeholder="請輸入內文"
              onEditorStateChange={(value) =>
                this.handleChangeContent("newsContentEn", value)
              }
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                color: "#7D9EB5",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              連結
            </div>

            <Row
              style={{
                width: "100%",
                background: Colors.primary,
                color: Colors.white,
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              <Col span={6} style={{ padding: "8px 32px" }}>
                中文連結文字
              </Col>
              <Col span={6} style={{ padding: "8px 32px" }}>
                英文連結文字
              </Col>
              <Col span={9} style={{ padding: "8px 32px" }}>
                連結網址
              </Col>
              <Col span={3} style={{ padding: "8px 32px" }}>
                操作
              </Col>
            </Row>

            <Form.List name="columns" required>
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field, index, arr) => (
                    <Row
                      gutter={24}
                      style={{
                        width: "100%",
                        margin: "0px",
                        padding: "4px 0px",
                        borderBottom: "1px solid rgba(0, 76, 124, 0.5)",
                        background: index % 2 !== 0 && "rgba(0, 76, 124, 0.1)",
                      }}
                    >
                      <Col span={6}>
                        <Form.Item
                          colon={false}
                          {...field}
                          name={[field.name, "link_zh"]}
                          fieldKey={[field.fieldKey, "link_zh"]}
                          validateTrigger={["onChange"]}
                          style={{ marginRight: "8px" }}
                        >
                          <Input
                            style={styles.inputStyle}
                            placeholder="請輸入中文連結文字"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          colon={false}
                          {...field}
                          name={[field.name, "link_en"]}
                          fieldKey={[field.fieldKey, "link_en"]}
                          validateTrigger={["onChange"]}
                          style={{ marginRight: "8px" }}
                        >
                          <Input
                            style={styles.inputStyle}
                            placeholder="請輸入英文連結文字"
                          />
                        </Form.Item>
                      </Col>

                      <Col span={9}>
                        <Form.Item
                          colon={false}
                          {...field}
                          name={[field.name, "link"]}
                          fieldKey={[field.fieldKey, "link"]}
                          validateTrigger={["onChange"]}
                          style={{ marginRight: "8px" }}
                          rules={[
                            {
                              required: true,
                              message: "請輸入連結網址",
                            },
                            {
                              type: "url",
                              message: "格式錯誤",
                            },
                          ]}
                        >
                          <Input
                            type="url"
                            style={styles.inputStyle}
                            placeholder="請輸入連結網址"
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        span={3}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            minWidth: "80px",
                            padding: "0px 24px",
                          }}
                        >
                          <SortButton
                            currentIndex={index}
                            length={fields.length}
                            handleClickUp={() =>
                              this.handleSortLinkColumn(index, -1)
                            }
                            handleClickDown={() =>
                              this.handleSortLinkColumn(index, 1)
                            }
                          />
                          <Button
                            style={{
                              border: "none",
                              cursor: "pointer",
                              background: "transparent",
                            }}
                            onClick={() => remove(field.name)}
                          >
                            <img
                              src={Images.delete}
                              style={{ marginRight: "8px" }}
                            />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  ))}

                  <Form.Item
                    style={{
                      margin: "16px 0",
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: Colors.white,
                        border: `1px dashed ${Colors.primary}`,
                        // width: '100%',
                        height: "36px",
                        color: Colors.primary,
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        margin: "20px 0px",
                      }}
                      onClick={() =>
                        add(
                          {
                            link_zh: "",
                            link_en: "",
                            link: "",
                          },
                          fields.length
                        )
                      }
                      block
                    >
                      + 新增一行
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </div>

          <div style={{ marginTop: "16px" }}>
            <div
              style={{
                color: "#7D9EB5",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              {" "}
              上傳檔案
            </div>
            <Upload
              listType="picture-card"
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
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <Button style={styles.btnStyle} htmlType="submit">
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  closeModal() {
    this.setState({
      viewModalVisible: false,
    });
  }

  render() {
    const { screenHeight, newsList, paging } = this.props;
    const { viewModalVisible, isLoading } = this.state;

    // if(isLoading === true){
    //   return (
    //     <div style={{display: 'flex', justifyContent: 'center', paddingTop: '150px', background: 'transparent'}}>
    //       <Spin size="large" />
    //     </div>
    //   )
    // }

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
        title: "分類",
        dataIndex: "news_type_id",
        key: "news_type_id",
        align: "center",
        render: (value) => (
          <div>
            {value === 1 ? "課程公告" : value === 2 ? "教學活動" : "其他公告"}
          </div>
        ),
      },
      {
        width: "15%",
        title: "發佈日期",
        dataIndex: "news_releasetime",
        key: "news_releasetime",
        align: "center",
        render: (value) => moment(value).format("YYYY/MM/DD"),
      },
      {
        width: "60%",
        title: "標題",
        dataIndex: "news_title_zh",
        key: "news_title_zh",
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
                onClick={() => this.handleViewModal("update", record.news_id)}
              >
                <img src={Images.edit} />
              </Button>
              <Button
                style={{
                  cursor: "pointer",
                  border: "none",
                  marginLeft: "15px",
                }}
                onClick={() => this.handleDelete(record.news_id)}
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
              <span style={{ marginRight: "40px" }}>最新消息管理</span>
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
                dataSource={newsList}
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
    newsList: state.news.newsList,
    paging: state.news.paging,
    newsInfo: state.news.newsInfo,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getNewsList: NewsActions.getNewsList,
        getNewsInfo: NewsActions.getNewsInfo,
        createNews: NewsActions.createNews,
        updateNews: NewsActions.updateNews,
        deleteNews: NewsActions.deleteNews,
      },
      dispatch
    )
)(NewsScreen);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Input, Select, Tabs, Form, Row, Col, Spin } from "antd";
import { Images } from "src/Theme";

import _ from "lodash";
import { HomeActions } from "../../Stores";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  FormatPainterFilled,
  CheckOutlined,
} from "@ant-design/icons";
import { FormInput, FormTextarea } from "src/Components";

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const styles = {
  root: {
    flexGrow: 1,
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
    marginBottom: "20px",
  },
  contentTop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "30px",
  },
  contentBottom: {
    width: "100%",
    height: "100%",
    marginTop: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 5px 20px rgba(176,195,211,0.16)",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "16px",
    overflowY: "auto",
  },
  langMark: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  inputStyle: {
    width: "470px",
    height: "40px",
    borderRadius: "5px",
    // marginBottom: '10px',
    border: "1px solid #A6C1D3",
    color: "#7D9EB5",
  },
  tabStyle: {
    width: "100%",
    // height: '1000px'
  },
  formTop: {
    padding: "20px 25px 30px 25px",
    borderBottom: "#A6C1D3 1px solid",
  },
  formStyle: {
    width: "100%",
    display: "flex",
    padding: "25px",
  },
  QAFormStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btnBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  htmlBtnBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "80px",
  },
  btnStyle: {
    width: "100px",
    height: "40px",
    color: "#fff",
    backgroundColor: "#004C7C",
    borderRadius: "4px",
  },
  areaStyle: {
    width: "470px",
    height: "150px",
    borderRadius: "4px",
    resize: "none",
    padding: "10px",
    border: "1px solid #A6C1D3",
    color: "#7D9EB5",
  },
  selectStyle: {
    width: "250px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid #A6C1D3",
    color: "#7D9EB5",
  },
  titleStyle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7D9EB5",
  },
  titleCenterStyle: {
    display: "flex",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7D9EB5",
  },
  uploadBtnStyle: {
    width: "100%",
    height: "50px",
    border: "1px solid #A6C1D3",
    color: "#7D9EB5",
  },
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.updateForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      loading: false,
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getHomeInfo, getAboutDetail, getNotesDetail } = this.props;

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        getHomeInfo(callback, this.errorCallback);
      }
    );
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleUpdate = (value) => {
    const { updateHomeInfo } = this.props;
    const { infoId, urlData, deleteImgId } = this.state;

    let payload = {
      index_title_zh: value.index_title_zh,
      index_title_en: value.index_title_en,
      index_content_zh: value.index_content_zh,
      index_content_en: value.index_content_en,
    };

    const callback = () => {
      this.setState({
        isLoading: false,
      });
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        updateHomeInfo(payload, callback, this.errorCallback);
      }
    );
  };

  //html編輯器
  handleChangeContent = (text, value) => {
    if (text == "about") this.setState({ aboutText: value });

    if (text == "notes") this.setState({ notesText: value });
  };

  render() {
    const { homeInfo, screenHeight } = this.props;
    const { isLoading } = this.state;

    if (isLoading === true) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "150px",
            background: "transparent",
          }}
        >
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>首頁管理</div>
            <div
              style={{ ...styles.contentBottom, minHeight: screenHeight - 183 }}
            >
              <Form
                initialValues={{ ...homeInfo }}
                labelCol={{ style: { fontSize: "16px", fontWeight: "bold" } }}
                labelAlign="left"
                style={{ width: "100%" }}
                onFinish={this.handleUpdate}
              >
                <Row style={{ margin: "20px" }}>
                  <Col span={8}>
                    <div style={styles.langMark}>中文</div>

                    <FormInput
                      required
                      propName="index_title_zh"
                      placeholder="請輸入中文標題"
                      title="標題"
                      requiredErrorMessage="請輸入中文標題"
                      labelCol={24}
                      wrapperCol={24}
                      style={{ marginTop: "10px" }}
                      // inputStyle={{width: '524px'}}
                      showCount
                      maxLength={25}
                      rule={[{ max: 25, message: "最多輸入25個字" }]}
                    />

                    <FormTextarea
                      title="內文"
                      propName="index_content_zh"
                      rowHeight={6}
                      required
                      requiredErrorMessage="請輸入中文內文"
                      placeholder="請輸入中文內文"
                    />
                  </Col>
                </Row>

                <Row style={{ margin: "20px" }}>
                  <Col span={8}>
                    <div style={styles.langMark}>英文</div>

                    <FormInput
                      required
                      propName="index_title_en"
                      placeholder="請輸入英文標題"
                      title="標題"
                      requiredErrorMessage="請輸入英文標題"
                      labelCol={24}
                      wrapperCol={24}
                      style={{ marginTop: "10px" }}
                      // inputStyle={{width: '524px'}}
                      showCount
                      maxLength={80}
                      rule={[{ max: 80, message: "最多輸入80個字" }]}
                    />

                    <FormTextarea
                      title="內文"
                      propName="index_content_en"
                      rowHeight={6}
                      required
                      requiredErrorMessage="請輸入英文內文"
                      placeholder="請輸入英文內文"
                    />
                  </Col>
                </Row>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "20px 0px",
                  }}
                >
                  <Button
                    style={styles.btnStyle}
                    htmlType="submit"
                    loading={isLoading}
                  >
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
    homeInfo: state.home.homeInfo,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getHomeInfo: HomeActions.getHomeInfo,
        updateHomeInfo: HomeActions.updateHomeInfo,
      },
      dispatch
    )
)(HomeScreen);

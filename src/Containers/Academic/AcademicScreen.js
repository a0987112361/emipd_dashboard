import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Spin, Form } from "antd";

import "./AcademicScreen.css";
import _ from "lodash";
import { AcademicActions } from "../../Stores";
import { HtmlEditor } from "src/Components";

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
    // minHeight: '1200px',
    height: "100%",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 5px 20px rgba(176,195,211,0.16)",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "16px",
    overflowY: "auto",
    // paddingBottom: '90px'
  },
  htmlBtnBlock: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  },
  btnStyle: {
    width: "100px",
    height: "40px",
    color: "#fff",
    backgroundColor: "#004C7C",
    borderRadius: "4px",
  },
};

class AcademicScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: "",
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    const { getAcademic } = this.props;

    const callback = (data) => {
      console.log("data =>", data);
      this.setState({
        isLoading: false,
        content: data,
      });
    };

    this.setState(
      {
        isLoading: true,
      },
      () => {
        getAcademic(callback, this.errorCallback);
      }
    );
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  };

  handleUpdateAcademic = () => {
    const { updateAcademic, getAcademic } = this.props;
    const { content } = this.state;
    this.setState(
      {
        isLoading: true,
      },
      () => {
        updateAcademic({ content: content }, getAcademic, this.errorCallback);
      }
    );
  };

  render() {
    const { defaultContent, screenHeight } = this.props;
    const { isLoading, content } = this.state;

    console.log("render content =>", content);

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
            <div style={styles.contentTop}>學術發表</div>
            <div
              style={{ ...styles.contentBottom, minHeight: screenHeight - 183 }}
            >
              <Form
                name="basic"
                initialValues={{ content }}
                onFinish={this.handleUpdateAcademic}
                labelCol={{ span: 24 }}
              >
                <HtmlEditor
                  propName="content"
                  title="學術發表內容"
                  requiredErrorMessage="請輸入學術發表內容"
                  value={content}
                  placeholder="請輸入學術發表內容"
                  onEditorStateChange={(value) =>
                    this.setState({ content: value })
                  }
                />

                <div style={styles.htmlBtnBlock}>
                  <Button
                    htmlType="submit"
                    style={styles.btnStyle}
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
    defaultContent: state.academic.content,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getAcademic: AcademicActions.getAcademic,
        updateAcademic: AcademicActions.updateAcademic,
      },
      dispatch
    )
)(AcademicScreen);

/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill"; // 引入 react-quill
import "react-quill/dist/quill.snow.css"; // 引入 Quill 的樣式
import { Form } from "antd";

class HtmlEditor extends React.Component {
  static propTypes = {
    propName: PropTypes.string,
    inputStyle: PropTypes.object, // Input 樣式
  };

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: props.value || "", // 設定初始值為 props 中的 value
    };
    this.quillRef = React.createRef(); // 用來引用 ReactQuill 實例
  }

  componentDidMount() {
    const { value } = this.props;
    console.log(value);
    this.setState({
      editorHtml: value,
    });
  }

  onChangeValue = () => {
    const { onEditorStateChange } = this.props;
    let htmlContent = ""; // ✅ 先宣告，避免 reference error

    if (this.quillRef && this.quillRef.current) {
      htmlContent = this.quillRef.current.getEditor().root.innerHTML;
    }

    // 更新 state 並將 HTML 傳遞給父層
    this.setState({
      editorHtml: htmlContent,
    });

    // 呼叫父層函數傳遞 HTML 內容
    onEditorStateChange(htmlContent);
  };

  static defaultProps = {
    required: false,
    type: "text",
    requiredErrorMessage: "此項目為必填",
    placeholder: "",
    rule: [],
    inputStyle: {},
    labelCol: 24,
    wrapperCol: 24,
  };

  render() {
    const { editorHtml } = this.state;
    const {
      title,
      style,
      error,
      rule,
      required,
      requiredErrorMessage,
      propName,
      labelCol,
      wrapperCol,
      editorStyle = {},
    } = this.props;

    return (
      <Form.Item
        label={title}
        name={propName}
        rules={[
          {
            required: required,
            message: requiredErrorMessage,
            ...rule,
          },
        ]}
        required
        style={style}
        colon={false}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
      >
        <ReactQuill
          ref={this.quillRef} // 設定引用
          value={editorHtml}
          onChange={this.onChangeValue}
          placeholder={this.props.placeholder} // 設置 placeholder
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "link"],
            ],
          }}
          formats={["bold", "italic", "underline", "link", "header", "list"]}
          style={{
            height: "100%",
            padding: "10px",
            zIndex: "0",
            backgroundColor: "#ffffff",
            border: error ? `1px solid red` : `1px solid #7D9EB5`,
            minHeight: "300px",
            width: "100%",
            borderRadius: "5px",
            ...editorStyle,
          }}
        />
      </Form.Item>
    );
  }
}

export default HtmlEditor;

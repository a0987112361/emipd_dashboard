/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import { Form } from "antd";

class HtmlEditor extends React.Component {
  static propTypes = {
    propName: PropTypes.string,
    inputStyle: PropTypes.object, // Input 樣式
  };

  constructor(props) {
    super(props);
    this.state = {
      editValue: BraftEditor.createEditorState(props.value),
    };
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      editValue: BraftEditor.createEditorState(value),
    });
  }
  onChangeValue = (value) => {
    const { onEditorStateChange } = this.props;
    this.setState({
      editValue: value,
    });
    onEditorStateChange(value.toHTML());
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
    const { editValue } = this.state;
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
        <BraftEditor
          value={editValue}
          language="zh-hant"
          defaultValue={editValue}
          onChange={this.onChangeValue}
          contentStyle={{
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "10px",
            zIndex: "-1",
            backgroundColor: "#ffffff",
            minHeight: "300px",
            maxHeight: "800px",
            width: "100%",
            ...editorStyle,
          }}
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

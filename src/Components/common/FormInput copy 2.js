import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
class FormInput extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    textBoxStyle: PropTypes.object,
    requiredErrorMessage: PropTypes.string,
    propName: PropTypes.string,
    style: PropTypes.object,
    rule: PropTypes.array,
    disabled: PropTypes.bool,
    inputStyle: PropTypes.object, // Input 樣式
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    type: 'text',
    textBoxStyle: {},
    requiredErrorMessage: 'Input is required',
    placeholder: '',
    style: {},
    rule: [],
    disabled: false,
    inputStyle: {},
    onKeyDown: () => { },
  };

  render() {
    const {
      title,
      placeholder,
      required,
      type,
      requiredErrorMessage,
      propName,
      style,
      rule,
      disabled = false,
      inputStyle,
      onKeyDown,
    } = this.props;

    return (
      <Form.Item
        label={title}
        name={propName}
        rules={[
          {
            required: required,
            message: requiredErrorMessage,
          },
          ...rule,
        ]}
        style={style}
      >
        <Input id="formInput" onKeyDown={onKeyDown} style={{ ...inputStyle, borderRadius: '5px', height: '40px' }} type={type ? type : 'text'} placeholder={placeholder} disabled={disabled} />
      </Form.Item>
    );
  }
}

export default FormInput;

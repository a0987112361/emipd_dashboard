import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
// import './FormInput.css';


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
    inputProps: PropTypes.object,
    labelCol: PropTypes.number,
    wrapperCol: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    showCount: PropTypes.bool,
    maxLength: PropTypes.number,
    allowClear: PropTypes.bool, 
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    type: 'text',
    textBoxStyle: {},
    requiredErrorMessage: '此項目為必填',
    placeholder: '',
    style: {},
    rule: [],
    disabled: false,
    inputStyle: {},
    onKeyDown: () => { },
    inputProps: {},
    labelCol: 24,
    wrapperCol: 24,
    onChange: () => { },
    min: 0,
    max: 10000000000,
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
      inputProps,
      labelCol,
      wrapperCol,
      value,
      onChange,
      min,
      max,
      showCount,
      maxLength,
      allowClear 
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
        colon={false}
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
      >
        <Input
          autoComplete="off" {...inputProps}
          id="formInput"
          onKeyDown={onKeyDown}
          style={{
            ...inputStyle,
            borderRadius: '5px',
            height: '40px',
            border: '1px solid #A6C1D3',
            color: '#455A68',
            // width: '524px'
          }}
          type={type ? type : 'text'}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          showCount={showCount}
          maxLength={maxLength}
          min={type === 'number' ? min: ''}
          max={type === 'number' ? max: ''}
          allowClear={allowClear }
        />
      </Form.Item>
    );
  }
}

export default FormInput;
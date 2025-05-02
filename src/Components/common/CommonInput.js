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
    titleStyle: PropTypes.object,
    status: PropTypes.string,
    errorMessage: PropTypes.string,
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
    titleStyle: {},
    status: '',
    errorMessage: '',
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
      titleStyle,
      status,
      errorMessage,
    } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{
          fontSize: '16px',
          height: '40px',
          lineHeight: '40px',
          width: '120px',
          color: '#7D9EB5',
          ...titleStyle,
          marginRight: '30px',
          textAlign: 'right'
        }}>
          {required && <span>*</span>}
          {title}
        </div>
        <div>
          <Input
            autoComplete="off"
            {...inputProps}
            id="formInput"
            onKeyDown={onKeyDown}
            style={{
              ...inputStyle,
              borderRadius: '5px',
              height: '40px',
              border: '1px solid #A6C1D3',
              color: '#455A68',
              width: '497px',
            }}
            type={type ? type : 'text'}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            status={status}
            onChange={onChange}
            min={type === 'number' ? min: ''}
            max={type === 'number' ? max: ''}
          /> 
          <div style={{ fontSize: '14px', color: 'red' }}>{errorMessage}</div>
        </div>
      </div>
    );
  }
}

export default FormInput;
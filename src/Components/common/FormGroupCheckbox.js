import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  headerText: {
    color: 'white',
  },
  textBox: {
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '32px',
  },
  inputStyle: {
    display: 'block',
  },
  header: {
    display: 'flex',
    fontSize: '16px',
  },
  requiredText: {
    color: 'red',
    marginLeft: '2px',
  },
});

class FormGroupCheckbox extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    textBoxStyle: PropTypes.object,
    requiredErrorMessage: PropTypes.string,
    propName: PropTypes.string,
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
  };

  render() {
    const {
      title,
      value,
      onChange,
      required,
      textBoxStyle,
      requiredErrorMessage,
      propName,
      options,
      indeterminate,
      onCheckAllChange,
      checkAll,
    } = this.props;

    return (
      <div style={{ ...styles.textBox, ...textBoxStyle }}>
        <Form.Item
          label={title}
          name={propName}
          rules={[
            {
              required: required,
              message: requiredErrorMessage,
            },
          ]}
        >
          <div style={{ marginBottom: '8px' }}>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              全選
          </Checkbox>
          </div>
          <Checkbox.Group value={value} options={options} defaultValue={[options[0].value]} onChange={onChange} />
        </Form.Item>
      </div>
    );
  }
}

export default FormGroupCheckbox;

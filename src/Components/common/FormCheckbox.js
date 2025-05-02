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

class FormCheckbox extends React.Component {
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
    placeholder: PropTypes.string,
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
      classes,
      onChange,
      placeholder,
      error,
      required,
      type,
      textBoxStyle,
      requiredErrorMessage,
      propName,
      options,
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
          <Checkbox.Group options={options} defaultValue={[options[0].value]} onChange={onChange} />
        </Form.Item>
      </div>
    );
  }
}

export default FormCheckbox;

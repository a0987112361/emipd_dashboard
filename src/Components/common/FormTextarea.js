import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
const { TextArea } = Input;

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

class FormTextarea extends React.Component {
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
      placeholder,
      required,
      textBoxStyle,
      requiredErrorMessage,
      propName,
      rowHeight = 5,
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
          colon={false}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea
            style={{
              borderRadius: '5px',
              resize: 'none',
              padding: '10px',
              border: '1px solid #A6C1D3',
              color: '#455a68',

            }}
            placeholder={placeholder}
            rows={rowHeight} />
        </Form.Item>
      </div>
    );
  }
}

export default FormTextarea;

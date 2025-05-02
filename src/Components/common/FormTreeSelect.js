import React from 'react';
import PropTypes from 'prop-types';
import { Form, TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;
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

class FormInput extends React.Component {
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
    treeData: PropTypes.array,
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
    treeData: [
      {
        title: 'a@gmail.com',
        value: 'a@gmail.com',
        key: 'a@gmail.com',
      },
      {
        title: 'b@gmail.com',
        value: 'b@gmail.com',
        key: 'b@gmail.com',
      },
      {
        title: 'c@gmail.com',
        value: 'c@gmail.com',
        key: 'c@gmail.com',
      },
    ],
  };

  state = {
    value: ['0-0-0'],
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    const {
      title,
      value,
      placeholder,
      required,
      textBoxStyle,
      requiredErrorMessage,
      propName,
      treeData,
      handleChange,
    } = this.props;

    const tProps = {
      treeData,
      value: value,
      onChange: handleChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: placeholder,
      style: {
        width: '100%',
      },
    };
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
          <TreeSelect {...tProps} />
        </Form.Item>
      </div>
    );
  }
}

export default FormInput;

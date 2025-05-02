import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import './Common.css';
import './FormInputSelect.css';
const { Option } = Select

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

class FormInputSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    id: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    mode: PropTypes.string,
    textBoxStyle: PropTypes.object,
    requiredErrorMessage: PropTypes.string,
    propName: PropTypes.string,
    labelCol: PropTypes.number,
    wrapperCol: PropTypes.number,
    defaultValue: PropTypes.object,
    style: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    type: 'text',
    mode: '',
    id: '',
    onChange: () => { },
    textBoxStyle: {},
    requiredErrorMessage: 'Input is required',
    placeholder: '',
    labelCol: 24,
    wrapperCol: 24,
    defaultValue: {},
    disabled: false
  };

  state = {
    searchValue: null,
    options: [],
    searchKey: null,
    allOptions: [],
    style: {},
  };

  componentDidMount() {
    const {
      options,
      value,
    } = this.props;
    this.setState({
      options: options,
      allOptions: options,
      searchValue: value,
    });
    // this.props.form.setFieldsValue({ [propName]: value })
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      this.setState({
        searchValue: nextProps.value
      })
    }

    if (nextProps.options !== prevState.allOptions) {
      this.setState({
        options: nextProps.options,
        allOptions: nextProps.options,
      });
    }
  }

  handleChange = (e) => {
    // const {
    //   options,
    //   onChangeValue,
    // } = this.props;
    // let findOptions = options.find(function (item, index) {
    //   return item.id === e;
    // })
    // onChangeValue(findOptions);
    // this.setState({ searchKey: e, searchValue: findOptions.name })
  }

  render() {
    const {
      title,
      classes,
      onChange,
      placeholder,
      error,
      required,
      style,
      mode,
      id,
      textBoxStyle,
      requiredErrorMessage,
      propName,
      labelCol,
      wrapperCol,
      defaultValue,
      htmlFor,
      disabled
    } = this.props;
    // const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ ...styles.textBox, ...textBoxStyle }}>
        <Form.Item
          label={title}
          name={propName}
          htmlFor={htmlFor}
          rules={[
            {
              required: required,
              message: requiredErrorMessage,
            },
          ]}
          labelCol={{ span: labelCol }}
          wrapperCol={{ span: wrapperCol }}
          colon={false}
          placeholder={placeholder}
          style={style}
        >
          <Select
            id={id}
            allowClear
            showSearch
            mode={mode}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            // onSearch={this.handleSearch}
            onChange={onChange}
            // optionLabelProp="label"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              this.state.options.map((item) => <Option value={item.id} key={item.id} disabled={item.disabled}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>
      </div>
    );
  }
}

export default FormInputSelect;
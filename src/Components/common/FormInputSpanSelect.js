import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
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

class FormInputSpanSelect extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
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
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    type: 'text',
    mode: '',
    textBoxStyle: {},
    requiredErrorMessage: 'Input is required',
    placeholder: '',
  };

  state = {
    searchValue: null,
    options: [],
    searchKey: null,
    allOptions: [],
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
      placeholder,
      required,
      mode,
      textBoxStyle,
      requiredErrorMessage,
      propName,
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
          <Select
            mode={mode}
            allowClear
            showSearch
            placeholder={placeholder}
            // onSearch={this.handleSearch}
            // onChange={this.handleChange}
            // optionLabelProp="label"
            filterOption={(input, option) => option.props.children.indexOf(input) > -1}
          >
            {
              this.state.options.map((item) => <Option value={item.id} key={item.id}>{item.name}</Option>)
            }
          </Select>
        </Form.Item>
      </div >
    );
  }
}

export default FormInputSpanSelect;

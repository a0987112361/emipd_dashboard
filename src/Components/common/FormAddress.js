import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { ZipCodeTW } from "zipcode-tw-react";
import { location } from 'src/utils/location';
import _ from 'lodash';

class FormAddress extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    textBoxStyle: PropTypes.object,
    requiredErrorMessage: PropTypes.string,
    propName: PropTypes.string,
    style: PropTypes.object,
    rule: PropTypes.object,
    disabled: PropTypes.bool,
    displayType: PropTypes.string,
    handleChangeAddress: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    value: '',
    error: false,
    required: false,
    textBoxStyle: {},
    requiredErrorMessage: 'Input is required',
    placeholder: '',
    style: {},
    rule: {},
    disabled: false,
    displayType: 'display', // text or display
    handleChangeAddress: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      displayType: 'text',
      // county: '雲林縣',
      // district: '斗六市',
      // zipCode: '640',
      // address: '雲林縣斗六市',
      county: '',
      district: '',
      zipCode: '',
      address: '雲林縣斗六市',
    }
  }

  componentDidMount() {
    const { value } = this.props;
    let temp = '640雲林縣斗六市';
    let county = '';
    let district = '';
    let zipCode = '';
    if (!_.isEmpty(value)) {
      temp = value;
    }
    for (var item in location) {
      if (temp.indexOf(item) > -1) {
        county = item;
        for (var child in location[item]) {
          if (temp.indexOf(child) > -1) {
            district = child;
            zipCode = location[item][child];
          }
        }
      }
    }
    this.setState({
      county,
      district,
      zipCode,
      address: temp,
    })
  }

  // 變更地址資訊
  handleZipCodeChange = (e) => {
    const { handleChangeAddress } = this.props;
    const { countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
      address: zipValue + countyValue + districtValue,
    });
    handleChangeAddress(zipValue, countyValue, districtValue);
  }

  // 處理郵遞區號不存在
  handleZipCodeNotExists = (e) => {
    const { countyFieldName, countyValue, districtFieldName, districtValue, zipFieldName, zipValue } = e;
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue
    });
  }

  handleChange = (e) => {
    const { handleChangeAddress } = this.props;
    this.setState({ address: e.target.value });
    handleChangeAddress(e.target.value);
  }

  render() {
    const {
      title,
      required,
      requiredErrorMessage,
      propName,
      style,
      rule,
    } = this.props;
    const {
      address,
    } = this.state;

    let addressShow = this.state.displayType === 'display' ? 'none' : 'inline';

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
        <ZipCodeTW displayType={this.state.displayType}
          countyValue={this.state.county}
          districtValue={this.state.district}
          zipCodeValue={this.state.zipCode}
          zipCodePositionLast={false}
          handleChangeCounty={this.handleZipCodeChange}
          handleChangeDistrict={this.handleZipCodeChange}
          handleChangeZipCode={this.handleZipCodeChange}
          handleBlurZipCode={this.handleZipCodeChange}
          fullAddress={this.state.address}
          handleZipCodeNotExists={this.handleZipCodeNotExists}
          countyStyle={{
            height: '32px',
            width: '80px',
            margin: '0px',
            border: '1px solid #d9d9d9',
          }}
          districtStyle={{
            height: '32px',
            width: '80px',
            margin: '0px',
            border: '1px solid #d9d9d9',
            borderTopRightRadius: document.documentElement.clientWidth >= 600 ? '0px' : '30px',
            borderBottomRightRadius: document.documentElement.clientWidth >= 600 ? '0px' : '30px',
          }}
          zipStyle={{
            height: '32px',
            width: '80px',
            margin: '0px',
            border: '1px solid #d9d9d9',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            paddingLeft: '26px',
          }}
        />
        <input name="address" value={address}
          className="form-control"
          placeholder="輸入地址"
          style={{
            marginLeft: '5px',
            width: '300px',
            display: addressShow,
            borderTopRightRadius: '30px',
            borderBottomRightRadius: '30px',
            borderTopLeftRadius: document.documentElement.clientWidth >= 600 ? '0px' : '30px',
            borderBottomLeftRadius: document.documentElement.clientWidth >= 600 ? '0px' : '30px',
            margin: '0px',
            border: '1px solid #d9d9d9',
            height: '32px',
            paddingLeft: '8px',
          }}
          onChange={this.handleChange}
        />
      </Form.Item>
    );
  }
}

export default FormAddress;

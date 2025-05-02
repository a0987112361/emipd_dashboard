import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';
import moment from 'moment';
import { Colors, Images } from 'src/Theme';

const styles = {
};


class DateBox extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func,
  };

  static defaultProps = {
    handleClick: () => { },
  };

  state = {
  };

  // shouldComponentUpdate(nextProps) {
  //   return shallowCompare(nextProps, this.props);
  // }

  renderItemColor = (data, date) => {
    // data 結構
    // 0: task_id
    // 1: task_name
    // 2: task_description
    // 3: start
    // 4: end
    // 5: estimated_time
    // 6: actual_time
    // 7: is_done
    if (moment(date).format('YYYYMMDD') >= moment(data[3]).format('YYYYMMDD') && moment(date).format('YYYYMMDD') <= moment(data[4]).format('YYYYMMDD')) {
      if (moment().format('YYYYMMDD') > moment(date).format("YYYYMMDD") && !data[7]) {
        return 'red';
      }
      return '#158AF5';
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        return '#D4E8EC';
      } else {
        return 'transparent';
      }
    }
  }


  renderParenItemColor = (data, date) => {
    // data 結構
    // 0: task_id
    // 1: task_name
    // 2: task_description
    // 3: start
    // 4: end
    // 5: estimated_time
    // 6: actual_time
    // 7: is_done
    // 8: Avatar
    // 9: 子項目列表
    if (moment(date).format('YYYYMMDD') >= moment(data[3]).format('YYYYMMDD') && moment(date).format('YYYYMMDD') <= moment(data[4]).format('YYYYMMDD')) {
      if (moment().format('YYYYMMDD') > moment(date).format("YYYYMMDD") && !data[7]) {
        return 'red';
      }
      if (data[9].length > 0) {
        let filterChildList = data[9].filter((item) => moment(item[3]).format('YYYYMMDD') <= moment(date).format('YYYYMMDD') && moment(item[4]).format('YYYYMMDD') >= moment(date).format('YYYYMMDD'));
        if (filterChildList.length === 0) {
          return 'transparent'
        }
      }
      return '#158AF5';
    } else {
      return 'white';
    }
  }


  renderParentChildColor = (data, date) => {
    // data 結構
    // 0: task_id
    // 1: task_name
    // 2: task_description
    // 3: start
    // 4: end
    // 5: estimated_time
    // 6: actual_time
    // 7: is_done
    // 8: avatar
    // 9: children
    if (moment(date).format('YYYYMMDD') >= moment(data[3]).format('YYYYMMDD') && moment(date).format('YYYYMMDD') <= moment(data[4]).format('YYYYMMDD')) {
      if (data[9].length === 0) {
        if (moment(date).format('YYYYMMDD') > moment(data[4]).format('YYYYMMDD') && !data[7]) {
          return 'red';
        } else if (data[7]) {
          return '#87f068';
        } else {
          return 'transparent';
        }
      } else {
        if (moment(date).format('YYYYMMDD') <= moment(data[11]).format('YYYYMMDD')) {
          let filterChildList = data[9].filter((item) => moment(item[3]).format('YYYYMMDD') <= moment(date).format('YYYYMMDD') && moment(item[4]).format('YYYYMMDD') >= moment(date).format('YYYYMMDD'));
          if (filterChildList.length === 0) {
            return 'transparent'
          }
          return '#87f068';
        } else {
          return 'transparent';
        }
      }
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        return 'white';
      } else {
        return 'transparent';
      }
    }

  }

  renderDateColor = (date, type, index) => {
    if (moment().format('YYYYMMDD') === moment(date).format('YYYYMMDD')) {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        return '#D4E8EC';
      } else {
        return 'transparent';
      }
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {

        return '#D4E8EC';
      } else {
        return '#ffffff';
      }
    }
  }

  handleOpenStage = (value) => {
    const { openStage } = this.state;
    let temp = JSON.parse(JSON.stringify(openStage));
    let indexOf = temp.indexOf(value);
    if (indexOf > -1) {
      temp = temp.filter((item) => item !== value);
    } else {
      temp.push(value);
    }
    this.setState({
      openStage: temp,
    });
  }

  handleMarginLeft = (date, data) => {
    if (moment(data[3]).format('YYYYMMDD') === moment(date).format('YYYYMMDD')
    ) {
      return '8px';
    } else if (data[9].length > 0) {
      let yesterday = moment(date).subtract(1, 'days');
      let filterChildList = data[9].filter((item) => moment(item[3]).format('YYYYMMDD') <= moment(yesterday).format('YYYYMMDD') && moment(item[4]).format('YYYYMMDD') >= moment(yesterday).format('YYYYMMDD'));
      if (filterChildList.length === 0) {
        return '8px';
      }
      return '0px';
    }
    return '0px';
  }

  handleMarginRight = (date, data) => {
    if (moment(data[4]).format('YYYYMMDD') === moment(date).format('YYYYMMDD')
    ) {
      return '8px';
    } else if (data[9].length > 0) {
      let tomorrow = moment(date).add(1, 'days');
      let filterChildList = data[9].filter((item) => moment(item[3]).format('YYYYMMDD') <= moment(tomorrow).format('YYYYMMDD') && moment(item[4]).format('YYYYMMDD') >= moment(tomorrow).format('YYYYMMDD'));
      if (filterChildList.length === 0) {
        return '8px';
      }
      return '0px';
    }
    return '0px';
  }

  render() {
    const {
      dateItem, // 日期資料
      dataItem, // 子項目資料
      currentWidth,
      handleClick, // click 事件
      style,
    } = this.props;

    return <div style={{
      width: currentWidth,
      minWidth: currentWidth,
      height: '40px',
      lineHeight: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 2,
      // backgroundColor: this.renderDateColor(dateItem),
      borderBottom: '1px solid #BEBEBE',
      backgroundColor: 'white',
      padding: '7px 0px',
      ...style,
    }}>
      <div
        style={{
          height: '10px',
          // marginLeft: this.handleMarginLeft(dateItem, dataItem),
          // marginRight: this.handleMarginRight(dateItem, dataItem),
          backgroundColor: this.renderParenItemColor(dataItem, dateItem),
        }}
        onClick={() => handleClick(dataItem[0])}
      ></div>
      <div
        style={{
          height: '10px',
          // marginLeft: this.handleMarginLeft(dateItem, dataItem),
          // marginRight: this.handleMarginRight(dateItem, dataItem),
          backgroundColor: this.renderParentChildColor(dataItem, dateItem),
        }}
        onClick={() => handleClick(dataItem[0])}
      ></div>
    </div>
  }
}

export default DateBox;

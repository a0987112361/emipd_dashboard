import _ from 'lodash';
import moment from 'moment';


export const weekHandler = (value) => {
  switch (moment(value).weekday()) {
    case 0:
      return '日';
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    case 5:
      return '五';
    case 6:
      return '六';
  }
}

export const deadlineHandler = (value) => {
  let temp = [];
  if (_.isString(value)) {
    if (value.indexOf('~') > -1) {
      temp = value.split('~');
    } else {
      temp = [value, value];
    }
    if (temp[0] === temp[1]) {
      return `${moment(temp[0]).format('MM/DD')}`;
    } else {
      return `${moment(temp[0]).format('MM/DD')}~${moment(temp[1]).format('DD')}`;
    }
  } else {
    let tempString = `${value[0].format('YYYY-MM-DD')}~${value[1].format('YYYY-MM-DD')}`
    if (tempString.indexOf('~') > -1) {
      temp = tempString.split('~');
    } else {
      temp = [tempString, tempString];
    }
    if (temp[0] === temp[1]) {
      return `${moment(temp[0]).format('MM/DD')}`;
    } else {
      return `${moment(temp[0]).format('MM/DD')}~${moment(temp[1]).format('DD')}`;
    }
  }
}

export const handleWeekDay = (type = 'week') => {
  var weekOfDay = moment().format('E');//计算今天是这周第几天
  var last_monday = moment().subtract(weekOfDay - 1, 'days').format('YYYY-MM-DD');//周一日期
  var last_sunday = moment().add(7 - weekOfDay, 'days').format('YYYY-MM-DD');//周日日期
  if (type === 'week') {
    return { start_date: last_monday, end_date: last_sunday };
  } else if (type === 'month') {
    return { start_date: moment().startOf('month').format('YYYY-MM-DD'), end_date: moment().endOf('month').format('YYYY-MM-DD') }
  } else if (type === 'year') {
    return { start_date: moment().startOf('year').format('YYYY-MM-DD'), end_date: moment().endOf('year').format('YYYY-MM-DD') }
  }
}

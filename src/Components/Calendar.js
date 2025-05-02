import React from 'react';
import { Row, Col, Button } from 'antd';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Colors } from 'src/Theme';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const styles = {
  toolbarBtn: {
    height: '40px',
    width: '80px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: Colors.third,
  }
};

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
  }

  handleChangeDate = (type) => {
    const { currentMonth } = this.state;
    if (type === 1) {
      this.setState({
        currentMonth: new Date(moment(currentMonth).add(1, 'months')),
      });
    } else {
      this.setState({
        currentMonth: new Date(moment(currentMonth).subtract(1, 'months')),
      });
    }
  }

  handleClick = (value) => {
    const { handleClickDetail } = this.props;
    handleClickDetail(value.resource);
  }

  handleDateClick = (e) => {
    const { createNewTask } = this.props;
    createNewTask(e.start, e.end);
  }

  renderMonth = (value) => {
    switch (value) {
      case '01':
        return '1月 ';
      case '02':
        return '2月 ';
      case '03':
        return '3月 ';
      case '04':
        return '4月 ';
      case '05':
        return '5月 ';
      case '06':
        return '6月 ';
      case '07':
        return '7月 ';
      case '08':
        return '8月 ';
      case '09':
        return '9月 ';
      case '10':
        return '10月 ';
      case '11':
        return '11月 ';
      case '12':
        return '12月 ';
    }
  }

  renderWeek = (value) => {
    switch (value) {
      case 0:
        return '星期日';
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
    }
  }

  renderToolBar = () => {
    const { currentMonth } = this.state;
    return (
      <Row style={{ height: '40px' }}>
        <Col span={6}>
          <Button onClick={() => this.handleChangeDate(-1)} style={styles.toolbarBtn}>
            {`<`}
          </Button>
        </Col>
        <Col span={12}
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: '40px',
          }}>
          {moment(currentMonth).format('YYYY 年 - MM 月')}
        </Col>
        <Col onClick={() => this.handleChangeDate(1)} span={6} style={{ textAlign: 'right' }}>
          <Button style={styles.toolbarBtn}>
            {`>`}
          </Button>
        </Col>
      </Row>
    )
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    // console.log('event =>', event);
    // var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: event.hexColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }

  render() {
    const { currentMonth } = this.state;
    const { event = [], } = this.props;
    return (
      <div style={{ height: 'calc(100vh - 200px)', backgroundColor: 'white' }}>
        <BigCalendar
          localizer={localizer}
          // views={['month', 'week', 'work_week']}
          views={['month']}
          formats={{
            monthHeaderFormat: (date) => moment(date).format('YYYY年 - ') + this.renderMonth(moment(date).format('MM')),
            weekdayFormat: (date) => this.renderWeek(moment(date).weekday()),
            dayRangeHeaderFormat: ({ start, end }) => this.renderMonth(moment(start).format('MM')) + moment(start).format('DD') + ' - ' + moment(end).format('DD'),
          }}
          selectable={true}
          popup={true}
          date={currentMonth}
          onSelectSlot={this.handleDateClick}
          components={{
            toolbar: this.renderToolBar,
          }}
          onSelectEvent={this.handleClick}
          eventPropGetter={(this.eventStyleGetter)}
          events={event}
        // startAccsessor="start"
        // endAccessor="end"
        />
      </div>
    )
  }

}
export default Calendar;

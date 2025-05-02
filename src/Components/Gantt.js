import React from 'react';
import { Row, Col, Button, Slider, Avatar, Checkbox, Spin } from 'antd';
import moment from 'moment';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

import './Gantt.css';
import _ from 'lodash';

class Gantt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWidth: 100,
      currentData: [],
      filter: {
        is_done: false,
      },
      isLoading: false,
    };
    this.iScroll = React.createRef();
  }

  componentDidMount() {
    this.setState({
      currentData: this.props.data,
    });
    // this.iScroll.addEventListener("scroll", () => {
    //   console.log('this.iScroll.scrollTop =>', this.iScroll.scrollTop);
    //   console.log('this.iScroll.clientHeight =>', this.iScroll.clientHeight);
    //   console.log('this.iScroll.scrollHeight =>', this.iScroll.scrollHeight);
    //   // if (this.iScroll.scrollTop + this.iScroll.clientHeight >= this.iScroll.scrollHeight - 20) {
    //   //   this.loadMoreItems();
    //   // }
    // });
  }

  componentWillReceiveProps(nextProps) {
    const { filter } = this.state;
    if (nextProps.data !== this.props.data) {
      this.setState({
        currentData: filter.is_done ? nextProps.data.filter((item) => item[7] === !filter.is_done) : nextProps.data,
      });
    }
  }

  shouldComponentUpdate() {
    if (this.props.isUpdate) {
      return false;
    } else {
      if (this.props.currentMode === '' || this.props.currentMode === 'gantt') {
        return true;
      } else {
        return false;
      }
    }
  }


  handleChangeCheckbox = (e) => {
    this.setState({
      isLoading: true,
      filter: {
        ...this.state.filter,
        is_done: e.target.checked,
      },
    });
    setTimeout(() => {
      this.setState({
        currentData: e.target.checked ? this.props.data.filter((item) => item[7] === !e.target.checked) : this.props.data,
      }, () => {
        this.setState({
          isLoading: false,
        })
      });
    }, 300);
  }

  handleScrollHeight = () => {
    console.log('this.iScroll.current.scrollTop =>', this.iScroll.current.scrollTop);
  }


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

  renderChildColor = (data, date) => {
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
      if (moment(date).format('YYYYMMDD') > moment(data[4]).format('YYYYMMDD') && !data[7]) {
        return 'red';
      } else if (data[7]) {
        return 'green';
      } else {
        return 'transparent';
      }
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        return '#D4E8EC';
      } else {
        return 'transparent';
      }
    }

  }

  renderDateColor = (date, type, index) => {
    if (moment().format('YYYYMMDD') === moment(date).format('YYYYMMDD')) {
      if (type === 'th') {
        return '#F89E7B';
      } else {
        if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
          return '#D4E8EC';
        } else {
          return 'transparent';
        }
      }
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        if (type === 'th') {
          return '#ABD3DD';
        } else {
          return '#D4E8EC';
        }
      } else {
        return index % 2 === 0 ? '#FFFFFF' : '#F5F5F5';
      }
    }
  }

  render() {
    const {
      data,
      onEventClick,
    } = this.props;
    const {
      currentData,
      filter,
      currentWidth,
      isLoading,
    } = this.state;
    if (currentData.length === 0) {
      return null;
    }
    let dateList = [];
    let firstDate = moment(currentData[0][3]);
    let endDate = moment(currentData[currentData.length - 1][4]);
    if (firstDate > moment()) {
      firstDate = moment();
    }
    let range = endDate.diff(firstDate) / (1000 * 60 * 60 * 24);
    if (range < 30) {
      range = 30;
    }
    for (let index = 0; index <= range; index++) {
      dateList.push(moment(firstDate).add(index, 'days'));
    }
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        {this.iScroll.current && this.handleScrollHeight()}
        <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'black', backgroundColor: 'white', lineHeight: '40px' }}>
          <Checkbox disabled={isLoading} checked={filter.is_done} onChange={this.handleChangeCheckbox}>只顯示未完成之任務</Checkbox>
          日期寬度設定：
          <div style={{ width: '160px', marginRight: '8px' }}>
            <Slider onAfterChange={(value) => this.setState({ currentWidth: value })} min={60} max={140} defaultValue={currentWidth} />
          </div>
        </div>
        {
          this.state.isLoading ? <div style={{
            width: '100%',
            height: 'calc(100% - 40px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            opacity: '0.5'
          }}>
            <Spin />
          </div> :
            <div style={{ width: '100%', height: 'calc(100% - 40px)', overflow: 'hidden' }}>
              <div ref={this.iScroll} style={{ width: '100%', height: '100%', overflowX: 'auto', overflowY: 'auto' }}>
                <div style={{
                  height: '40px',
                  backgroundColor: '#F5F5F5',
                  display: 'flex',
                  width: currentWidth * dateList.length + 220 + 72 + 90,
                  position: 'sticky',
                  top: 0,
                  zIndex: 6,
                  borderBottom: '1px solid #BEBEBE',
                }}>
                  <div style={{
                    width: '220px',
                    backgroundColor: '#F5F5F5',
                    height: '40px',
                    lineHeight: '40px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRight: '2px solid #f2f2f2',
                    position: 'sticky',
                    left: 0,
                    zIndex: 5,
                    borderRight: '1px solid #BEBEBE',
                  }}></div>
                  <div style={{
                    width: '72px',
                    backgroundColor: '#F5F5F5',
                    height: '40px',
                    lineHeight: '40px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRight: '2px solid #f2f2f2',
                    position: 'sticky',
                    left: 220,
                    zIndex: 5,
                    borderRight: '1px solid #BEBEBE',
                  }}>預估時間</div>
                  <div style={{
                    width: '90px',
                    backgroundColor: '#F5F5F5',
                    height: '40px',
                    lineHeight: '40px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderRight: '2px solid #f2f2f2',
                    position: 'sticky',
                    left: 292,
                    zIndex: 5,
                    borderRight: '1px solid #BEBEBE',
                  }}>參與人</div>
                  {
                    dateList.map((item) => <div style={{ width: currentWidth, minWidth: currentWidth, height: '40px', lineHeight: '40px', fontWeight: 'bold', backgroundColor: this.renderDateColor(item, 'th'), textAlign: 'center', zIndex: 4, color: moment().format('YYYY-MM-DD') === moment(item).format('YYYY-MM-DD') ? 'white' : 'black' }}>{moment(item).format('MM/DD')}</div>)
                  }
                </div>
                {
                  currentData.map((item, index) => {
                    return <div style={{ width: currentWidth * dateList.length + 220 + 72 + 90, height: '56px', display: 'flex', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }} >
                      <div
                        title={item[1]}
                        style={{
                          width: '220px',
                          backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                          height: '56px',
                          position: 'sticky',
                          left: 0,
                          borderRight: '2px solid #f2f2f2',
                          padding: '0px 8px',
                          lineHeight: '40px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          zIndex: 3,
                          borderBottom: '1px solid #BEBEBE',
                          borderRight: '1px solid #BEBEBE',
                          cursor: 'pointer',
                        }}
                        onClick={() => onEventClick(item[0])}
                      >
                        {item[1]}
                      </div>
                      <div
                        title={item[1]}
                        style={{
                          width: '72px',
                          backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                          height: '56px',
                          position: 'sticky',
                          left: 220,
                          borderRight: '2px solid #f2f2f2',
                          padding: '0px 8px',
                          lineHeight: '40px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          zIndex: 3,
                          borderBottom: '1px solid #BEBEBE',
                          borderRight: '1px solid #BEBEBE',
                          textAlign: 'center',
                        }}
                      >
                        {item[5]}
                      </div>
                      <div
                        title={item[1]}
                        style={{
                          width: '90px',
                          backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
                          height: '56px',
                          position: 'sticky',
                          left: 292,
                          borderRight: '2px solid #f2f2f2',
                          padding: '0px 8px',
                          lineHeight: '40px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          zIndex: 3,
                          borderBottom: '1px solid #BEBEBE',
                          borderRight: '1px solid #BEBEBE',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px' }}>
                          {item[8].map((user) => {
                            return <Avatar size={28} title={user.name} src={user.avatar} />
                          })}
                        </Avatar.Group>

                      </div>
                      {
                        // 內容格子
                        dateList.map((dateItem, dateIndex) => {
                          return <div style={{
                            width: currentWidth,
                            minWidth: currentWidth,
                            height: '56px',
                            lineHeight: '56px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            zIndex: 2,
                            backgroundColor: this.renderDateColor(dateItem, 'td', index),
                            borderBottom: '1px solid #BEBEBE',
                            padding: '12px 0px',
                          }}>
                            <div
                              style={{
                                // marginTop: '12px',
                                // marginBottom: '12px',
                                height: '16px',
                                cursor: 'pointer',
                                borderTopLeftRadius: moment(dateItem).format('YYYYMMDD') === moment(item[3]).format('YYYYMMDD') ? '5px' : '0px',
                                borderBottomLeftRadius: moment(dateItem).format('YYYYMMDD') === moment(item[3]).format('YYYYMMDD') ? '5px' : '0px',
                                borderTopRightRadius: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '5px' : '0px',
                                borderBottomRightRadius: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '5px' : '0px',
                                marginLeft: moment(dateItem).format('YYYYMMDD') > moment(item[3]).format('YYYYMMDD') ? '0px' : '8px',
                                marginRight: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '8px' : '0px',
                                backgroundColor: this.renderItemColor(item, dateItem),
                              }}
                              onClick={() => onEventClick(item[0])}
                            ></div>
                            <div
                              style={{
                                // marginTop: '12px',
                                // marginBottom: '12px',
                                height: '16px',
                                cursor: 'pointer',
                                borderTopLeftRadius: moment(dateItem).format('YYYYMMDD') === moment(item[3]).format('YYYYMMDD') ? '5px' : '0px',
                                borderBottomLeftRadius: moment(dateItem).format('YYYYMMDD') === moment(item[3]).format('YYYYMMDD') ? '5px' : '0px',
                                borderTopRightRadius: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '5px' : '0px',
                                borderBottomRightRadius: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '5px' : '0px',
                                marginLeft: moment(dateItem).format('YYYYMMDD') > moment(item[3]).format('YYYYMMDD') ? '0px' : '8px',
                                marginRight: moment(dateItem).format('YYYYMMDD') === moment(item[4]).format('YYYYMMDD') ? '8px' : '0px',
                                backgroundColor: this.renderChildColor(item, dateItem),
                              }}
                              onClick={() => onEventClick(item[0])}
                            ></div>
                          </div>;
                        })
                      }
                    </div>
                  })
                }
              </div >
            </div >
        }
      </div>
    )
  }

}
export default Gantt;

import React, { forwardRef } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Avatar, Button, Tooltip } from 'antd';
import { DateBox } from 'src/Components';
import './TestGantt.css';
import { FixedSizeList as List } from 'react-window';
import { FixedSizeGrid as Grid } from 'react-window';

let nowIndex = 0;
const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    maxHeight: '600px',
  },
  leftBox: {
    width: '489px',
    height: '100%',
    border: '1px solid #BEBEBE',
    marginRight: '-1px',
  },
  rightBox: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    border: '1px solid #BEBEBE',
  },
  lineHeaderStyle: {
    // width: '40px',
    height: '40px',
    fontWeight: 'bold',
    borderRight: '1px solid #BEBEBE',
    borderBottom: '1px solid #BEBEBE',
    lineHeight: '40px',
    padding: '0px 4px',
    backgroundColor: '#F5F5F5',
  },
  lineStyle: {
    width: '40px',
    height: '40px',
    borderRight: '1px solid #BEBEBE',
    borderBottom: '1px solid #BEBEBE',
    lineHeight: '40px',
    padding: '0px 4px',
  },
  dateBox: {
    width: '100%',
    display: 'flex',
    height: '40px',
    backgroundColor: '#f5f5f5',
  }
};
let firstDate = '';

class TestGantt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.gridRef = React.createRef();
    this.dateGridRef = React.createRef();
    this.projectGridRef = React.createRef();
    this.dateBoxGridRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.dateBoxGridRef.current.scrollToItem({
        columnIndex: nowIndex,
        align: 'start',
      });
      this.dateGridRef.current.scrollToItem({
        columnIndex: nowIndex,
        align: 'start',
      });
    }, 100)
  }

  renderDateColor = (date) => {
    if (moment().format('YYYYMMDD') === moment(date).format('YYYYMMDD')) {
      return '#F89E7B';
    } else {
      if (moment(date).format('E') === '6' || moment(date).format('E') === '7') {
        return '#ABD3DD';
      } else {
        return '#f5f5f5';
      }
    }
  }

  handleScroll = ({ scrollTop, scrollUpdateWasRequested, scrollLeft }) => {
    this.dateGridRef.current.scrollTo({ scrollLeft });
    this.projectGridRef.current.scrollTo({ scrollTop });
  }

  handleActualTime = (data) => {
    // [5]: 預估時間
    // [6]: 實際時間
    // [10]: 百分比
    if (data[10] === 0) {
      if (data[5] >= data[6]) {
        return data[6];
      } else {
        return `案件已額外花費${data[6] - data[5]}個小時`;
      }
    } else {
      if (((data[5] * data[10]) / 100) >= data[6]) {
        return data[6];
      } else {
        return `案件已額外花費${Math.round((data[6] - ((data[5] * (Math.round(data[10] * 10) / 10)) / 100)) * 10) / 10}個小時`;
      }
    }
  }

  handleActualColor = (data) => {
    // [5]: 預估時間
    // [6]: 實際時間
    // [10]: 百分比
    if (data[10] === 0) {
      if (data[5] >= data[6]) {
        return 'black';
      } else {
        return 'red';
      }
    } else {
      if ((data[5] * data[10] / 100) >= data[6]) {
        return 'black';
      } else {
        return 'red';
      }
    }
  }

  render() {
    const {
      data,
    } = this.props;

    let dateList = [];
    firstDate = moment(data[0][3]);
    let endDate = moment().add(30, 'days');
    data.map((item) => {
      if (moment(item[4]) > moment(endDate) && endDate !== '') {
        endDate = moment(item[4]);
      }
    });
    if (firstDate > moment()) {
      firstDate = moment();
    }
    let range = endDate.diff(firstDate) / (1000 * 60 * 60 * 24);
    if (range < 30) {
      range = 30;
    }

    for (let index = 0; index <= range; index++) {
      if (moment(moment(firstDate).add(index, 'days')).format('YYYYMMDD') === moment().format('YYYYMMDD')) {
        nowIndex = index;
      }
      dateList.push(moment(firstDate).add(index, 'days'));
    }

    const DateCell = ({ columnIndex, rowIndex, style }) => {
      return <div
        style={{
          ...style,
          ...styles.lineHeaderStyle,
          minWidth: '100px',
          borderRight: '0px',
          textAlign: 'center',
          backgroundColor: this.renderDateColor(dateList[columnIndex])
        }}>
        {moment(dateList[columnIndex]).format('MM/DD')}
      </div>
    }

    const ProjectCell = ({ columnIndex, rowIndex, style }) => {
      return <div style={{ ...style, width: '561px', display: 'flex' }}>
        <div style={{ ...styles.lineStyle, width: '40px' }}></div>
        <div
          style={{
            ...styles.lineStyle,
            width: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >{data[rowIndex][1]}</div>
        <div style={{ ...styles.lineStyle, width: '72px', textAlign: 'center' }}>{data[rowIndex][5]}</div>
        <div style={{ ...styles.lineStyle, width: '72px', textAlign: 'center', color: this.handleActualColor(data[rowIndex]) }}>
          <Tooltip placement="top" title={this.handleActualTime(data[rowIndex])}>
            {data[rowIndex][6]}
          </Tooltip></div>
        <div style={{ ...styles.lineStyle, width: '72px', textAlign: 'center' }}>{data[rowIndex][10] !== 0 ? Math.round(data[rowIndex][10] * 10) / 10 : 0}%</div>
        <div style={{ ...styles.lineStyle, width: '90px', padding: '6px 4px' }}>
          <Avatar.Group
            maxCount={2}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              width: '28px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10px',
            }}>
            {data[rowIndex][8].map((user, index) => {
              return <Avatar key={`${user.name}_${index}`} size={28} title={user.name} src={user.avatar} />
            })}
          </Avatar.Group>
        </div>
      </div>
    }

    const Cell = ({ columnIndex, rowIndex, style }) => {
      return <DateBox
        dateItem={dateList[columnIndex]}
        dataItem={data[rowIndex]}
        currentWidth={100}
        style={style}
        keyName={columnIndex}
      />
    }

    return (
      <div style={{ width: '100%', paddingBottom: '30px' }}>
        <div
          style={{
            width: '100%',
            height: '40px',
            display: 'flex',
            border: '1px solid #bebebe',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: '561px', display: 'flex' }}>
            <div style={{ ...styles.lineHeaderStyle, width: '40px' }}></div>
            <div style={{ ...styles.lineHeaderStyle, width: '220px' }}>案件名稱</div>
            <div style={{ ...styles.lineHeaderStyle, width: '72px', textAlign: 'center' }}>預估時數</div>
            <div style={{ ...styles.lineHeaderStyle, width: '72px', textAlign: 'center' }}>實際時數</div>
            <div style={{ ...styles.lineHeaderStyle, width: '72px', textAlign: 'center' }}>百分比</div>
            <div style={{ ...styles.lineHeaderStyle, width: '90px' }}>參與人</div>
          </div>
          <div style={{ width: 'calc(100% - 561px)', height: '40px' }}>
            <Grid
              ref={this.dateGridRef}
              style={{ overflowX: "hidden" }}
              className="Grid"
              columnCount={dateList.length}
              columnWidth={100}
              rowCount={1}
              rowHeight={40}
              height={40}
              width={document.documentElement.clientWidth - 561 - 120}
            >
              {DateCell}
            </Grid>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '409px',
            display: 'flex',
            border: '1px solid #bebebe',
            overflow: 'hidden',
            borderTop: '0px',
          }}
        >
          <Grid
            ref={this.projectGridRef}
            style={{ overflow: "hidden", maxHeight: '401px', borderRight: '1px solid #bebebe', borderBottom: '1px solid #bebebe' }}
            className="Grid"
            columnCount={1}
            columnWidth={561}
            rowCount={data.length}
            rowHeight={40}
            height={data.length * 40}
            width={562}
          >
            {ProjectCell}
          </Grid>
          <Grid
            ref={this.dateBoxGridRef}
            className="Grid"
            onScroll={this.handleScroll}
            columnCount={dateList.length}
            columnWidth={100}
            style={{ maxHeight: '409px' }}
            rowCount={data.length}
            rowHeight={40}
            height={data.length * 40 + 9}
            width={document.documentElement.clientWidth - 561 - 120 - 9}
          >
            {Cell}
          </Grid>

        </div>
        {/* <div style={styles.wrapper}>
          <div style={styles.leftBox}>
            <div style={{ width: '100%', display: 'flex' }}>
              <div style={{ ...styles.lineHeaderStyle, width: '40px' }}></div>
              <div style={{ ...styles.lineHeaderStyle, width: '220px' }}>案件名稱</div>
              <div style={{ ...styles.lineHeaderStyle, width: '72px', textAlign: 'center' }}>預估時數</div>
              <div style={{ ...styles.lineHeaderStyle, width: '72px', textAlign: 'center' }}>實際時數</div>
              <div style={{ ...styles.lineHeaderStyle, width: '90px', textAlign: 'center', borderRight: '0px' }}>參與人</div>
            </div>
            {data.map((item, index) =>
              <div key={`item_${index}`} style={{ width: '100%', display: 'flex' }}>
                <div style={{ ...styles.lineStyle, width: '40px' }}></div>
                <div style={{ ...styles.lineStyle, width: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item[1]}</div>
                <div style={{ ...styles.lineStyle, width: '72px', textAlign: 'center' }}>{item[5]}</div>
                <div style={{ ...styles.lineStyle, width: '72px', textAlign: 'center' }}>{item[6].toFixed(1)}</div>
                <div style={{ ...styles.lineStyle, width: '90px', borderRight: '0px' }}>
                  <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px' }}>
                    {item[8].map((user, index) => {
                      return <Avatar key={`${user.name}_${index}`} size={28} title={user.name} src={user.avatar} />
                    })}
                  </Avatar.Group></div>
              </div>)}
            <div style={{ height: '8px', width: '100%' }} />
          </div>
          <div style={styles.rightBox} >
            <GridWithStickyCells
              className="Grid"
              columnCount={dateList.length}
              columnWidth={100}
              height={600}
              rowCount={data.length + 1}
              rowHeight={40}
              width={document.documentElement.clientWidth - 494 - 120}
            >
              {Cell}
            </GridWithStickyCells>
            <List
              height={(data.length + 1) * 40 + 8}
              itemCount={dateList.length}
              itemSize={100}
              layout="horizontal"
              ref={this.gridRef}
              width={document.documentElement.clientWidth - 494 - 120}
            >
              {Column}
            </List>
            <Grid
              className="Grid"
              onScroll={this.handleScroll}
              innerElementType={innerElementType}
              columnCount={dateList.length}
              columnWidth={100}
              height={(data.length + 1) * 40 + 8}
              ref={this.gridRef}
              rowCount={data.length + 1}
              rowHeight={40}
              width={document.documentElement.clientWidth - 494 - 120}
            >
              {Cell}
            </Grid>
          </div>
        </div> */}
      </div>
    );
  }
}

export default TestGantt;

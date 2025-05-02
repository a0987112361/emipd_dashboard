import React from 'react';
import _ from 'lodash';
import { Tag, Button, Tooltip, Popover } from 'antd';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Images, Colors } from 'src/Theme';
import { getEmptyImage } from 'react-dnd-html5-backend';
import './Card.css';
import {
  WarningFilled,
} from '@ant-design/icons';
import moment from 'moment';

const styles = {
  iconButtonStyle: {
    width: '40px',
    height: '40px',
    border: '0px',
    borderRadius: '5px'
  },
  iconImgStyle: {
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: '7px',
    left: '224px',
    zIndex: 222,
  },
  popoverBtn: {
    fontSize: '10px',
    padding: '0px',
    width: '45px',
    height: '20px',
  },
};

const dragSource = {
  beginDrag(props) {
    return {
      ...props,
    }
  }
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Card extends React.Component {
  state = {
    isEnter: false,
    visible: false,
  }
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      })
    }
  }

  handleIsDelete = (e) => {
    e.stopPropagation();
    this.setState({
      visible: true,
    })
  }

  handleCancelPopover = (e) => {
    e.stopPropagation();
    this.setState({
      visible: false,
    });
  }

  handleDeadlineStyle = (value, is_done) => {
    if (is_done) {
      return {
        backgroundColor: 'transparent',
        color: 'black',
      }
    } else {
      if (value !== undefined && value.indexOf('~') > -1) {
        let temp = value.split('~');
        if (moment().format('YYYYMMDD') > moment(temp[1]).format('YYYYMMDD')) {
          return {
            backgroundColor: 'red',
            color: 'white',
          }
        } else {
          return {
            backgroundColor: 'transparent',
            color: 'black',
          }
        }
      } else {
        if (moment().format('YYYYMMDD') > moment(value).format('YYYYMMDD')) {
          return {
            backgroundColor: 'red',
            color: 'white',
          }
        } else {
          return {
            backgroundColor: 'transparent',
            color: 'black',
          }
        }
      }
    }
  }

  renderDeadLine = (value) => {
    if (value !== undefined && value.indexOf('~') > -1) {
      let temp = value.split('~');
      if (temp[0] === temp[1]) {
        return moment(temp[0]).format('MM/DD');
      }
      return `${moment(temp[0]).format('MM/DD')}~${moment(temp[1]).format('MM/DD')}`
    } else {
      return moment(value).format('MM/DD');
    }
  }

  render() {
    const {
      data,
      isTask,
      isDragging, // Injected by React DnD
      connectDragPreview, // Injected by React DnD
      connectDragSource, // Injected by React DnD
      handleClickUpdate,
      handleDelete,
      project_name,
    } = this.props;
    const {
      isEnter,
    } = this.state;

    return connectDragSource(
      <div
        className="card"
        style={{
          opacity: isDragging ? 0.6 : 1,
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}
        onMouseEnter={() => this.setState({ isEnter: true })}
        onMouseLeave={() => this.setState({ isEnter: false })}
        onClick={() => handleClickUpdate(data)}
      >
        <div className="card_box">
          {isTask && <Tag color="#000000" style={{ color: 'white', marginBottom: '4px', maxWidth: '210px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{project_name}</Tag>}
          <div style={{ display: 'flex' }}>
            <img
              src={Images.calendar}
              style={{
                width: '24px',
                height: '24px',
              }}
            />
            {_.has(data, 'deadline') && <div
              className="card_tag"
              style={{ ...this.handleDeadlineStyle(data.deadline, data.task_status.is_done) }}>
              {this.renderDeadLine(data.deadline)}
            </div>}
            {_.has(data, 'task_tag') && data.task_tag.map((item) => <div color="blue" className="card_tag" style={{ backgroundColor: item.tag_color, color: item.text_color }}>{item.tag_name}</div>)}
          </div>
          <div style={{ width: '90%', marginBottom: '12px' }}>
            <span className="card_header">{data.task_name}</span>
          </div>
          <div style={{ marginBottom: _.has(data, 'task_user') && data.task_user.length === 1 ? '8px' : '0px' }}>
            <span className="card_memo">預估時間: {data.estimated_time}</span>
            <span className="card_memo">實際花費時間: {data.actual_time}</span>
            {_.has(data, 'task_user') && data.task_user.length === 1 && <img title={data.task_user[0].name} src={data.task_user[0].avatar || Images.initial_user} className="card_assign_img" />}
          </div>
          <div style={{ width: '100%', textAlign: 'right', marginBottom: '6px' }}>
            {_.has(data, 'task_user') && data.task_user.length > 1 && data.task_user.map((item) => <img title={item.name} src={item.avatar || Images.initial_user} className="card_use_assign_img_list" />)}
          </div>
          {isEnter && <Popover
            content={<div style={{ padding: '8px' }}>
              <div>
                <WarningFilled style={{ color: 'red', fontSize: '16px', marginRight: '8px' }} />Are you sure to delete this task?
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button style={{ ...styles.popoverBtn, marginRight: '4px' }} onClick={(e) => handleDelete(e, data)}>yes</Button>
                <Button style={styles.popoverBtn} onClick={(e) => this.handleCancelPopover(e)}>no</Button>
              </div>
            </div>}
            // title="Title"
            trigger="hover"
            visible={this.state.visible}
            onVisibleChange={() => this.setState({ visible: !this.state.visible })}
          >
            <img onClick={e => this.handleIsDelete(e)} src={Images.trash_red} style={styles.iconImgStyle} />
          </Popover>}
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  name: PropTypes.string,
  empty: PropTypes.bool,

  // Injected by React DnD
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
}

Card.defaultProps = {
}

export default DragSource('CONNECT_CARD', dragSource, dragCollect)(Card)

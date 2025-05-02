import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const styles = {
  box: {
    width: '300px',
    height: '500px',
    border: '1px solid red',
    margin: 'auto',
  },
};

class HomeCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const {
      title,
    } = this.props;

    return (
      <div style={{ ...styles.box }}>
        {title}
      </div>
    );
  }
}

export default HomeCard;

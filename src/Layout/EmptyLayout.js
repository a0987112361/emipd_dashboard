import React from 'react';
import PropTypes from 'prop-types';
import { Screen } from 'src/Theme';

const styles = {
  content: {
    flexGrow: 1,
    flex: 1,
    // height: Screen.screenHeight - (Screen.screenWidth >= 1024 ? 120 : 80),
    overflowY: 'scroll',
    zIndex: 11111,
    height: '100%'
  },
  fill: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}

class EmptyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  static propTypes = {
    class: PropTypes.object,
    children: PropTypes.object,
    classes: PropTypes.object,
  };

  render() {
    const { children } = this.props;
    return (
      <div style={styles.fill}>
        <div style={styles.content}>{children}</div>
      </div>
    );
  }
}

export default EmptyLayout;

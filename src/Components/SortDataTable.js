import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { SortDataTable } from 'src/Components';

// import { ClassActions } from 'src/Stores';

class BorrowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }
  static propTypes = {
    class: PropTypes.object,
  };

  render() {
    return (
      <React.Fragment>
        {/* <SortDataTable /> */}
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        // getClassList: ClassActions.getClassList,
      },
      dispatch,
    ),
)(BorrowScreen);

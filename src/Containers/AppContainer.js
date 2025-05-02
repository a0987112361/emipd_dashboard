import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../App';

export default connect(
  (state) => ({
    user: state.user,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        // getClassList: ClassActions.getClassList,
      },
      dispatch,
    ),
)(App);

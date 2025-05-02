import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import FixMenuLayout from 'src/Layout/FixMenuLayout';
import { UserActions } from 'src/Stores';
const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  setToken: (payload) => {
    dispatch(UserActions.setToken(payload));
  },
  getPermission: () => {
    dispatch(UserActions.getPermission());
  },
  resetPassword: (payload, callback) => {
    dispatch(UserActions.resetPassword(payload, callback));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FixMenuLayout),
);

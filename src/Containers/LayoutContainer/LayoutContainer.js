import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import HomeLayout from 'src/Layout/HomeLayout';
import { UserActions } from 'src/Stores';
const mapStateToProps = ({ user, notification, search }) => ({
  user,
  notification,
  isMobile: user.isMobile,
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
  },
  checkUpdate: (payload, callback) => {
    dispatch(UserActions.checkUpdate(payload, callback));
  },
  setToken: (payload) => {
    dispatch(UserActions.setToken(payload));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomeLayout),
);

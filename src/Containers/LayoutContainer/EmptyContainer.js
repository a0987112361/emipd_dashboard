import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import EmptyLayout from 'src/Layout/EmptyLayout';
import { UserActions, NotificationActions } from 'src/Stores';
const mapStateToProps = ({ user, notification }) => ({
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
  readNotification: (payload, callback) => {
    dispatch(NotificationActions.readNotification(payload, callback));
  },
  getNoticeList: (payload, callback) => {
    dispatch(NotificationActions.getNoticeList(payload, callback));
  },
  getNoticeCount: () => {
    dispatch(NotificationActions.getNoticeCount());
  },
  resetNoticePaging: () => {
    dispatch(NotificationActions.resetNoticePaging());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EmptyLayout),
);

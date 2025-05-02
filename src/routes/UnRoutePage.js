import React, { Fragment } from 'react';

import { Switch, Redirect } from 'react-router-dom';
import { Route, HashRouter } from 'react-router-dom';

import LoginScreen from 'src/Containers/Login/LoginScreen';
import EmptyLayout from 'src/Layout/EmptyLayout';

const RouterPage = () => (
  <EmptyLayout>
    <HashRouter>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Redirect from="/" to="/login" />
      </Switch>
    </HashRouter>
  </EmptyLayout>
);



class UnRoutePage extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Fragment>
        <RouterPage />
      </Fragment>
    );
  }
}
export default UnRoutePage;

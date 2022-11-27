import React from 'react';

import { Router, Switch, Route, Redirect } from 'react-router';

import Login from '../pages/login';
import Signup from '../pages/register';
import Dashboard from '../pages/dashboard';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

import { history } from '../history';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route component={Signup} exact path="/signup" />
      <Route component={Login} exact path="/login" />
      <PrivateRoute component={Dashboard} exact path="/dashboard" />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;

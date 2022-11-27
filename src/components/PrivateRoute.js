import React from 'react';

import { Route, Redirect } from 'react-router';

const PrivateRoute = (props) => {
  // In JavaScript, the double exclamation operator converts an Object to Boolean. This happens such that “falsy” objects become false and “truthy” objects become true.
  const isLogged = !!localStorage.getItem('app-token');
  return isLogged ? <Route {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;

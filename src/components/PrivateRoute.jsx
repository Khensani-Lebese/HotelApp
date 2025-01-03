// src/components/PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook to check authentication status

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth(); // Implement useAuth to get user state

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
};

export default PrivateRoute;

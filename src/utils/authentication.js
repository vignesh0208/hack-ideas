import React from 'react';
import { Navigate } from 'react-router-dom';

const authentication = (Component, isLoggedIn) => {
  const AuthenticatedComponent = (props) => {
    if (!isLoggedIn) {
      return <Navigate to='/' />;
    }
    return <Component {...props} />;
  };
  return AuthenticatedComponent;
};

export default authentication;

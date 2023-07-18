import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UserAuth();

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

PrivateRoute.defaultProps = {
  children: null,
};

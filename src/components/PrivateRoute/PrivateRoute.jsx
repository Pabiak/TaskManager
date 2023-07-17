import React from 'react';

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UserAuth();

  if(!user && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

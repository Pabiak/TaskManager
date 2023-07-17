import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = UserAuth();

  if(!user && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

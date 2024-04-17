import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/SignIn" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
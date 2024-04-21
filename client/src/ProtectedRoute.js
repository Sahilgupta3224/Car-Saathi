import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn,user }) => {
  if (!user) {
    return <Navigate to="/SignIn"/>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
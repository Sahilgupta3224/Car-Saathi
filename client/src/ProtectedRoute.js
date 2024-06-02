import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn }) => {
  // console.log(user);

  if (!isLoggedIn) {
    return <Navigate to="/SignIn"/>;
  }
  return <Outlet />;
};

export default ProtectedRoute;
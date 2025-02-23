import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, token } = useAuth();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If user is not yet loaded or doesn't match the required role, redirect
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
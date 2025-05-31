import { Navigate } from 'react-router-dom';
import {type ReactNode } from 'react';
import React from 'react';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps):React.ReactElement => {
  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

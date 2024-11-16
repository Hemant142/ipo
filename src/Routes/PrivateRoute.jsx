import Cookies from 'cookies-js';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  let token = Cookies.get('login_token_ipo');
  const location = useLocation();

  return !token ? (
    <Navigate to="/" state={{ from: location.pathname }} replace={true} />
  ) : (
    children
  );
}

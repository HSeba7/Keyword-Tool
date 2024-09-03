import React from 'react';

import { getTokenFromCookie } from '../utils/auth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = getTokenFromCookie();

  if (!token) {
    window.location.href = 'https://dashboard.keywordstrategytool.com/wp-login.php'; // External redirection
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

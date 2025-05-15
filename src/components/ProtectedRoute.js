import React from 'react';

import { getTokenFromCookie } from '../utils/auth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  //const token = getTokenFromCookie();
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rhc2hib2FyZC5rZXl3b3Jkc3RyYXRlZ3l0b29sLmNvbSIsImlhdCI6MTc0NzE0NDQ0NywibmJmIjoxNzQ3MTQ0NDQ3LCJleHAiOjE3NDc3NDkyNDcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.RnvhiMja-JAoxRgYPpqpIukP2dnXrBYmo0cTN2cHde4';

  if (!token) {
    window.location.href = 'https://dashboard.keywordstrategytool.com/wp-login.php'; // External redirection
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

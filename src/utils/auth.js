import axios from 'axios';

export const getTokenFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; jwt_token=`);
  console.log('Cookie parts:', parts); // Debugging: Log cookie parts
  if (parts.length === 2) {
    const jwtCookie = parts.pop().split(';').shift();
    console.log('JWT Cookie:', jwtCookie); // Debugging: Log JWT cookie
    return jwtCookie;
  }
  return null;
};

export const fetchUserData = async () => {
  //const token = getTokenFromCookie();
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rhc2hib2FyZC5rZXl3b3Jkc3RyYXRlZ3l0b29sLmNvbSIsImlhdCI6MTc0NzE0NDQ0NywibmJmIjoxNzQ3MTQ0NDQ3LCJleHAiOjE3NDc3NDkyNDcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.RnvhiMja-JAoxRgYPpqpIukP2dnXrBYmo0cTN2cHde4';
  //alert(token); // Debugging: Alert the token
  if (token) {
    try {
      const response = await axios.get('https://dashboard.keywordstrategytool.com/wp-json/custom/v1/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.user;
    } catch (error) {
      console.error('Error fetching protected data', error);
      return null;
    }
  }
  return null;
};

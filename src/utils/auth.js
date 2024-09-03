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
  const token = getTokenFromCookie();
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

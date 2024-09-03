import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../utils/auth';

const AutoLogin = ({ onLogin }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchUserData();
      if (userData) {
        onLogin(userData);
      }
      setLoading(false);
    };
    fetchUser();
  }, [onLogin]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null;
};

export default AutoLogin;

import axios from 'axios';

// Define your Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: 'https://api.dataforseo.com',
  auth: {
    username: 'james@emarketing-strategy.co.uk',
    password: '05f0f2c0a02b7f4d'
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

// Define your API functions
export const fetchKeywordSuggestions = async (url,postArray) => {
  try {
    const response = await axiosInstance.post(url, postArray);
    console.log("api",response)
    return response?.data?.tasks;
  } catch (error) {
    console.log("errpr",error)
    throw error;
  }
};

export const fetchKeywordData = async (url, queryParams = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      params: queryParams
    });
    console.log("API Response:", response);
    return response?.data?.tasks; // Adjust this based on your actual API structure
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
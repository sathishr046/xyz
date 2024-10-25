import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// Create axios instances for different APIs
export const weatherAPI = axios.create({
  baseURL: API_CONFIG.WEATHER_BASE_URL,
  params: {
    appid: API_CONFIG.WEATHER_API_KEY,
    units: 'metric'
  }
});

// Add request interceptor
weatherAPI.interceptors.request.use(
  config => {
    // You can add loading states or headers here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
weatherAPI.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
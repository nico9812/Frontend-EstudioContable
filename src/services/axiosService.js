import { VITE_APP_API_URL } from '@/constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: VITE_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (Cookies.get('token') !== undefined) {
      config.headers['Authorization'] = 'Token ' + Cookies.get('token');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.data.error.message);
  }
);

export default axiosInstance;

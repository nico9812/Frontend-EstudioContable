import { VITE_APP_API_URL } from '@/constants';
import axios from 'axios';
import { store } from '@/redux/store';

const axiosInstance = axios.create({
  baseURL: VITE_APP_API_URL
});

axiosInstance.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error.data.error.message);
  }
);

export default axiosInstance;

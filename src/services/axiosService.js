import axios from 'axios'
import Cookies from "js-cookie"
import { VITE_APP_API_URL } from "src/constants";
console.log(VITE_APP_API_URL, 'asdasdasdasd')

const axiosService = axios.create({
    baseURL: VITE_APP_API_URL
})

axiosService.interceptors.request.use(
    config => {
        if (Cookies.get('token') !== undefined) {
            config.headers['Authorization'] = 'Token ' + Cookies.get('token');
        }

        return config;
    },
    error => {
        return Promise.reject(error.data.error.message);
    }
);

export default axiosService;
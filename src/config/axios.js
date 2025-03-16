import axios from 'axios';
import { constant } from './constant';

function getBaseUrl() {
  const host = window.location.hostname;
  if (host.includes('localhost')) return constant.BASE_URL_LOCAL;
  if (host.includes('192.168')) return constant.BASE_URL;

  return constant.BASE_URL;
}

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 60 * 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.setItem('isAuthenticated', false);
      window.location = '/login';
    }
    throw error;
  },
);

export default axiosInstance;

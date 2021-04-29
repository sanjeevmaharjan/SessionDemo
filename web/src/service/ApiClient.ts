import axios from 'axios';
import { getToken } from './TokenStorage';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
});

instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = token.raw;
  }

  return config;
});

export default instance;

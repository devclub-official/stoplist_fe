import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://10.10.98.71:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
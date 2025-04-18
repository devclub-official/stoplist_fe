import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://3.37.219.203:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
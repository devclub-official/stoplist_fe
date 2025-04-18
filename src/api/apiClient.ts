import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});
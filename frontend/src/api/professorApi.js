import axios from 'axios';

const professorApi = axios.create({
  baseURL: 'http://localhost:5004',  
  headers: {
    'Content-Type': 'application/json',
  }
});

professorApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default professorApi;

import axios from 'axios';

const profapi = axios.create({
  baseURL: 'http://localhost:5004', 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default profapi;

import axios from 'axios';

const studentApi = axios.create({
  baseURL: 'http://localhost:5003',  
  headers: {
    'Content-Type': 'application/json',
  }
});

export default studentApi;

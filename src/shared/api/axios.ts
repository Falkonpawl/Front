import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://forms-server-master-production.up.railway.app/', // Полный URL до API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
//api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Reemplaza esto con la URL de tu servidor API
});

export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambiar al dominio final en producción
});

export default API;
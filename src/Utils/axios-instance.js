import { getToken } from "../Services/auth.service.js";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

const clientAxios = axios.create({
  baseURL: baseURL,
});

/**
 * Instancia de axios que añade a la cabecera de las peticiones HTTP el JWT si existe
 */
clientAxios.interceptors.request.use((request) => {
  request.headers["Authorization"] = getToken();
  return request;
});

export default clientAxios;

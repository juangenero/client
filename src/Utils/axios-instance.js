import { getToken } from "../Controllers/auth.controller.js";
import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

/**
 * Instancia de axios que añade a la cabecera de las peticiones HTTP el JWT si existe
 */
clientAxios.interceptors.request.use((request) => {
  request.headers["Authorization"] = getToken();
  return request;
});

export default clientAxios;

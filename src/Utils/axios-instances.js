import { getToken, deleteToken } from "../Services/auth.service.js";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

// Instancia de axios
export const clientAxios = axios.create({
  baseURL: baseURL,
});

// Interceptor de la instancia "clientAxios" que añade a todas las cabeceras de las peticiones HTTP el JWT si existe
clientAxios.interceptors.request.use((request) => {
  request.headers["Authorization"] = getToken();
  return request;
});

// Interceptor de la instancia "clientAxios" que comprueba en cada respuesta si se ha recibido un código 403
clientAxios.interceptors.response.use(
  function (response) {
    // Si la respuesta es correcta, no  hace nada
    return response;
  },
  function (error) {

    // Si se ha recibido un código 403, significa que el token almacenado no existe, no es válido o ha expirado.
    if (error.response.status === 403) {
      deleteToken(); // Elimina el token
      window.location.reload(); // Recarga la página forzando el reinicio de la SPA.
    }
    return Promise.reject(error);
  }
);

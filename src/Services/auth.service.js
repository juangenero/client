import clientAxios from "../Utils/axios-instance.js";
import md5 from "md5";
import { decodeToken } from "react-jwt";

// Realiza una llamada a la API para la solicitud de inicio de sesión
export async function login(username, password) {
  return await clientAxios.post("/login", {
    username: username,
    password: password ? md5(password) : "", // Si se ha introducido una contraseña, la encripta
  });
}

// Elimina el local storage, actualiza el estado del usuario y redirige a la ruta principal
export function logout(setUser, navigate) {
  localStorage.clear();
  setUser({ id: null });
  navigate("/");
}

// Almacena el token en local storage
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Obtiene el token de local storage
export function getToken() {
  const token = localStorage.getItem("token");
  if (token) return token;
  return null;
}

// Decodifica el token de local storage
export function decodeJWT() {
  const token = getToken();
  let result = { id: null };
  if (token) result = decodeToken(token);
  return result;
}

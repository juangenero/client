import clientAxios from "../Utils/axios-instance.js";
import md5 from "md5";
import { decodeToken } from "react-jwt";

/**
 * Realiza una petición asíncrona de login al servidor (API)
 * @param {String} username Usuario introducido en el login
 * @param {String} password Contrasseña introducida en el login
 * @param {Function} navigate Método para redirigir en caso de autenticarse correctamente.
 * @param {Function} onHide Método para ocultar el modal de login en caso autenticarse correctamente.
 * @return mensaje de error o null si todo a ido bien (redirijiendo a Dashboard)
 */
export async function login(username, password, navigate, onHide, setUser) {
  let result = null;

  await clientAxios
    .post("/login", {
      username: username,
      password: password ? md5(password) : "", // Si se ha introducido una contraseña, la encripta
    })
    .then((res) => {
      // Si el servidor ha devuelto un token, lo almacena en localStorage
      if (res.data.token) {
        setToken(res.data.token);
        onHide();
        setUser(decodeJWT()); // Actualizo el estado del usuario para que tenga acceso a Dashboard
        navigate("/dashboard/pets"); // Redireccionar a Dashboard
      } else result = "ERROR LOGIN: " + res.data.error; // !!! Pendiente de cambiar y mostrarlo por pantalla
    })
    .catch((err) => {result = "Error en la petición de inicio de sesión ("+ err.code +")"});

    return result;
}

// Elimina el local store, actualiza el estado del usuario y redirige a la ruta principal
export function logout(setUser, navigate) {
  localStorage.clear();
  setUser({ id: null });
  navigate("/");
}

// Almacena el token en local store
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Obtiene el token de local store
export function getToken() {
  const token = localStorage.getItem("token");
  if (token) return token;
  return null;
}

// Decodifica el token de local store
export function decodeJWT() {
  const token = getToken();
  let result = { id: null };
  if (token) result = decodeToken(token);
  return result;
}

/**
 * Pregunta al servidor si el token sigue siendo válido, si lo es, devuelve true, si no lo es, lo elimina
 * de localStorage y devuelve false
 */
// export async function isLogged(setUser) {
//   await clientAxios
//     .post("/loginStatus")
//     .then((res) => {
//       // Si el token no existe o no es válido..
//       if (!res.data.result) {
//         logout();
//         setUser({ id: null });

//         // Si el token es válido..
//       } else {
//         setUser(decodeJWT()); // Se actualiza la información del usuario
//       }
//     })
//     .catch((err) => {
//       console.warn(err.message);
//     });
// }

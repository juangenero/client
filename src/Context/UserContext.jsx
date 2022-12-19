import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en la opción de usuarios
export const UserContext = createContext();

// Envoltorio para la opción de usuarios donde se usará el contexto definido anteriormente
export function UserContextProvider(props) {
  const [userDeleteModalShow, setUserDeleteModalShow] = useState(false); // Ventana modal para eliminar usuarios
  const [manageUser, setManageUser] = useState(null); // Datos del usuario que se está gestionando
  const [userIsLoading, setUserIsLoading] = useState(true); // Estado para comprobar cuando está cargando
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos obtenidos de la API.
  const [userError, setUserError] = useState(null); // Estado para almacenar los errores.

  return (
    <UserContext.Provider
      value={{
        userDeleteModalShow,
        setUserDeleteModalShow,
        manageUser,
        setManageUser,
        userIsLoading,
        setUserIsLoading,
        userData,
        setUserData,
        userError,
        setUserError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

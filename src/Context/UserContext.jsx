import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en la opción de usuarios
export const UserContext = createContext();

// Envoltorio para la opción de usuarios donde se usará el contexto definido anteriormente
export function UserContextProvider(props) {
  // ESTADOS (LISTA DE USUARIOS)
  const [userListDeleteModalShow, setUserListDeleteModalShow] = useState(false); // Visualización de la ventana modal para eliminar usuarios.
  const [userListIsLoading, setUserListIsLoading] = useState(true); // Estado para comprobar cuando está cargando la llamada a la API.
  const [userListData, setUserListData] = useState(null); // Estado para almacenar los datos obtenidos de la API.
  const [userListError, setUserListError] = useState(null); // Estado para almacenar los errores.

  // ESTADOS (REGISTRO DE USUARIOS)
  const [newUserModalShow, setNewUserModalShow] = useState(false); // Mostrar modal para crear un nuevo usuario.
  const [newUserIsLoading, setNewUserIsLoading] = useState(false); // Comprobar cuando está cargando la llamada a la API.
  const [newUserError, setNewUserError] = useState(null); // Mensaje para mostrar al usuario

  // ESTADOS (PERFIL DE USUARIO)
  const [userViewIsLoading, setUserViewIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [userViewData, setUserViewData] = useState(null); // Almacena los datos recibidos de la API.
  const [userViewError, setUserViewError] = useState(null); // Almacena posibles errores

  // ESTADOS (EDITAR USUARIO)
  // 1º llamada a la API, para rellenar el formulario
  const [userEditShowInfoIsLoading, setUserEditShowInfoIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [userEditShowInfoData, setUserEditShowInfoData] = useState(null); // Almacena los datos que se usa para el formulario
  const [userEditShowInfoError, setUserEditShowInfoError] = useState(null); // Almacena posibles errores
  // 2º llamada a la API, para enviar el formulario
  const [userEditSubmitInfoIsLoading, setUserEditSubmitInfoIsLoading] = useState(false); // Comprobar cuando está cargando la llamada a la API.
  const [userEditSubmitInfoMessage, setUserEditSubmitInfoMessage] = useState(null); // Almacenar resultado de la edición
  const [userEditSubmitInfoError, setUserEditSubmitInfoError] = useState(null); // Almacenar posibles errores

  // ESTADOS (ELIMINAR USUARIO)
  const [selectedUser, setSelectedUser] = useState(null); // Datos del usuario que se ha hecho click
  const [deleteWarningModalShow, setDeleteWarningModalShow] = useState(false); // Modal para avisar que no se puede eliminar el usuario.

  return (
    <UserContext.Provider
      value={{
        userListDeleteModalShow,
        setUserListDeleteModalShow,
        selectedUser,
        setSelectedUser,
        userListIsLoading,
        setUserListIsLoading,
        userListData,
        setUserListData,
        userListError,
        setUserListError,
        newUserIsLoading,
        setNewUserIsLoading,
        newUserError,
        setNewUserError,
        newUserModalShow,
        setNewUserModalShow,
        userEditShowInfoIsLoading,
        setUserEditShowInfoIsLoading,
        userEditShowInfoData,
        setUserEditShowInfoData,
        userEditShowInfoError,
        setUserEditShowInfoError,
        userEditSubmitInfoIsLoading,
        setUserEditSubmitInfoIsLoading,
        userEditSubmitInfoMessage,
        setUserEditSubmitInfoMessage,
        userEditSubmitInfoError,
        setUserEditSubmitInfoError,
        userViewIsLoading,
        setUserViewIsLoading,
        userViewData,
        setUserViewData,
        userViewError,
        setUserViewError,
        deleteWarningModalShow,
        setDeleteWarningModalShow,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

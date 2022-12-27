import React, { useEffect, useContext } from "react";
import { getAllUsers, resetUsers } from "../../../Services/users.service.js";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons.jsx";
import DeleteUserModal from "../../../Components/Modals/Users/DeleteUserModal.jsx";
import DeleteUserWarningModal from "../../../Components/Modals/Users/DeleteUserWarningModal.jsx";
import NewUserModal from "../../../Components/Modals/Users/NewUserModal";
import { UserContext } from "../../../Context/UserContext";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";

// Bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function UsersList() {
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  const { setNewUserModalShow } = useContext(UserContext);

  const {
    userListDeleteModalShow, // Boolean que indica que se muestra la ventana modal de eliminar usuario
    setUserListDeleteModalShow,
    setDeleteWarningModalShow,
    selectedUser, // Datos del usuario que se está gestionando (cuando se realizan acciones sobre el)
    setSelectedUser,
    userListIsLoading, // Boolean que indica si los usuarios han sido obtenidos desde la API
    setUserListIsLoading,
    userListData, // Datos de los usuarios obtenidos de la API
    setUserListData,
    userListError, // Errores obtenidos al solicitar los datos del usuario de la API
    setUserListError,

    // Para restablecer estados de userEdit en el botón de editar..
    setUserEditShowInfoIsLoading,
    setUserEditShowInfoData,
    setUserEditShowInfoError,
  } = useContext(UserContext);

  useEffect(() => {
    if (userListIsLoading) {
      // Llamada al método asíncrono
      getAllUsers()
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setUserListData(res.data); // Guardar datos en el estado
            setUserListIsLoading(false); // Cambiar el estado, puesto que ya tenemos los datos
          } else {
            setUserListError("Hubo un error al mostrar los usuarios."); // Almacenar error
            setUserListIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
          }
        })
        .catch(() => {
          setUserListError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserListIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
  }, [userListIsLoading]);

  // Si se ha producido un error, muestra el mensaje
  if (userListError) {
    return (
      <Error
        error={userListError}
        actions={() => {
          setUserListError(null);
          setUserListIsLoading(true);
        }}
      />
    );
  }

  // Cuando esté a la espera de la respuesta de la API, renderiza "Cargando..."
  if (userListIsLoading) {
    return <Loading />;
  }

  // Si no hay error ni está cargando, muestra los datos
  return (
    <>
      <div className="mb-2">
        <Button
          onClick={() => {
            setNewUserModalShow(true);
          }}
        >
          Nuevo usuario
        </Button>

        <Button
          className="mx-1"
          onClick={async () => {
            await resetUsers();
            setUserListError(null);
            setUserListIsLoading(true);
          }}
        >
          Reset data
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Fecha de alta</th>
            <th>Privilegios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userListData.map(
            (
              userListData // Recorro el array generando una fila por cada usuario
            ) => (
              <tr key={userListData.idUsuario}>
                <td>{userListData.idUsuario}</td>
                <td>{userListData.nombre}</td>
                <td>{userListData.apellidos}</td>
                <td>{userListData.email}</td>
                <td>{new Date(userListData.fechaAlta).toLocaleDateString()}</td>
                <td>{userListData.rolUsuario ? "Veterinario" : "Cliente"}</td>
                <td>
                  {
                    <Eye
                      action={() => {
                        setSelectedUser(userListData); // Guardar usuario seleccionado en el estado.
                        navigate("/dashboard/user/" + userListData.idUsuario); // Redirige a la página de edición usuario.
                      }}
                    />
                  }
                  {
                    <Pencil
                      action={() => {
                        setUserEditShowInfoIsLoading(true);
                        setUserEditShowInfoData(null);
                        setUserEditShowInfoError(null);
                        navigate("/dashboard/user/" + userListData.idUsuario + "/edit"); // Redirige a la página de edición usuario.
                      }}
                    />
                  }
                  {
                    // El usuario logueado no puede eliminar su propio usuario
                    user.id == userListData.idUsuario ? (
                      <Trash disabled={true} action={()=>{setDeleteWarningModalShow(true)}} /> 
                    ) : (
                      <Trash
                        action={() => {
                          setSelectedUser({ id: userListData.idUsuario, email: userListData.email });
                          setUserListDeleteModalShow(true);
                        }}
                      />
                    )
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      {/** Ventanas modales (Se inician en oculto) */}
      <DeleteUserModal />
      <DeleteUserWarningModal />
      <NewUserModal />
    </>
  );
}

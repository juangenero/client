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

  const {
    setNewUserModalShow, // Mostrar modal registro usuarios
    setDeleteWarningModalShow, // Mostrar DeleteUserWarningModal
    setUserDeleteModalShow, // Mostrar DeleteUserModal
    setSelectedUser, // Pasar datos a deleteUserModal

    userListIsLoading, // Cargando
    setUserListIsLoading,
    userListData, // Datos
    setUserListData,
    userListError, // Errores
    setUserListError,
  } = useContext(UserContext);

  useEffect(() => {
    if (userListIsLoading) {
      getAllUsers()
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setUserListData(res.data); // Guardar datos
          } else {
            setUserListError("Hubo un error al mostrar los usuarios."); // Guardar error
          }

          setUserListIsLoading(false); // Cambiar estado, ya tenemos los datos o el error
        })
        .catch(() => {
          setUserListError("Hubo un error al realizar la solicitud."); // Guardar error
          setUserListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
  }, [userListIsLoading]);

  // Si se ha producido un error, muestra el mensaje
  if (userListError) {
    return (
      <Error
        error={userListError}
        actions={() => {
          navigate("/dashboard/users");
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
                        navigate("/dashboard/users/" + userListData.idUsuario); // Redirige a la página de edición usuario.
                      }}
                    />
                  }
                  {
                    <Pencil
                      action={() => {
                        navigate("/dashboard/users/" + userListData.idUsuario + "/edit"); // Redirige a la página de edición usuario.
                      }}
                    />
                  }
                  {
                    // Mostrar un icono u otro dependiendo de si se trata del usuario autenticado
                    user.id == userListData.idUsuario ? (
                      <Trash
                        disabled={true}
                        action={() => {
                          setDeleteWarningModalShow(true);
                        }}
                      />
                    ) : (
                      <Trash
                        action={() => {
                          setSelectedUser({
                            id: userListData.idUsuario,
                            email: userListData.email,
                          });
                          setUserDeleteModalShow(true);
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
      <NewUserModal />
      <DeleteUserModal />
      <DeleteUserWarningModal />
    </>
  );
}

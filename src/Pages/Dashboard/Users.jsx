import React, { useEffect, useContext } from "react";
import { getUsers, resetUsers, reloadUsers } from "../../Services/users.service.js";
import { Eye, Pencil, Trash } from "../../Components/Utils/Icons.jsx";
import DeleteUserModal from "../../Components/Modals/DeleteUserModal.jsx";
import { UserContext } from "../../Context/UserContext";

// Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function Users() {

  const {
    userDeleteModalShow, // Boolean que indica que se muestra la ventana modal de eliminar usuario
    setUserDeleteModalShow,
    manageUser, // Datos del usuario que se está gestionando (cuando se realizan acciones sobre el)
    setManageUser,
    userIsLoading, // Boolean que indica si los usuarios han sido obtenidos desde la API
    setUserIsLoading,
    userData, // Datos de los usuarios obtenidos de la API
    setUserData,
    userError, // Errores obtenidos al solicitar los datos del usuario de la API
    setUserError,
  } = useContext(UserContext);

  useEffect(() => {
    if (userIsLoading) {
      // Llamada al método asíncrono
      getUsers()
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setUserData(res.data); // Guardar datos en el estado
            setUserIsLoading(false); // Cambiar el estado, puesto que ya tenemos los datos
          } else {
            setUserError("Hubo un error al mostrar los usuarios."); // Almacenar error
            setUserIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
          }
        })
        .catch(() => {
          setUserError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
  }, [userIsLoading]);

  // Si se ha producido un error, muestra el mensaje
  if (userError) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Alert variant="danger">{userError}</Alert>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="warning" onClick={() => reloadUsers(setUserError, setUserIsLoading)}>
            Reintentar
          </Button>
        </div>
      </>
    );
  }

  // Cuando esté a la espera de la respuesta de la API, renderiza "Cargando..."
  if (userIsLoading) {
    return (
      <>
        <br />
        <div className="d-flex justify-content-center">
          <h1>
            Cargand
            <Spinner animation="border" variant="dark" />
            ...
          </h1>
        </div>
        <br />
      </>
    );
  }

  // Si no hay error ni está cargando, muestra los datos
  return (
    <>
      <div className="mb-2">
        <Button
          onClick={() => {
            alert("Creando usuario..");
          }}
        >
          Nuevo usuario
        </Button>

        <Button
          className="mx-1"
          onClick={async () => {
            await resetUsers();
            reloadUsers(setUserError, setUserIsLoading);
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
          {userData.map((user) => (
            <tr key={user.idUsuario}>
              <td>{user.idUsuario}</td>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.email}</td>
              <td>{user.fechaAlta}</td>
              <td>{user.rolUsuario ? "Veterinario" : "Cliente"}</td>
              <td>
                {
                  <Eye
                    action={() => {
                      alert("Mostrando usuario con ID " + user.idUsuario);
                    }}
                  />
                }
                {
                  <Pencil
                    action={() => {
                      alert("Editando usuario con ID " + user.idUsuario);
                    }}
                  />
                }
                {
                  <Trash
                    action={() => {
                      setManageUser({ id: user.idUsuario, email: user.email });
                      setUserDeleteModalShow(true);
                    }}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/** Ventanas modales (Se inician en oculto) */}
      <DeleteUserModal />
    </>
  );
}

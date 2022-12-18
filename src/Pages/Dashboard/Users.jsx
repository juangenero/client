import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, resetUsers, reloadUsers } from "../../Services/users.service.js";
import { Eye, Pencil, Trash } from "../../Components/Utils/Icons.jsx";

// Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true); // Estado para comprobar cuando está cargando
  const [data, setData] = useState(null); // Estado para almacenar los datos obtenidos de la API.
  const [error, setError] = useState(null); // Estado para almacenar los errores.

  useEffect(() => {
    if (isLoading) {
      // Llamada al método asíncrono
      getUsers()
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setData(res.data); // Guardar datos en el estado
            setIsLoading(false); // Cambiar el estado, puesto que ya tenemos los datos
          } else {
            setError("Hubo un error al mostrar los usuarios."); // Almacenar error
            setIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
          }
        })
        .catch(() => {
          setError("Hubo un error al realizar la solicitud."); // Almacenar error
          setIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
  }, [isLoading]);

  // Si se ha producido un error, muestra el mensaje
  if (error) {
    return (
      <>
        {console.log("render error")}
        <div className="d-flex justify-content-center">
          <Alert variant="danger">{error}</Alert>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="warning" onClick={() => reloadUsers(setError, setIsLoading)}>
            Reintentar
          </Button>
        </div>
      </>
    );
  }

  // Cuando esté a la espera de la respuesta de la API, renderiza "Cargando..."
  if (isLoading) {
    return (
      <>
        {console.log("render cargando...")}
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
            reloadUsers(setError, setIsLoading);
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
          {data.map((user) => (
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
                    action={async () => {
                      await deleteUser(user.idUsuario);
                      reloadUsers(setError, setIsLoading);
                    }}
                  />
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

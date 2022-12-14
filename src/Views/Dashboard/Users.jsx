// Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import React, { useEffect, useState } from "react";
import { getUsers } from "../../Controllers/users.controller.js";
import { Eye, Pencil, Trash } from "../../Components/Utils/Icons.jsx";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true); // Estado para comprobar cuando está cargando
  const [data, setData] = useState(null); // Estado para almacenar los datos de la API.
  const [error, setError] = useState(null); // Estado para almacenar un posible error.

  useEffect(() => {
    // Llamada al método asíncrono
    getUsers()
      .then((res) => {
        // Si la petición se ha ejecutado correctamente
        if (res.statusText === "OK") {
          setData(res.data); // Guardar datos en el estado
          console.log(res.data[0]);

          // Uso setTimeout para que se aprecie el componente "cargando", sólo lo usaré en el menú "Usuarios"
          setTimeout(() => {
            setIsLoading(false); // Cambiar el estado, puesto que ya tenemos los datos
          }, 1000);
        } else {
          setTimeout(() => {
            setIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
          }, 1000);

          setError("Hubo un error al obtener los datos.");
        }
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        }, 1000);

        setError("Hubo un error al realizar la solicitud.");
      });
  }, []);

  // Cuando esté a la espera de la respuesta de la API, renderiza "Cargando..."
  if (isLoading) {
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

  // Si se ha producido un error, muestra el mensaje
  if (error) {
    return (
      <>
        <br />
        <div className="d-flex justify-content-center">
          <Alert variant="danger" className="d-flex justify-content-center w-25">
            {error}
          </Alert>
        </div>
        <br />
      </>
    );
  }

  // Si no hay error ni está cargando, muestra los datos
  return (
    <div>
      <Button className="mt-2 mb-2" onClick={()=>{alert("Crenado usuario..")}}>Nuevo usuario</Button>
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
            <tr>
              <td>{user.idUsuario}</td>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.email}</td>
              <td>{user.fechaAlta}</td>
              <td>{user.rolUsuario ? "Veterinario" : "Cliente"}</td>
              <td>
                {<Eye action={()=>{alert("Visualizando usuario..")}}/>} 
                {<Pencil action={()=>{alert("Editando usuario..")}}/>}
                {<Trash action={()=>{alert("Eliminando usuario..")}}/>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

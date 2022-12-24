import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { getUser } from "../../Services/users.service.js";
import { Container, Row, Col, Image, Stack, Spinner, Form, Button } from "react-bootstrap";

/**
 *
 * @param {Boolean} edit "0" si debe renderizar los datos del usuario para mostarlos, "1" si renderiza el
 * formulario de edición.
 * @returns Componente para visualizar o editar datos del usuario
 */
function UserPage({ edit }) {
  const navigate = useNavigate();
  const { idUser } = useParams(); // ID del usuario en la URL

  // Estados para obtener los datos del usuario
  const {
    userPageIsLoading, // Boolean que indica si los usuarios han sido obtenidos desde la API
    setUserPageIsLoading,
    userPageData, // Datos de los usuarios obtenidos de la API
    setUserPageData,
    userPageError, // Errores obtenidos al solicitar los datos del usuario de la API
    setUserPageError,
  } = useContext(UserContext);

  useEffect(() => {
    if (userPageIsLoading) {
      // Llamada al método asíncrono
      getUser(idUser)
        .then((res) => {
          console.log(res);
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            // Si el usuario ha sido encontrado en la BD
            if (!res.data.error) {
              setUserPageData(res.data); // Guardar datos en el estado
            } else {
              setUserPageError("Usuario no encontrado."); // Almacenar error
            }
          } else {
            setUserPageError("Hubo un error al mostrar los datos del usuario."); // Almacenar error
          }

          setUserPageIsLoading(false); // Cambiar el estado, ya tenemos los datos o el mensaje de error
        })
        .catch(() => {
          setUserPageError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserPageIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
  }, [userPageIsLoading]);

  if (userPageError) {
    console.log("Render error");
    return <h1>{userPageError}</h1>;
  }

  if (userPageIsLoading) {
    console.log("Render loading");
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

  // Mostrar datos
  if (!edit) {
    console.log("Render datos");
    return (
      <>
        <Button onClick={() => navigate("/dashboard/user/" + idUser + "/edit")}>Editar</Button>

        <Stack direction="horizontal" gap="4">
          <Image
            className="border"
            width="250px"
            src={"https://xsgames.co/randomusers/avatar.php?g=male"}
            roundedCircle
          />

          <Container className="fs-5">
            <Row>
              <Col>ID:</Col>
              <Col>{userPageData.idUsuario}</Col>
            </Row>
            <Row>
              <Col>Nombre:</Col>
              <Col>{userPageData.nombre + " " + userPageData.apellidos}</Col>
            </Row>
            <Row>
              <Col>DNI:</Col>
              <Col>{userPageData.dni}</Col>
            </Row>
            <Row>
              <Col>Teléfono:</Col>
              <Col>{userPageData.telefono}</Col>
            </Row>
            <Row>
              <Col>Email:</Col>
              <Col>{userPageData.email}</Col>
            </Row>
            <Row>
              <Col>Localidad:</Col>
              <Col>{userPageData.localidad}</Col>
            </Row>
            <Row>
              <Col>Provincia:</Col>
              <Col>{userPageData.provincia}</Col>
            </Row>
            <Row>
              <Col>Código postal:</Col>
              <Col>{userPageData.cPostal}</Col>
            </Row>
            <Row>
              <Col>Fecha alta:</Col>
              <Col>{userPageData.fechaAlta}</Col>
            </Row>
            <Row>
              <Col>Fecha nacimiento:</Col>
              <Col>{userPageData.fechaNacimiento}</Col>
            </Row>
            <Row>
              <Col>Tipo de usuario:</Col>
              <Col>{userPageData.rolUsuario ? "Veterinario" : "Cliente"}</Col>
            </Row>
          </Container>
        </Stack>
      </>
    );

    // Formulario de edición, los campos idUsuario, fechaAlta y rolUsuario no se permiten editarlos
  } else {
    console.log("Render edit datos");
    return (
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="idUsuario">
                <Form.Label>ID usuario</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.idUsuario} disabled />
              </Form.Group>

              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.nombre} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.email} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="tel" defaultValue={userPageData.telefono} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="localidad">
                <Form.Label>Localidad</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.localidad} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="cPostal">
                <Form.Label>Código postal</Form.Label>
                <Form.Control type="number" defaultValue={userPageData.cPostal} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="contraseña">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Cambiar contraseña actual" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="apellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.apellidos} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="dni">
                <Form.Label>Dni</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.dni} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="fechaNacimiento">
                <Form.Label>Fecha nacimiento</Form.Label>
                <Form.Control type="date" defaultValue={userPageData.fechaNacimiento} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control type="text" defaultValue={userPageData.provincia} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="imagen">
                <Form.Label>Imagen del perfil</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="success" type="submit" className="mt-3">
            Editar
          </Button>
          <Button
            variant="danger"
            className="mx-3 mt-3"
            onClick={() => {
              navigate("/dashboard/users");
            }}
          >
            Cancelar
          </Button>
        </Container>
      </Form>
    );
  }
}

export default UserPage;

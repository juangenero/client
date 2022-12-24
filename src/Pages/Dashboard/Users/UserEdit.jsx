import { UserContext } from "../../../Context/UserContext";

import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../Services/users.service.js";
import { Container, Row, Col, Image, Stack, Spinner, Form, Button } from "react-bootstrap";

function UserEdit() {
  const navigate = useNavigate();
  const { idUser } = useParams(); // ID del usuario en la URL

  const {
    // Estados para editar los datos del usuario
    userEditIsLoading, // Boolean que indica si se ha pulsado el botón de aceptar
    setUserEditIsLoading,
    userEditData,
    setUserEditData,
    userEditError, // Estado para almacenar el mensaje de error.
    setUserEditError,
    manageUser, // Pasar el usuario seleccionado desde la lista de usuarios
  } = useContext(UserContext);

  // Gestionar la llamada a la API de edición de usuarios.
  useEffect(() => {
    if (userEditIsLoading) {
      console.log("UserPage - edit");
    }
  }, [userEditIsLoading]);

  return (
    <Form>
      {console.log("userViewData", manageUser)}
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="idUsuario">
              <Form.Label>ID usuario</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.idUsuario} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.nombre} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" defaultValue={manageUser.telefono} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="localidad">
              <Form.Label>Localidad</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.localidad} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="cPostal">
              <Form.Label>Código postal</Form.Label>
              <Form.Control type="number" defaultValue={manageUser.cPostal} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="contraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Cambiar contraseña actual" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.apellidos} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dni">
              <Form.Label>Dni</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.dni} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fechaNacimiento">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control type="date" defaultValue={manageUser.fechaNacimiento} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="provincia">
              <Form.Label>Provincia</Form.Label>
              <Form.Control type="text" defaultValue={manageUser.provincia} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imagen">
              <Form.Label>Imagen del perfil</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit" className="mt-2" onClick={null}>
          Editar
        </Button>
        <Button
          variant="danger"
          className="mx-2 mt-2"
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

export default UserEdit;

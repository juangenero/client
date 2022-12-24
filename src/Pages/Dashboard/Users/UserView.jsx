import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import { Container, Row, Col, Image, Stack, Button } from "react-bootstrap";

function UserPage() {
  const navigate = useNavigate();
  const { idUser } = useParams(); // ID del usuario en la URL
  const { manageUser, setManageUser } = useContext(UserContext); // Mantengo los datos del usuario seleccionado en la lista de usuarios

  return (
    <>
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
            <Col>{manageUser.idUsuario}</Col>
          </Row>
          <Row>
            <Col>Nombre:</Col>
            <Col>{manageUser.nombre + " " + manageUser.apellidos}</Col>
          </Row>
          <Row>
            <Col>DNI:</Col>
            <Col>{manageUser.dni}</Col>
          </Row>
          <Row>
            <Col>Teléfono:</Col>
            <Col>{manageUser.telefono}</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>{manageUser.email}</Col>
          </Row>
          <Row>
            <Col>Localidad:</Col>
            <Col>{manageUser.localidad}</Col>
          </Row>
          <Row>
            <Col>Provincia:</Col>
            <Col>{manageUser.provincia}</Col>
          </Row>
          <Row>
            <Col>Código postal:</Col>
            <Col>{manageUser.cPostal}</Col>
          </Row>
          <Row>
            <Col>Fecha alta:</Col>
            <Col>{manageUser.fechaAlta}</Col>
          </Row>
          <Row>
            <Col>Fecha nacimiento:</Col>
            <Col>{manageUser.fechaNacimiento}</Col>
          </Row>
          <Row>
            <Col>Tipo de usuario:</Col>
            <Col>{manageUser.rolUsuario ? "Veterinario" : "Cliente"}</Col>
          </Row>
        </Container>
      </Stack>
      <Button
        onClick={() => {
          navigate("/dashboard/user/" + idUser + "/edit");
        }}
      >
        Editar
      </Button>
    </>
  );
}

export default UserPage;

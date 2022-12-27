import {
  Modal,
  Form,
  FloatingLabel,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { newUser } from "../../../Services/users.service.js";
import { UserContext } from "../../../Context/UserContext"; // Contexto de los usuarios

export default function LoginModal(props) {
  const navigate = useNavigate(); // Método para redirigir a otra ruta

  const {
    newUserModalShow,
    setNewUserModalShow,
    newUserIsLoading,
    setNewUserIsLoading,
    newUserError,
    setNewUserError,
  } = useContext(UserContext);

  useEffect(() => {
    if (newUserIsLoading) {
      newUser();
    }
  }, [newUserIsLoading]);

  // Efecto para resetear el formulario cuando se oculta
  useEffect(() => {
    if (!newUserModalShow) {
      setNewUserError(null);
      setNewUserIsLoading(false);
    }
  }, [newUserModalShow]);

  return (
    <Modal
      show={newUserModalShow}
      onHide={() => setNewUserModalShow(false)}
      backdrop="static"
      keyboard={false}
      size={"lg"}
    >
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Nuevo usuario</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Container>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="localidad">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cPostal">
                  <Form.Label>Código postal</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rol">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Select>
                    <option value={0} defaultChecked>Cliente</option>
                    <option value={1}>Veterinario</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="contraseña">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="apellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dni">
                  <Form.Label>Dni</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fechaNacimiento">
                  <Form.Label>Fecha nacimiento</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="provincia">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="imagen">
                  <Form.Label>Imagen del perfil</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/** Mensaje de error */}
          {0 ? <Alert variant="danger">mensaje</Alert> : null}

          {/** Botones del formulario de Login */}
          {newUserIsLoading ? (
            <Button variant="success" className="me-2" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button type="submit" variant="success" className="me-2">
              Aceptar
            </Button>
          )}
          <Button onClick={() => setNewUserModalShow(false)} variant="danger" className="me-2">
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Funcionalidad del botón de "Aceptar" cuando se hace login
  function handleSubmit(event) {
    event.preventDefault();
    setNewUserIsLoading(true);
  }
}

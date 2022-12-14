import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../Controllers/auth.controller.js";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext.jsx";

export default function LoginModal(props) {
  const [username, setUsername] = useState(""); // Estado del campo usuario
  const [password, setPassword] = useState(""); // Estado del campo contraseña
  const navigate = useNavigate(); // Método para redirigir a otra ruta
  const { setUser } = useContext(AppContext);

  return (
    <Modal {...props} size="ls">
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Iniciar sesión</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event, navigate, props.onHide, setUser)}>
          <FloatingLabel controlId="username" label="Usuario" className="mb-3">
            <Form.Control
              type="text"
              placeholder="#"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="Contraseña" className="mb-3">
            <Form.Control
              type="password"
              placeholder="#"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FloatingLabel>

          <Button type="submit" variant="success" className="me-2">
            Aceptar
          </Button>
          <Button onClick={props.onHide} variant="danger" className="me-2">
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Funcionalidad del botón de "Aceptar" cuando se hace login
  function handleSubmit(event, navigate, onHide, setUser) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Enviar petición de login a la API
    login(username, password, navigate, onHide, setUser);
  }
}

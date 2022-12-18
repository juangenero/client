import { Modal, Form, FloatingLabel, Button, Spinner } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/auth.service.js";

import { AppContext } from "../../Context/AppContext.jsx"; // Contexto de la aplicación
import { useEffect } from "react";

export default function LoginModal(props) {
  const { setUser } = useContext(AppContext); // Estado del usuario
  const [username, setUsername] = useState(""); // Estado del campo usuario
  const [password, setPassword] = useState(""); // Estado del campo contraseña

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Estado del error al hacer login

  const navigate = useNavigate(); // Método para redirigir a otra ruta

  useEffect(() => {
    if(isLoading){
      
    }
  })

  return (
    <Modal {...props}>
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

          {/** Botones del formulario de Login */}
          {isLoading ? (
            <Button variant="success" className="me-2" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button type="submit" variant="success" className="me-2">
              Aceptar
            </Button>
          )}
          <Button onClick={props.onHide} variant="danger" className="me-2">
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Funcionalidad del botón de "Aceptar" cuando se hace login
  async function handleSubmit(event, navigate, onHide, setUser) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Enviar petición de login a la API
    const msgLogin = await login(username, password, navigate, onHide, setUser);
  }
}

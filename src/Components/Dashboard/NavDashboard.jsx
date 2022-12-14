import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import { logout } from "../../Controllers/auth.controller.js";

/**
 * El menú de navegación se renderiza de forma condicional según el usuario que haya iniciado sesión.
 */
function NavDashboard() {
  const { user, setUser } = useContext(AppContext); // Estado del usuario
  const navigate = useNavigate(); // Para redirigir en la opción de cerrar sesión.

  return (
    <Navbar fixed="right">
      <Container>
        <Nav>
          {user.rol ? (
            <Nav.Link as={Link} to="users" className="text-white">
              Usuarios
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="profile" className="text-white">
              Perfil
            </Nav.Link>
          )}

          <Nav.Link as={Link} to="pets" className="text-white">
            Mascotas
          </Nav.Link>

          <Nav.Link as={Link} to="consults" className="text-white">
            Consultas
          </Nav.Link>

          {user.rol ? (
            <Nav.Link as={Link} to="vaccines" className="text-white">
              Vacunas
            </Nav.Link>
          ) : undefined}

          <Nav.Link onClick={() => logout(setUser, navigate)} className="text-white">
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavDashboard;

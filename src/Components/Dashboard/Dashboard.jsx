import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { Routes, Route, Link, Outlet, useNavigate, redirect, Navigate } from "react-router-dom";
import { Container, Nav, Navbar, Col, Row } from "react-bootstrap";
import NavDashboard from "./NavDashboard";

// Contenido de las rutas
import Users from "../../Views/Dashboard/Users";

export function Dashboard() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Container>
      {/** Navegación del Dashboard */}
      <Row>
        <Col className="bg-secondary rounded bg-gradient">
          <NavDashboard />
        </Col>
      </Row>

      {/**
       * Contenido del dashboard:
       * 
       * Esta sección indica que componente se va a renderizar cuando se visite X ruta.
       * 
       * Las rutas "profile", "users" y "vaccines" sólo renderizarán el componente si el rol tiene permisos 
       * para visualizarlo.
       * 
       * Las rutas "pets" y "consults" son comunes a los 2 roles, renderizan el mismo componente, aunque 
       * dependiendo del rol, tendrán una funcionalidad distinta.
       * 
       */}
      <Row>
        <Col className="flex-column justify-items-center bg-light  rounded">
          <Routes>
            {user.rol ? null : <Route path="/profile" element={<h1>Perfil</h1>} /> }
            {user.rol ? <Route path="/users" element={<Users />} /> : null}
            <Route path="/pets" element={<h1>Mascotas</h1>} />
            <Route path="/consults" element={<h1>Consultas</h1>} />
            {user.rol ? <Route path="/vaccines" element={<h1>Vacunas</h1>} /> : null}
            <Route path="*" element={<Navigate replace to="/dashboard/pets" />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

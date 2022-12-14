import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavFrontPage() {
  return (
    <Navbar fixed="right">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>
          <Nav.Link as={Link} to="/services">
            Servicios
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contacto
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

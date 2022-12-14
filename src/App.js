// Bootstrap (Grid)
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Componentes del Header
import NavFrontPage from "./Components/Header/NavFrontPage";
import Footer from "./Components/Footer/Footer";
import PrivateArea from "./Components/Header/PrivateArea/PrivateArea";
import Logo from "./Components/Header/Logo";

// Contenido de las rutas
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "../src/Views/FrontPage/Home";
import Services from "../src/Views/FrontPage/Services";
import Contact from "../src/Views/FrontPage/Contact";
import { Dashboard } from "../src/Components/Dashboard/Dashboard";

// Contexto (estados globales)
import { AppContext } from "./Context/AppContext";
import { useContext, useEffect } from "react";

// Utils para el useEffect
import { logout } from "./Controllers/auth.controller.js";
import { useLocation } from "react-router-dom";

function App() {
  const { user, setUser } = useContext(AppContext);
  //const navigate = useNavigate();

  useEffect(() => {
    //isLogged(setUser);
    console.log("Usuario logueado: ")
    console.log(user)
    //window.addEventListener("storage", logout(setUser, navigate))
    //return window.removeEventListener("storage", logout(setUser, navigate));
  }, [user]);

  return (
    <Container>
      {/** HEADER */}
      <Row>
        <Col className="d-flex justify-content-center">
          <Logo />
        </Col>

        <Col className="d-flex align-items-center justify-content-center">
          <NavFrontPage />
        </Col>

        <Col className="d-flex align-items-center justify-content-center">
          <PrivateArea />
        </Col>
      </Row>

      {/** Contenido del la página de inicio */}
      <Row>
        <Col>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/** Renderizado condicional para Dashboard, sólo los usuarios podrán acceder */}
            <Route
              path="/dashboard/*"
              element={user.id ? <Dashboard /> : <Navigate replace to="/" />}
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Col>
      </Row>

      {/** FOOTER */}
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

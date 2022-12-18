import Button from "react-bootstrap/Button";
import LoginModal from "../Modals/LoginModal"; // Componente login con el modal
import { useState } from "react"; // Hook de react para el estado del modal
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

export default function PrivateArea() {
  const [modalShow, setModalShow] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {
        // Renderizado condicional del botón, depende de si el usuario está logueado
        user.id ? (
          <Button variant="primary" onClick={() => navigate("/dashboard/pets")}>
            Área personal
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Login
          </Button>
        )
      }
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

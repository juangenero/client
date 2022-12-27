import { UserContext } from "../../../Context/UserContext";

import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../../../Services/users.service.js";
import { Container, Row, Col, Alert, Stack, Spinner, Form, Button } from "react-bootstrap";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import md5 from "md5";

function UserEdit() {
  const navigate = useNavigate();
  const { idUser } = useParams(); // ID del usuario en la URL

  // Estado (local del componente) para almacenar los valores introducidos en el formulario
  const [payLoad, setPayLoad] = useState(null);

  const {
    // Estados para cargar el usuario en el formulario
    userEditShowInfoIsLoading, // Cargar datos formulario
    setUserEditShowInfoIsLoading,
    userEditShowInfoData, // Datos formulario
    setUserEditShowInfoData,
    userEditShowInfoError, // Errores datos formulario
    setUserEditShowInfoError,

    // Estados para editar los datos del usuario
    userEditSubmitInfoIsLoading, // Cargar datos botón submit
    setUserEditSubmitInfoIsLoading,
    userEditSubmitInfoMessage, // Resultado de intentar editar el usuario
    setUserEditSubmitInfoMessage,
    userEditSubmitInfoError, // Mensaje de error de intentar editar el usuario
    setUserEditSubmitInfoError,
  } = useContext(UserContext);

  // Cargar datos en el formulario de edición
  useEffect(() => {
    if (userEditShowInfoIsLoading) {
      // Llamada al método asíncrono
      getUser(idUser)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setUserEditShowInfoData(res.data); // Guardar datos en el estado
            if (res.data.error) {
              setUserEditShowInfoError(res.data.error); // Almacenar error enviado por la API.
            }
          } else {
            setUserEditShowInfoError("Hubo un error al mostrar los usuarios."); // Almacenar error
          }

          setUserEditShowInfoIsLoading(false); // Cambiar el estado, ya tenemos los datos o el mensaje de error.
        })
        .catch(() => {
          setUserEditShowInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserEditShowInfoIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });

      // Borrar mensajes de error de la edición de usuarios.
      setUserEditSubmitInfoMessage(null);
      setUserEditSubmitInfoError(null);
    }
  }, [userEditShowInfoIsLoading]);

  // Enviar datos al servidor
  useEffect(() => {
    if (userEditSubmitInfoIsLoading) {
      editUser(payLoad)
        .then((res) => {
          // Si se ha editado el registro, almacena el un mensaje indicándolo
          if (res.data.affectedRows && res.data.affectedRows > 0) {
            setUserEditSubmitInfoMessage("Usuario editado correctamente");

            // Si no se ha editado, comprueba el motivo
          } else {
            // Si la API ha devuelto errores..
            if (res.data.error) {
              if (res.data.error.email && res.data.error.email === "duplicate")
                setUserEditSubmitInfoError("El email introducido ya existe en otro usuario.");
              if (res.data.error.dni && res.data.error.dni === "duplicate")
                setUserEditSubmitInfoError("El dni introducido ya existe en otro usuario.");
              if (res.data.error.telephone && res.data.error.telephone === "duplicate")
                setUserEditSubmitInfoError("El teléfono introducido ya existe en otro usuario.");
            }
          }
          setUserEditSubmitInfoIsLoading(false);
        })
        .catch((err) => {
          setUserEditSubmitInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserEditSubmitInfoIsLoading(false);
        });
    }
  }, [userEditSubmitInfoIsLoading]);

  // Si está cargando (llamada a la API para cargar datos en el formulario)
  if (userEditShowInfoIsLoading) {
    return <Loading />;
  }

  // Si hay errores (llamada a la API para cargar datos en el formulario)
  if (userEditShowInfoError) {
    return (
      <Error
        error={userEditShowInfoError}
        actions={() => {
          setUserEditShowInfoIsLoading(true);
          setUserEditShowInfoError(null);
        }}
      />
    );
  }

  // Formulario de edición
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Container>
        {/** Respuesta de la API (Usuario editado) */}
        {userEditSubmitInfoMessage ? (
          <Alert variant="success">{userEditSubmitInfoMessage}</Alert>
        ) : null}
        {/** Respuesta de la API (Errores) */}
        {userEditSubmitInfoError ? <Alert variant="danger">{userEditSubmitInfoError}</Alert> : null}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID usuario</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.idUsuario} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="No rellenar si desea mantener la contraseña"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.nombre} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.apellidos} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="dni">
              <Form.Label>Dni</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.dni} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="telephone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="te" defaultValue={userEditShowInfoData.telefono} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.email} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Localidad</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.localidad} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Provincia</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.provincia} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Código postal</Form.Label>
              <Form.Control type="number" defaultValue={userEditShowInfoData.cPostal} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control type="date" defaultValue={userEditShowInfoData.fechaNacimiento} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen del perfil</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
        </Row>

        {/** Botón editar */}
        {userEditSubmitInfoIsLoading ? (
          <Button variant="success" className="mt-2" disabled>
            <Spinner animation="grow" size="sm" />
            Editar
          </Button>
        ) : (
          <Button type="submit" variant="success" className="mt-2">
            Editar
          </Button>
        )}

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

  // Función del botón "Editar"
  function handleSubmit(event) {
    event.preventDefault();

    // Construir el JSON para enviarlo al servidor
    setPayLoad({
      id: event.target.id.value,
      password: event.target.password.value.length > 0 ? md5(event.target.password.value) : "", // Si hay contraseña, la encripta
      name: event.target.name.value,
      lastName: event.target.lastName.value,
      dni: event.target.dni.value,
      telephone: event.target.telephone.value,
      email: event.target.email.value,
      location: event.target.location.value,
      province: event.target.province.value,
      postalCode: event.target.postalCode.value,
      dateOfBirth: event.target.dateOfBirth.value,
    });

    setUserEditSubmitInfoError(null); // Restablece el estado de error
    setUserEditSubmitInfoMessage(null); // Restablece el estado del mensaje

    setUserEditSubmitInfoIsLoading(true); // Estado "cargando" de la segunda llamada a la API para editar el usuario
  }
}

export default UserEdit;

import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetsContext } from "../../../Context/PetsContext";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { getPetById } from "../../../Services/pets.service.js";
import { Col, Container, Row, Stack } from "react-bootstrap";
import defaultPetAvatar from "../../../Img/defaultPetAvatar.png";

function PetsView() {
  const idPet = useParams().idPet;
  const navigate = useNavigate();

  const {
    petsViewIsLoading,
    setPetsViewIsLoading,
    petsViewData,
    setPetsViewData,
    petsViewError,
    setPetsViewError,
  } = useContext(PetsContext);

  useEffect(() => {
    if (petsViewIsLoading) {
      getPetById(idPet)
        .then((res) => {
          if (res.status === 200) {
            if (!res.data.error) {
              setPetsViewData(res.data);
            } else {
              setPetsViewError(res.data.error);
            }
          }
          setPetsViewIsLoading(false);
        })
        .catch((err) => {
          setPetsViewError("Hubo un error al realizar la solicitud."); // Guardar error
          setPetsViewIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsViewIsLoading]);

  if (petsViewIsLoading) {
    return <Loading />;
  }

  if (petsViewError) {
    return (
      <Error
        error={petsViewError}
        actions={() => {
          navigate("/dashboard/pets/" + idPet);
        }}
      />
    );
  }

  return (
    <>
      <Container>
        <Row>
          {/** Datos de la mascota */}
          <Col className="border mx-1 mb-1">
            <Container>
                <Row>
                    <Col>
                        <Stack>
                            <div>ID Mascota: {petsViewData.idMascota}</div>
                            <div>Nombre: {petsViewData.nombre}</div>
                            <div>Dueño: {petsViewData.dueno}</div>
                            <div>Especie: {petsViewData.especie}</div>
                            <div>Raza: {petsViewData.raza}</div>
                            <div>Fecha de alta: {new Date(petsViewData.fechaAlta).toLocaleDateString()}</div>
                            <div>Fecha de nacimiento: {new Date(petsViewData.fechaNacimiento).toLocaleDateString()}</div>
                            <div>altura: {petsViewData.altura}</div>
                            <div>Comentarios: {petsViewData.Comentarios ? petsViewData.Comentarios : "-"}</div>
                        </Stack>
                    </Col>
                    <Col>
                        <Stack gap="2" className="col-md-5 ms-auto">
                            <img src={defaultPetAvatar} alt="Imagen de la mascota" width="120" height="120" className="mt-1"/>
                            <img src="data:image/png;base64,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" alt="Código QR" width="120" height="120" />
                        </Stack>
                    </Col>
                </Row>
            </Container>
          </Col>
          {/** Listado de consultas */}
          <Col className="border mb-1">consultas</Col>
        </Row>
        <Row>
          {/** Datos de la consulta seleccionada */}
          <Col className="border mx-1">datos consulta</Col>
          {/** Vacunas aplicadas */}
          <Col className="border">vacunas aplicadas</Col>
        </Row>
      </Container>
    </>
  );
}

export default PetsView;

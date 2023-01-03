import React, { useEffect } from "react";
import { useContext } from "react";
import { getAllVaccines } from "../../../Services/vaccines.service.js";
import { VaccineContext } from "../../../Context/VaccineContext";
import { Table, Button, OverlayTrigger } from "react-bootstrap";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { useNavigate } from "react-router-dom";
import { viewToolTip, editToolTip, deleteToolTip } from "../../../Components/Utils/ToolTips";

function VaccinesList() {
  const navigate = useNavigate();
  const {
    vaccineListIsLoading,
    setVaccineListIsLoading,
    vaccineListData,
    setVaccineListData,
    vaccineListError,
    setVaccineListError,
  } = useContext(VaccineContext);

  useEffect(() => {
    if (vaccineListIsLoading) {
      getAllVaccines()
        .then((res) => {
          if (res.status == 200) {
            setVaccineListData(res.data);
          } else {
            setVaccineListError("Hubo un error al procesar la solicitud");
          }

          setVaccineListIsLoading(false);
        })
        .catch((err) => {
          setVaccineListError("Hubo un error al realizar la solicitud."); // Guardar error
          setVaccineListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
  }, [vaccineListIsLoading]);

  if (vaccineListIsLoading) {
    return <Loading />;
  }

  if (vaccineListError) {
    return (
      <Error
        error={vaccineListError}
        actions={() => {
          navigate("/dashboard/vaccines");
        }}
      />
    );
  }

  return (
    <>
      <Button className="mb-2">Nueva vacuna</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vaccineListData.map((vaccine) => (
            <tr key={vaccine.idVacuna}>
              <td>{vaccine.idVacuna}</td>
              <td>{vaccine.vacuna}</td>
              <td>{vaccine.observaciones}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 150 }}
                  overlay={viewToolTip}
                >
                  <span>
                    <Eye
                      action={() => {
                        navigate("/dashboard/vaccines/" + vaccine.idVacuna); // Redirige a la página de vista de vacuna.
                      }}
                    />
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 150 }}
                  overlay={editToolTip}
                >
                  <span>
                    <Pencil
                      action={() => {
                        navigate("/dashboard/vaccines/" + vaccine.idVacuna + "/edit"); // Redirige a la página de edición de vacuna.
                      }}
                    />
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 150 }}
                  overlay={deleteToolTip}
                >
                  <span>
                    <Trash
                      action={() => {
                        alert("Eliminando vacuna " + vaccine.idVacuna);
                      }}
                    />
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default VaccinesList;

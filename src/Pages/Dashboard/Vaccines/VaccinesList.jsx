import React, { useEffect } from "react";
import { useContext } from "react";
import { getAllVaccines } from "../../../Services/vaccines.service.js";
import { VaccineContext } from "../../../Context/VaccineContext";
import { Table, Button } from "react-bootstrap";
import { Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { useNavigate } from "react-router-dom";

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
                <Pencil />
                <Trash />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default VaccinesList;

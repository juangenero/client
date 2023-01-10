import { useEffect, useContext } from "react";
import { Button, OverlayTrigger, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import { deleteToolTip, editToolTip, viewToolTip } from "../../../Components/Utils/ToolTips";
import { PetsContext } from "../../../Context/PetsContext";
import { getAllPets } from "../../../Services/pets.service";

export default function PetsListVetView() {
  const navigate = useNavigate();

  const {
    petsListIsLoading,
    setPetsListIsLoading,
    petsListData,
    setPetsListData,
    petsListError,
    setPetsListError,
  } = useContext(PetsContext);

  useEffect(() => {
    if (petsListIsLoading) {
      getAllPets()
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setPetsListData(res.data);
          } else {
            setPetsListError("Hubo un error al procesar la solicitud");
          }

          setPetsListIsLoading(false);
        })
        .catch((err) => {
          setPetsListError("Hubo un error al realizar la solicitud."); // Guardar error
          setPetsListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsListIsLoading]);

  // Si está cargando
  if (petsListIsLoading) {
    return <Loading />;
  }

  // Si hay errores
  if (petsListError) {
    return (
      <Error
        error={petsListError}
        actions={() => {
          navigate("/dashboard/pets");
        }}
      />
    );
  }

  // Si la vista es para los veterinarios

  return (
    <>
      <Button className="mb-2">Nueva mascota</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dueño</th>
            <th>Raza</th>
            <th>Especie</th>
            <th>Última consulta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {petsListData.map((pet) => (
            <tr key={pet.idMascota}>
              <td>{pet.idMascota}</td>
              <td>{pet.nombre}</td>
              <td>{pet.dueno}</td>
              <td>{pet.raza ? pet.raza : "-"}</td>
              <td>{pet.especie}</td>
              <td>
                {pet.ultimaConsulta ? new Date(pet.ultimaConsulta).toLocaleDateString() : "-"}
              </td>
              <td>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 50, hide: 150 }}
                  overlay={viewToolTip}
                >
                  <span>
                    <Eye
                      action={() => {
                        navigate("/dashboard/pets/" + pet.idMascota); // Redirige a la página de vista de mascotas.
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
                        //navigate("/dashboard/vaccines/" + //vaccine.idVacuna + "/edit"); // Redirige a la página de edición de vacuna.
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
                        //setVaccineDeleteModal(true);
                        //setSelectedVaccine({ id: vaccine.idVacuna, nombre: vaccine.vacuna });
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

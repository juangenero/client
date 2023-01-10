import { useEffect, useContext } from "react";

// Componentes para las rutas
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Contenido de las rutas
import UsersList from "../Pages/Dashboard/Users/UsersList";
import UserView from "../Pages/Dashboard/Users/UserView";
import UserEdit from "../Pages/Dashboard/Users/UserEdit";

import PetsListVetView from "../Pages/Dashboard/Pets/PetsListVetView";
import PetsListClientView from "../Pages/Dashboard/Pets/PetsListClientView";

import VaccinesList from "../Pages/Dashboard/Vaccines/VaccinesList";
import VaccineView from "../Pages/Dashboard/Vaccines/VaccineView";
import VaccineEdit from "../Pages/Dashboard/Vaccines/VaccineEdit";

import { AppContext } from "../Context/AppContext"; // Contexto de la aplicación
import { UserContext } from "../Context/UserContext"; // Contexto del usuario
import { VaccineContext } from "../Context/VaccineContext"; // Contexto de vacunas
import { PetsContext } from "../Context/PetsContext"; // Contexto de mascotas
import PetsView from "../Pages/Dashboard/Pets/PetsView";

/**
 * Esta sección indica que componente se va a renderizar cuando se visite X ruta dentro de "dashboard"
 *
 * Las rutas "profile", "users" y "vaccines" sólo renderizarán el componente si el rol tiene permisos
 * para visualizarlo.
 *
 * Las rutas "pets" y "consults" son comunes a los 2 roles, renderizan el mismo componente, aunque
 * dependiendo del rol, tendrá una funcionalidad distinta.
 */

function DashboardRoutes() {
  const location = useLocation(); // Hook de react-router-dom

  // Contexto de la aplicación
  const { user } = useContext(AppContext);

  // Usuarios
  const {
    // Listado usuarios
    setUserListIsLoading,
    setUserListData,
    setUserListError,
    // Perfil usuarios
    setUserViewIsLoading,
    setUserViewData,
    setUserViewError,
    // Edición usuarios
    setUserEditShowInfoIsLoading,
    setUserEditShowInfoData,
    setUserEditShowInfoError,
    setUserEditSubmitInfoIsLoading,
    setUserEditSubmitInfoData,
    setUserEditSubmitInfoMessage,
    setUserEditSubmitInfoError,
  } = useContext(UserContext);

  // Mascotas
  const {
    // Listado de mascotas
    setPetsListIsLoading,
    setPetsListData,
    setPetsListError,
  } = useContext(PetsContext);

  // Consultas

  // Vacunas
  const {
    // Listado de vacunas
    setVaccineListIsLoading,
    setVaccineListData,
    setVaccineListError,

    // Vista de vacunas
    setVaccineViewIsLoading,
    setVaccineViewData,
    setVaccineViewError,

    // Edición de vacunas
    setVaccineEditShowInfoIsLoading,
    setVaccineEditShowInfoData,
    setVaccineEditShowInfoError,
    setVaccineEditSubmitInfoIsLoading,
    setVaccineEditSubmitInfoMessage,
    setVaccineEditSubmitInfoError,
  } = useContext(VaccineContext);

  // Limpiar estados de todo el dashboard cuando se cambia de ruta (Los estados de los modals se eliminan al ocultarse)
  useEffect(() => {
    const currentRoute = location.pathname; // Ruta actual

    // USUARIOS

    // Listado de usuarios
    if (currentRoute === "/dashboard/users") {
      setUserListIsLoading(true);
      setUserListData(null);
      setUserListError(null);
    }

    // Perfil de usuario
    else if (
      currentRoute.match("/dashboard/users/[0-9]{1,9}$") ||
      currentRoute === "/dashboard/profile"
    ) {
      setUserViewIsLoading(true);
      setUserViewData(null);
      setUserViewError(null);
    }

    // Edición de usuarios
    else if (
      currentRoute.match("/dashboard/users/[0-9]{1,9}/edit$") ||
      currentRoute === "/dashboard/profile/edit"
    ) {
      setUserEditShowInfoIsLoading(true);
      setUserEditShowInfoData(null);
      setUserEditShowInfoError(null);
      setUserEditSubmitInfoIsLoading(false);
      setUserEditSubmitInfoData(null);
      setUserEditSubmitInfoMessage(null);
      setUserEditSubmitInfoError(null);
    }

    // MASCOTAS

    // Listado de mascotas
    else if (currentRoute === "/dashboard/pets") {
      setPetsListIsLoading(true);
      setPetsListData(null);
      setPetsListError(null);
    }

    // VACUNAS

    // Listado de vacunas
    else if (currentRoute === "/dashboard/vaccines") {
      setVaccineListIsLoading(true);
      setVaccineListData(null);
      setVaccineListError(null);
    }

    // Vista de vacuna
    else if (currentRoute.match("/dashboard/vaccines/[0-9]{1,9}$")) {
      setVaccineViewIsLoading(true);
      setVaccineViewData(null);
      setVaccineViewError(null);
    }

    // Edición de vacunas
    else if (currentRoute.match("/dashboard/vaccines/[0-9]{1,9}/edit$")) {
      setVaccineEditShowInfoIsLoading(true);
      setVaccineEditShowInfoData(null);
      setVaccineEditShowInfoError(null);
      setVaccineEditSubmitInfoIsLoading(false);
      setVaccineEditSubmitInfoMessage(null);
      setVaccineEditSubmitInfoError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Routes>
      {/** GESTIONAR PERFIL */}
      {user.rol ? null : <Route path="/profile" element={<UserView renderingMode="client" />} />}
      {user.rol ? null : (
        <Route path="/profile/edit" element={<UserEdit renderingMode="client" />} />
      )}
      {/** ADMINISTRAR USUARIOS */}
      {user.rol ? (
        <>
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:idUser" element={<UserView renderingMode="vet" />} />
          <Route path="/users/:idUser/edit" element={<UserEdit renderingMode="vet" />} />
        </>
      ) : null}

      {/** ADMINISTRAR MASCOTAS */}
      <Route path="/pets" element={user.rol ? <PetsListVetView /> : <PetsListClientView />} />
      <Route path="/pets/:idPet" element={<PetsView />} />

      {/** ADMINISTRAR CONSULTAS */}
      <Route path="/consults" element={<h1>Consultas</h1>} />

      {/** ADMINISTRAR VACUNAS */}
      {user.rol ? <Route path="/vaccines" element={<VaccinesList />} /> : null}
      {user.rol ? <Route path="/vaccines/:idVaccine" element={<VaccineView />} /> : null}
      {user.rol ? <Route path="/vaccines/:idVaccine/edit" element={<VaccineEdit />} /> : null}
      {/** El resto de rutas no existentes que cuelguen de dashboard, redireccionará a mascotas */}
      <Route path="*" element={<Navigate replace to="/dashboard/pets" />} />
    </Routes>
  );
}

export default DashboardRoutes;

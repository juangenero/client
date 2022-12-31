import { useEffect, useContext } from "react";

// Componentes para las rutas
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Contenido de las rutas
import UsersList from "../Pages/Dashboard/Users/UsersList";
import Pets from "../Pages/Dashboard/Pets/Pets";
import UserView from "../Pages/Dashboard/Users/UserView";
import UserEdit from "../Pages/Dashboard/Users/UserEdit";

import { AppContext } from "../Context/AppContext"; // Contexto de la aplicación
import { UserContext } from "../Context/UserContext"; // Contexto del usuario

{
  /**
   * Esta sección indica que componente se va a renderizar cuando se visite X ruta.
   *
   * Las rutas "profile", "users" y "vaccines" sólo renderizarán el componente si el rol tiene permisos
   * para visualizarlo.
   *
   * Las rutas "pets" y "consults" son comunes a los 2 roles, renderizan el mismo componente, aunque
   * dependiendo del rol, tendrá una funcionalidad distinta.
   */
}

function DashboardRoutes() {
  const location = useLocation(); // Hook de react-router-dom

  // Contextos
  const { user } = useContext(AppContext);

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

  // Limpiar estados de todo del dashboard cuando se cambia de ruta (Los estados de los modals se eliminan al ocultarse)
  useEffect(() => {
    const currentRoute = location.pathname; // Ruta actual

    // Listado de usuarios
    if (currentRoute === "/dashboard/users") {
      setUserListIsLoading(true);
      setUserListData(null);
      setUserListError(null);

      // Perfil de usuario
    } else if (
      currentRoute.match("/dashboard/users/[0-9]{1,9}$") ||
      currentRoute === "/dashboard/profile"
    ) {
      setUserViewIsLoading(true);
      setUserViewData(null);
      setUserViewError(null);

      // Edición de usuarios
    } else if (
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
  }, [location]);

  return (
    <Routes>
      {/** Ruta para mostrar y editar perfil */}
      {user.rol ? null : <Route path="/profile" element={<UserView renderingMode="client" />} />}
      {user.rol ? null : (
        <Route path="/profile/edit" element={<UserEdit renderingMode="client" />} />
      )}

      {/** Rutas para administrar los usuarios */}
      {user.rol ? (
        <>
          <Route path="/users" element={<UsersList />} />

          <Route path="/users/:idUser" element={<UserView renderingMode="vet" />} />

          <Route path="/users/:idUser/edit" element={<UserEdit renderingMode="vet" />} />
        </>
      ) : null}

      {/** Ruta para mostrar y/o administrar las mascotas (Según el rol el componente renderizará distintas opciones) */}
      <Route path="/pets" element={<Pets />} />

      {/** Ruta para las consultas (Según el rol el componente renderizará distintas opciones) */}
      <Route path="/consults" element={<h1>Consultas</h1>} />

      {/** Ruta para administrar las vacunas */}
      {user.rol ? <Route path="/vaccines" element={<h1>Vacunas</h1>} /> : null}

      {/** El resto de rutas no existentes que cuelguen de dashboard, redireccionará a mascotas */}
      <Route path="*" element={<Navigate replace to="/dashboard/pets" />} />
    </Routes>
  );
}

export default DashboardRoutes;

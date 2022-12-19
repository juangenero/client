// Componentes para las rutas
import { Routes, Route, Navigate } from "react-router-dom";

// Contenido de las rutas
import Users from "../Pages/Dashboard/Users";
import Pets from "../Pages/Dashboard/Pets";

import { useContext } from "react";
import { AppContext } from "../Context/AppContext"; // Contexto de la aplicación
import { UserContextProvider } from "../Context/UserContext"; // Contexto del usuario

{
  /**
   * Esta sección indica que componente se va a renderizar cuando se visite X ruta.
   *
   * Las rutas "profile", "users" y "vaccines" sólo renderizarán el componente si el rol tiene permisos
   * para visualizarlo.
   *
   * Las rutas "pets" y "consults" son comunes a los 2 roles, renderizan el mismo componente, aunque
   * dependiendo del rol, tendrán una funcionalidad distinta.
   */
}

function DashboardRoutes() {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      {/** Ruta para mostrar y editar perfil */}
      {user.rol ? null : <Route path="/profile" element={<h1>Perfil</h1>} />}

      {/** Ruta para administrar los usuarios */}
      {user.rol ? (
        <Route
          path="/users"
          element={
            <UserContextProvider>
              <Users />
            </UserContextProvider>
          }
        />
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

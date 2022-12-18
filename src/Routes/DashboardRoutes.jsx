

// Componentes para las rutas
import { Routes, Route, Navigate } from "react-router-dom";

// Contenido de las rutas
import Users from "../Pages/Dashboard/Users";
import Pets from "../Pages/Dashboard/Pets";

// Contexto de la aplicación
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

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
      {user.rol ? null : <Route path="/profile" element={<h1>Perfil</h1>} />}
      {user.rol ? <Route path="/users" element={<Users />} /> : null}
      <Route path="/pets" element={<Pets />} />
      <Route path="/consults" element={<h1>Consultas</h1>} />
      {user.rol ? <Route path="/vaccines" element={<h1>Vacunas</h1>} /> : null}
      <Route path="*" element={<Navigate replace to="/dashboard/pets" />} />
    </Routes>
  );
}

export default DashboardRoutes;

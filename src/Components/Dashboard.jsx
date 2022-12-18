// Diseño
import { Stack } from "react-bootstrap";

// Navegación del Dashboard
import DashboardNav from "./Dashboard/DashboardNav";
import DashboardRoutes from "../Routes/DashboardRoutes";

// Estructura común a todas las páginas del Dashboard.
export function Dashboard() {
  return (
    <Stack>
      <div className="bg-secondary rounded bg-gradient">
        <DashboardNav />
      </div>
      <div className="bg-light rounded p-2">
        <DashboardRoutes />
      </div>
    </Stack>
  );
}

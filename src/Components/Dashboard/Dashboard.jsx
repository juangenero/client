// Diseño
import { Stack } from "react-bootstrap";

// Navegación del Dashboard
import DashboardNav from "./DashboardNav";
import DashboardRoutes from "../../Routes/DashboardRoutes";
import { UserContextProvider } from "../../Context/UserContext";
import { VaccineContextProvider } from "../../Context/VaccineContext";

// Estructura común a todas las páginas del Dashboard.
export function Dashboard() {
  return (
    <Stack>
      <div className="bg-secondary rounded bg-gradient">
        <DashboardNav />
      </div>
      <div className="bg-light rounded p-2">
        <UserContextProvider>
          <VaccineContextProvider>
            <DashboardRoutes />
          </VaccineContextProvider>
        </UserContextProvider>
      </div>
    </Stack>
  );
}

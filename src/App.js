import Header from "./Components/Header";
import FrontRoutes from "./Routes/FrontRoutes";
import Footer from "./Components/Footer";

// Bootstrap
import { Stack } from "react-bootstrap";

function App() {
  return (
    <Stack className="col-md-8 mx-auto">
      <Header />
      <FrontRoutes />
      <Footer />
    </Stack>
  );
}

export default App;

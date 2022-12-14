import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContextProvider } from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom"; // Enrutador

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode> {/** Capa para detectar errores (sólo se aplica a desarrollo) */}
    <AppContextProvider> {/** Contexto de la aplicación para tener estados globales */}
      <BrowserRouter> {/** Enrutador del lado del cliente */}
        <App />
      </BrowserRouter>
    </AppContextProvider>
  //</React.StrictMode>
);

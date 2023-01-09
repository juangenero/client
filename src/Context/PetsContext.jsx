import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const PetsContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function PetsContextProvider(props) {
  // Listado de mascotas
  const [petsListIsLoading, setPetsListIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [petsListData, setPetsListData] = useState(null); // Guardar los datos obtenidos de la API.
  const [petsListError, setPetsListError] = useState(null);

  // Vista de mascotas

  // Edición de mascotas

  // Eliminar mascotas

  // Nueva mascota

  return (
    <PetsContext.Provider
      value={{
        // Listado de mascotas
        petsListIsLoading,
        setPetsListIsLoading,
        petsListData,
        setPetsListData,
        petsListError,
        setPetsListError,
      }}
    >
      {props.children}
    </PetsContext.Provider>
  );
}

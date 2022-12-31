import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const VaccineContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function VaccineContextProvider(props) {
  const [vaccineListIsLoading, setVaccineListIsLoading] = useState(true);
  const [vaccineListData, setVaccineListData] = useState(null);
  const [vaccineListError, setVaccineListError] = useState(null);

  return (
    <VaccineContext.Provider
      value={{
        vaccineListIsLoading,
        setVaccineListIsLoading,
        vaccineListData,
        setVaccineListData,
        vaccineListError,
        setVaccineListError,
      }}
    >
      {props.children}
    </VaccineContext.Provider>
  );
}

import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const VaccineContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function VaccineContextProvider(props) {
  const [test, setTest] = useState(false);

  return (
    <VaccineContext.Provider value={{ test, setTest }}>
      {props.children}
    </VaccineContext.Provider>
  );
}

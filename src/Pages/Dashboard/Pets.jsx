import { useEffect, useState } from "react";

export default function Pets() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  console.log("isLoading", isLoading);

  useEffect(() => {
    console.log("useEffect");

    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch("https://dog.ceo/api/breeds/image/random");
          if (response.ok) {
            const dog = await response.json();
            setImageUrl(dog.message);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener el perrito");
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener el perrito");
        }
      }
      fetchData();
    }
  }, [isLoading]);

  const randomDog = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="App">
        {console.log("render cargando")}
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (error) {
    // ⬅️ mostramos el error (si es que existe)
    return (
      <div className="App">
        {console.log("render error")}
        <h1>{error}</h1>
        <button onClick={randomDog}>Volver a intentarlo</button>
      </div>
    );
  }

  return (
    <div className="App">
      {console.log("render data")}
      <img src={imageUrl} alt="Imagen de perrito aleatoria" />
      <button onClick={randomDog}>
        ¡Otro!{" "}
        <span role="img" aria-label="corazón">
          ❤️
        </span>
      </button>
    </div>
  );
}

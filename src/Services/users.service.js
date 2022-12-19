import clientAxios from "../Utils/axios-instance.js";

export async function getUsers() {
  return await clientAxios.get("/users");
}

export async function newUser() {}

export async function deleteUser(id) {
  await clientAxios.post("/deleteUser", { id: id });
}

export async function resetUsers() {
  await clientAxios.post("/resetUsers");
}

// Función que elimina el mensaje de error y establece el estado cargando (implica llamar a la API)
export function reloadUsers(setError, setIsLoading) {
  setError(null);
  setIsLoading(true);
}

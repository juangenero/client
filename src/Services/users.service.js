import clientAxios from "../Utils/axios-instance.js";

export async function getAllUsers() {
  return await clientAxios.get("/users");
}

export async function getUser(id) {
  return await clientAxios.get("/user/" + id);
}

export async function editUser(id, user) {
  return await clientAxios.patch("/editUser/"+ id, user);
}

export async function newUser() {
  alert("Creando nuevo usuario..")
}

export async function deleteUser(id) {
  await clientAxios.delete("/deleteUser/"+ id);
}

export async function resetUsers() {
  await clientAxios.post("/resetUsers");
}

// Función que elimina el mensaje de error y establece el estado cargando (implica llamar a la API)
export function reloadUsers(setError, setIsLoading) {
  setError(null);
  setIsLoading(true);
}

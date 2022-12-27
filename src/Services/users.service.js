import clientAxios from "../Utils/axios-instance.js";

export async function getAllUsers() {
  return await clientAxios.get("/users");
}

export async function getUser(id) {
  return await clientAxios.get("/users/" + id);
}

export async function editUser(user) {
  return await clientAxios.patch("/users/", user);
}

export async function newUser() {
  alert("Creando nuevo usuario..")
}

export async function deleteUser(id) {
  await clientAxios.delete("/users/"+ id);
}

export async function resetUsers() {
  await clientAxios.post("/users/reset");
}
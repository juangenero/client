import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllUsers() {
  return await clientAxios.get("/users");
}

export async function getUser(id) {
  return await clientAxios.get("/users/" + id);
}

export async function editUser(user) {
  return await clientAxios.patch("/users/", user);
}

export async function deleteUser(id) {
  return await clientAxios.delete("/users/" + id);
}

export async function newUser(user) {
  return await clientAxios.post("/users/", user);
}

export async function resetUsers() {
  await clientAxios.post("/users/reset");
}

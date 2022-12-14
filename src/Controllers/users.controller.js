import clientAxios from "../Utils/axios-instance.js";

export async function getUsers() {
  return await clientAxios.get("/users");
}

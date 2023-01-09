import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllPets() {
  return await clientAxios.get("/pets");
}

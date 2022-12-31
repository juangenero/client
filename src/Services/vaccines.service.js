import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllVaccines() {
  return await clientAxios.get("/vaccines");
}
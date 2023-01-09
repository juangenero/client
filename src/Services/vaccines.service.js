import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllVaccines() {
  return await clientAxios.get("/vaccines");
}

export async function getVaccine(id) {
  return await clientAxios.get("/vaccines/" + id);
}

export async function editVaccine(vaccine) {
  return await clientAxios.patch("/vaccines/", vaccine);
}

export async function deleteVaccine(id) {
  return await clientAxios.delete("/vaccines/" + id);
}

export async function newVaccine(vaccine) {
  return await clientAxios.post("/vaccines", vaccine);
}

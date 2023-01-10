import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllPets() {
  return await clientAxios.get("/pets");
}

export async function getPetsOfUser(idUser) {
  return await clientAxios.get("/pets/user/" + idUser);
}

export async function getPetById(idPet) {
  return await clientAxios.get("/pets/pet/" + idPet);
}

import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function addHospital(hospId, hospName, hospCity) {
    try {
        const response = await axios.post(BASE_URL + "/hospital/add", {
          "hospital_id": hospId,
          "name": hospName,
          "city": hospCity,
        })
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function deleteHospital(hospId) {
    try {
        const response = await axios.delete(BASE_URL + "/hospital/delete/" + hospId)
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function addPharmacy(id, name, city) {
    try {
        const response = await axios.post(BASE_URL + "/pharmacy/add", {
          "pharmacy_id": id,
          "pharm_name": name,
          "pharm_city": city,
        })
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function deletePharmacy(id) {
    try {
        const response = await axios.delete(BASE_URL + "/pharmacy/remove/" + id)
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function deleteUser(TCK) {
    try {
        const response = await axios.delete(BASE_URL + "/user/delete/" + TCK)
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function addWarehouse(id, name, city) {
    try {
        const response = await axios.post(BASE_URL + "/warehouse/add", {
          "warehouse_id": id,
          "warehouse_name": name,
          "warehouse_city": city,
        })
        return response.data
      } catch (error) {
        console.error(error);
      }
}

export async function deleteWarehouse(id) {
    try {
        const response = await axios.delete(BASE_URL + "/warehouse/remove/" + id)
        return response.data
      } catch (error) {
        console.error(error);
      }
}
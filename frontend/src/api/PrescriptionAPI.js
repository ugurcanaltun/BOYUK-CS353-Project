import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchPatientPrescriptions() {
    let TCK = localStorage.getItem("userTCK");
    try {
      const response = await axios.post(BASE_URL + "/user/listPrescriptions",{
        "patient_TCK": TCK
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
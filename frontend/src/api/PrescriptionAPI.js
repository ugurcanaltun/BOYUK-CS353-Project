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

export async function prescribeDrug(patientTCK, drugName, illness) {
    let TCK = localStorage.getItem("userTCK");
    try {
      const response = await axios.post(BASE_URL + "/prescription/prescribe",{
        "doctor_TCK": TCK,
        "patient_TCK": patientTCK,
        "drug_name": drugName,
        "illness": illness
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
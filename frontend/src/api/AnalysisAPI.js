import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchDrugAnalysis() {
    let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.post(BASE_URL + "/analysis/createDrugAnalysis", {
            "patient_TCK": TCK
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchDoctorAnalysis() {
    try {
        const response = await axios.get(BASE_URL + "/analysis/createDoctorAnalysis")
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchMoneyAnalysis() {
    let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.post(BASE_URL + "/analysis/createMoneyAnalysis", {
            "patient_TCK": TCK
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}
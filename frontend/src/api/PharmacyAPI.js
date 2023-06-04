import axios from 'axios';
import { BASE_URL } from './BaseURL';

export async function fetchPharmacyMedicines(pharmId) {
    try {
        const response = await axios.post(BASE_URL + "/drug/drugToCount", {
            "pharm_id": pharmId
        })
        return response.data
      } catch (error) {
        console.error(error);
      }
}
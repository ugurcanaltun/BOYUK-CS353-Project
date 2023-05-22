import axios from 'axios';
import { BASE_URL } from './BaseURL';

export const cartAdd = async (drugName, pharmacyId) => {
    let TCK = 2121212122 // localStorage.getItem("user_TCK")
    try {
      const response = await axios.post(BASE_URL + "/cart/addCart",{
        "patient_TCK": TCK,
        "drug_name": drugName,
        "pharm_id": pharmacyId
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

export async function cartRemove(drugName, pharmacyId) {
  let TCK = 2121212122 // localStorage.getItem("user_TCK")
  try {
    const response = await axios.post(BASE_URL + "/cart/decrementDrug",{
      "patient_TCK": TCK,
      "drug_name": drugName,
      "pharm_id": pharmacyId
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCart() {
  let TCK = 2121212122// localStorage.getItem("user_TCK")
  try {
    const response = await axios.post(BASE_URL + "/cart/show",{
      "patient_TCK": TCK,
    })
    return response.data
  } catch (error) {
    return error
  }
}
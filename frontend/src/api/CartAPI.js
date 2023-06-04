import axios from 'axios';
import { BASE_URL } from './BaseURL';

export const cartAdd = async (drugName, pharmacyId) => {
    let TCK = localStorage.getItem("userTCK")
    try {
      const response = await axios.post(BASE_URL + "/cart/addToCart",{
        "patient_TCK": TCK,
        "drug_name": drugName,
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

export async function cartRemove(drugName, pharmacyId) {
  let TCK = localStorage.getItem("userTCK")
  try {
    const response = await axios.post(BASE_URL + "/cart/removeFromCart",{
      "patient_TCK": TCK,
      "drug_name": drugName,
    })
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchCart() {
  let TCK = localStorage.getItem("userTCK")
  try {
    const response = await axios.post(BASE_URL + "/cart/show",{
      "patient_TCK": TCK,
    })
    return response.data
  } catch (error) {
    return error
  }
}
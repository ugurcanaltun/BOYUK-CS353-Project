import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchOrders()  {
    let TCK = localStorage.getItem("userTCK");
    return ["asda"]
}

export async function completeOrder() {
    let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.post(BASE_URL + "/drug/orderDrug",{
          "patient_TCK": TCK
        })
        return response.data;
      } catch (error) {
        console.error(error);
      }
}
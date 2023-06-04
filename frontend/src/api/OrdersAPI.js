import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchOrders()  {
    let TCK = localStorage.getItem("userTCK");
    try {
      const response = await axios.post(BASE_URL + "/user/listOrders",{
        "patient_TCK": TCK
      })
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export async function completeOrder(pharmId) {
    let TCK = localStorage.getItem("userTCK")
    console.log(pharmId)
    try {
        const response = await axios.post(BASE_URL + "/drug/orderDrug",{
          "patient_TCK": TCK,
          "pharm_id": pharmId
        })
        return response.data;
      } catch (error) {
        console.error(error);
      }
}
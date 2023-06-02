import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchBankAccounts() {
    let TCK = localStorage.getItem("userTCK")
    try {
      const response = await axios.post(BASE_URL + "/bank/listAccounts",{
        "patient_TCK": TCK,
      })
      return response.data
    } catch (error) {
      console.error(error);
    }
}

export async function addBankAccount(accNo, accPassword) {
    let TCK = localStorage.getItem("userTCK")
    try {
      const response = await axios.post(BASE_URL + "/bank/addAccount",{
        "patient_TCK": TCK,
        "bank_account_no": accNo,
        "bank_account_password": accPassword
      })
      return response.data
    } catch (error) {
      console.error(error);
    }
}

export async function removeBankAccount(accNo) {
    try {
      const response = await axios.post(BASE_URL + "/bank/removeAccount",{
        "bank_account_no": accNo,
      })
      return response.data
    } catch (error) {
      console.error(error);
    }
}

export async function setBankAccountActive(accNo) {
    let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.put(BASE_URL + "/bank/setActive",{
          "bank_account_no": accNo,
          "patient_TCK": TCK
        })
        return response.data
      } catch (error) {
        console.error(error);
      }
}
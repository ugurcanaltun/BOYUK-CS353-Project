import axios from "axios";
import { BASE_URL } from "./BaseURL";

export async function register(props) {
  try {
    console.log(props)
    const response = await axios.post(BASE_URL + "/user/add", props);

    return response.data
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function login(TCK, password) {
    try {
        const response = await axios.post(BASE_URL + "/user/login", {
          "TCK": TCK,
          "password": password
        });
    
        if (typeof(response.data.TCK) === "number") {
          localStorage.setItem('userTCK', response.data.TCK);
          localStorage.setItem('role', response.data.role);
          return true;
        }
    
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
}

export function logout() {
    localStorage.removeItem('userTCK')
    localStorage.removeItem('role')
}

export async function fetchUserInfo() {
    let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.post(BASE_URL + "/user/info", {
            "TCK": TCK
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchPatients() {
  let TCK = localStorage.getItem("userTCK")
    try {
        const response = await axios.post(BASE_URL + "/user/listPatients")
        return response.data
    } catch (error) {
        console.error(error);
    }
}
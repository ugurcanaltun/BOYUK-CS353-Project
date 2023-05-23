import axios from "axios";
import { BASE_URL } from "./BaseURL";

export function register() {

}

export function login() {
    localStorage.setItem('userTCK', 2121212122);
    localStorage.setItem('role', "patient");
}

export async function fetchUserInfo() {
    let TCK = 2121212122 // localStorage.getItem("user_TCK")
    try {
        const response = await axios.post(BASE_URL + "/user/info", {
            "TCK": TCK
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}
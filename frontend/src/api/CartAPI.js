import axios from 'axios';
import { BASE_URL } from './BaseURL';

export const cartAdd = async (drugName) => {
    try {
        const response = await axios.get(BASE_URL + "/data")
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
}

export function cartRemove(name, pharmacyId) {

}

export function fetchCart() {

}
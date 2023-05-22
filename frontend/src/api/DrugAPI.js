import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchDrugs(filter) {
    try {
      const response = await axios.get(BASE_URL + "/drug/list")
      return response.data
    } catch (error) {
      console.error(error);
    }
}

export async function fetchFilterValues() {
    await sleep(1000)
    return {
        companies: ['aaa','bbb','ccc','ddd','eee','fff'],
        sideEffects: ['None', 'headache', 'sex', 'iktidarsızlık'],
        categories: ['painkiller', 'pastile', 'laxative'],
        priceRange: 500,
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
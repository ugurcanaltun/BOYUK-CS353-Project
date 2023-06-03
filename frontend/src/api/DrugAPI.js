import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchDrugs(filter) {
    try {
      const response = await axios.post(BASE_URL + "/drug/filter", {
        "drug_name": filter.searchText,
        "min_price": filter.min_price,
        "max_price": filter.max_price,
        "company": filter.companies,
        "drug_type": filter.category,
        "needs_prescription": filter.prescribed
      })
      return response.data
    } catch (error) {
      console.error(error);
    }
}

export async function fetchFilterValues() {
  try {
    const response = await axios.post(BASE_URL + "/drug/list", {
    })
    return response.data
  } catch (error) {
    console.error(error);
  }
}
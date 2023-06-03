import { BASE_URL } from "./BaseURL";
import axios from "axios";

export async function fetchWarehouseOrders() {
    let warehouseId = "1";
    try{
        const response = await axios.post(BASE_URL + "/warehouse/listRestocks", {
            "warehouse_id": warehouseId
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export async function fetchPharmacyList() {
    try{
        const response = await axios.post(BASE_URL + "/pharmacy/list")
        return response.data 
    } catch(error) {
        console.error(error);
    }
}
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DrugCard from "../components/DrugCard";
import FilterPane from "../components/FilterPane";
import { fetchFilterValues } from "../api/DrugAPI";

function DrugsScreen() {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        searchText: "",
        companies: [],
        sideEffects: [],
        priceRanges: [],
        ageGroups: []
    });
    const [filterValues, setFilterValues] = useState();
    const [drugs, setDrugs] = useState();

    useEffect(() => {
        
        fetchFilterValues().then(f => {
            console.log(f)
            setFilterValues(f)
        })
    }, [])
    
    return (
        <div className="drugs-screen-container">
            <div className="filter-container">
                {   filterValues?
                    <FilterPane filterValues={filterValues} filters={filters} setFilters={setFilters} />:
                    <></>
                }
            </div>
            <div className="right-section">
                <TextField value={searchText} label="drugs"/>
                <DrugCard drugName="aaa" drugPrice="123"/>
            </div>
        </div>
    )
}



export default DrugsScreen;
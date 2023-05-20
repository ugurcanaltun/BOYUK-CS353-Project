import { Box, Icon, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DrugCard from "../components/DrugCard";
import FilterPane from "../components/FilterPane";
import { fetchFilterValues } from "../api/DrugAPI";
import SearchIcon from '@mui/icons-material/Search';
import '../css/Drugs.css'

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
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField variant="standard" id="input-with-sx" className="search-bar" value={searchText} label="Search Drugs" />
                </Box>
                <div className="drug-list-container">
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                    <DrugCard drugName="aaa" drugPrice="123"/>
                </div>
            </div>
        </div>
    )
}



export default DrugsScreen;
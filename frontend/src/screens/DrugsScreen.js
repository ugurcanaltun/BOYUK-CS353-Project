import { Box, Icon, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DrugCard from "../components/DrugCard";
import FilterPane from "../components/FilterPane";
import { fetchFilterValues, fetchDrugs } from "../api/DrugAPI";
import SearchIcon from '@mui/icons-material/Search';
import '../css/Drugs.css'

function DrugsScreen() {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        searchText: "",
        companies: [],
        sideEffects: [],
        priceRanges: [],
        ageGroups: [],
        prescribed: 2
    });
    const [filterValues, setFilterValues] = useState();
    const [drugs, setDrugs] = useState();

    useEffect(() => {
        fetchFilterValues().then(f => {
            setFilterValues(f)
        })
    }, [])
    
    useEffect(() => {
        console.log(filters)
        fetchDrugs(filters).then(d=> {
            setDrugs(d)
        })
    }, [filters])

    function handleSearch(e) {
        setFilters({...filters, searchText: e.target.value})
        setSearchText(e.target.value)
    }

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
                    <TextField onChange={handleSearch} variant="standard" id="input-with-sx" className="search-bar" value={searchText} label="Search Drugs" />
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
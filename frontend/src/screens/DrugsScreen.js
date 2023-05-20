import { Box, Chip, Icon, TextField } from "@mui/material";
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
        category: -1,
        prescribed: 2
    });
    const [filterValues, setFilterValues] = useState();
    const [drugs, setDrugs] = useState();
    const [selected, setSelected] = useState(-1);

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

    function handleSelectCategory(id) {
        if (selected !== id) {
            setSelected(id)
            setFilters({...filters, category: id})
        }
    }

    return (
        <div className="drugs-screen-container">
            <div className="filter-container">
                {   
                    filterValues?
                    <FilterPane filterValues={filterValues} filters={filters} setFilters={setFilters} />:
                    <></>
                }
            </div>
            <div className="right-section">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField onChange={handleSearch} variant="standard" id="input-with-sx" className="search-bar" value={searchText} label="Search Drugs" />
                </Box>
                <div className="categories-container">
                    {
                        filterValues?
                        <Chip color="primary" label="All" variant={(selected===-1)?"filled":"outlined"} onClick={e=>{handleSelectCategory(-1)}} />
                        :
                        <></>
                    }
                    
                    {
                        filterValues?
                        filterValues.categories.map(c=> {
                            return <Chip color="primary" key={c.id} label={c.name} variant={(selected===c.id)?"filled":"outlined"} onClick={e=>{handleSelectCategory(c.id)}} />
                        })
                        :
                        <></>  
                    }
                </div>
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
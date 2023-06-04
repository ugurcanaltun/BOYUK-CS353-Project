import { Box, Chip, Icon, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DrugCard from "../components/DrugCard";
import FilterPane from "../components/FilterPane";
import { fetchFilterValues, fetchDrugs } from "../api/DrugAPI";
import SearchIcon from '@mui/icons-material/Search';
import '../css/Drugs.css'
import { fetchCart } from "../api/CartAPI";
import { fetchPatients } from "../api/UserAPI";

function DrugsScreen() {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        searchText: "",
        companies: [],
        sideEffects: [],
        min_price: 0,
        max_price: 100,
        category: "all",
        prescribed: 2
    });
    const [filterValues, setFilterValues] = useState();
    const [drugs, setDrugs] = useState();
    const [selected, setSelected] = useState("all");
    const [cart, setCart] = useState([])
    const [patients, setPatients] = useState([])
    
    useEffect(() => {
        fetchFilterValues().then(f => {
            setFilterValues(f)
            setFilters({...filters, priceRange: {
                min: 0,
                max: f.priceRange
            }})
        })

        if (localStorage.getItem("role") === "doctor") {
            fetchPatients().then(p=>{
                setPatients(p)
            })
        }
    }, [])
    
    useEffect(() => {
        console.log(filters)
        if (localStorage.getItem("role") === "patient") {
            fetchCart().then(c=> {
                setCart(c)
            })
        }
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
                    null
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
                        <Chip color="primary" label="All" variant={(selected==="all")?"filled":"outlined"} onClick={e=>{handleSelectCategory("all")}} />
                        :
                        null
                    }
                    
                    {
                        filterValues?
                        filterValues.categories.map(c=> {
                            return <Chip color="primary" key={c} label={c} variant={(selected===c)?"filled":"outlined"} onClick={e=>{handleSelectCategory(c)}} />
                        })
                        :
                        null
                    }
                </div>
                <div className="drug-list-container">
                    {
                        drugs?
                        drugs.map(d=>{
                            return (cart.some(c=>c.drug_name === d.name))?
                            <DrugCard patients={patients} key={d.name} count={cart.find((c)=>c.drug_name===d.name)["drug_count"]} drugName={d.name} drugPrice={d.price}/>:
                            <DrugCard patients={patients} key={d.name} count={0} drugName={d.name} drugPrice={d.price}/>
                        }): null
                    }
                    
                </div>
            </div>
        </div>
    )
}



export default DrugsScreen;
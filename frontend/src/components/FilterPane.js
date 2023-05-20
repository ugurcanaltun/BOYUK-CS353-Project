import { Button, Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useEffect, useState } from "react"
import FilterCheckBox from "./FilterCheckBox";

function FilterPane(props) {
    const [ranges, setRanges] = useState([])
    
    useEffect(() => {
        let lo = 0
        let hi = 10
        let temp = []
        for (let i = 0; i < props.filterValues.priceRange / 10; i++) {
            let newRange = {
                id: i,
                name: lo.toString() + "-" + hi.toString(),
                low: lo,
                high: hi
            }
            temp.push(newRange)
            lo = lo + 10
            hi = hi + 10
        }
        setRanges(temp)

    }, [props.filterValues]);

    function removeFilters() {
        props.setFilters({
            searchText: "",
            companies: [],
            sideEffects: [],
            priceRanges: [],
            ageGroups: [],
            prescribed: 2
        })
    }
    function selectPrescriptionType(e) {
        props.setFilters({...props.filters, prescribed: e.target.value})
    }
    
    return (
        <>
        <h4 className="filters-title">Filters</h4>
        <h5 className="filter-name-title">Companies</h5>
        {
            props.filterValues?.companies.map(c => {
                return <FilterCheckBox key={c.id} list={props.filters.companies} name={c.name} keyValue={c.id} setFilters={props.setFilters} filters={props.filters} listName="companies" />
            })
        }
        <h5 className="filter-name-title">Side Effects</h5>
        {
            props.filterValues?.sideEffects.map(s => {
                return <FilterCheckBox key={s.id} list={props.filters.sideEffects} name={s.name} keyValue={s.id} setFilters={props.setFilters} filters={props.filters} listName="sideEffects" />
            })
        }
        <h5 className="filter-name-title">Price</h5>
        {
            ranges.map(r => {
                return <FilterCheckBox key={r.id} list={props.filters.priceRanges} name={r.name + "$"} keyValue={r.name} setFilters={props.setFilters} filters={props.filters} listName="priceRanges" />
            })
        }
        <h5 className="filter-name-title">Prescription</h5>
        <RadioGroup
            name="radio-buttons-group"
            defaultValue={2}
            onChange={selectPrescriptionType}
            >
            <FormControlLabel value={2} control={<Radio size="small" />} label="All" />
            <FormControlLabel value={1} control={<Radio size="small" />} label="Needs Prescription" />
            <FormControlLabel value={0} control={<Radio size="small" />} label="No Prescription" />
        </RadioGroup>
        <Button size="small" className="apply-filter-button" variant="contained" onClick={removeFilters}>Apply Filters</Button>
        </>
        
    )
}

export default FilterPane
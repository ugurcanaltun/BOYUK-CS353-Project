import { Button, Checkbox, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useEffect, useState } from "react"

function FilterPane(props) {
    const [ranges, setRanges] = useState([])
    const [companyChecked, setCompanyChecked] = useState([])
    const [sideEffectChecked, setSideEffectChecked] = useState([])
    const [priceRangeChecked, setPriceRangeChecked] = useState([])
    const [ageGroupChecked, setAgeGroupChecked] = useState([])
    
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

    function checkCompany(id) {
        console.log("dfdswffd")
        if (props.filters.companies.includes(id)) {
            props.filters.companies = props.filters.companies.filter(c=>c !== id)
        }
        else {
            console.log("Adding " + id)
            props.filters.companies.push(id)
        }
    }
    function checkSideEffect(id) {
        // if (filters.sideEffects.includes(id)) {
        //     filters.sideEffects = filters.sideEffects.filter(s=>s !== id)
        // }
        // else {
        //     filters.sideEffects.push(id)
        // }
    }
    function checkPriceRange(name) {
        // if (filters.priceRanges.includes(name)) {
        //     filters.priceRanges = filters.priceRanges.filter(s=>s !== name)
        // }
        // else {
        //     filters.priceRanges.push(name)
        // }
    }

    function applyFilters() {
        // TODO api call
        //console.log(filters)
    }
    
    return (
        <>
        <h4 className="filters-title">Filters</h4>
        <h5 className="filter-name-title">Companies</h5>
        {
            props.filterValues?.companies.map(c => {
                return <FormControlLabel className="check-box" key={c.id} control={<Checkbox size="small" className="check-box" checked={props.filters.companies.includes(c.id)} onChange={checkCompany(c.id)}/>} label={c.name} />
            })
        }
        <h5 className="filter-name-title">Side Effects</h5>
        {
            props.filterValues?.sideEffects.map(s => {
                return <FormControlLabel key={s.id} control={<Checkbox size="small" onChange={checkSideEffect(s.id)}/>} label={s.name} />
            })
        }
        <h5 className="filter-name-title">Price</h5>
        {
            ranges.map(r => {
                return <FormControlLabel key={r.id} control={<Checkbox size="small" onClick={checkPriceRange(r.name)}/>} label={r.name + "$"} />
            })
        }
        <h5 className="filter-name-title">Prescription</h5>
        <RadioGroup
            name="radio-buttons-group"
            defaultValue={2}
            >
            <FormControlLabel value={2} control={<Radio size="small" />} label="All" />
            <FormControlLabel value={1} control={<Radio size="small" />} label="Needs Prescription" />
            <FormControlLabel value={0} control={<Radio size="small" />} label="No Prescription" />
        </RadioGroup>
        <Button size="small" className="apply-filter-button" variant="contained" onClick={applyFilters}>Apply Filters</Button>
        </>
        
    )
}

export default FilterPane
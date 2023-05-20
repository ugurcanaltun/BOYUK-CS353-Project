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
        {
            props.filterValues?.companies.map(c => {
                return <FormControlLabel key={c.id} control={<Checkbox checked={props.filters.companies.includes(c.id)} onChange={checkCompany(c.id)}/>} label={c.name} />
            })
        }
        {
            props.filterValues?.sideEffects.map(s => {
                return <FormControlLabel key={s.id} control={<Checkbox onChange={checkSideEffect(s.id)}/>} label={s.name} />
            })
        }
        {
            ranges.map(r => {
                return <FormControlLabel key={r.id} control={<Checkbox onClick={checkPriceRange(r.name)}/>} label={r.name} />
            })
        }
        <RadioGroup
            name="radio-buttons-group"
            defaultValue={2}
            >
            <FormControlLabel value={2} control={<Radio />} label="All" />
            <FormControlLabel value={1} control={<Radio />} label="Needs Prescription" />
            <FormControlLabel value={0} control={<Radio />} label="No Prescription" />
        </RadioGroup>
        <Button onClick={applyFilters}>Apply Filters</Button>
        </>
        
    )
}

export default FilterPane
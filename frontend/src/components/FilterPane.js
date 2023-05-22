import { Button, Checkbox, FormControlLabel, RadioGroup, Radio, Slider } from "@mui/material";
import { useEffect, useState } from "react"
import FilterCheckBox from "./FilterCheckBox";

function FilterPane(props) {
    const [reset, setReset] = useState(false)
    const [priceRange, setPriceRange] = useState([0,props.filterValues.priceRange])
    
    function removeFilters() {
        setReset(true)
        setPriceRange([0,props.filterValues.priceRange])
        props.setFilters({
            ...props.filters,
            companies: [],
            sideEffects: [],
            priceRanges: {
                min: 0,
                max: props.filterValues.priceRange
            },
            prescribed: 2
        })
        setTimeout(function(){
            setReset(false)
        }, 1000);
    }
    function selectPrescriptionType(e) {
        props.setFilters({...props.filters, prescribed: e.target.value})
    }

    function handleRangeChange(event, newValue) {
        setPriceRange(newValue);
    }
    function saveRangeChange(event, newValue) {
        props.setFilters({...props.filters, priceRange:{
            min: newValue[0],
            max: newValue[1]
        }})
    }
    
    return (
        <>
        <h4 className="filters-title">Filters</h4>
        <h5 className="filter-name-title">Companies</h5>
        <div className="filter-list">
        {
            props.filterValues?.companies.map(c => {
                return <FilterCheckBox reset={reset} key={c} list={props.filters.companies} name={c} keyValue={c} setFilters={props.setFilters} filters={props.filters} listName="companies" />
            })
        }
        </div>
        <h5 className="filter-name-title">Side Effects</h5>
        <div className="filter-list">
        {
            props.filterValues?.sideEffects.map(s => {
                return <FilterCheckBox reset={reset} key={s} list={props.filters.sideEffects} name={"No "+s} keyValue={s} setFilters={props.setFilters} filters={props.filters} listName="sideEffects" />
            })
        }
        </div>
        
        <h5 className="filter-name-title">Price</h5>
        <div className="">
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={priceRange}
            onChange={handleRangeChange}
            onChangeCommitted={saveRangeChange}
            valueLabelDisplay="auto"
            max={props.filterValues.priceRange}
        />
        </div>
        <h5 className="filter-name-title">Prescription</h5>
        <RadioGroup
            name="radio-buttons-group"
            defaultValue={2}
            value={props.filters.prescribed}
            onChange={selectPrescriptionType}
            >
            <FormControlLabel value={2} control={<Radio size="small" />} label={<p className="checkbox-text">All</p>} />
            <FormControlLabel value={1} control={<Radio size="small" />} label={<p className="checkbox-text">Needs Prescription</p>} />
            <FormControlLabel value={0} control={<Radio size="small" />} label={<p className="checkbox-text">No Prescription</p>} />
        </RadioGroup>
        <Button size="small" className="apply-filter-button" variant="contained" onClick={removeFilters}>Remove Filters</Button>
        </>
        
    )
}

export default FilterPane
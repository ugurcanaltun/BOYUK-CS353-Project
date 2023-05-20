import { Checkbox, FormControlLabel } from "@mui/material"
import { useState } from "react"

function FilterCheckBox(props) {
    const [checked, setChecked] = useState(false)

    function handleChange() {
        if (checked) {
            const index = props.list.indexOf(props.keyValue)
            if (index !== -1) {
                props.list.splice(index, 1)
            }
        }
        else {
            props.list.push(props.keyValue)
        }

        if (props.listName === "companies") {
            props.setFilters({...props.filters, companies:props.list})
        }
        else if (props.listName === "sideEffects") {
            props.setFilters({...props.filters, sideEffects:props.list})
        }
        else if (props.listName === "priceRanges") {
            props.setFilters({...props.filters, priceRanges:props.list})
        }
        setChecked(!checked)
    }
    return(
        <FormControlLabel control={<Checkbox size="small" onChange={handleChange}/>} label={props.name} />
    )
}

export default FilterCheckBox
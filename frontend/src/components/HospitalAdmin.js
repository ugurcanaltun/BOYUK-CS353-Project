import { Button, TextField } from "@mui/material"
import { addHospital, deleteHospital } from "../api/AdminAPI"
import { useState } from "react"

export function HospitalAdmin(props) {
    const [hospIdToAdd, setHospIdToAdd] = useState("")
    const [hospIdToRemove, setHospIdToRemove] = useState("")
    const [hospName, setHospName] = useState("")
    const [hospCity, setHospCity] = useState("")

    function addNewHospital() {
        addHospital(hospIdToAdd, hospName, hospCity).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }
    
    function removeHospital() {
        deleteHospital(hospIdToRemove).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }

    return(
        <div>
            <div>
                <h3>Add Hospital</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Hospital id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={hospIdToAdd}
                onChange={e=>{setHospIdToAdd(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Hospital Name"
                name="tckNumber"
                autoComplete="tckNumber"
                value={hospName}
                onChange={e=>{setHospName(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Hospital City"
                name="tckNumber"
                autoComplete="tckNumber"
                value={hospCity}
                onChange={e=>{setHospCity(e.target.value)}}
                autoFocus
                />
                <Button onClick={addNewHospital}>Add Hospital</Button>
            </div>
                <h3>Remove Hospital</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Hospital id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={hospIdToRemove}
                onChange={e=>{setHospIdToRemove(e.target.value)}}
                autoFocus
                />
                <Button onClick={removeHospital}>Remove Hospital</Button>
            <div>

            </div>
        </div>
    )
}
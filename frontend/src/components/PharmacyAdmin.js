import { Button, TextField } from "@mui/material"
import { addPharmacy, deletePharmacy } from "../api/AdminAPI"
import { useState } from "react"

export function PharmacyAdmin(props){
    const [pharmIdToAdd, setPharmIdToAdd] = useState()
    const [pharmIdToRemove, setPharmIdToRemove] = useState()
    const [pharmName, setPharmName] = useState()
    const [pharmCity, setPharmCity] = useState()

    function addNewPharmacy(){
        addPharmacy(pharmIdToAdd, pharmName, pharmCity).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }

    function removePharmacy() {
        deletePharmacy(pharmIdToRemove).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }

    return(
        <div>
            <div>
                <h3>Add Pharmacy</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Pharmacy id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={pharmIdToAdd}
                onChange={e=>{setPharmIdToAdd(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Pharmacy Name"
                name="tckNumber"
                autoComplete="tckNumber"
                value={pharmName}
                onChange={e=>{setPharmName(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Pharmacy City"
                name="tckNumber"
                autoComplete="tckNumber"
                value={pharmCity}
                onChange={e=>{setPharmCity(e.target.value)}}
                autoFocus
                />
                <Button onClick={addNewPharmacy}>Add Pharmacy</Button>
            </div>
                <h3>Remove Pharmacy</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Pharmacy id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={pharmIdToRemove}
                onChange={e=>{setPharmIdToRemove(e.target.value)}}
                autoFocus
                />
                <Button onClick={removePharmacy}>Remove Pharmacy</Button>
            <div>

            </div>
        </div>
    )
}
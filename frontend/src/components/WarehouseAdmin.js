import { Button, TextField } from "@mui/material"
import { addWarehouse, deleteWarehouse } from "../api/AdminAPI"
import { useState } from "react"

export function WarehouseAdmin(props) {
    const [wareIdToAdd, setWareIdToAdd] = useState("")
    const [wareIdToRemove, setWareIdToRemove] = useState("")
    const [wareName, setWareName] = useState("")
    const [wareCity, setWareCity] = useState("")

    function addNewWarehouse() {
        addWarehouse(wareIdToAdd, wareName, wareCity).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }
    function removeWarehouse() {
        deleteWarehouse(wareIdToRemove).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
        })
    }

    return(
        <div>
            <div>
                <h3>Add Warehouse</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Warehouse id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={wareIdToAdd}
                onChange={e=>{setWareIdToAdd(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Warehouse Name"
                name="tckNumber"
                autoComplete="tckNumber"
                value={wareName}
                onChange={e=>{setWareName(e.target.value)}}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Warehouse City"
                name="tckNumber"
                autoComplete="tckNumber"
                value={wareCity}
                onChange={e=>{setWareCity(e.target.value)}}
                autoFocus
                />
                <Button onClick={addNewWarehouse}>Add Warehouse</Button>
            </div>
                <h3>Remove Warehouse</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="Warehouse id"
                name="tckNumber"
                autoComplete="tckNumber"
                value={wareIdToRemove}
                onChange={e=>{setWareIdToRemove(e.target.value)}}
                autoFocus
                />
                <Button onClick={removeWarehouse}>Remove Warehouse</Button>
            <div>

            </div>
        </div>
    )
}
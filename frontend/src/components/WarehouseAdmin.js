import { Button, TextField } from "@mui/material"
import { addWarehouse, deleteWarehouse, fetchWarehouses } from "../api/AdminAPI"
import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function WarehouseAdmin(props) {
    const [wareIdToAdd, setWareIdToAdd] = useState("")
    const [wareIdToRemove, setWareIdToRemove] = useState("")
    const [wareName, setWareName] = useState("")
    const [wareCity, setWareCity] = useState("")
    const [warehouseList, setWarehouseList] = useState([])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#D52B1E',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(()=>{
        fetchWarehouses().then(w=>{
            setWarehouseList(w)
        })
    }, [])

    function addNewWarehouse() {
        addWarehouse(wareIdToAdd, wareName, wareCity).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
            fetchWarehouses().then(w=>{
                setWarehouseList(w)
            })
        })
    }
    function removeWarehouse() {
        deleteWarehouse(wareIdToRemove).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
            fetchWarehouses().then(w=>{
                setWarehouseList(w)
            })
        })
    }

    return(
        <div className="admin-panel-container">
            <div>
            <Grid className="admin-list" container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Warehouse Id</StyledTableCell>
                                <StyledTableCell>Warehouse Name</StyledTableCell>
                                <StyledTableCell>Warehouse City</StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {
                            warehouseList?
                            warehouseList.map((w, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {w.warehouse_id}
                                    </StyledTableCell>
                                    <StyledTableCell>{w.warehouse_name}</StyledTableCell>
                                    <StyledTableCell>{w.warehouse_city}</StyledTableCell>
                                </StyledTableRow>
                            )):<></>
                        }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            </div>
            <div className="admin-form">
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
            </div>  
        </div>
    )
}
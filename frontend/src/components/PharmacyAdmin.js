import { Button, TextField } from "@mui/material"
import { addPharmacy, deletePharmacy, fetchPharmacies } from "../api/AdminAPI"
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

export function PharmacyAdmin(props){
    const [pharmIdToAdd, setPharmIdToAdd] = useState("")
    const [pharmIdToRemove, setPharmIdToRemove] = useState("")
    const [pharmName, setPharmName] = useState("")
    const [pharmCity, setPharmCity] = useState("")
    const [pharmList, setPharmList] = useState([])

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
        fetchPharmacies().then(p=>{
            setPharmList(p)
        })
    }, [])

    function addNewPharmacy(){
        addPharmacy(pharmIdToAdd, pharmName, pharmCity).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
            fetchPharmacies().then(p=>{
                setPharmList(p)
            })
        })
    }

    function removePharmacy() {
        deletePharmacy(pharmIdToRemove).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
            fetchPharmacies().then(p=>{
                setPharmList(p)
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
                                <StyledTableCell>Pharmacy Id</StyledTableCell>
                                <StyledTableCell>Pharmacy Name</StyledTableCell>
                                <StyledTableCell>Pharmacy City</StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {
                            pharmList?
                            pharmList.map((p, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {p.pharmacy_id}
                                    </StyledTableCell>
                                    <StyledTableCell>{p.pharm_name}</StyledTableCell>
                                    <StyledTableCell>{p.pharm_city}</StyledTableCell>
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
            </div>
                
        </div>
    )
}
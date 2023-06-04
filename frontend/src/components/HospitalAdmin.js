import { Button, TextField } from "@mui/material"
import { addHospital, deleteHospital, fetchHospitals } from "../api/AdminAPI"
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

export function HospitalAdmin(props) {
    const [hospIdToAdd, setHospIdToAdd] = useState("")
    const [hospIdToRemove, setHospIdToRemove] = useState("")
    const [hospName, setHospName] = useState("")
    const [hospCity, setHospCity] = useState("")
    const [hospitalList, setHospitalList] = useState([])

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
        fetchHospitals().then(h=>{
            setHospitalList(h)
        })
    }, [])

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
        <div className="admin-panel-container">
            <div>
            <Grid className="admin-list" container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Hospital Id</StyledTableCell>
                                <StyledTableCell>Hospital Name</StyledTableCell>
                                <StyledTableCell>Hospital City</StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {
                            hospitalList?
                            hospitalList.map((h, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {h.hospital_id}
                                    </StyledTableCell>
                                    <StyledTableCell>{h.name}</StyledTableCell>
                                    <StyledTableCell>{h.city}</StyledTableCell>
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
            </div>
        </div>
    )
}
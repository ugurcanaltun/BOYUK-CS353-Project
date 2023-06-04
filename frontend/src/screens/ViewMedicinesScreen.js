import { useEffect, useState } from "react"
import { BASE_URL } from "../api/BaseURL";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchPharmacyMedicines } from "../api/PharmacyAPI";
import { fetchUserInfo } from "../api/UserAPI";

export default function ViewMedicinesScreen() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        let pharmId
        fetchUserInfo().then(i=>{
            pharmId = i.pharmacy_id
            fetchPharmacyMedicines(pharmId).then(r=>{
                setRows(r);
            })
        })
        
    }, [])

    return(
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Medicines in the Pharmacy</h1>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Drug Name</TableCell>
                                <TableCell>Drug Count</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                            rows?
                            rows.map((row, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.drug_name}
                                </TableCell>
                                <TableCell>{row.drug_count}</TableCell>
                                </TableRow>
                            )):<></>
                        }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}
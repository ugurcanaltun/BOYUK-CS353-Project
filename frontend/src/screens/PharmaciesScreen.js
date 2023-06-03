import { useEffect, useState } from "react"
import { fetchPharmacyList } from "../api/WarehouseAPI";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PharmaciesScreen() {

    const [rows, setRows] = useState([])

    useEffect(() => {
        fetchPharmacyList().then(b => {
            console.log(b)
            setRows(b)
        })
    }, [])

    return(
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Pharmacies</h1>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Pharmacy Name</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell>{row.pharm_name}</TableCell>
                                <TableCell>{row.pharm_city}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}
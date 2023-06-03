import * as React from 'react';
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

    const rows = [
        {
            "id": 0,
            "pharmacistName": "Ugur Can Altun",
            "pharmacyName": "Bilkent",
            "address": "Cankaya/Ankara",
        },
        {
            "id": 1,
            "pharmacistName": "Yarkin Sakinci",
            "pharmacyName": "ODTU",
            "address": "Cankaya/Ankara",
        },
        {
            "id": 3,
            "pharmacistName": "Boran Torun",
            "pharmacyName": "Hacettepe",
            "address": "Cankaya/Ankara",
        },
        {
            "id": 4,
            "pharmacistName": "Ramiz Karaeski",
            "pharmacyName": "Dayi Eczanesi",
            "address": "Istanbul",
        }
    ]

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
                                <TableCell>Pharmacist Name</TableCell>
                                <TableCell align="right">Pharmacy Name</TableCell>
                                <TableCell align="right">Address</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.pharmacistName}
                                </TableCell>
                                <TableCell align="right">{row.pharmacyName}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
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
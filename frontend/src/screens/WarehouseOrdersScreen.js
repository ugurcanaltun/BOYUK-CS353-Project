import { useEffect, useState } from "react"
import { fetchWarehouseOrders } from "../api/WarehouseAPI";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function WareHouseOrdersScreen() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        fetchWarehouseOrders().then(b => {
            console.log(b)
            setRows(b)
        })
    }, [])

    return(
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Warehouse Orders</h1>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Pharmacy</TableCell>
                                <TableCell>Drug Name</TableCell>
                                <TableCell>Restock Count</TableCell>
                                <TableCell>Restock Date</TableCell>
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
                                    {row.pharm_name}
                                </TableCell>
                                <TableCell>{row.drug_name}</TableCell>
                                <TableCell>{row.restock_count}</TableCell>
                                <TableCell>{row.restock_date}</TableCell>
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
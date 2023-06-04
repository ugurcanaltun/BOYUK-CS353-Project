import { useEffect, useState } from "react"
import { fetchPharmacyList } from "../api/WarehouseAPI";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PharmaciesScreen() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#d52b1e',
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
                            <StyledTableRow>
                                <StyledTableCell>Pharmacy Name</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <StyledTableCell>{row.pharm_name}</StyledTableCell>
                                <StyledTableCell>{row.pharm_city}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}
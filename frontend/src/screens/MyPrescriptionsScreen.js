import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { fetchPatientPrescriptions } from "../api/PrescriptionAPI";

export default function MyPrescriptionsScreen() {

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

    const [prescriptions, setPrescriptions] = useState([])
    useEffect(()=> {
        fetchPatientPrescriptions().then(o=> {
            console.log(o)
            setPrescriptions(o)
        })
    }, [])
    function PrescriptionItem(props) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">{props.date}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.drugName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.doctorName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.illness}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.expertise}</StyledTableCell>
            </StyledTableRow>
        )
    }
    return(
        <div className="orders-container">
            {
                (prescriptions && prescriptions.length > 0)?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Prescription Date</StyledTableCell>
                            <StyledTableCell>Drug Name</StyledTableCell>
                            <StyledTableCell>Doctor Name</StyledTableCell>
                            <StyledTableCell>Illness</StyledTableCell>
                            <StyledTableCell>Expertise Field</StyledTableCell>
                        </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                prescriptions?
                                prescriptions.map(p=> {
                                    return <PrescriptionItem 
                                        date={p.date}
                                        drugName={p.drug_name}
                                        doctorName={p.fullname} 
                                        illness={p.illness} 
                                        expertise={p.expertise_field} 
                                        />
                                }):<></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <>
                <h4>You have no prescriptions</h4>
                <Button href="/home/listmedicines">Go to medicine list</Button>
                </>
            }
            
        </div>
    );
}
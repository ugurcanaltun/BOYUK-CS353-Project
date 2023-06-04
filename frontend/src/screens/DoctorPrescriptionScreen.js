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
import { fetchDoctorPrescriptions } from "../api/PrescriptionAPI";

function DoctorPrescriptionScreen() {
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
        fetchDoctorPrescriptions().then(o=> {
            console.log(o)
            setPrescriptions(o)
        })
    }, [])

    function PrescriptionItem(props) {
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">{props.date}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.drugName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.patientName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.illness}</StyledTableCell>
            </StyledTableRow>
        )
    }
    return (
        <div className="orders-container">
            {
                (prescriptions && prescriptions.length > 0)?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Prescription Date</StyledTableCell>
                            <StyledTableCell>Drug Name</StyledTableCell>
                            <StyledTableCell>Patient Name</StyledTableCell>
                            <StyledTableCell>Illness</StyledTableCell>
                        </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                prescriptions?
                                prescriptions.map(p=> {
                                    return <PrescriptionItem 
                                        key={p.presc_id}
                                        date={p.date}
                                        drugName={p.drug_name}
                                        patientName={p.fullname} 
                                        illness={p.illness} 
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
    )
}

export default DoctorPrescriptionScreen
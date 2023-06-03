import { useEffect, useState } from "react";
import { fetchOrders } from "../api/OrdersAPI";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { fetchPatientPrescriptions } from "../api/PrescriptionAPI";

export default function MyPrescriptionsScreen() {
    const [prescriptions, setPrescriptions] = useState([])
    useEffect(()=> {
        fetchPatientPrescriptions().then(o=> {
            console.log(o)
            setPrescriptions(o)
        })
    }, [])
    function PrescriptionItem(props) {
        return (
            <TableRow>
                <TableCell component="th" scope="row">{props.date}</TableCell>
                <TableCell component="th" scope="row">{props.name}</TableCell>
                <TableCell component="th" scope="row">{props.accNo}</TableCell>
                <TableCell component="th" scope="row">{props.count}</TableCell>
                <TableCell component="th" scope="row">${props.price}</TableCell>
            </TableRow>
        )
    }
    return(
        <div className="orders-container">
            {
                (prescriptions && prescriptions.length > 0)?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Prescription Date</TableCell>
                            <TableCell>Drug Name</TableCell>
                            <TableCell align="right">Doctor Name</TableCell>
                            <TableCell align="right">Illness</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                prescriptions?
                                prescriptions.map(p=> {
                                    return <PrescriptionItem 
                                        date={p.order_date}
                                        name={p.drug_name} 
                                        accNo={p.bank_account_no} 
                                        count={p.count} 
                                        price={p.total_price} 
                                        />
                                }):<></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <>
                <h4>You have no previous orders</h4>
                <Button href="/home/listmedicines">Go to medicine list</Button>
                </>
            }
            
        </div>
    );
}
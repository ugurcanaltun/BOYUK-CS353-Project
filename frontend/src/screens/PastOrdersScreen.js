import { useEffect, useState } from "react";
import { fetchOrders } from "../api/OrdersAPI";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PastOrdersScreen() {
    const [orders, setOrders] = useState([])
    useEffect(()=> {
        fetchOrders().then(o=> {
            setOrders(o)
        })
    }, [])
    return(
        <div className="orders-container">
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Drug Name</TableCell>
                            <TableCell align="right">Pharmacy Name</TableCell>
                            <TableCell align="right">Number of items</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders.map(o=> {
                                    return <p>dofsdpfm</p>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}
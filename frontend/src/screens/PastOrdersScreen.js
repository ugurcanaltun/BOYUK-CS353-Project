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
            console.log(o)
            setOrders(o)
        })
    }, [])
    function OrderItem(props) {
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
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Drug Name</TableCell>
                            <TableCell align="right">Bank account</TableCell>
                            <TableCell align="right">Number of items</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders?
                                (orders.length > 0)?
                                orders.map(o=> {
                                    return <OrderItem 
                                        date={o.date}
                                        name={o.drug_name} 
                                        accNo={o.bank_account_no} 
                                        count={o.count} 
                                        price={o.total_price} 
                                        />
                                }):<p>no orders</p>:<></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}
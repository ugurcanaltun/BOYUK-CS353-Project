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
            {
                (orders && orders.length > 0)?
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
                                orders.map(o=> {
                                    return <OrderItem 
                                        date={o.order_date}
                                        name={o.drug_name} 
                                        accNo={o.bank_account_no} 
                                        count={o.count} 
                                        price={o.total_price} 
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
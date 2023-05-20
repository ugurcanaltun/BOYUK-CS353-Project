import { Button, Card } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Cart.css'
import { useEffect, useState } from "react";
import { fetchCart } from "../api/CartAPI";

export default function CartScreen() {
    const [cartList, setCartList] = useState([]);
    useEffect(() => {
        fetchCart().then(c => {
            setCartList(c)
        })
    }, [])
    
    return(
        <div className="cart-container">
           
            <h4>Your Cart</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Drug Name</TableCell>
                        <TableCell align="right">Pharmacy Name</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Number of items</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cartList.map(d=> {
                                <TableRow
                                key={d.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{d.name}</TableCell>
                                    <TableCell align="right">{d.pharmacyName}</TableCell>
                                    <TableCell align="right">{d.pharmacyCity}</TableCell>
                                    <TableCell align="right">{d.count}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button href="checkout">Complete Order</Button>

            
        </div>
    );
}
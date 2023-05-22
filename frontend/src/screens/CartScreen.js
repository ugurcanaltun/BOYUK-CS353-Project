import { Button, Card, IconButton } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Cart.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";
import { fetchCart } from "../api/CartAPI";
import { cartAdd, cartRemove } from "../api/CartAPI";

export default function CartScreen() {
    const [cartList, setCartList] = useState([]);
    useEffect(() => {
        fetchCart().then(c => {
            console.log(c)
            setCartList(c)
        })
    }, [])
    function CartItem(props) {
        const [count, setCount] = useState(props.drugCount);
        function addToCart() {
            cartAdd(props.drugName, 1)
            setCount(count + 1)
        }
        
        function removeFromCart() {
            cartRemove(props.drugName, 1)
            if (count === 1) {
                fetchCart().then(c => {
                    console.log(c)
                    setCartList(c)
                })
            }
            setCount(count - 1)
        }
        return (
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>
                    <div className="cart-section">
                        <IconButton onClick={removeFromCart}>
                            <RemoveIcon />
                        </IconButton>
                        <h4 className="count">{count}</h4>
                        <IconButton onClick={addToCart}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </TableCell>
                
                <TableCell component="th" scope="row">{props.drugName}</TableCell>
                <TableCell align="right">{count}</TableCell>
            </TableRow>
        )
    }
    return(
        <div className="cart-container">
            {
                cartList?
                (cartList.length === 0)?
                <>
                    <h4>Your Cart is empty</h4>
                    <Button href="listmedicines">See Medicines</Button>
                </>
                :
                <>
                <h4>Your Cart</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Drug Name</TableCell>
                            <TableCell align="right">Pharmacy Name</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Number of items</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cartList?
                                cartList.map(d=> {
                                    return <CartItem key={d.drug_name} drugCount={d.drug_count} drugName={d.drug_name}/>
                                })
                                : <p>Noo</p>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href="checkout">Complete Order</Button>
                </>
                :
                <></>
        }
        </div>
            
    );
}

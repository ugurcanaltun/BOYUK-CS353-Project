import { Button, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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

    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        fetchCart().then(c => {
            let sum = 0
            c.map(item => {
                sum = sum + item.price * item.drug_count
            })
            setCartList(c)
            setTotalPrice(sum)
        })
    }, [])
    function CartItem(props) {
        const [count, setCount] = useState(props.drugCount);

        function addToCart() {
            cartAdd(props.drugName, 1).then(() => {
                setCount(count + 1)
            })
        }
        
        function removeFromCart() {
            cartRemove(props.drugName, 1).then(() => {
                if (count === 1) {
                    fetchCart().then(c => {
                        console.log(c)
                        setCartList(c)
                    })
                }
                setCount(count - 1)
            })
            
        }
        return (
            <StyledTableRow>
                <StyledTableCell>
                    <div className="cart-section">
                        <IconButton onClick={removeFromCart}>
                            <RemoveIcon />
                        </IconButton>
                        <h4 className="count">{count}</h4>
                        <IconButton onClick={addToCart}>
                            <AddIcon />
                        </IconButton>
                    </div>
                </StyledTableCell>
                
                <StyledTableCell component="th" scope="row">{props.drugName}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.company}</StyledTableCell>
                <StyledTableCell component="th" scope="row">{props.prescribred}</StyledTableCell>
                <StyledTableCell component="th" scope="row">${props.price * count}</StyledTableCell>
            </StyledTableRow>
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
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Drug Name</StyledTableCell>
                            <StyledTableCell>Company</StyledTableCell>
                            <StyledTableCell>Needs Prescription</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                        </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cartList?
                                cartList.map(d=> {
                                    return <CartItem prescribred={d.needs_prescription} company={d.company} key={d.drug_name} drugCount={d.drug_count} drugName={d.drug_name} price={d.price}/>
                                })
                                : <p>Noo</p>
                            }
                            <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            
                            <StyledTableCell component="th" scope="row"></StyledTableCell>
                            <StyledTableCell component="th" scope="row"></StyledTableCell>
                            <StyledTableCell component="th" scope="row"></StyledTableCell>
                            <StyledTableCell component="th" scope="row">Total: ${totalPrice}</StyledTableCell>
                        </StyledTableRow>
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

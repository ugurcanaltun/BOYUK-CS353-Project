import { Alert, Autocomplete, Button, Card, Snackbar, TextField, ToggleButton } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchCart } from "../api/CartAPI";
import { useEffect, useState } from "react";
import '../css/Checkout.css'
import { fetchBankAccounts } from "../api/BankAPI";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { setBankAccountActive } from "../api/BankAPI";
import { fetchUserInfo } from "../api/UserAPI";
import { completeOrder } from "../api/OrdersAPI";
import { useNavigate  } from 'react-router-dom';
import { fetchPharmacies } from "../api/AdminAPI";

export default function CheckoutScreen() {
    const [cartList, setCartList] = useState([]);
    const [numOfItems, setNumOfItems] = useState(0);
    const [bankAccounts, setBankAccounts] = useState([])
    const [changeAccountOpen, setChangeAccountOpen] = useState(false)
    const [address, setAddress] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackText, setSnackText] = useState("")
    const [pharmacies, setPharmacies] = useState([])
    const [selectedPharmacy, setSelectedPharmacy] = useState(-1)
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("sikiş")
        fetchCart().then(c => {
            setCartList(c)
            setNumOfItems(0)
            let sum = 0
            let totPrice = 0
            c.map(item=>{
                sum = sum + item.drug_count
                totPrice = totPrice + item.price * item.drug_count
            })
            setNumOfItems(sum)
            setTotalPrice(totPrice)
        })
        fetchBankAccounts().then(b=>{
            setBankAccounts(b)
        })
        fetchUserInfo().then(u=> {
            setAddress(u.address)
        })
        fetchPharmacies().then(p=>{
            setPharmacies(p)
        })
    }, [])

    function complete() {
        completeOrder(selectedPharmacy).then(result=>{
            if (result.status === "success") {
                navigate('/home/ordercompleted');
            }
            else {
                setSnackText(result.result)
                setSnackOpen(true)
            }
        })
    }

    function handleSnackClose() {
        setSnackOpen(false)
    }
    
    function ChangeAccountWindow() {
        function handleClose() {
            setChangeAccountOpen(false)
        }
        function makeActive(accNo) {
            setBankAccountActive(accNo).then(r=>{
                fetchBankAccounts().then(b=> {
                    setBankAccounts(b)
                })
            })
        }
        
        return (
          <Dialog open={changeAccountOpen} onClose={handleClose}>
            <DialogTitle>Select Payment Method</DialogTitle>
            <DialogContent>
                {
                    bankAccounts?
                    bankAccounts.map(a=>{
                        return <Card key={a.bank_account_no} elevation={3} className={(a.active==='active')?"account-container active":"account-container"}>
                            <ToggleButton
                            value="check"
                            selected={a.active === 'active'}
                            onChange={e=>makeActive(a.bank_account_no)}>
                            {   
                                (a.active === 'active')?
                                <CheckCircleIcon />:
                                <RadioButtonUncheckedIcon />
                            }
                            </ToggleButton>
                            <CreditCardIcon />
                            <h4>Account No: {a.bank_account_no}</h4>
                            <h5>Balance: {a.balance}$</h5>
                        </Card>
                    }):
                    <></>
                }
              <DialogContentText>
                Select the account to make the payment with. You can add new accounts in the bank accounts page
              </DialogContentText>
              <Button href="bankaccounts">Add new account</Button>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        )
    }
    return(
        <div className="checkout-container">
            <div className="checkout-information-container">
                <h2>Payment ({numOfItems} Products) </h2>
                <div>
                    <h4>Delivery Address</h4>
                    <p>{address}</p>
                </div>
                <div>
                    <h4>Payment Method</h4>
                    {
                        bankAccounts?
                        bankAccounts.map(a=>{
                            return (a.active === 'active')?
                            <Card key={a.bank_account_no} elevation={3} className="account-container">
                                <CreditCardIcon />
                                <h4>Account No: {a.bank_account_no}</h4>
                                <h5>Balance: {a.balance}$</h5>
                            </Card>
                            : null
                        }):<></>
                    }
                    <Button onClick={e=>setChangeAccountOpen(true)} variant="contained">Change</Button>
                </div>
                <div>
                    <h4>Select Pharmacy</h4>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    getOptionLabel={(p) => p.pharm_name}
                    onChange={(event, newInputValue) => {
                        newInputValue?
                        setSelectedPharmacy(newInputValue.pharmacy_id):
                        setSelectedPharmacy(-1)
                    }}
                    options={pharmacies}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Pharmacies" />}
                    />
                </div>
                <h4>List of Items</h4>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Count</TableCell>
                            <TableCell>Drug Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cartList?
                                cartList.map(c=>{
                                    return <TableRow key={c.drug_name}>
                                            <TableCell>{c.drug_count}</TableCell>
                                            <TableCell>{c.drug_name}</TableCell>
                                            <TableCell>${c.price * c.drug_count}</TableCell>
                                        </TableRow>
                                }):
                                <></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Card className="checkout-summary-container">
                <h3>Order Summary</h3>
                <p>Number of Drugs: {numOfItems}</p>
                <p>Total Price: ${totalPrice}</p>
                <Button onClick={complete} disabled={selectedPharmacy === -1} variant="contained">Buy Now</Button>
            </Card>
            <ChangeAccountWindow />
            <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical:"bottom",horizontal:"right" }}>
                <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                    {snackText}
                </Alert>
            </Snackbar>
            
        </div>
    );
}
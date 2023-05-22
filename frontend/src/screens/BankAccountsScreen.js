import { useEffect, useState } from "react"
import { addBankAccount, fetchBankAccounts, removeBankAccount, setBankAccountActive } from "../api/BankAPI"
import { Button, Card, FormControlLabel, IconButton, Radio, ToggleButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../css/Bank.css'

function BankAccountsScreen() {
    const [accounts, setAccounts] = useState([])
    const [addWindowOpen, setAddWindowOpen] = useState(false)

    useEffect(()=> {
        fetchBankAccounts().then(b=> {
            console.log(b)
            setAccounts(b)
        })
    }, [])

    function handleClose() {
        setAddWindowOpen(false)
    }

    function openAddWindow() {
        setAddWindowOpen(true)
    }

    function AccountDisplay(props) {
        function removeAccount() {
            removeBankAccount(props.accountNo).then(r=>{
                console.log(r)
                fetchBankAccounts().then(b=> {
                    console.log(b)
                    setAccounts(b)
                })
            })
        }
        function makeActive() {
            if (props.active) {
                return
            }
            setBankAccountActive(props.accountNo).then(r=>{
                console.log(r)
                fetchBankAccounts().then(b=> {
                    console.log(b)
                    setAccounts(b)
                })
            })
        }
        return (
            <Card elevation={3} className={props.active?"account-container active":"account-container"}>
                <ToggleButton
                value="check"
                selected={props.active}
                onChange={makeActive}>
                    {   props.active?
                        <CheckCircleIcon />:
                        <RadioButtonUncheckedIcon />
                    }
                </ToggleButton>
                <CreditCardIcon />
                <h4>Account No: {props.accountNo}</h4>
                <h5>Balance: {props.balance}$</h5>
                
                <IconButton disabled={props.active} onClick={removeAccount}>
                    <DeleteIcon />
                </IconButton>
            </Card>
        )
    }


    function AddWindow() {
        const [accNo, setAccNo] = useState()
        const [accPassword, setAccPassword] = useState()
        function addAccount() {
            addBankAccount(accNo,accPassword).then(r=>{
                setAddWindowOpen(false)
                fetchBankAccounts().then(b=> {
                    console.log(b)
                    setAccounts(b)
                })
            })
        }
        return (
          <Dialog open={addWindowOpen} onClose={handleClose}>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your account information to use your bank account
              </DialogContentText>
              <TextField
                autoFocus
                value={accNo}
                onChange={e=>setAccNo(e.target.value)}
                label="Bank Account No"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                value={accPassword}
                onChange={e=>setAccPassword(e.target.value)}
                label="Account Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addAccount}>Add Account</Button>
            </DialogActions>
          </Dialog>
        )
    }

    return (
        <div className="accounts-screen-container">
            <h4>Your Accounts</h4>
            {
                accounts?
                accounts.map(a=> {
                    return <AccountDisplay key={a.bank_account_no} active={a.active === "active"} balance={a.balance} password={a.bank_account_password} accountNo={a.bank_account_no} />
                }): <></>
            }
            <Button onClick={openAddWindow}>Add new account</Button>
            <AddWindow />
        </div>
    )
}





export default BankAccountsScreen
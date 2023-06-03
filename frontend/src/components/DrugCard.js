import { Autocomplete, Button, Card, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import { cartAdd, cartRemove } from "../api/CartAPI";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchPatients } from "../api/UserAPI";

function DrugCard(props) {
    const [count, setCount] = useState(props.count)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = useState({})
    const [patients, setPatients] = useState([{ label: 'Terminator 2: Judgment Day', year: 1991 }])
    const [patientTCK, setPatientTCK] = useState("")

    useEffect(()=>{
        fetchPatients().then(p=>{
            console.log(p)
            setPatients(p)
        })
    }, [])

    function addToCart() {
        cartAdd(props.drugName, 1)
        setCount(count + 1)
    }

    function removeFromCart() {
        cartRemove(props.drugName, 1)
        setCount(count - 1)
    }

    function prescribe() {

    }

    function PrescriptionDialog() {
        return (
            <Dialog open={dialogOpen} onClose={e=>setDialogOpen(false)}>
            <DialogTitle>Prescribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Select patient name to prescribe the drug
              </DialogContentText>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                getOptionLabel={(p) => p.fullname}
                onInputChange={(event, newInputValue) => {
                    setPatientTCK(newInputValue.TCK);
                }}
                options={patients}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Patients" />}
                />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={e=>{}}>Add Account</Button>
            </DialogActions>
          </Dialog>
        )
    }
    
    return (
        <Card elevation={3} className="drug-card">
            <MedicationLiquidIcon />
            <h5 className="drug-name">{props.drugName}</h5>
            <h3 className="drug-price">{props.drugPrice}$</h3>
            {
                localStorage.getItem("role") === "patient"?
                <>
                (count===0)?
                <Button size="small" className="buy-button" variant="contained" onClick={addToCart}>Add To Cart</Button>
                :
                <div className="cart-section">
                    <IconButton onClick={removeFromCart}>
                        <RemoveIcon />
                    </IconButton>
                    <h4 className="count">{count}</h4>
                    <IconButton onClick={addToCart}>
                        <AddIcon />
                    </IconButton>
                </div>
                </>: null   
            }
            {
                localStorage.getItem("role") === "doctor"?
                <Button size="small" className="buy-button" variant="contained" onClick={e=>setDialogOpen(true)}>Prescribe</Button>
                : null   
            }
            <PrescriptionDialog />
        </Card>
    )
}



export default DrugCard;
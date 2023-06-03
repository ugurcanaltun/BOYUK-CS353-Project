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
import { prescribeDrug } from "../api/PrescriptionAPI";

function DrugCard(props) {
    const [count, setCount] = useState(props.count)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [patients, setPatients] = useState([])
    

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

    

    function PrescriptionDialog() {
        const [patientTCK, setPatientTCK] = useState("")
        const [illness, setIllness] = useState("")

        function prescribe() {
            prescribeDrug(patientTCK, props.drugName, illness).then(p=> {
                if (p === "success") {
                    setDialogOpen(false)
                    console.log("success agaa")
                }
                else {
                    console.log("fail")
                }
            })
        }
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
                onChange={(event, newInputValue) => {
                    console.log(newInputValue.TCK)
                    setPatientTCK(newInputValue.TCK);
                }}
                options={patients}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Patients" />}
                />
                <TextField
                    autoFocus
                    value={illness}
                    onChange={e=>setIllness(e.target.value)}
                    label="Illness"
                    type="text"
                    fullWidth
                    variant="standard"
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={prescribe}>Prescribe</Button>
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
                <> {
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
                }
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
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import { cartAdd } from "../api/CartAPI";

function DrugCard(props) {
    const [count, setCount] = useState(0)
    function addToCart() {
        cartAdd(props.id)
        setCount(count + 1)
    }

    function removeFromCart() {
        setCount(count - 1)
    }
    
    return (
        <div className="drug-card">
            <MedicationLiquidIcon />
            <h5 className="drug-name">{props.drugName}</h5>
            <h3 className="drug-price">{props.drugPrice}$</h3>
            {
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
        </div>
    )
}



export default DrugCard;
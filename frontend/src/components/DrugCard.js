import { Button } from "@mui/material";

function DrugCard(props) {
    return (
        <div className="drug-card">
            
            <h6>{props.drugName}</h6>
            <h3>{props.drugPrice}</h3>
            <Button variant="contained" onClick={goToPayment}>Buy Now</Button>
        </div>
    )
}

function goToPayment() {
    alert("success");
}

export default DrugCard;
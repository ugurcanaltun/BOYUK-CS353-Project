import { Button, Card } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Checkout.css'

export default function CheckoutScreen(props) {
    return(
        <div className="checkout-container">
            <div className="checkout-information-container">
                <h2>Payment ({4} Products) </h2>
                <div>
                    <h4>Delivery Address</h4>
                    <p>sdflkedfmgiselrfölöd.vldsfvdfsvcsdfcsdfsd</p>
                </div>
                <div>
                    <h4>Payment Method</h4>
                    <p>sdflkedfmgiselrfölöd.vldsfvdfsvcsdfcsdfsd</p>
                    <Button variant="contained">Change</Button>
                </div>
                <h4>List of</h4>
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
                        
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Card className="checkout-summary-container">
                <h3>Order Summary</h3>
                <p>Number of Drugs: </p>
                <p>Total: </p>
                <Button variant="contained">Buy Now</Button>
            </Card>
            
        </div>
    );
}
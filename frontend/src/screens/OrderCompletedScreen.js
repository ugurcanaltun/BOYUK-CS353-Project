import { Button } from "@mui/material"

function OrderCompletedScreen() {
    return (
        <div>
            Your order is completed. You can see it in your previous orders
            <Button href="/home/pastorders">Go to orders</Button>
        </div>
    )
}

export default OrderCompletedScreen
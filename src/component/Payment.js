import React from "react"
import PaymentList from "./PaymentList"
import Button from "@mui/material/Button"
import swal from 'sweetalert';

function Payment() {
    const handleSubmit = (event) => {
        event.preventDefault()
        swal("Good job!", "Your payment is success", "success");
    }

    return (
        <div className="payment">
            
            <PaymentList />
            <br/>
            <Button variant="contained" className="submit-btn" onClick={handleSubmit}>
                    Pay Billing
            </Button>
        </div>
    )
}

export default Payment

import React from "react"
import ovo from "../image/ovo.png"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

function PaymentList() {
    return (
        <FormControl className="payment-list">
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="ovo"
                name="radio-buttons-group"
                className="radio-group"
            >
                <div className="list-item">
                    <FormControlLabel value="ovo" control={<Radio />} label="OVO" />
                    <img src={ovo} alt="OVO" className="icon" />
                </div>
                <div className="list-item">
                    <FormControlLabel value="bank" control={<Radio />} label="Transfer Bank" />
                    <img src={ovo} alt="OVO" className="icon" />
                </div>
                <div className="list-item">
                    <FormControlLabel value="indomaret" control={<Radio />} label="Indomaret" />
                    <img src={ovo} alt="OVO" className="icon" />
                </div>
            </RadioGroup>
        </FormControl>
    )
}

export default PaymentList

import * as React from "react"
import { useEffect } from "react"
import Payment from "./Payment"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function Test() {
    const [value, setValue] = React.useState("")
    const [lists, setLists] = React.useState([])
    const [balance, setBalance] = React.useState([])
    const [billing, setBilling] = React.useState("")
    const baseUrl = "http://127.0.0.1:8000/beta?account_number="
    const balanceUrl = "http://127.0.0.1:8000/balance?account_number="

    const url = baseUrl + value
    const getBalance = balanceUrl + value

    const fetchData = async () => {
        try {
            await fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setLists(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBalance = async () => {
        try {
            await fetch(getBalance)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setBalance(data)
                    console.log(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const generateBilling = () => {
        setBilling(+new Date())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        generateBilling()
        fetchBalance()
        fetchData()
    }

    return (
        <div className="form">
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    sx={{ m: 1 }}
                    label="Account Number"
                    variant="outlined"
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Search
                </Button>
            </Box>

            {balance.map((item) => (
                <div key={item.response.account_number}>
                    <p>
                        Balance Amount :
                        <span className="balance">{item.response.account_balance}</span>
                    </p>
                </div>
            ))}

            {lists.map((list) => (
                <div key={list.account_number}>
                    {list.status === "unpaid" ? (
                        <div className="state">
                            <div className="state-text">
                                <p>
                                    Status pembayaran anda :
                                    <span className="complete"> {list.status}</span>
                                </p>
                            </div>
                            <h4>{billing}</h4>
                            <Payment />
                        </div>
                    ) : (
                        <div>
                            <p>Tagihan sudah dibayar</p>
                            <p>
                                Balance Amount :
                                <span className="complete">{list.response.account_balance}</span>
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

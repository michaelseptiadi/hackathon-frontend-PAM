import * as React from "react"
import { useEffect } from "react"
import Payment from "./Payment"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

export default function Test() {
    const [value, setValue] = React.useState("")
    const [lists, setLists] = React.useState([])
    const [billing, setBilling] = React.useState("")
    const baseUrl = "http://127.0.0.1:8000/beta?account_number="

    const url = baseUrl + value

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

    const generateBilling = () => {
        setBilling(+new Date())
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchData()
        generateBilling()
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
            {lists.map((list) => (
                <div>
                    {list.status === "unpaid" ? (
                        <div className="state" key={list.account_number}>
                            <div className="state-text">
                                <p>
                                    Status pembayaran anda:{" "}
                                    <span className="complete">{list.status}</span>
                                </p>
                                <h4>{billing}</h4>
                            </div>
                            <Payment />
                        </div>
                    ) : (
                        <p>Tagihan sudah dibayar</p>
                    )}
                </div>
            ))}
        </div>
    )
}

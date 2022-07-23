import * as React from "react"
import { useEffect } from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

export default function Test() {
    const [value, setValue] = React.useState("")
    const [lists, setLists] = React.useState([])
    const baseUrl = "http://127.0.0.1:8000/data?account_number=ACC20220723042126424"

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

    return (
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
                label="Outlined"
                variant="outlined"
                onChange={(e) => setValue(e.target.value)}
            />
            {lists.map((list) => (
                <div>
                    <p>{list.unit_number}</p>
                </div>
            ))}

            <button onClick={fetchData}>Search</button>
        </Box>
    )
}
